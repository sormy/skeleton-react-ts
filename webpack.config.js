var path = require('path');
var webpack = require('webpack');

var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var isDevServer = path.basename(process.argv[1]) == 'webpack-dev-server';
var isProd = path.basename(process.argv[1]) == 'webpack' && process.argv[2] == '-p';
var isDev = isDevServer || !isProd;

var lessLoader = isDevServer
  ? ['style', 'css?sourceMap', 'less?sourceMap'].join('!')
  : ExtractTextPlugin.extract(['css?sourceMap', 'less?sourceMap']);

var tsLoader = isDevServer ? ['react-hot-loader/webpack', 'ts'] : ['ts'];

var config = {
  entry: [
    './src/index'
  ],
  output: {
    path: path.resolve('dist'),
    filename: 'app.js'
  },
  devtool: isDevServer ? 'eval' : 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.(tsx?|jsx?)$/,
        loaders: tsLoader,
        include: path.resolve('src')
      },
      {
        test: /\.less$/,
        loader: lessLoader
      },
      {
        test: /\/fonts\/.*\.(png|jpg|woff|woff2|eot|ttf|svg)(\?.*)?$/,
        loader: 'file?name=fonts/[name].[ext]?[hash]'
      }
    ]
  },
  plugins: [
  ],
  lessLoader: {
    lessPlugins: [
      new LessPluginAutoPrefix({ browsers: '> 0%' })
    ]
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  }
};

if (!isDevServer) {
  config.plugins.push(new ExtractTextPlugin('app.css'));
}

if (isDevServer) {
  config.output.publicPath = '/dist/';

  config.devServer = {
    port: 9000,
    hot: true,
    historyApiFallback: true,
    publicPath: config.output.publicPath
  };

  config.entry = [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:' + config.devServer.port,
    'webpack/hot/only-dev-server',
    './src/index-hot'
  ];

  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
