let config = require('./webpack.config.js')
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')


config.plugins = [
  ...config.plugins,
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    comments: false, // remove comments
    compress: {
       unused: true,
       dead_code: true, // big one--strip code that will never execute
       warnings: false, // good for prod apps so users can't peek behind curtain
       drop_debugger: true,
       conditionals: true,
       evaluate: true,
       drop_console: true, // strips console statements
       sequences: true,
       booleans: true,
     }
   }),
   new CompressionPlugin({
     asset: '[path].gz[query]',
     algorithm: 'gzip',
     test: /\.(js|html)$/,
     threshold: 10240,
     minRatio: 0.8
   }),
]

module.exports = config
