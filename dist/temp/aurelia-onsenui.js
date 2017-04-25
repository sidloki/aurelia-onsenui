'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnsRouter = exports.OnsBackButton = exports.OnsInput = exports.OnsNavigator = exports.OnsRange = exports.OnsSelect = exports.OnsSwitch = exports.OnsTab = exports.OnsTabbar = undefined;

var _dec, _dec2, _class, _dec3, _dec4, _class2, _desc, _value, _class3, _descriptor, _dec5, _dec6, _dec7, _class5, _desc2, _value2, _class6, _descriptor2, _dec8, _dec9, _dec10, _class8, _desc3, _value3, _class9, _descriptor3, _dec11, _dec12, _dec13, _class11, _desc4, _value4, _class12, _descriptor4, _dec14, _dec15, _class14, _desc5, _value5, _class15, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _dec16, _dec17, _dec18, _dec19, _class17, _desc6, _value6, _class18, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _dec20, _dec21, _class20, _dec22, _class21;

var _onsenui = require('onsenui');

var _onsenui2 = _interopRequireDefault(_onsenui);

var _aureliaLogging = require('aurelia-logging');

var LogManager = _interopRequireWildcard(_aureliaLogging);

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaPal = require('aurelia-pal');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaBinding = require('aurelia-binding');

var _aureliaRouter = require('aurelia-router');

var _aureliaTemplatingRouter = require('aurelia-templating-router');

var _aureliaHistory = require('aurelia-history');

var _aureliaEventAggregator = require('aurelia-event-aggregator');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OnsTabbar = exports.OnsTabbar = (_dec = (0, _aureliaTemplating.customElement)('ons-tabbar'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element), _dec(_class = (0, _aureliaTemplating.noView)(_class = _dec2(_class = function () {
  function OnsTabbar(element) {
    _classCallCheck(this, OnsTabbar);

    var content = element.querySelector('au-content');
    content.parentNode.replaceChild(content.firstChild, content);

    this.element = element;
    this._switchPage = this.element._switchPage.bind(this.element);
    this.element._switchPage = this.switchPage.bind(this);
  }

  OnsTabbar.prototype.switchPage = function switchPage(element, options) {
    return this._switchPage(element, options).then(function () {
      element.view.attached();
    });
  };

  return OnsTabbar;
}()) || _class) || _class) || _class);


var elementAttributes = ['page', 'icon', 'active-icon', 'label', 'badge', 'active'];

var OnsTab = exports.OnsTab = (_dec3 = (0, _aureliaTemplating.customElement)('ons-tab'), _dec4 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaDependencyInjection.Container, _aureliaTemplating.CompositionEngine, _aureliaTemplating.ViewSlot, _aureliaTemplating.ViewResources), _dec3(_class2 = (0, _aureliaTemplating.noView)(_class2 = _dec4(_class2 = (_class3 = function () {
  function OnsTab(element, container, compositionEngine, viewSlot, viewResources) {
    _classCallCheck(this, OnsTab);

    _initDefineProp(this, 'model', _descriptor, this);

    this.element = element;
    this.container = container;
    this.compositionEngine = compositionEngine;
    this.viewSlot = viewSlot;
    this.viewResources = viewResources;

    this.element.pageLoader = new _onsenui2.default.PageLoader(this.load.bind(this), this.unload.bind(this));
  }

  OnsTab.prototype.created = function created(owningView) {
    this.owningView = owningView;
  };

  OnsTab.prototype.bind = function bind(bindingContext, overrideContext) {
    var _this = this;

    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;
    Object.entries(this.model).forEach(function (_ref) {
      var key = _ref[0],
          value = _ref[1];

      if (elementAttributes.indexOf(key) > -1) {
        _this.element.setAttribute(key, value);
      }
    });
  };

  OnsTab.prototype.unbind = function unbind(bindingContext, overrideContext) {
    this.bindingContext = null;
    this.overrideContext = null;
  };

  OnsTab.prototype.load = function load(_ref2, done) {
    var _this2 = this;

    var page = _ref2.page,
        parent = _ref2.parent,
        params = _ref2.params;

    var instruction = {
      container: this.container,
      model: this.model,
      viewResources: this.viewResources
    };
    if (/\.html/.test(page)) {
      instruction.view = page;
    } else {
      instruction.viewModel = page;
    }
    this.compositionEngine.createController(instruction).then(function (controller) {
      var pageElement = controller.view.fragment.firstElementChild;
      controller.automate(_this2.overrideContext, _this2.owningView);
      pageElement.view = controller.view;
      done(pageElement);
    });
  };

  OnsTab.prototype.unload = function unload(pageElement) {
    return invokeLifecycle(pageElement.view.controller.viewModel, 'deactivate').then(function () {
      pageElement.view.detached();
      pageElement.view.unbind();
    });
  };

  return OnsTab;
}(), (_descriptor = _applyDecoratedDescriptor(_class3.prototype, 'model', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: null
})), _class3)) || _class2) || _class2) || _class2);


