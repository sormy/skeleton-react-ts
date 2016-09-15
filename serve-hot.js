var browserSync = require('browser-sync');

var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var webpackConfig = require('./webpack.config');
var webpackInstance = webpack(webpackConfig);

var bsConfig = require('./serve.config');

browserSync(Object.assign({}, bsConfig, {
  server: {
    baseDir: '.',
    middleware: [
      webpackDevMiddleware(webpackInstance, webpackConfig.devServer),
      webpackHotMiddleware(webpackInstance)
    ]
  }
}));
