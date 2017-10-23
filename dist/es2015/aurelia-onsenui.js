export { OnsBackButton } from './ons-back-button';
export { OnsIcon } from './ons-icon';
export { OnsInput } from './ons-input';
export { OnsNavigator } from './ons-navigator';
export { OnsRange } from './ons-range';
export { OnsSelect } from './ons-select';
export { OnsSwitch } from './ons-switch';
export { OnsTab } from './ons-tab';
export { OnsTabbar } from './ons-tabbar';

import { DOM, PLATFORM } from 'aurelia-pal';
import { BrowserHistory } from 'aurelia-history-browser';
import { OnsRouter } from './ons-router';
import { Router, RouteLoader } from 'aurelia-router';
import { TemplatingRouteLoader } from 'aurelia-templating-router';
import { RouteRecognizer } from 'aurelia-route-recognizer';

Router.isNavigatingFirst;
Router.isNavigatingNew;
Router.isNavigatingForward;
Router.isNavigatingBack;
Router.isNavigatingRefresh;
Router.currentNavigationTracker;

Router.prototype.reset = function () {
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
  this._recognizer = new RouteRecognizer();
  this._childRecognizer = new RouteRecognizer();
  this._configuredPromise = new Promise(resolve => {
    this._resolveConfiguredPromise = resolve;
  });
};

const routeStripper = /^#?\/*|\s+$/g;
const rootStripper = /^\/+|\/+$/g;
const trailingSlash = /\/$/;
const absoluteUrl = /^([a-z][a-z0-9+\-.]*:)?\/\//i;

function updateHash(location, fragment, replace) {
  if (replace) {
    let href = location.href.replace(/(javascript:|#).*$/, '');
    location.replace(href + '#' + fragment);
  } else {
    location.hash = '#' + fragment;
  }
}

BrowserHistory.prototype.setState = function (key, value) {
  let state = Object.assign({}, this.history.state);
  state[key] = value;
  this.history.replaceState(state, null, null);
};

BrowserHistory.prototype.getState = function (key) {
  let state = Object.assign({}, this.history.state);
  return state[key];
};

BrowserHistory.prototype.activate = function (options) {
  if (this._isActive) {
    throw new Error('History has already been activated.');
  }

  let wantsPushState = !!options.pushState;

  this._isActive = true;
  this.options = Object.assign({}, { root: '/' }, this.options, options);

  this.root = ('/' + this.options.root + '/').replace(rootStripper, '/');

  this._wantsHashChange = this.options.hashChange !== false;
  this._hasPushState = !!(this.history && this.history.pushState);
  this._usePushState = !!(this._hasPushState && this.options.pushState);

  let eventName;
  if (this._hasPushState) {
    eventName = 'popstate';
  } else if (this._wantsHashChange) {
    eventName = 'hashchange';
  }

  PLATFORM.addEventListener(eventName, this._checkUrlCallback);

  if (this._wantsHashChange && wantsPushState) {
    let loc = this.location;
    let atRoot = loc.pathname.replace(/[^\/]$/, '$&/') === this.root;

    if (!this._usePushState && !atRoot) {
      this.fragment = this._getFragment(null, true);
      this.location.replace(this.root + this.location.search + '#' + this.fragment);

      return true;
    } else if (this._usePushState && atRoot && loc.hash) {
      this.fragment = this._getHash().replace(routeStripper, '');
      this.history.replaceState({}, DOM.title, this.root + this.fragment + loc.search);
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

BrowserHistory.prototype.navigate = function (fragment, { trigger = true, replace = false } = {}) {
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

  let url = this.root + fragment;

  if (fragment === '' && url !== '/') {
    url = url.slice(0, -1);
  }

  if (this._hasPushState) {
    url = url.replace('//', '/');
    if (!this._usePushState) {
      url = '#' + url;
    }
    this.history[replace ? 'replaceState' : 'pushState']({}, DOM.title, url);
  } else if (this._wantsHashChange) {
    updateHash(this.location, fragment, replace);
  } else {
    return this.location.assign(url);
  }

  if (trigger) {
    return this._loadUrl(fragment);
  }
};

BrowserHistory.prototype._getFragment = function (fragment, forcePushState) {
  let root;

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

BrowserHistory.prototype._checkUrl = function (event) {
  let current = this._getFragment();
  if (current !== this.fragment) {
    if (event.type === 'popstate') {
      this.history.replaceState(event.state, null);
    }
    this._loadUrl();
  }
};

export function configure(config) {
  config.singleton(RouteLoader, TemplatingRouteLoader).singleton(Router, OnsRouter).globalResources([PLATFORM.moduleName('./ons-back-button'), PLATFORM.moduleName('./ons-icon'), PLATFORM.moduleName('./ons-input'), PLATFORM.moduleName('./ons-navigator'), PLATFORM.moduleName('./ons-range'), PLATFORM.moduleName('./ons-select'), PLATFORM.moduleName('./ons-switch'), PLATFORM.moduleName('./ons-tab'), PLATFORM.moduleName('./ons-tabbar'), PLATFORM.moduleName('aurelia-templating-router/router-view'), PLATFORM.moduleName('aurelia-templating-router/route-href')]);

  config.container.registerAlias(Router, OnsRouter);
}