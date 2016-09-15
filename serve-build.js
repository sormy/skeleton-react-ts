var browserSync = require('browser-sync');

var bsConfig = require('./serve.config');

browserSync(Object.assign({}, bsConfig, {
  server: {
    baseDir: 'dist',
  }
}));
