// template
import contactCardTemplate from './contactCardTemplate.hbs';

/**
 * Contact card component
 */
export default {
	/**
	 * Compiles hbs template using the contact info
	 * @param  {Object} options.contact      Contact model information
	 * @return {String}                      Returns compiled string with contacts information
	 */
  render({ contact }) {
    return contactCardTemplate({ contact })
  }
}
