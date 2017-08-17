const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');

// Postcss
const postcssNext = require('postcss-cssnext');
const postcssLost = require('lost')();
const postcssReporter = require('postcss-reporter')();

// Analyzer
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const dir = path.resolve(`${__dirname}/..`);

// Define environment
const ENV = 'production';
const SOURCEMAP = false;

const buildDirectoryName = 'dist';
const distDirectory = path.resolve(dir, buildDirectoryName);

// Export for the env variable
module.exports = env => {
  let stats = false;
  if (typeof env !== 'undefined') {
    stats = true;
  }

  const webpackSettings = {};
  webpackSettings.module = {};

  webpackSettings.entry = {
    app: './app/app.js',
  };

  webpackSettings.output = {
    path: distDirectory,
    filename: 'main.bundle.js',
    publicPath: '/',
  };

  webpackSettings.resolve = {
    extensions: ['.jsx', '.js', '.json', '.scss'],
    alias: {
      components: path.resolve(dir, 'app/components'),
      style: path.resolve(dir, 'app/style'),
      root: path.resolve(dir, 'app'), // Only use this alias to import necessery files
    },
  };

  webpackSettings.module.rules = [
    {
      test: /\.jsx?$/,
      use: 'babel-loader',
      exclude: /node_modules/,
    },
    {
      test: /\.(css|scss)$/,
      exclude: [path.resolve(__dirname, 'src/components')],
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          `css-loader?modules&importLoaders=1&localIdentName=[path][name]_[local]--[hash:base64:5]&sourceMap=${SOURCEMAP}`,
          'postcss-loader',
          `sass-loader?sourceMap=${SOURCEMAP}`,
        ].join('!'),
      }),
    },
  ];

  const globals = {
    __DEV__: false,
    'process.env': {
      NODE_ENV: JSON.stringify(ENV),
    },
  };

  webpackSettings.plugins = [
    new webpack.DefinePlugin(globals),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [postcssNext, postcssLost, postcssReporter],
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(dir, 'templates/index.html'),
      minify: { collapseWhitespace: true },
    }),
  ];

  if (stats) {
    webpackSettings.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'bundle-analytics.html',
      })
    );
  }

  if (process.env.npm_package_config_setup === 'vue') {
    webpackSettings.module.rules.unshift({
      test: /\.vue$/,
      loader: 'vue-loader',
      exclude: '/node_modules/',
    });
  }

  // Uglify the application
  webpackSettings.plugins.push(
    // Create a sepperate style.css file
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true,
      disable: false,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new UglifyJSPlugin({
      comments: false,
      mangle: true,
      compress: {
        drop_console: true,
        warnings: false,
        unused: true,
        dead_code: true,
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin()
  );

  if (process.env.npm_package_config_pwa === 'true') {
    webpackSettings.plugins.push(
      new CopyWebpackPlugin([
        {
          from: {
            glob: `${dir}/pwa/*`,
            dot: false,
          },
          ignore: '**/*.js',
          flatten: true,
        },
        {
          from: `${dir}/pwa/service-worker.js`,
          transform: content => content.toString().replace('_USECACHE_', true),
        },
      ])
    );
  }

  return webpackSettings;
};
