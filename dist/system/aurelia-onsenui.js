'use strict';

System.register(['./ons-back-button', './ons-input', './ons-navigator', './ons-range', './ons-select', './ons-switch', './ons-tab', './ons-tabbar', 'aurelia-pal', 'aurelia-history-browser', './ons-router', 'aurelia-router', 'aurelia-templating-router', 'aurelia-route-recognizer'], function (_export, _context) {
  "use strict";

  var PLATFORM, BrowserHistory, OnsRouter, Router, RouteLoader, TemplatingRouteLoader, RouteRecognizer;
  function configure(config) {
    config.singleton(RouteLoader, TemplatingRouteLoader).singleton(Router, OnsRouter).globalResources(['./ons-back-button', './ons-input', './ons-navigator', './ons-range', './ons-select', './ons-switch', './ons-tab', './ons-tabbar', PLATFORM.moduleName('aurelia-templating-router/router-view'), PLATFORM.moduleName('aurelia-templating-router/route-href')]);

    config.container.registerAlias(Router, OnsRouter);
  }

  _export('configure', configure);

  return {
    setters: [function (_onsBackButton) {
      var _exportObj = {};
      _exportObj.OnsBackButton = _onsBackButton.OnsBackButton;

      _export(_exportObj);
    }, function (_onsInput) {
      var _exportObj2 = {};
      _exportObj2.OnsInput = _onsInput.OnsInput;

      _export(_exportObj2);
    }, function (_onsNavigator) {
      var _exportObj3 = {};
      _exportObj3.OnsNavigator = _onsNavigator.OnsNavigator;

      _export(_exportObj3);
    }, function (_onsRange) {
      var _exportObj4 = {};
      _exportObj4.OnsRange = _onsRange.OnsRange;

      _export(_exportObj4);
    }, function (_onsSelect) {
      var _exportObj5 = {};
      _exportObj5.OnsSelect = _onsSelect.OnsSelect;

      _export(_exportObj5);
    }, function (_onsSwitch) {
      var _exportObj6 = {};
      _exportObj6.OnsSwitch = _onsSwitch.OnsSwitch;

      _export(_exportObj6);
    }, function (_onsTab) {
      var _exportObj7 = {};
      _exportObj7.OnsTab = _onsTab.OnsTab;

      _export(_exportObj7);
    }, function (_onsTabbar) {
      var _exportObj8 = {};
      _exportObj8.OnsTabbar = _onsTabbar.OnsTabbar;

      _export(_exportObj8);
    }, function (_aureliaPal) {
      PLATFORM = _aureliaPal.PLATFORM;
    }, function (_aureliaHistoryBrowser) {
      BrowserHistory = _aureliaHistoryBrowser.BrowserHistory;
    }, function (_onsRouter) {
      OnsRouter = _onsRouter.OnsRouter;
    }, function (_aureliaRouter) {
      Router = _aureliaRouter.Router;
      RouteLoader = _aureliaRouter.RouteLoader;
    }, function (_aureliaTemplatingRouter) {
      TemplatingRouteLoader = _aureliaTemplatingRouter.TemplatingRouteLoader;
    }, function (_aureliaRouteRecognizer) {
      RouteRecognizer = _aureliaRouteRecognizer.RouteRecognizer;
    }],
    execute: function () {

      Router.isNavigatingFirst;
      Router.isNavigatingNew;
      Router.isNavigatingForward;
      Router.isNavigatingBack;
      Router.isNavigatingRefresh;
      Router.currentNavigationTracker;

      Router.prototype.reset = function () {
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
        this._recognizer = new RouteRecognizer();
        this._childRecognizer = new RouteRecognizer();
        this._configuredPromise = new Promise(function (resolve) {
          _this._resolveConfiguredPromise = resolve;
        });
      };

      BrowserHistory.prototype.setState = function (key, value) {
        var state = Object.assign({}, this.history.state);
        state[key] = value;
        this.history.replaceState(state, null, null);
      };

      BrowserHistory.prototype.getState = function (key) {
        var state = Object.assign({}, this.history.state);
        return state[key];
      };
    }
  };
});