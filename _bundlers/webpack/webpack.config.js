const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackDashboard = require('webpack-dashboard/plugin');
const config = require('./config');

const dir = path.resolve(`${__dirname}/..`);

// Define environment
const ENV = process.env.NODE_ENV || 'development';
const DASHBOARD = (process.env.npm_lifecycle_event === 'dashboard') ? 1 : 0;

const webpackConfig = {
  entry: [
    `webpack-dev-server/client?http://${config.address}:${config.port}`,
    'webpack/hot/only-dev-server',
    './app/app.js',
  ],
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.less'],
    alias: {
      components: path.resolve(dir, 'app/components'),
    },
  },
  output: {
    path: path.resolve(dir, 'static'),
    filename: 'main.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(ENV),
      },
    }),
  ],
};

if (process.env.npm_package_config_setup === 'react') {
  webpackConfig.entry.unshift('react-hot-loader/patch');
}

if (ENV === 'development') {
  // Define configuration for the devserver
  webpackConfig.devServer = {
    contentBase: path.join(dir, 'static'),
    hot: true,
    port: config.port,
    address: config.address,
  };

  webpackConfig.plugins.push(
    // Enable HMR globally
    new webpack.HotModuleReplacementPlugin(),

    // Prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    new HtmlWebpackPlugin({
      template: path.resolve(dir, 'templates/index.html'),
      minify: { collapseWhitespace: true }
    })
  );

  // Define sourcemap for the development environment
  webpackConfig.devtool = 'cheap-module-eval-source-map';
}

if (DASHBOARD && ENV === 'development') {
  webpackConfig.plugins.unshift(
    new WebpackDashboard({ port: config.dashboardPort })
  );
}

module.exports = webpackConfig;
