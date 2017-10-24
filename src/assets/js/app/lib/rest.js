// dependencies
import $ from 'jquery';

/**
 * Send a request to the backend using the given parameters
 * @param  {String} options.path   Requested path of the service
 * @param  {String} options.method HTTP Verb
 * @param  {Object} options.data   Body request
 * @param  {Object} options.       Object with the request parameters
 * @return {Promise}               Returns a promise where that resolves when sucessfull and rejects on fail
 */
export default ({
  path,
  method = 'GET',
  data = null,
}) => (
  $.ajax({
    method,
    url: path,
    headers: {
      'Content-type': 'application/json',
    },
    data: data ? JSON.stringify(data) : null,
  })
);

/**
 * Send upload file request using the request parameters
 * @param  {String} options.path      Requested path of the service
 * @param  {String} options.method    HTTP Verb
 * @param  {FormData} options.formData  A form data object containing the files
 * @param  {Object} options.          Object with the request parameters
 * @return {Promise}               Returns a promise where that resolves when sucessfull and rejects on fail
 */
export const fileUpload = ({ formData, method = 'POST', path }) => (
  $.ajax({
    url: path,
    method,
    data: formData,
    cache: false,
    dataType: 'json',
    processData: false,
    contentType: false,
  })
);
