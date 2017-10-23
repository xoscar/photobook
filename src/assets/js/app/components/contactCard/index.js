import contactCardTemplate from './contactCardTemplate.hbs';

export default {
  render({ contact, key, onDetailView }) {
    return contactCardTemplate({ contact, key })
  }
}
