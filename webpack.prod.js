const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'argv.env': JSON.stringify('production')
    }),
    new HtmlWebpackPlugin({
      template: 'portal/lib/index.html',
      minify: true,
      hash: true,
      filename: 'index.html'
    }),
    new BundleAnalyzerPlugin()
  ]
})
