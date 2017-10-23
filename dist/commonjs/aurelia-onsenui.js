'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnsTabbar = exports.OnsTab = exports.OnsSwitch = exports.OnsSelect = exports.OnsRange = exports.OnsNavigator = exports.OnsInput = exports.OnsIcon = exports.OnsBackButton = undefined;

var _onsBackButton = require('./ons-back-button');

Object.defineProperty(exports, 'OnsBackButton', {
  enumerable: true,
  get: function get() {
    return _onsBackButton.OnsBackButton;
  }
});

var _onsIcon = require('./ons-icon');

Object.defineProperty(exports, 'OnsIcon', {
  enumerable: true,
  get: function get() {
    return _onsIcon.OnsIcon;
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

var routeStripper = /^#?\/*|\s+$/g;
var rootStripper = /^\/+|\/+$/g;
var trailingSlash = /\/$/;
var absoluteUrl = /^([a-z][a-z0-9+\-.]*:)?\/\//i;

function updateHash(location, fragment, replace) {
  if (replace) {
    var href = location.href.replace(/(javascript:|#).*$/, '');
    location.replace(href + '#' + fragment);
  } else {
    location.hash = '#' + fragment;
  }
}

_aureliaHistoryBrowser.BrowserHistory.prototype.setState = function (key, value) {
  var state = Object.assign({}, this.history.state);
  state[key] = value;
  this.history.replaceState(state, null, null);
};

_aureliaHistoryBrowser.BrowserHistory.prototype.getState = function (key) {
  var state = Object.assign({}, this.history.state);
  return state[key];
};

_aureliaHistoryBrowser.BrowserHistory.prototype.activate = function (options) {
  if (this._isActive) {
    throw new Error('History has already been activated.');
  }

  var wantsPushState = !!options.pushState;

  this._isActive = true;
  this.options = Object.assign({}, { root: '/' }, this.options, options);

  this.root = ('/' + this.options.root + '/').replace(rootStripper, '/');

  this._wantsHashChange = this.options.hashChange !== false;
  this._hasPushState = !!(this.history && this.history.pushState);
  this._usePushState = !!(this._hasPushState && this.options.pushState);

  var eventName = void 0;
  if (this._hasPushState) {
    eventName = 'popstate';
  } else if (this._wantsHashChange) {
    eventName = 'hashchange';
  }

  _aureliaPal.PLATFORM.addEventListener(eventName, this._checkUrlCallback);

  if (this._wantsHashChange && wantsPushState) {
    var loc = this.location;
    var atRoot = loc.pathname.replace(/[^\/]$/, '$&/') === this.root;

    if (!this._usePushState && !atRoot) {
      this.fragment = this._getFragment(null, true);
      this.location.replace(this.root + this.location.search + '#' + this.fragment);

      return true;
    } else if (this._usePushState && atRoot && loc.hash) {
      this.fragment = this._getHash().replace(routeStripper, '');
      this.history.replaceState({}, _aureliaPal.DOM.title, this.root + this.fragment + loc.search);
    }
  }

  if (!this.fragment) {
    this.fragment = this._getFragment();
  }

  this.linkHandler.activate(this);

  if (!this.options.silent) {
    return this._loadUrl();
  }
};

_aureliaHistoryBrowser.BrowserHistory.prototype.navigate = function (fragment) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$trigger = _ref.trigger,
      trigger = _ref$trigger === undefined ? true : _ref$trigger,
      _ref$replace = _ref.replace,
      replace = _ref$replace === undefined ? false : _ref$replace;

  if (fragment && absoluteUrl.test(fragment)) {
    this.location.href = fragment;
    return true;
  }

  if (!this._isActive) {
    return false;
  }

  fragment = this._getFragment(fragment || '');

  if (this.fragment === fragment && !replace) {
    return false;
  }

  this.fragment = fragment;

  var url = this.root + fragment;

  if (fragment === '' && url !== '/') {
    url = url.slice(0, -1);
  }

  if (this._hasPushState) {
    url = url.replace('//', '/');
    if (!this._usePushState) {
      url = '#' + url;
    }
    this.history[replace ? 'replaceState' : 'pushState']({}, _aureliaPal.DOM.title, url);
  } else if (this._wantsHashChange) {
    updateHash(this.location, fragment, replace);
  } else {
    return this.location.assign(url);
  }

  if (trigger) {
    return this._loadUrl(fragment);
  }
};

_aureliaHistoryBrowser.BrowserHistory.prototype._getFragment = function (fragment, forcePushState) {
  var root = void 0;

  if (!fragment) {
    if (this._usePushState || !this._wantsHashChange || forcePushState) {
      fragment = this.location.pathname + this.location.search;
      root = this.root.replace(trailingSlash, '');
      if (!fragment.indexOf(root)) {
        fragment = fragment.substr(root.length);
      }
    } else {
      fragment = this._getHash();
    }
  }

  return '/' + fragment.replace(routeStripper, '');
};

_aureliaHistoryBrowser.BrowserHistory.prototype._checkUrl = function (event) {
  var current = this._getFragment();
  if (current !== this.fragment) {
    if (event.type === 'popstate') {
      this.history.replaceState(event.state, null);
    }
    this._loadUrl();
  }
};

function configure(config) {
  config.singleton(_aureliaRouter.RouteLoader, _aureliaTemplatingRouter.TemplatingRouteLoader).singleton(_aureliaRouter.Router, _onsRouter.OnsRouter).globalResources([_aureliaPal.PLATFORM.moduleName('./ons-back-button'), _aureliaPal.PLATFORM.moduleName('./ons-icon'), _aureliaPal.PLATFORM.moduleName('./ons-input'), _aureliaPal.PLATFORM.moduleName('./ons-navigator'), _aureliaPal.PLATFORM.moduleName('./ons-range'), _aureliaPal.PLATFORM.moduleName('./ons-select'), _aureliaPal.PLATFORM.moduleName('./ons-switch'), _aureliaPal.PLATFORM.moduleName('./ons-tab'), _aureliaPal.PLATFORM.moduleName('./ons-tabbar'), _aureliaPal.PLATFORM.moduleName('aurelia-templating-router/router-view'), _aureliaPal.PLATFORM.moduleName('aurelia-templating-router/route-href')]);

  config.container.registerAlias(_aureliaRouter.Router, _onsRouter.OnsRouter);
}