/* global __dirname: true */
/* eslint-disable no-var */
/* eslint-disable prefer-template */
const path = require('path');
const webpack = require('webpack');
const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin;
const CommonsChunkPlugin = require('webpack').optimize.CommonsChunkPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV || 'development';
const isProd = process.env.NODE_ENV === 'production';

// getEntrySources gets sources for webpack entry paths, by environment
function getEntrySources(sources) {
  if (!isProd) {
    sources.push(`webpack-dev-server/client?http://localhost:${process.env.WEBPACK_SERVER_PORT || '8080'}`);
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    sources.push('webpack/hot/only-dev-server');
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
  }
  return sources;
}

module.exports = {
  entry: getEntrySources([
    'react-hot-loader/patch', // activate HMR for React - needs to be 1st
    path.join(__dirname, 'src/js/index.js'), // our app entry
  ]),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        // preloader
        enforce: 'pre',
        exclude: /node_modules/,
        use: 'source-map-loader',
      }, {
        // babel transpile
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }, {
        test: /\.(png|jpg|jpeg|gif|svg|ico|woff|woff2|eot|ttf|json|xml)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]',
          },
        },
      },
    ],
  },
  output: {
    chunkFilename: '[name].js',
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js',
  },
  plugins: [
    new CommonsChunkPlugin({
      name: 'commons',
      // the commons chunk name
      filename: 'commons.js',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      hash: true,
      template: './index.html',
      env: env,
    }),
    new HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
  stats: {
    warnings: false,
  },
  devServer: {
    hot: true, // enable HMR on the server
    port: process.env.WEBPACK_SERVER_PORT || 8080,
  },
  devtool: isProd ? 'cheap-module-source-map' : 'eval',
};
