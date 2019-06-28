const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
var poststylus = require('poststylus')

module.exports = {
  entry: {
    bundle: path.join(path.resolve(__dirname), 'src/index.tsx')
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx$/,
        use: 'ts-loader'
      },
      {
        exclude: /node_modules/,
        test: /\.ts$/,
        use: 'ts-loader'
      },
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: ['babel-loader']
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'stylus-loader',
              options: {
                minimize: true
              }
            }
          ]
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: ['node_modules']
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      test: /\.styl$/,
      options: {
        stylus: {
          use: [poststylus(['autoprefixer'])]
        }
      }
    }),
    new ExtractTextPlugin({
      filename: 'bundle.css',
      allChunks: true
    })
  ]
}
