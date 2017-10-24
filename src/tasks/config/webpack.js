const webpackConfig = require('../../webpack.config');

/**
 * Webpack task to compile the javascript frontend webapp
 * @param  {Object} grunt Default grunt object
 * @return {void}       Adds task config for wepack and attaches it to grunt.
 */
module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-webpack');

  grunt.config.set('webpack', {
    options: {
      stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
    },
    prod: webpackConfig,
    dev: webpackConfig,
  });

  grunt.loadNpmTasks('grunt-webpack');
};
