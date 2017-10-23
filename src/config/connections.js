const { join } = require('path');

require('dotenv').config({
  path: join(__dirname, '../../.env'),
});

module.exports.connections = {
  localMysql: {
    adapter: 'sails-mysql',
    user: 'root',
    password: '123',
    host: '172.17.0.2',
    database: 'phonebook',
  },
  remoteMysql: {
    adapter: 'sails-mysql',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    database: 'remoteDbase',
  },
};
