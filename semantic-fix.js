var fs = require('fs');

// relocate default config
fs.writeFileSync(
  'node_modules/semantic-ui/src/theme.config',
  "@import '../../../src/semantic/theme.config.less';\n",
  'utf8'
);
