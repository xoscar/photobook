// template
import newContactTemplate from './newContactTemplate.hbs';

// components
import contactList from '../contactList';
import validationError from '../validationError';

// lib
import rest, { fileUpload } from '../../lib/rest';

/**
 * New contact component
 */
export default {
  /**
   * Send request to backend servie to create new contact
   * @param  {Object} body New contact object information
   * @return {Promise}      Async result from the service
   */
  createContact(body) {
    return rest({
      path: '/contacts',
      data: body,
      method: 'POST',
    })
  },

  /**
   * Calls upload rest service from the backend to save contacts image
   * @param  {Number} options.contactId contacts indentifier
   * @param  {Object} options.file      File object from to upload.
   * @return {Promise}                   Async result from the backend.
   */
  uploadContactImage({ contactId, file }) {
    // attach image to a form data
    const formData = new FormData();
    formData.append('image', file);

    // trigger service call
    return fileUpload({
      path: `/contacts/${contactId}/image`,
      formData,
    });
  },

  /**
   * Compiles modal html to the view placeholder and creates listeners for the upload image and new contact events.
   * @param  {Object} props Default optional properties send to the template 
   * @return {void}       renders modal directly into the view.
   */
  render(props) {
    // Step #1: compile template and to show modal trigger and modal options
    $('#newContact').html(newContactTemplate(props))

    // Step #2: add listener to handle new contact action.
    $('.new-user-form').submit((event) => {
      event.preventDefault();

      // creates JSON body for basic contact information
      const body = $(event.target).serializeArray().reduce((acc, data) => (
        Object.assign(acc, {
          [data.name]: data.value,
        })
      ), {})

      // listener to remove validation alerts
      $('.new-user-form').find('input[type=text], textarea, input[type=file], input[type=email]').change(() => (
        $('#new-contact-validation-errors').html('')
      ));

      $('.close-new-modal').click(() => {
        $('#new-contact-validation-errors').html('')
        $('.new-user-form').find('input[type=text], textarea, input[type=file], input[type=email]').val('');
      });

      // sends create contact request to the backend
      this.createContact(body)

        .then(({ contact }) => {
          // from the just created contact we attach the image if it is defined in the form
          const image = $(event.target).find('input[type=file]')[0].files[0];
          return (image ? this.uploadContactImage({ file: image, contactId: contact.id }) : Promise.resolve())

            .then(() => {
              // hide modal, clean form and re-render contact list component to update view.
              $('#newModal').modal('hide')
              $(event.target).find('input[type=text], textarea, input[type=file], input[type=email]').val('');
              contactList.render();
            })
        })

        // handle validation errors from the backend.
        .catch(err => (
          $('#new-contact-validation-errors').html(Object.keys(err.responseJSON).map(key => (
            err.responseJSON[key].map((err) => (
              validationError.render({
                field: key,
                rule: err.rule,
              })
            )).join('')
          )).join(''))
        ))
    })
  }
};
