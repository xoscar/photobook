// template
import validationErrorTemplate from './validationErrorTemplate.hbs';

/**
 * validation error component
 */
export default {
	/**
	 * Compiles hbs template using the contact info
	 * @param  {Object} options.contact      Contact model information
	 * @return {String}                      Returns compiled string with contacts information
	 */
  render({ field, rule }) {
    return validationErrorTemplate({ field, rule })
  }
}
