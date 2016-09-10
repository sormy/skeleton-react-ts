var browserSync = require('browser-sync');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var webpackConfig = require('./webpack.config.js');
var webpackInstance = webpack(webpackConfig);

browserSync({
  online: false,
  open: false,
  port: 3000,
  // ghostMode: false,
  logConnections: true,
  server: {
    baseDir: '.',
    middleware: [
      webpackDevMiddleware(webpackInstance, webpackConfig.devServer),
      webpackHotMiddleware(webpackInstance)
    ]
  }
});
