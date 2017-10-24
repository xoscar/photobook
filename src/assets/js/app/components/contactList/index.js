// template
import contactListTemplate from './contactListTemplate.hbs';

// components
import contactCard from '../contactCard';
import contactModal from '../contactModal';
import deleteContact from '../deleteContact';

// lib
import rest from '../../lib/rest';

/**
 * Contact list component
 */
export default {
  /**
   * Retrieves all contacts from the API REST service
   * @return {Promise} Async result with contact list or error
   */
  getContacts() {
    return rest({
      path: '/contacts',
    })
  },

  /**
   * Retrieves the contacts, displays them into the view and creates listeners for the actions.
   * @return {void} Prints the result directly into the view.
   */
  render() {
    // step #1: get list of contacts from the backend.
    this.getContacts()

      .then(({ contacts, hits }) => {
        // step #2: render contact component list into the view.
        $('#contacts').html(contactListTemplate({
          contacts: contacts.map((contact, index) => (
            // contact card component
            contactCard.render({ contact })
          )).join(''),
        }))

        // step #3: creates listener for view detail modal
        $('.detail-view-button').on('click', (event) => {
          const contactId = $(event.target).data('contactid');

          // renders modal component view into the contact list template placeholder with the specific info for the contact
          $('#contactModal').html(contactModal.render({ contact: contacts.filter(contact => contact.id === contactId)[0] }))
          $('#exampleModal').modal('show');
        })
        
        // step #4: creates listener for delete contact modal
        $('.delete-contact').on('click', (event) => {
          const contactId = $(event.target).data('contactid');

          deleteContact.render({ contact: contacts.filter(contact => contact.id === contactId)[0], onDelete: this.render.bind(this) })
        })
      })
  }
};
