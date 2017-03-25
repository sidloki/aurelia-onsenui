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

Load the plugin inside your `main.js` file:

```javascript
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
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

### Navigator

Add the `ons-navigator` to a template (i.e. `app.html`):

```html
<template>
  <ons-navigator id="myNavigator" page="./start-page"></ons-navigator>
</template>
```

Create the `start-page` view and view-model:

```html
<template>
  <ons-page>
    <ons-toolbar>
      <div class="center">${title}</div>
    </ons-toolbar>
    <div style="text-align: center;">
      <p>Hello world!</p>
      <p style="margin-top: 30px;">
        <ons-button click.trigger="pushPage()">Push page</ons-button>
      </p>
    </div>
  </ons-page>
</template>
```

```javascript
export class StartPage {
  constructor(router) {
    this.title = 'Start page';
  }
  attached() {
    this.navigator = document.getElementById('myNavigator');
  }
  pushPage() {
    // onsenui push options
    let options = {
      data: { counter: 0 }
    }
    this.navigator.pushPage('./other-page', options);
  }
}
```

Create the `other-page` view and view-model:

```html
<template>
  <ons-page>
    <ons-toolbar>
      <div class="left">
        <ons-back-button>Back</ons-back-button>
      </div>
      <div class="center">${title}</div>
    </ons-toolbar>
    <div style="text-align: center; margin: 8px;">
      <p>You have pushed ${counter} pages!</p>
      <div style="margin-top: 30px;">
        <ons-button modifier="large" click.trigger="pushPageAgain()">Push more</ons-button>
        <ons-button modifier="large--quiet" click.trigger="popPage()" style="padding-top: 4px;">Pop page</ons-button>
      </div>
    </div>
  </ons-page>
</template>
```

```javascript
export class OtherPage {
  constructor(router) {
    this.title = 'Another page';
  }
  attached() {
    this.navigator = document.getElementById('myNavigator');
  }
  activate(data) {
    this.counter = data.counter + 1;
  }
  pushPageAgain() {
    let options = {
      data: { counter: this.counter }
    }
    this.navigator.pushPage('./other-page', options);
  }
  popPage() {
    this.navigator.popPage();
  }
}
```

It's also possible to use pages without a view-model:

```javascript
...
  pushPage() {
    this.navigator.pushPage('./page-without-view-model.html', options);
  }
```

### Tabbar

Add the `ons-tabbar` and the `ons-tab` components to a template:

```html
<template>
  <ons-page>
    <ons-toolbar>
      <div class="center">Page with Tabs</div>
    </ons-toolbar>
    <ons-tabbar>
      <ons-tab label="Tab 1" page="./tab1.html" active>
      </ons-tab>
      <ons-tab label="Tab 2" page="./tab2.html">
      </ons-tab>
    </ons-tabbar>
  </ons-page>
</template>
```

Create the `tab1.html`:

```html
<template>
  <ons-page>
    <p style="text-align: center;">
      This is the first tab.
    </p>
  </ons-page>
</template>
```

Create the `tab2.html`:

```html
<template>
  <ons-page>
    <p style="text-align: center;">
      This is the second tab.
    </p>
  </ons-page>
</template>
```

Of course you can also use views with a view-model for tabs:

```html
<template>
  <ons-page>
    <ons-toolbar>
      <div class="center">Page with Tabs</div>
    </ons-toolbar>
    <ons-tabbar>
      <ons-tab label="Tab 1" page="./tab1" active>
      </ons-tab>
      <ons-tab label="Tab 2" page="./tab2">
      </ons-tab>
    </ons-tabbar>
  </ons-page>
</template>
```

### Input

```html
<template>
  <ons-page>
    ...
    <ons-input type="text" placeholder="Page title" modifier="underbar" float value.bind="title"></ons-input>
    ...
  </ons-page>
</template>
```



## License ##

Released under the [MIT license][license].


[license]: ./LICENSE
