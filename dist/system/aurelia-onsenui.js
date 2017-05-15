'use strict';

System.register(['./ons-back-button', './ons-icon', './ons-input', './ons-navigator', './ons-range', './ons-select', './ons-switch', './ons-tab', './ons-tabbar', 'aurelia-pal', 'aurelia-history-browser', './ons-router', 'aurelia-router', 'aurelia-templating-router', 'aurelia-route-recognizer'], function (_export, _context) {
  "use strict";

  var DOM, PLATFORM, BrowserHistory, OnsRouter, Router, RouteLoader, TemplatingRouteLoader, RouteRecognizer, routeStripper, rootStripper, trailingSlash, absoluteUrl;


  function updateHash(location, fragment, replace) {
    if (replace) {
      var href = location.href.replace(/(javascript:|#).*$/, '');
      location.replace(href + '#' + fragment);
    } else {
      location.hash = '#' + fragment;
    }
  }

  function configure(config) {
    config.singleton(RouteLoader, TemplatingRouteLoader).singleton(Router, OnsRouter).globalResources(['./ons-back-button', './ons-icon', './ons-input', './ons-navigator', './ons-range', './ons-select', './ons-switch', './ons-tab', './ons-tabbar', PLATFORM.moduleName('aurelia-templating-router/router-view'), PLATFORM.moduleName('aurelia-templating-router/route-href')]);

    config.container.registerAlias(Router, OnsRouter);
  }

  _export('configure', configure);

  return {
    setters: [function (_onsBackButton) {
      var _exportObj = {};
      _exportObj.OnsBackButton = _onsBackButton.OnsBackButton;

      _export(_exportObj);
    }, function (_onsIcon) {
      var _exportObj2 = {};
      _exportObj2.OnsIcon = _onsIcon.OnsIcon;

      _export(_exportObj2);
    }, function (_onsInput) {
      var _exportObj3 = {};
      _exportObj3.OnsInput = _onsInput.OnsInput;

      _export(_exportObj3);
    }, function (_onsNavigator) {
      var _exportObj4 = {};
      _exportObj4.OnsNavigator = _onsNavigator.OnsNavigator;

      _export(_exportObj4);
    }, function (_onsRange) {
      var _exportObj5 = {};
      _exportObj5.OnsRange = _onsRange.OnsRange;

      _export(_exportObj5);
    }, function (_onsSelect) {
      var _exportObj6 = {};
      _exportObj6.OnsSelect = _onsSelect.OnsSelect;

      _export(_exportObj6);
    }, function (_onsSwitch) {
      var _exportObj7 = {};
      _exportObj7.OnsSwitch = _onsSwitch.OnsSwitch;

      _export(_exportObj7);
    }, function (_onsTab) {
      var _exportObj8 = {};
      _exportObj8.OnsTab = _onsTab.OnsTab;

      _export(_exportObj8);
    }, function (_onsTabbar) {
      var _exportObj9 = {};
      _exportObj9.OnsTabbar = _onsTabbar.OnsTabbar;

      _export(_exportObj9);
    }, function (_aureliaPal) {
      DOM = _aureliaPal.DOM;
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

      routeStripper = /^#?\/*|\s+$/g;
      rootStripper = /^\/+|\/+$/g;
      trailingSlash = /\/$/;
      absoluteUrl = /^([a-z][a-z0-9+\-.]*:)?\/\//i;
      BrowserHistory.prototype.setState = function (key, value) {
        var state = Object.assign({}, this.history.state);
        state[key] = value;
        this.history.replaceState(state, null, null);
      };

      BrowserHistory.prototype.getState = function (key) {
        var state = Object.assign({}, this.history.state);
        return state[key];
      };

      BrowserHistory.prototype.activate = function (options) {
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

        PLATFORM.addEventListener(eventName, this._checkUrlCallback);

        if (this._wantsHashChange && wantsPushState) {
          var loc = this.location;
          var atRoot = loc.pathname.replace(/[^\/]$/, '$&/') === this.root;

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

      BrowserHistory.prototype.navigate = function (fragment) {
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

      BrowserHistory.prototype._checkUrl = function (event) {
        var current = this._getFragment();
        if (current !== this.fragment) {
          if (event.type === 'popstate') {
            this.history.replaceState(event.state, null);
          }
          this._loadUrl();
        }
      };
    }
  };
});