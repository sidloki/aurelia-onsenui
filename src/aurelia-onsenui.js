export {OnsBackButton} from './ons-back-button';
export {OnsInput} from './ons-input';
export {OnsNavigator} from './ons-navigator';
export {OnsTab} from './ons-tab';

import {PLATFORM} from 'aurelia-pal';
import {BrowserHistory} from 'aurelia-history-browser';
import {OnsRouter} from './ons-router';
import {AppRouter, Router, RouteLoader} from 'aurelia-router';
import {TemplatingRouteLoader} from 'aurelia-templating-router';
import {RouteRecognizer} from 'aurelia-route-recognizer';

Router.isNavigatingFirst;
Router.isNavigatingNew;
Router.isNavigatingForward;
Router.isNavigatingBack;
Router.isNavigatingRefresh;
Router.currentNavigationTracker;

Router.prototype.reset = function() {
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

BrowserHistory.prototype.setState = function(key, value) {
  let state = Object.assign({}, this.history.state);
  state[key] = value;
  this.history.replaceState(state, null, null);
};

BrowserHistory.prototype.getState = function(key) {
  let state = Object.assign({}, this.history.state);
  return state[key];
};

export function configure(config) {
  config
    .singleton(RouteLoader, TemplatingRouteLoader)
    .singleton(Router, OnsRouter)
    .globalResources([
      './ons-back-button',
      './ons-input',
      './ons-navigator',
      './ons-tab',
      PLATFORM.moduleName('aurelia-templating-router/router-view'),
      PLATFORM.moduleName('aurelia-templating-router/route-href')
    ]);

  config.container.registerAlias(Router, OnsRouter);
}
