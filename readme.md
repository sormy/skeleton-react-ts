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
2. Install Semantic UI with `npm install --save semantic-ui`.
3. Skip auto installation with CTRL + C.
4. Create directory `src/semantic`, `src/semantic/site`.
5. Copy `semantic-ui/src/semantic.less` into `src/semantic/semantic.less`
   and replace all imports to begin with `@import "~semantic-ui/src/...";`.
6. Copy `semantic-ui/src/theme.config.example` into `src/semantic/theme.config`
   and set `@siteFolder   : '../../../src/semantic/site';`
   and fix theme import as `@import "~semantic-ui/src/theme.less";`
7. Create `src/semantic/site/elements/button.variables` and override `@backgroundColor`
   to test if theme works well.

`src/semantic/semantic.less` could be used to remove components from library.
`src/semantic/theme.config` could be used to alter default theme per component.
`src/semantic/site/**` could be used to alter theme for any component.
