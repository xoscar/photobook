const skipperDisk = require('skipper-disk');

module.exports = {
  sails_url: () => sails.getBaseURL() + sails.config.blueprints.prefix,
  log: {
    level: 'error',
  },
  grunt: false,
  models: {
    connection: 'localDiskDb',
    migrate: 'drop',
  },
  aws: {
    skipperS3: skipperDisk,
    skipperType: 'disk',
  },
};
