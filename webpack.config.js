var path = require('path');

var webpack = require('webpack');

var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin');
var SourceMapFixPlugin = require('webpack-source-map-fix-plugin');

var isDevServer = path.basename(process.argv[1]) === 'server.js';
var isDev = isDevServer
  || (path.basename(process.argv[1]) == 'webpack' && process.argv[2] == '-d');
var isProd = !isDev;

var lessLoader = isDevServer
  ? ['style', 'css?sourceMap', 'less?sourceMap'].join('!')
  : ExtractTextPlugin.extract(['css?sourceMap', 'less?sourceMap']);

var tsLoader = isDevServer ? ['react-hot-loader/webpack', 'ts'] : ['ts'];

// var autoprefixerBrowsers = require('bootstrap/grunt/configBridge.json').config.autoprefixerBrowsers;
var autoprefixerBrowsers = ['last 2 versions', '> 1%', 'opera 12.1', 'bb 10', 'android 4'];

var config = {
  entry: {
    app: './src/index'
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
    devtoolModuleFilenameTemplate: function (info) {
      return info.resourcePath
        .replace(/^(webpack:\/\/\/)*/, '')
        .replace(/^(webpack)-/, '(webpack)/')
        .replace(/^\.\//, '')
        .replace(/^webpack\/bootstrap/, '(webpack)/bootstrap')
        .replace(/^/, 'webpack:///');
    }
  },
  devtool: isDevServer ? 'eval' : 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.ts', '.tsx']
  },
  module: {
    preLoaders: [
      {
        test: /\.tsx?$/,
        loader: 'tslint',
        include: path.resolve('src')
      },
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        include: path.resolve('node_modules')
      }
    ],
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: tsLoader,
        include: path.resolve('src')
      },
      {
        test: /\.less$/,
        loader: lessLoader
      },
      {
        test: /\.(png|jpg|woff|woff2|eot|ttf|svg)(\?.*)?$/,
        loader: 'file?name=[path]/[name].[ext]?[hash]'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(isProd ? 'production' : 'development')
      }
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),
    new BellOnBundlerErrorPlugin()
  ],
  tslint: {
    emitErrors: true,
    failOnHint: true
  },
  lessLoader: {
    lessPlugins: [
      new LessPluginAutoPrefix({ browsers: autoprefixerBrowsers })
    ]
  }
};

if (!isDevServer) {
  if (isProd) {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.DedupePlugin()
    );
  }

  config.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: function (module) {
        return typeof module.userRequest === 'string'
          ? module.userRequest.indexOf('/node_modules/') !== -1
          : false;
      }
    }),
    new ExtractTextPlugin('[name].css')
  );
} else {
  config.entry = [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './src/index-hot'
  ];

  config.devServer = {
    stats: {
      chunkModules: false,
      assets: false,
      colors: true
    }
  };

  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );
}

module.exports = config;
