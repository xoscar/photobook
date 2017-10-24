// template
import deleteContactTemplate from './deleteContactTemplate.hbs';

// lib
import rest from '../../lib/rest';

// components
import contactList from '../contactList';

/**
 * Contact list component
 */
export default {
  /**
   * Deletes a selected contact
   * @param  {Number} contactId Contact identifier
   * @return {Promise}           Async result with the delete result coming from the backend
   */
  deleteContact(contactId) {
    return rest({
      path: `/contacts/${contactId}`,
      method: 'DELETE',
    })
  },

  /**
   * Displays delete modal for content
   * @return {void} Prints the result directly into the view.
   */
  render({ contact, onDelete }) {
  	// Step #1: render modal with contact information
    $('#deleteModal').html(deleteContactTemplate({ contact }))

    // Step #2: show modal
    $('#delModal').modal('show');

    // Step #3: create listeners for delete form
    $('.delete-user-form').submit((event) => {
      event.preventDefault();

      this.deleteContact(contact.id)

      .then(() => {
				$('#delModal').modal('hide').on('hidden.bs.modal', onDelete);
      })
    })
  }
};
