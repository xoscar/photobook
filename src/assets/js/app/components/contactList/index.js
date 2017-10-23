// template
import contactListTemplate from './contactListTemplate.hbs';

// components
import contactCard from '../contactCard';
import contactModal from '../contactModal';

// lib
import rest from '../../lib/rest';

export default {
  getContacts() {
    return rest({
      path: '/contacts',
    })
  },

  deleteContact(contactId) {
    return rest({
      path: `/contacts/${contactId}`,
      method: 'DELETE',
    })
  },

  render() {
    this.getContacts()

      .then(({ contacts, hits }) => {
         $('#contacts').html(contactListTemplate({
          contacts: contacts.map((contact, index) => (
            contactCard.render({ contact })
          )).join(''),
        }))

        $('.detail-view-button').on('click', (event) => {
          const contactId = $(event.target).data('contactid');

          $('#contactModal').html(contactModal.render({ contact: contacts.filter(contact => contact.id === contactId)[0] }))
          $('#exampleModal').modal('show');
        })

        $('.delete-contact').on('click', (event) => {
          const contactId = $(event.target).data('contactid');
          
          this.deleteContact(contactId)

          .then(() => (
            this.render()
          ))
        })
    })
  }
};


