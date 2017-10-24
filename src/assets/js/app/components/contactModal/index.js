// templates
import contactModalTemplate from './contactModalTemplate.hbs';

/**
 * Detail modal view
 */
export default {
	/**
	 * Shows modal with the contact information
	 * @param  {Object} options.contact Contact model information
	 * @return {Stirng}                 Compiled handlebars template with contact info.
	 */
  render({ contact }) {
    return contactModalTemplate({ contact })
  }
}
