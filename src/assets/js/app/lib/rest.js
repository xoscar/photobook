// dependencies
import $ from 'jquery';

const baseUrl = 'http://localhost:3000';

export default ({
  path,
  method = 'GET',
  data=null,
}) => {
  console.log('sending request', path, data);

  return $.ajax({
    method,
    url: `${baseUrl}${path}`,
    headers: {
      'Content-type': 'application/json',
    },
    data: data ? JSON.stringify(data) : null,
  })
};

export const fileUpload = ({ formData, method='POST', path }) => {
  return $.ajax({
    url: `${baseUrl}${path}`,
    method: 'POST',
    data: formData,
    cache: false,
    dataType: 'json',
    processData: false,
    contentType: false,
  });
};
