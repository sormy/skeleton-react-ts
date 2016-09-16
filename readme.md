# React TypeScript Skeleton #

## Installation ##

```shell
npm install
```

## Tasks ##

1. `npm run clean`: clean build `./dist`
2. `npm run build` or `npm run build:dev`: build debug development version in `./dist`
3. `npm run build:prod`: build debug minified production version in `./dist`
4. `npm run serve` or `npm run serve:dev`: build debug development version in `./dist` and serve it
5. `npm run serve:prod`: build debug minified production version in `./dist` and serve it
6. `npm run serve:hot` or `npm start`: serve debug development version with css/js hot reload

## IDE ##

Recommended IDE is Visual Studio Code: <https://code.visualstudio.com/>

Required plugin set:

- EditorConfig for VS Code
- TSLint
- stylelint
- markdownlint

## Features ##

- React
- TypeScript
- TypeScript Runtime
- WebPack
- BrowserSync
- LESS
- Bootstrap 3.x
- css/js/react hot reload
- debug builds with source maps
- separated vendor/app js and css code
- automatic asset bundling
- automatic source map fixer
- tslint

TODO:

- markdownlint
- stylelint
- auto tests!!!
- inline styles in react with autoprefixing
- react router
- mobx or redux
- inline small assets into css
- es-next decorators
- es-next class properties
- foundation framework
- scss example
- stylys example
- postcss example

## CSS Frameworks ##

- Twitter Bootstrap 3.3 (LESS) (DEFAULT)
- Semantic UI 2.2 (LESS)

### Twitter Bootstrap ###

Library configuration is located here:

- `src/bootstrap/bootstrap.js`
- `src/bootstrap/bootstrap.less`

You could alter `bootstrap.js` and `bootstrap.css` to disable not needed components.

You could include overrides into `bootstrap.less` to tune theme.

To activate library you need to import`bootstrap.js` and `bootstrap.css` in main file.

### Semantic UI ###

Library configuration is located here:

- `src/semantic/semantic.js`
- `src/semantic/semantic.less`

You could alter `semantic.js` and `semantic.css` to disable not needed components.

Theme configuration is located here: `src/semantic/theme.config`

Site theme is located here: `src/semantic/site`

Please follow official guidelines to override styles.

As example you could refer to `node_modules/semantic-ui/src/_site` structure and official
documentation <http://learnsemantic.com/developing/customizing.html>.

To activate library you need to import`semantic.js` and `semantic.css` in main file.
