# React Skeleton #

## Features ##

- React
- TypeScript
- WebPack v1.x
- LESS
- Bootstrap 3.x
- Styles Hot Loader
- React Hot Loader v3.x
- E2E testing...
- Unit testing...
- Test runner...
- tslint
- markdownlint
- stylelint
- BrowserSync

## Tasks ##

1. Clean Build: `npm run clean`
2. Build Development Version: `npm run build`
3. Build Production Version: `npm run build:prod`
4. Run Development Server: `npm start`

## Bootstrap 3.x ##

1. Install bootstrap: `npm install --save-dev bootstrap`.
2. Create directory `src/bootstrap`.
3. Copy `node_modules/bootstrap/less/bootstrap.less` to `src/bootstrap/bootstrap.less`.
4. Fix all imports in `src/bootstrap/bootstrap.less` from `@import "{name}.less"`.
   to `@import "~bootstrap/less/{name}.less"`.
5. Add import to `src/bootstrap/bootstrap.less` for theme `@import "~bootstrap/less/theme.less"`.
6. Edit `src/bootstrap/bootstrap.less`, for example you could add `src/bootstrap/variables.less`,
   include it, and override variables.
