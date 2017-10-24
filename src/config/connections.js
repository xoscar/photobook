module.exports.connections = {
  localDiskDb: {
    adapter: 'sails-disk',
  },

  // default cretentials for docker's mysql image, this is only for development.
  localMysql: {
    adapter: 'sails-mysql',
    user: 'root',
    password: '123',
    host: process.env.PHONEBOOK_MYSQL_1_PORT_3306_TCP_ADDR,
    database: 'phonebook',
  },

  // for production and AWS deployment use environment credentialsa and RDS host
  remoteMysql: {
    adapter: 'sails-mysql',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    database: 'phonebook',
  },
};
