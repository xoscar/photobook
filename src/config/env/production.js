module.exports = {
  models: {
  	// set remote mysql instance for prod, to use RDS options
    connection: 'remoteMysql',
  },

  port: 80,
  appName: 'Phone Book',
};