function invokeLifecycle(instance, name, model) {
  if (typeof instance[name] === 'function') {
    return Promise.resolve().then(function () {
      return instance[name](model);
    }).then(function (result) {
      if (result !== null && result !== undefined) {
        return result;
      }

      return true;
    });
  }

  return Promise.resolve(true);
}

var OnsSwitch = exports.OnsSwitch = (_dec5 = (0, _aureliaTemplating.customElement)('ons-switch'), _dec6 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element), _dec7 = (0, _aureliaTemplating.bindable)({ defaultBindingMode: _aureliaBinding.bindingMode.twoWay }), _dec5(_class5 = (0, _aureliaTemplating.noView)(_class5 = _dec6(_class5 = (_class6 = function () {
  function OnsSwitch(element) {
    _classCallCheck(this, OnsSwitch);

    _initDefineProp(this, 'value', _descriptor2, this);

    this.element = element;
    this.element.onchange = this.onChange.bind(this);
  }

  OnsSwitch.prototype.onChange = function onChange() {
    this.value = this.element.checked;
  };

  OnsSwitch.prototype.valueChanged = function valueChanged(newValue, oldValue) {
    this.element.checked = newValue;
  };

  return OnsSwitch;
}(), (_descriptor2 = _applyDecoratedDescriptor(_class6.prototype, 'value', [_dec7], {
  enumerable: true,
  initializer: null
})), _class6)) || _class5) || _class5) || _class5);
var OnsSelect = exports.OnsSelect = (_dec8 = (0, _aureliaTemplating.customElement)('ons-select'), _dec9 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element), _dec10 = (0, _aureliaTemplating.bindable)({ defaultBindingMode: _aureliaBinding.bindingMode.twoWay }), _dec8(_class8 = (0, _aureliaTemplating.noView)(_class8 = _dec9(_class8 = (_class9 = function () {
  function OnsSelect(element) {
    _classCallCheck(this, OnsSelect);

    _initDefineProp(this, 'value', _descriptor3, this);

    var content = element.querySelector('au-content');
    content.parentNode.replaceChild(content.firstChild, content);

    this.element = element;
    this.element.onchange = this.onChange.bind(this);
  }

  OnsSelect.prototype.attached = function attached() {
    this.element.value = this.value;
  };

  OnsSelect.prototype.onChange = function onChange() {
    this.value = this.element.value;
  };

  OnsSelect.prototype.valueChanged = function valueChanged(newValue, oldValue) {
    this.element.value = newValue;
  };

  return OnsSelect;
}(), (_descriptor3 = _applyDecoratedDescriptor(_class9.prototype, 'value', [_dec10], {
  enumerable: true,
  initializer: null
})), _class9)) || _class8) || _class8) || _class8);
var OnsRange = exports.OnsRange = (_dec11 = (0, _aureliaTemplating.customElement)('ons-range'), _dec12 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element), _dec13 = (0, _aureliaTemplating.bindable)({ defaultBindingMode: _aureliaBinding.bindingMode.twoWay }), _dec11(_class11 = (0, _aureliaTemplating.noView)(_class11 = _dec12(_class11 = (_class12 = function () {
  function OnsRange(element) {
    _classCallCheck(this, OnsRange);

    _initDefineProp(this, 'value', _descriptor4, this);

    this.element = element;
    this.element.oninput = this.onInput.bind(this);
  }

  OnsRange.prototype.onInput = function onInput() {
    this.value = this.element.value;
  };

  OnsRange.prototype.valueChanged = function valueChanged(newValue, oldValue) {
    this.element.value = newValue;
  };

  return OnsRange;
}(), (_descriptor4 = _applyDecoratedDescriptor(_class12.prototype, 'value', [_dec13], {
  enumerable: true,
  initializer: null
})), _class12)) || _class11) || _class11) || _class11);
var OnsNavigator = exports.OnsNavigator = (_dec14 = (0, _aureliaTemplating.customElement)('ons-navigator'), _dec15 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaDependencyInjection.Container, _aureliaTemplating.ViewSlot, _aureliaRouter.Router, _aureliaTemplating.ViewLocator, _aureliaTemplating.CompositionTransaction, _aureliaTemplating.CompositionEngine), _dec14(_class14 = (0, _aureliaTemplating.noView)(_class14 = _dec15(_class14 = (_class15 = function (_RouterView) {
  _inherits(OnsNavigator, _RouterView);

  function OnsNavigator(element, container, viewSlot, router, viewLocator, compositionTransaction, compositionEngine) {
    _classCallCheck(this, OnsNavigator);

    var _this3 = _possibleConstructorReturn(this, _RouterView.call(this, element, container, viewSlot, router, viewLocator, compositionTransaction, compositionEngine));

    _initDefineProp(_this3, 'swapOrder', _descriptor5, _this3);

    _initDefineProp(_this3, 'layoutView', _descriptor6, _this3);

    _initDefineProp(_this3, 'layoutViewModel', _descriptor7, _this3);

    _initDefineProp(_this3, 'layoutModel', _descriptor8, _this3);

    _this3.element.pageLoader = new _onsenui2.default.PageLoader(_this3.load.bind(_this3), _this3.unload.bind(_this3));

    _this3.view;
    _this3.viewStack = [];
    return _this3;
  }

  OnsNavigator.prototype.swap = function swap(viewPortInstruction) {
    var router = this.router;
    if (router.isNavigatingBack) {
      var _options = router.currentInstruction.previousInstruction.config.settings.navigator || {};
      _options.data = viewPortInstruction;
      return this.element.popPage(_options);
    }
    var options = router.currentInstruction.config.settings.navigator || {};
    options.data = viewPortInstruction;
    return this.element.pushPage(viewPortInstruction.moduleId, options);
  };

  OnsNavigator.prototype.load = function load(_ref3, done) {
    var _this4 = this;

    var page = _ref3.page,
        parent = _ref3.parent,
        params = _ref3.params;

    var viewPortInstruction = params;
    var previousView = this.view;

    var work = function work() {
      var pageElement = _this4.view.fragment.firstElementChild;
      _this4.viewSlot.add(_this4.view);
      if (previousView) {
        _this4.viewStack.push(previousView);
      }
      _this4._notify();
      return done(pageElement);
    };

    var ready = function ready(owningView) {
      viewPortInstruction.controller.automate(_this4.overrideContext, owningView);
      if (_this4.compositionTransactionOwnershipToken) {
        return _this4.compositionTransactionOwnershipToken.waitForCompositionComplete().then(function () {
          _this4.compositionTransactionOwnershipToken = null;
          return work();
        });
      }

      return work();
    };

    this.view = viewPortInstruction.controller.view;

    return ready(this.owningView);
  };

  OnsNavigator.prototype.unload = function unload(pageElement) {
    this.viewSlot.remove(this.view);
    this.view.unbind();
    this.view = this.viewStack.pop();
  };

  return OnsNavigator;
}(_aureliaTemplatingRouter.RouterView), (_descriptor5 = _applyDecoratedDescriptor(_class15.prototype, 'swapOrder', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class15.prototype, 'layoutView', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class15.prototype, 'layoutViewModel', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class15.prototype, 'layoutModel', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: null
})), _class15)) || _class14) || _class14) || _class14);
var OnsInput = exports.OnsInput = (_dec16 = (0, _aureliaTemplating.customElement)('ons-input'), _dec17 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element), _dec18 = (0, _aureliaTemplating.bindable)({ defaultBindingMode: _aureliaBinding.bindingMode.twoWay }), _dec19 = (0, _aureliaTemplating.bindable)({ defaultBindingMode: _aureliaBinding.bindingMode.twoWay }), _dec16(_class17 = (0, _aureliaTemplating.noView)(_class17 = _dec17(_class17 = (_class18 = function () {
  function OnsInput(element) {
    _classCallCheck(this, OnsInput);

    _initDefineProp(this, 'value', _descriptor9, this);

    _initDefineProp(this, 'checked', _descriptor10, this);

    _initDefineProp(this, 'inputId', _descriptor11, this);

    _initDefineProp(this, 'disabled', _descriptor12, this);

    this.element = element;
    this.element.oninput = this.onInput.bind(this);
    this.element.onchange = this.onChange.bind(this);
    _onsenui2.default._contentReady(this.element, this.onContentReady.bind(this));
  }

  OnsInput.prototype.onContentReady = function onContentReady() {
    switch (this.element.type) {
      case 'radio':
        this.element.checked = this.value === this.checked;
        break;
      case 'checkbox':
        this.element.checked = this.checked.includes(this.value);
        break;
      default:
        break;
    }
  };

  OnsInput.prototype.onInput = function onInput() {
    this.value = this.element.value;
  };

  OnsInput.prototype.onChange = function onChange() {
    switch (this.element.type) {
      case 'radio':
        this.checked = this.value;
        break;
      case 'checkbox':
        var index = this.checked.indexOf(this.value);
        index > -1 ? this.checked.splice(index, index + 1) : this.checked.push(this.value);
        break;
      default:
        this.value = this.element.value;
        break;
    }
  };

  OnsInput.prototype.valueChanged = function valueChanged(newValue, oldValue) {
    this.element.value = newValue;
  };

  OnsInput.prototype.inputIdChanged = function inputIdChanged(newValue, oldValue) {
    this.element.setAttribute('input-id', newValue);
  };

  OnsInput.prototype.disabledChanged = function disabledChanged(newValue, oldValue) {
    if (newValue) {
      this.element.setAttribute('disabled', newValue);
    } else {
      this.element.removeAttribute('disabled');
    }
  };

  return OnsInput;
}(), (_descriptor9 = _applyDecoratedDescriptor(_class18.prototype, 'value', [_dec18], {
  enumerable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class18.prototype, 'checked', [_dec19], {
  enumerable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class18.prototype, 'inputId', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class18.prototype, 'disabled', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: null
})), _class18)) || _class17) || _class17) || _class17);
var OnsBackButton = exports.OnsBackButton = (_dec20 = (0, _aureliaTemplating.customElement)('ons-back-button'), _dec21 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaRouter.Router), _dec20(_class20 = (0, _aureliaTemplating.noView)(_class20 = _dec21(_class20 = function () {
  function OnsBackButton(element, router) {
    _classCallCheck(this, OnsBackButton);

    this.router = router;
    this.element = element;
    this.element.onClick = this.onClick.bind(this);
  }

  OnsBackButton.prototype.onClick = function onClick() {
    this.router.navigateBack();
  };

  return OnsBackButton;
}()) || _class20) || _class20) || _class20);


