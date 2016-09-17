var path = require('path');

var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin');
var FixDefaultImportPlugin = require('webpack-fix-default-import-plugin');

var isWebpack = /^webpack(\.js)?$/.test(path.basename(process.argv[1]));
var isDevServer = path.basename(process.argv[1]) === 'serve-hot.js';
var isDev = isDevServer || (isWebpack && process.argv[2] == '-d');
var isProd = !isDev;

var cssLoader = isDevServer
  ? ['style-loader?sourceMap', 'css-loader?sourceMap', 'postcss-loader?sourceMap'].join('!')
  : ExtractTextPlugin.extract(['css-loader?sourceMap', 'postcss-loader?sourceMap']);

var lessLoader = isDevServer
  ? ['style-loader?sourceMap', 'css-loader?sourceMap', 'postcss-loader?sourceMap', 'less-loader?sourceMap'].join('!')
  : ExtractTextPlugin.extract(['css-loader?sourceMap', 'postcss-loader?sourceMap', 'less-loader?sourceMap']);

var sassLoader = isDevServer
  ? ['style-loader?sourceMap', 'css-loader?sourceMap', 'postcss-loader?sourceMap', 'sass-loader?sourceMap'].join('!')
  : ExtractTextPlugin.extract(['css-loader?sourceMap', 'postcss-loader?sourceMap', 'sass-loader?sourceMap']);

var tsLoader = isDevServer ? ['react-hot-loader/webpack', 'ts-loader'] : ['ts-loader'];

// autoprefixer configuration based on Bootstrap 3.x defaults
var autoprefixerBrowsers = require('bootstrap/grunt/configBridge.json').config.autoprefixerBrowsers;

// autoprefixer configuration based on Bootstrap 4.x defaults
// var autoprefixerBrowsers = require('bootstrap/grunt/postcss').autoprefixer.browsers;

// autoprefixer configuration based on Semantic UI 2.x defaults
// var autoprefixerBrowsers = ['last 2 versions', '> 1%', 'opera 12.1', 'bb 10', 'android 4'];

var config = {
  entry: {
    app: './src/index'
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js?[hash]',
    devtoolModuleFilenameTemplate: function (info) {
      var relPath = info.resourcePath
        .replace(/^.*(~|node_modules)/, '~')
        .replace(/^(webpack:\/\/\/)+/, '')
        .replace(/^\.\//, '')
        .replace(/^\(webpack\)-/, '(webpack)/')
        .replace(/^webpack\/bootstrap/, '(webpack)/bootstrap');
      return 'webpack:///' + relPath + '?' + info.hash;
    }
  },
  devtool: isDevServer ? 'eval' : 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.ts', '.tsx'],
  },
  module: {
    preLoaders: [
      {
        test: /\.tsx?$/,
        loader: 'tslint-loader',
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
        test: /\.css$/,
        loader: cssLoader
      },
      {
        test: /\.less$/,
        loader: lessLoader
      },
      {
        test: /\.(scss|sass)$/,
        loader: sassLoader
      },
      {
        test: /\.(png|jpg|woff|woff2|eot|ttf|svg)(\?.*)?$/,
        loader: 'file-loader?name=[path]/[name].[ext]?[hash]'
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
      $: 'jquery',                  // well known global alias for jquery
      jQuery: 'jquery',             // bootstrap 3.x requires
      'window.Tether': 'tether'     // bootstrap 4.x requires
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),
    new FixDefaultImportPlugin(),
    new BellOnBundlerErrorPlugin()
  ],
  tslint: {
    emitErrors: true,
    failOnHint: true
  },
  postcss: function () {
    return [
      require('postcss-flexbugs-fixes'),
      require('autoprefixer')({ browsers: autoprefixerBrowsers })
    ];
  }
};

if (!isDevServer) {
  var vendorChunkPlugin =
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        var relPath = path.relative(__dirname, module.userRequest).replace(/\\/g, '/');
        return /^(node_modules|src\/(bootstrap4?|semantic))\//.test(relPath);
      }
    });

  var cssLibChunkPlugin =
    new webpack.optimize.CommonsChunkPlugin({
      name: 'bootstrap',  // or semantic
      chunks: ['vendor'],
      minChunks: function(module) {
        var relPath = path.relative(__dirname, module.userRequest).replace(/\\/g, '/');
        return /^((src|node_modules)\/(bootstrap4?|semantic))\//.test(relPath);
      }
    });

  var extractTextPlugin = new ExtractTextPlugin('[name].css?[hash]');

  if (isProd) {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        output: { comments: false }
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      vendorChunkPlugin,
      extractTextPlugin
    );
  } else {
    config.plugins.push(
      vendorChunkPlugin,
      cssLibChunkPlugin,
      extractTextPlugin
    );
  }
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
