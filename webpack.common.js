const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

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
        test: /\.jsx$/,
        use: ['babel-loader']
      },
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: ['babel-loader']
      },
      {
        test: /\.(styl|css)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'stylus-loader'
            }
          ]
        })
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: ['ui', 'node_modules']
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'bundle.css',
      allChunks: true
    })
  ],
  output: {
    path: path.join(path.resolve(__dirname), './portal/'),
    filename: '[name].js'
  }
}
