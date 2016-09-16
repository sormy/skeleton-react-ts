var path = require('path');

var webpack = require('webpack');

var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin');
var FixDefaultImportPlugin = require('webpack-fix-default-import-plugin');

var isWebpack = /^webpack(\.js)?$/.test(path.basename(process.argv[1]));
var isDevServer = path.basename(process.argv[1]) === 'serve-hot.js';
var isDev = isDevServer || (isWebpack && process.argv[2] == '-d');
var isProd = !isDev;

var lessLoader = isDevServer
  ? ['style?sourceMap', 'css?sourceMap', 'less?sourceMap'].join('!')
  : ExtractTextPlugin.extract(['css?sourceMap', 'less?sourceMap']);

var tsLoader = isDevServer ? ['react-hot-loader/webpack', 'ts'] : ['ts'];

// autoprefixer configuration based on Twitter Bootstrap toolchain
var autoprefixerBrowsers = require('bootstrap/grunt/configBridge.json').config.autoprefixerBrowsers;

// autoprefixer configuration based on Semantic UI toolchain
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
    alias: {
      jquery: 'jquery/src/jquery'
    }
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
      jQuery: 'jquery'
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
      minChunks: function (module) {
        var relPath = path.relative(__dirname, module.userRequest).replace(/\\/g, '/');
        return /^(node_modules|src\/(bootstrap|semantic))\//.test(relPath);
      }
    }),
    new ExtractTextPlugin('[name].css?[hash]')
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
