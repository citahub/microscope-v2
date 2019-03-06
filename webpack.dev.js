const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, './public'),
    port: 3000,
    inline: true
  }
})
