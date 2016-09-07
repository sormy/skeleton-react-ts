var path = require('path');
var webpack = require('webpack');

var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var isDevServer = path.basename(process.argv[1]) == 'webpack-dev-server';
var isProd = path.basename(process.argv[1]) == 'webpack' && process.argv[2] == '-p';
var isDev = isDevServer || !isProd;

var lessLoader = isProd
  ? ExtractTextPlugin.extract(['css?sourceMap', 'less?sourceMap'])
  : ['style', 'css?sourceMap', 'less?sourceMap'].join('!');

var config = {
  entry: [
    './src/index.tsx'
  ],
  output: {
    path: 'dist',
    filename: 'app.js',
    publicPath: '/dist/'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'source-map'
      },
      {
        test: /\.tsx?$/,
        loader: 'ts'
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
  },
  devServer: {
    port: 9000,
    inline: true
  }
};

if (isProd) {
  config.plugins.push(new ExtractTextPlugin('[name].css'));
}

module.exports = config;
