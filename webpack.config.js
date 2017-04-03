/* global __dirname: true */
/* eslint-disable no-var */
/* eslint-disable prefer-template */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var env = process.env.NODE_ENV || 'development';
var isProd = process.env.NODE_ENV === 'production';

// getEntrySources gets sources for webpack entry paths, by environment
function getEntrySources(sources) {
  if (!isProd) {
    sources.push('webpack-dev-server/client?http://localhost:' + (process.env.WEBPACK_SERVER_PORT || '8080'));
    sources.push('webpack/hot/only-dev-server');
  }
  return sources;
}

module.exports = {
  entry: getEntrySources(['babel-polyfill', './src/js/index.js']),
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js',
  },
  devtool: isProd ? 'cheap-module-source-map' : 'eval',
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'source-map',
      },
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel',
        ],
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      env: env,
    }),
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
  stats: {
    warnings: false,
  },
};
