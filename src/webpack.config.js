const { join } = require('path');
const webpack = require('webpack');

/**
 * Webpack configuration for webapp frontend config
 * @type {Object}
 */
module.exports = {
  context: join(__dirname),
  entry: './assets/js/app/app.js',
  output: {
    path: join(__dirname, './assets/js'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /(node_modules!bower_components)/,
      loader: 'babel-loader',
    },
    {
      test: /\.hbs/,
      loader: 'handlebars-template-loader',
    },
    {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader', 'resolve-url-loader'],
    }, {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap'],
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /\.(jpg|fig|woff|woff2|png|eot|ttf|svg)$/,
      loader: 'url-loader?limit=5000',
    }],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
};
