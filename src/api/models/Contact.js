/**
 * Contact model description
 * @type {Object} returns object with specific attributes and methods.
 */
module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
    },
    phone: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
    },
    address: {
      type: 'string',
    },
    details: {
      type: 'string',
    },
    imageUrl: {
      type: 'string',

      // use default image for contacts without a defined image.
      defaultsTo: 'https://s3-us-west-2.amazonaws.com/photobook-images-test-2/default.png',
    },
  },
};
