const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackDashboard = require('webpack-dashboard/plugin');

// Postcss
const postcssNext = require('postcss-cssnext');
const postcssLost = require('lost')();
const postcssReporter = require('postcss-reporter')();

// Custom configuration
const config = require('./config');

const dir = path.resolve(`${__dirname}/..`);

// Define environment
const ENV = process.env.NODE_ENV || 'development';
const SOURCEMAP = (ENV === 'development');
const DASHBOARD = (process.env.npm_lifecycle_event === 'dashboard') ? 1 : 0;

const webpackConfig = {
  entry: [
    `webpack-dev-server/client?http://${config.address}:${config.port}`,
    'webpack/hot/only-dev-server',
    './app/app.js',
  ],
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.scss'],
    alias: {
      components: path.resolve(dir, 'app/components'),
      style: path.resolve(dir, 'app/style'),
    },
  },
  output: {
    path: path.resolve(dir, 'static'),
    filename: 'main.bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)$/,
        exclude: [path.resolve(__dirname, 'src/components')],
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            `css-loader?modules&importLoaders=1&localIdentName=[path][name]_[local]--[hash:base64:5]&sourceMap=${SOURCEMAP}`,
            'postcss-loader',
            `sass-loader?sourceMap=${SOURCEMAP}`,
          ].join('!'),
        }),
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [
          postcssNext,
          postcssLost,
          postcssReporter,
        ],
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(ENV),
      },
    }),
  ],
};

if (process.env.npm_package_config_setup === 'react' || process.env.npm_package_config_setup === 'react-router') {
  webpackConfig.entry.unshift('react-hot-loader/patch');
}

if (process.env.npm_package_config_setup === 'vue') {
  webpackConfig.module.rules.unshift({
      test: /\.vue$/,
      loader: 'vue-loader',
      exclude: '/node_modules/',
    });
}

if (ENV === 'development') {
  // Define configuration for the devserver
  webpackConfig.devServer = {
    contentBase: path.join(dir, 'static'),
    hot: true,
    port: config.port,
    host: config.address,
    historyApiFallback: true,
    public: `localhost:${config.port}`,
  };

  webpackConfig.plugins.push(
    // Create a sepperate style.css file
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true,
      disable: (ENV === 'development'),
    }),
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
