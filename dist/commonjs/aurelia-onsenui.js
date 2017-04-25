'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnsTabbar = exports.OnsTab = exports.OnsSwitch = exports.OnsSelect = exports.OnsRange = exports.OnsNavigator = exports.OnsInput = exports.OnsBackButton = undefined;

var _onsBackButton = require('./ons-back-button');

Object.defineProperty(exports, 'OnsBackButton', {
  enumerable: true,
  get: function get() {
    return _onsBackButton.OnsBackButton;
  }
});

var _onsInput = require('./ons-input');

Object.defineProperty(exports, 'OnsInput', {
  enumerable: true,
  get: function get() {
    return _onsInput.OnsInput;
  }
});

var _onsNavigator = require('./ons-navigator');

Object.defineProperty(exports, 'OnsNavigator', {
  enumerable: true,
  get: function get() {
    return _onsNavigator.OnsNavigator;
  }
});

var _onsRange = require('./ons-range');

Object.defineProperty(exports, 'OnsRange', {
  enumerable: true,
  get: function get() {
    return _onsRange.OnsRange;
  }
});

var _onsSelect = require('./ons-select');

Object.defineProperty(exports, 'OnsSelect', {
  enumerable: true,
  get: function get() {
    return _onsSelect.OnsSelect;
  }
});

var _onsSwitch = require('./ons-switch');

Object.defineProperty(exports, 'OnsSwitch', {
  enumerable: true,
  get: function get() {
    return _onsSwitch.OnsSwitch;
  }
});

var _onsTab = require('./ons-tab');

Object.defineProperty(exports, 'OnsTab', {
  enumerable: true,
  get: function get() {
    return _onsTab.OnsTab;
  }
});

var _onsTabbar = require('./ons-tabbar');

Object.defineProperty(exports, 'OnsTabbar', {
  enumerable: true,
  get: function get() {
    return _onsTabbar.OnsTabbar;
  }
});
exports.configure = configure;

var _aureliaPal = require('aurelia-pal');

var _aureliaHistoryBrowser = require('aurelia-history-browser');

var _onsRouter = require('./ons-router');

var _aureliaRouter = require('aurelia-router');

var _aureliaTemplatingRouter = require('aurelia-templating-router');

var _aureliaRouteRecognizer = require('aurelia-route-recognizer');

_aureliaRouter.Router.isNavigatingFirst;
_aureliaRouter.Router.isNavigatingNew;
_aureliaRouter.Router.isNavigatingForward;
_aureliaRouter.Router.isNavigatingBack;
_aureliaRouter.Router.isNavigatingRefresh;
_aureliaRouter.Router.currentNavigationTracker;

_aureliaRouter.Router.prototype.reset = function () {
  var _this = this;

  this.viewPorts = {};
  this.routes = [];
  this.baseUrl = '';
  this.isConfigured = false;
  this.isNavigating = false;
  this.isExplicitNavigation = false;
  this.isExplicitNavigationBack = false;
  this.isNavigatingFirst = false;
  this.isNavigatingNew = false;
  this.isNavigatingRefresh = false;
  this.isNavigatingForward = false;
  this.isNavigatingBack = false;
  this.navigation = [];
  this.currentInstruction = null;
  this._fallbackOrder = 100;
  this._recognizer = new _aureliaRouteRecognizer.RouteRecognizer();
  this._childRecognizer = new _aureliaRouteRecognizer.RouteRecognizer();
  this._configuredPromise = new Promise(function (resolve) {
    _this._resolveConfiguredPromise = resolve;
  });
};

_aureliaHistoryBrowser.BrowserHistory.prototype.setState = function (key, value) {
  var state = Object.assign({}, this.history.state);
  state[key] = value;
  this.history.replaceState(state, null, null);
};

_aureliaHistoryBrowser.BrowserHistory.prototype.getState = function (key) {
  var state = Object.assign({}, this.history.state);
  return state[key];
};

function configure(config) {
  config.singleton(_aureliaRouter.RouteLoader, _aureliaTemplatingRouter.TemplatingRouteLoader).singleton(_aureliaRouter.Router, _onsRouter.OnsRouter).globalResources(['./ons-back-button', './ons-input', './ons-navigator', './ons-range', './ons-select', './ons-switch', './ons-tab', './ons-tabbar', _aureliaPal.PLATFORM.moduleName('aurelia-templating-router/router-view'), _aureliaPal.PLATFORM.moduleName('aurelia-templating-router/route-href')]);

  config.container.registerAlias(_aureliaRouter.Router, _onsRouter.OnsRouter);
}