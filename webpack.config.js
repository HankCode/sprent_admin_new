const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const purgecss = require('./postcss.config');

const config = {
  devtool: "source-map",
  entry: [
    'react-hot-loader/patch',
    './src/index.js'
  ],
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('tailwindcss')('./node_modules/tailwindcss/defaultConfig.js'),
                require('autoprefixer'),
                //purgecss,
                require('postcss-calc')(),
                require('postcss-nested')(),
              ],
            },
          }
        ],
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [{
          loader: 'file-loader',
          options: {
            jsx: true,
          },
        }],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader'
      },
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      process: 'process/browser',
      stream: "stream-browserify",
      zlib: "browserify-zlib"
    }

  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    contentBase: './public',
    historyApiFallback: true,
    disableHostCheck: true,
    host: '0.0.0.0',
    proxy: {
      "/__": {
        "target": "http://localhost:5000"
      },
      "/saveHousingRequest": {
        "target": "http://localhost:5000"
      },
      "/saveLandlordRequest": {
        "target": "http://localhost:5000"
      }
    },
  },
  plugins: [
    // new CopyPlugin([{ from: 'node_modules/@snajd/trygga-hjalpen-tailwind/assets', to: 'public' }]),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
  
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),

  ]

};

module.exports = config;
