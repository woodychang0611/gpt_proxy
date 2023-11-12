//webpack.config.js
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
    clean: true,
  },
  devServer: {
    hot: true,
    host: "localhost",
    port: 8000
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'public' }
      ]
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /(node_modules|bower_components)/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(ico|svg)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'file-loader'
        }
      }
    ]
  }
};