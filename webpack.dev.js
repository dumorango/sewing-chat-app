const { resolve } = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

module.exports = {
  context: resolve(__dirname, 'src'),

  entry: [
    'react-hot-loader/patch',
        // activate HMR for React

    'webpack-dev-server/client?http://localhost:8080',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates

    './index.js',
        // the entry point of our app
  ],
  resolve: {
    modules: [resolve(__dirname, 'src'), 'node_modules'],
  },
  output: {
    filename: '[name].js',
        // the output bundle

    path: resolve(__dirname, 'dist'),

    publicPath: '/',
        // necessary for HMR to know where to load the hot update chunks
  },

  devtool: 'inline-source-map',

  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true,
        // enable HMR on the server

    contentBase: resolve(__dirname, 'dist'),
        // match the output path

    publicPath: '/',
        // match the output `publicPath`
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader', ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?modules', ],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally

    new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates
    new HtmlWebpackPlugin({
      title: 'Zap da Costura',
      template: './index.ejs',
    }),
    new OfflinePlugin(),
  ],
};