var logger = LogManager.getLogger('app-router');

var OnsRouter = exports.OnsRouter = (_dec22 = (0, _aureliaDependencyInjection.inject)(_aureliaDependencyInjection.Container, _aureliaHistory.History, _aureliaRouter.PipelineProvider, _aureliaEventAggregator.EventAggregator), _dec22(_class21 = function (_AppRouter) {
  _inherits(OnsRouter, _AppRouter);

  function OnsRouter(container, history, piplineProvider, events) {
    _classCallCheck(this, OnsRouter);

    return _possibleConstructorReturn(this, _AppRouter.call(this, container, history, piplineProvider, events));
  }

  OnsRouter.prototype._dequeueInstruction = function _dequeueInstruction(instructionCount) {
    var _this6 = this;

    return Promise.resolve().then(function () {
      if (_this6.isNavigating && !instructionCount) {
        return undefined;
      }

      var instruction = _this6._queue.shift();
      _this6._queue.length = 0;

      if (!instruction) {
        return undefined;
      }

      _this6.isNavigating = true;

      var navtracker = _this6.history.getState('NavigationTracker');
      if (!navtracker && !_this6.currentNavigationTracker) {
        _this6.isNavigatingFirst = true;
        _this6.isNavigatingNew = true;
      } else if (!navtracker) {
        _this6.isNavigatingNew = true;
      } else if (!_this6.currentNavigationTracker) {
        _this6.isNavigatingRefresh = true;
      } else if (_this6.currentNavigationTracker < navtracker) {
        _this6.isNavigatingForward = true;
      } else if (_this6.currentNavigationTracker > navtracker) {
        _this6.isNavigatingBack = true;
      }
      if (!navtracker) {
        navtracker = Date.now();
        _this6.history.setState('NavigationTracker', navtracker);
      }
      _this6.currentNavigationTracker = navtracker;

      instruction.previousInstruction = _this6.currentInstruction;

      if (!instructionCount) {
        _this6.events.publish('router:navigation:processing', { instruction: instruction });
      } else if (instructionCount === _this6.maxInstructionCount - 1) {
        logger.error(instructionCount + 1 + ' navigation instructions have been attempted without success. Restoring last known good location.');
        restorePreviousLocation(_this6);
        return _this6._dequeueInstruction(instructionCount + 1);
      } else if (instructionCount > _this6.maxInstructionCount) {
        throw new Error('Maximum navigation attempts exceeded. Giving up.');
      }

      var pipeline = _this6.pipelineProvider.createPipeline();

      return pipeline.run(instruction).then(function (result) {
        return processResult(instruction, result, instructionCount, _this6);
      }).catch(function (error) {
        return { output: error instanceof Error ? error : new Error(error) };
      }).then(function (result) {
        return resolveInstruction(instruction, result, !!instructionCount, _this6);
      });
    });
  };

  return OnsRouter;
}(_aureliaRouter.AppRouter)) || _class21);


