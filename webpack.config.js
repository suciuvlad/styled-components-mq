const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    'styled-components-mq': path.resolve(__dirname, './src/index.js'),
    'styled-components-mq.min': path.resolve(__dirname, './src/index.js')
  },

  devtool: 'source-map',

  externals: [
    'styled-components'
  ],

  output: {
    path: path.resolve(__dirname, './build'),
    libraryTarget: 'umd',
    filename: '[name].js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      sourcemap: true,
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ]
};
