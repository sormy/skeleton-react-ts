# React Skeleton #

## Features ##

- React
- TypeScript
- WebPack
- BrowserSync
- LESS
- Bootstrap 3.x
- Hot Reload (CSS, LESS, JS, TS, React)
- Source Maps
- tslint
- tslib
- semantic ui

- E2E testing...
- Unit testing...
- Test runner...
- markdownlint
- stylelint
- foundation
- split vendor and app css
- one index.tsx

## Tasks ##

1. Clean Build: `npm run clean`
2. Build Development Version: `npm run build`
3. Build Production Version: `npm run build:prod`
4. Run Development Server: `npm start`

## Bootstrap 3.x ##

1. Install bootstrap: `npm install --save bootstrap`.
2. Create directory `src/bootstrap`.
3. Copy `node_modules/bootstrap/less/bootstrap.less` to `src/bootstrap/bootstrap.less`.
4. Fix all imports in `src/bootstrap/bootstrap.less` from `@import "{name}.less"`.
   to `@import "~bootstrap/less/{name}.less"`.
5. Add import to `src/bootstrap/bootstrap.less` for theme `@import "~bootstrap/less/theme.less"`.
6. Edit `src/bootstrap/bootstrap.less`, for example you could add `src/bootstrap/variables.less`,
   include it, and override variables.
7. Import `src/bootstrap/bootstrap.less` in main file to enable bootstrap.

`src/bootstrap/bootstrap.less` could be used to remove components from library.
`src/bootstrap/*.less` could be used to alter variables or components.

## Semantic UI ##

1. Auto patch Semantic UI in npm `postinstall` stage with `semantic-fix.js`.
2. Install Semantic UI with `npm install --save semantic-ui-less`.
3. Create directory `src/semantic`, `src/semantic/site`.
4. Copy `semantic-ui-less/semantic.less` into `src/semantic/semantic.less`
   and replace all imports to begin with `@import "~semantic-ui-less/...";`.
5. Copy `semantic-ui-less/theme.config.example` into `src/semantic/theme.config`
   and set `@siteFolder   : '../../src/semantic/site';`
   and fix theme import as `@import "~semantic-ui-less/theme.less";`
6. Create `src/semantic/semantic.js` and include all module you need in it
7. Create `src/semantic/site/elements/button.variables` and override `@backgroundColor`
   to test if theme works well.
8. Library suggested autoprefixer settings could be found in file
   `semantic-ui/tasks/config/tasks` by path `settings.prefix.browsers`
   Example: ['last 2 versions', '> 1%', 'opera 12.1', 'bb 10', 'android 4']

src/semantic/semantic.js:

```javascript
import 'semantic-ui-less/definitions/globals/site';

import 'semantic-ui-less/definitions/behaviors/api';
import 'semantic-ui-less/definitions/behaviors/colorize';
import 'semantic-ui-less/definitions/behaviors/form';
import 'semantic-ui-less/definitions/behaviors/state';
import 'semantic-ui-less/definitions/behaviors/visibility';
import 'semantic-ui-less/definitions/behaviors/visit';

import 'semantic-ui-less/definitions/modules/accordion';
import 'semantic-ui-less/definitions/modules/checkbox';
import 'semantic-ui-less/definitions/modules/dimmer';
import 'semantic-ui-less/definitions/modules/dropdown';
import 'semantic-ui-less/definitions/modules/embed';
import 'semantic-ui-less/definitions/modules/modal';
import 'semantic-ui-less/definitions/modules/nag';
import 'semantic-ui-less/definitions/modules/popup';
import 'semantic-ui-less/definitions/modules/progress';
import 'semantic-ui-less/definitions/modules/rating';
import 'semantic-ui-less/definitions/modules/search';
import 'semantic-ui-less/definitions/modules/shape';
import 'semantic-ui-less/definitions/modules/sidebar';
import 'semantic-ui-less/definitions/modules/sticky';
import 'semantic-ui-less/definitions/modules/tab';
import 'semantic-ui-less/definitions/modules/transition';
// video module for some reason is included only in semantic-ui package
// import 'semantic-ui-less/definitions/modules/video';
```

`src/semantic/semantic.less` could be used to remove components from library.
`src/semantic/semantic.js` could be used to remove JS components from library.
`src/semantic/theme.config` could be used to alter default theme per component.
`src/semantic/site/**` could be used to alter theme for any component.
