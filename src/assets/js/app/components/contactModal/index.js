import contactModalTemplate from './contactModalTemplate.hbs';

export default {
  render({ contact }) {
  	console.log(contact);
    return contactModalTemplate({ contact })
  }
}
