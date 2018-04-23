// primary webpack config, will pull in parts from other files depending on if
// dev or production

const merge = require('webpack-merge'); // used to merge webpack parts
const HtmlWebpackPlugin = require('html-webpack-plugin');

// additional configuration in external file
const parts = require('./webpack.parts');

// config common to both dev and prod
const commonConfig = merge([
  {
    entry: [
      './src/index.js'
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Webpack demo",
        template: './src/index.html',
        filename: 'index.html'
      }),
    ],
    output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: 'bundle.js'
    },
  },
]);

const productionConfig = merge([]);

const developmentConfig = merge([
  parts.devServer({
    // override host/port here
    host: process.env.HOST,
    port: process.env.PORT,
    proxy: { // change this for production to point to the actual website url
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
    }
  })
]);

module.exports = (mode) => {
  if(mode === 'production') {
    return merge(commonConfig, productionConfig, { mode });
  } else {
    return merge(commonConfig, developmentConfig, { mode });
  }

}


/**
module.exports = {
  entry: [
    './src/index.js'
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    // stats: "errors-only", // display errors only to reduce output amount in terminal
    overlay: true,
    contentBase: './dist', // used if you manually create index.html. Alternatively can use html plugin to create one automatically
    host: process.env.HOST, // default to localhost
    port: process.env.PORT, // default to 8080
    open: true, // open page in browser
    proxy: { // change this for production to point to the actual website url
      '/api': {
          target: 'http://localhost:3000',
          secure: false
      }
  }
  }
}
*/