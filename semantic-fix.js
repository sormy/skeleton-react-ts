var fs = require('fs');

// relocate default config
fs.writeFileSync(
  'node_modules/semantic-ui/src/theme.config',
  "@import '../../../src/semantic/theme.config';\n",
  'utf8'
);

// fix well known bug with default distribution
fixFontPath('node_modules/semantic-ui/src/themes/default/globals/site.variables');
fixFontPath('node_modules/semantic-ui/src/themes/flat/globals/site.variables');
fixFontPath('node_modules/semantic-ui/src/themes/material/globals/site.variables');

function fixFontPath(filename) {
  var content = fs.readFileSync(filename, 'utf8');
  var newContent = content.replace(
    "@fontPath  : '../../themes/",
    "@fontPath  : '../../../themes/"
  );
  fs.writeFileSync(filename, newContent, 'utf8');
}
