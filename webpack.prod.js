const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'argv.env': JSON.stringify('production')
    }),
    new CopyPlugin([{ from: 'public/' }]),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new SWPrecacheWebpackPlugin({
      cacheId: 'microscope-2.0.0',
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      minify: true,
      navigateFallback: 'index.html',
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      minify: true,
      hash: true,
      filename: 'index.html'
    })//,
    // new BundleAnalyzerPlugin()
  ],
  output: {
    path: path.join(path.resolve(__dirname), './build/'),
    filename: '[name].js'
  }
})
