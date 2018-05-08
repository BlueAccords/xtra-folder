// primary webpack config, will pull in parts from other files depending on if
// dev or production
/* === dont forget to import scss to main.js file === */
/* ===> import './main.scss'; <=== */

require('babel-polyfill');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/index.jsx'],

  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    // publicPath: "/dist"
  },

  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
      },

      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  devServer: {
    contentBase: "./dist",
    historyApiFallback: true,
    host: process.env.HOST,
    port: process.env.PORT,
    open: true, // open in browser
    overlay: {
      errors: true,
      warnings: true
    }, // show fullscreen error in browser on error
    proxy: {
      "/api/**" : {
        target: "http://localhost:3000",
        secure: false,
        changeOrigin: true
      }
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack demo",
      template: './src/index.html',
      filename: 'index.html'
    }),
    new ExtractTextPlugin('css/styles.css'),
  ]
};