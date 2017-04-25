# Aurelia bindings for Onsen UI

## Installation

```shell
yarn add aurelia-onsenui
```

Or

```shell
npm install aurelia-onsenui --save
```

### Aurelia CLI

Add the following to the `dependencies` section of your `aurelia.json` file:

```
{
  "name": "aurelia-onsenui",
  "main": "index.js",
  "path": "../node_modules/aurelia-onsenui/dist/amd"
},
{
  "name": "onsenui",
  "main": "js/onsenui.js",
  "path": "../node_modules/onsenui"
}
```

## Configuration

Load the plugin inside your `main.js` file.

> With version 0.2.0 a custom router is used to work around
> this [issue](https://github.com/aurelia/router/issues/436), so ensure that
> you don't use the standard configuration.

```javascript
export function configure(aurelia) {
  aurelia.use
    .basicConfiguration()
    .history()
    .plugin('aurelia-onsenui')
    ...;

  ...
}
```

Add the Onsen UI CSS files to your `index.html`:

```html
<html>
  <head>
    ...
    <link rel="stylesheet" type="text/css" href="node_modules/onsenui/css/onsenui.css">
    <link rel="stylesheet" type="text/css" href="node_modules/onsenui/css/onsen-css-components.css">
    ...
  </head>
  ...
</html>
```

## Usage

See the [kitchen sink](https://github.com/sidloki/aurelia-onsenui-kitchensink).

## License ##

Released under the [MIT license][license].


[license]: ./LICENSE
