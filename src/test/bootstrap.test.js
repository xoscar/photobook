const config = require('../config/env/test');
const sails = require('sails');

before(function onDone(done) {
  this.timeout(20000);

  sails.lift(config, (err, server) => {
    done(err, server);
  });
});

after((done) => {
  sails.lower(done);
});
