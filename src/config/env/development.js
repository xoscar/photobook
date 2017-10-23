const { join } = require('path');

require('dotenv').config({
  path: join(__dirname, '../../.env'),
});

module.exports = {
  port: '3000',
  appName: 'Phone Book',
};
