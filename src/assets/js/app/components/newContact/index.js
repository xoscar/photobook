// template
import newContactTemplate from './newContactTemplate.hbs';

// components
import contactList from '../contactList';

// lib
import rest, { fileUpload } from '../../lib/rest';

export default {
  createContact(body) {
    return rest({
      path: '/contacts',
      data: body,
      method: 'POST',
    })
  },

  uploadContactImage({ contactId, file }) {
    const formData = new FormData();

    formData.append('image', file);

    return fileUpload({
      path: `/contacts/${contactId}/image`,
      formData,
    });
  },

  render(props) {
    $('#newContact').html(newContactTemplate(props))

    $('.new-user-form').submit((event) => {
      event.preventDefault();

      const body = $(event.target).serializeArray().reduce((acc, data) => (
        Object.assign(acc, {
          [data.name]: data.value,
        })
      ), {})

      this.createContact(body)

        .then(({ contact }) => {
          const image = $(event.target).find('input[type=file]')[0].files[0];
          return (image ? this.uploadContactImage({ file: image, contactId: contact.id }) : Promise.resolve())

          .then(() => {
            $('#newModal').modal('hide')
            $(event.target).find('input[type=text], textarea, input[type=file], input[type=email]').val('');
            contactList.render();
          })
        })

        .catch(err => (
          console.log(err)
        ))
    })
  }
};
