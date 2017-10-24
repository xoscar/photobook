module.exports = {
  models: {
    // set remote mysql instance for prod, to use RDS options
    connection: 'remoteMysql',
  },

  hookTimeout: 30000,
  port: 80,
  appName: 'Phone Book',
};
