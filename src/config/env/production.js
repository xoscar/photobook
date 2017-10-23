const { join } = require('path');

require('dotenv').config({
  path: join(__dirname, '../../.env'),
});

module.exports = {
  models: {
    connection: 'remoteMysql',
  },

  port: 80,
  appName: 'Phone Book',
};
