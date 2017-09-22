const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const APP_DIR = path.resolve(__dirname, 'example/src');

const config = {
  entry: {
    app: [
      `${APP_DIR}/index.js`,
      `${APP_DIR}/src/style.scss`,
    ],
  },
  output: {
    path: path.resolve(__dirname, 'example/dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                minimize: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer({ browsers: ['last 2 versions'] })],
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
  ],
};

module.exports = config;
