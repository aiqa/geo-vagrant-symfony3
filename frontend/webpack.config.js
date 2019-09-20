const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    contentBase: './src',
    hot: true,
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, X-Authorization',
    },
    disableHostCheck: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // eslint-disable-next-line no-unused-vars
              name(file) {
                return 'favicon.[ext]';
              },
              outputPath: 'assets',
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // eslint-disable-next-line no-unused-vars
              name(file) {
                if (process.env.NODE_ENV === 'development') {
                  return '[path][name].[ext]';
                }
                return '[hash].[ext]';
              },
              outputPath: 'assets',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [process.env.DOCKER_NODE_PATH || 'node_modules'],
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        ENV_NAME: JSON.stringify(process.env.ENV_NAME),
        API_URL: JSON.stringify(process.env.API_URL),
      },
    }),
  ],
};