function processResult(instruction, result, instructionCount, router) {
  if (!(result && 'completed' in result && 'output' in result)) {
    result = result || {};
    result.output = new Error('Expected router pipeline to return a navigation result, but got [' + JSON.stringify(result) + '] instead.');
  }

  var finalResult = null;
  if ((0, _aureliaRouter.isNavigationCommand)(result.output)) {
    result.output.navigate(router);
  } else {
    finalResult = result;

    if (!result.completed) {
      if (result.output instanceof Error) {
        logger.error(result.output);
      }

      restorePreviousLocation(router);
    }
  }

  return router._dequeueInstruction(instructionCount + 1).then(function (innerResult) {
    return finalResult || innerResult || result;
  });
}

function resolveInstruction(instruction, result, isInnerInstruction, router) {
  instruction.resolve(result);

  var eventArgs = { instruction: instruction, result: result };
  if (!isInnerInstruction) {
    router.isNavigating = false;
    router.isExplicitNavigation = false;
    router.isExplicitNavigationBack = false;
    router.isNavigatingFirst = false;
    router.isNavigatingNew = false;
    router.isNavigatingRefresh = false;
    router.isNavigatingForward = false;
    router.isNavigatingBack = false;

    var eventName = void 0;

    if (result.output instanceof Error) {
      eventName = 'error';
    } else if (!result.completed) {
      eventName = 'canceled';
    } else {
      var queryString = instruction.queryString ? '?' + instruction.queryString : '';
      router.history.previousLocation = instruction.fragment + queryString;
      eventName = 'success';
    }

    router.events.publish('router:navigation:' + eventName, eventArgs);
    router.events.publish('router:navigation:complete', eventArgs);
  } else {
    router.events.publish('router:navigation:child:complete', eventArgs);
  }

  return result;
}

function restorePreviousLocation(router) {
  var previousLocation = router.history.previousLocation;
  if (previousLocation) {
    router.navigate(router.history.previousLocation, { trigger: false, replace: true });
  } else if (router.fallbackRoute) {
    router.navigate(router.fallbackRoute, { trigger: true, replace: true });
  } else {
    logger.error('Router navigation failed, and no previous location or fallbackRoute could be restored.');
  }
}