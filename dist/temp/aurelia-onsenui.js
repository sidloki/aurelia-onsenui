'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnsNavigator = exports.OnsNavigatorView = exports.OnsInput = exports.PageLoader = undefined;

var _dec, _class, _dec4, _dec5, _dec6, _class3, _desc, _value, _class4, _descriptor, _dec7, _dec8, _class6, _desc2, _value2, _class7, _descriptor2, _descriptor3, _dec9, _dec10, _class9, _desc3, _value3, _class10, _descriptor4;

exports.invokeLifecycle = invokeLifecycle;

var _onsenui = require('onsenui');

var _onsenui2 = _interopRequireDefault(_onsenui);

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaPath = require('aurelia-path');

var _aureliaMetadata = require('aurelia-metadata');

var _aureliaPal = require('aurelia-pal');

var _aureliaBinding = require('aurelia-binding');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var PageLoader = exports.PageLoader = (_dec = (0, _aureliaDependencyInjection.inject)(_aureliaTemplating.CompositionEngine), _dec(_class = function () {
  function PageLoader(compositionEngine) {
    _classCallCheck(this, PageLoader);

    this.compositionEngine = compositionEngine;
  }

  PageLoader.prototype.loadPage = function loadPage(parent, config) {
    var childContainer = parent.container.createChild();

    var viewModel = /\.html/.test(config.moduleId) ? createDynamicClass(config.moduleId) : (0, _aureliaPath.relativeToFile)(config.moduleId, _aureliaMetadata.Origin.get(parent.container.viewModel.constructor).moduleId);

    var instruction = {
      viewModel: viewModel,
      childContainer: childContainer,
      model: config.model
    };

    return this.compositionEngine.ensureViewModel(instruction);
  };

  return PageLoader;
}()) || _class);


function createDynamicClass(moduleId) {
  var _dec2, _dec3, _class2;

  var name = /([^\/^\?]+)\.html/i.exec(moduleId)[1];

  var DynamicClass = (_dec2 = (0, _aureliaTemplating.customElement)(name), _dec3 = (0, _aureliaTemplating.useView)(moduleId), _dec2(_class2 = _dec3(_class2 = function () {
    function DynamicClass() {
      _classCallCheck(this, DynamicClass);
    }

    DynamicClass.prototype.bind = function bind(bindingContext) {
      this.$parent = bindingContext;
    };

    return DynamicClass;
  }()) || _class2) || _class2);


  return DynamicClass;
}

var OnsInput = exports.OnsInput = (_dec4 = (0, _aureliaTemplating.customElement)('ons-input'), _dec5 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element), _dec6 = (0, _aureliaTemplating.bindable)({ defaultBindingMode: _aureliaBinding.bindingMode.twoWay }), _dec4(_class3 = (0, _aureliaTemplating.noView)(_class3 = _dec5(_class3 = (_class4 = function () {
  function OnsInput(element) {
    _classCallCheck(this, OnsInput);

    _initDefineProp(this, 'value', _descriptor, this);

    this.element = element;
    this.element.oninput = this.onInput.bind(this);
  }

  OnsInput.prototype.onInput = function onInput() {
    this.value = this.element.value;
  };

  OnsInput.prototype.valueChanged = function valueChanged(newValue, oldValue) {
    this.element.value = newValue;
  };

  return OnsInput;
}(), (_descriptor = _applyDecoratedDescriptor(_class4.prototype, 'value', [_dec6], {
  enumerable: true,
  initializer: null
})), _class4)) || _class3) || _class3) || _class3);
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

var OnsNavigatorView = exports.OnsNavigatorView = (_dec7 = (0, _aureliaTemplating.customElement)('ons-tab'), _dec8 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaDependencyInjection.Container, _aureliaTemplating.CompositionEngine, PageLoader, _aureliaTemplating.ViewSlot), _dec7(_class6 = (0, _aureliaTemplating.noView)(_class6 = _dec8(_class6 = (_class7 = function () {
  function OnsNavigatorView(element, container, compositionEngine, pageLoader, viewSlot) {
    _classCallCheck(this, OnsNavigatorView);

    _initDefineProp(this, 'page', _descriptor2, this);

    _initDefineProp(this, 'active', _descriptor3, this);

    this.element = element;
    this.container = container;
    this.compositionEngine = compositionEngine;
    this.pageLoader = pageLoader;
    this.viewSlot = viewSlot;

    this.element.pageLoader = new _onsenui2.default.PageLoader(this.load.bind(this), this.unload.bind(this));

    this.controller;
  }

  OnsNavigatorView.prototype.created = function created(owningView) {
    this.owningView = owningView;
  };

  OnsNavigatorView.prototype.bind = function bind(bindingContext, overrideContext) {
    this.container.viewModel = bindingContext;
    this.overrideContext = overrideContext;
  };

  OnsNavigatorView.prototype.load = function load(_ref, done) {
    var _this = this;

    var page = _ref.page,
        parent = _ref.parent,
        params = _ref.params;

    var config = {
      moduleId: page,
      model: params,
      skipActivation: true
    };
    this.pageLoader.loadPage(this, config).then(function (context) {
      _this.compositionEngine.createController(context).then(function (controller) {
        var pageElement = controller.view.firstChild;
        controller.automate(_this.overrideContext, _this.owningView);
        _this.viewSlot.add(controller.view);
        _this.controller = controller;
        done(pageElement);
      });
    });
  };

  OnsNavigatorView.prototype.unload = function unload(pageElement) {
    var controller = this.controller;
    this.viewSlot.remove(controller.view);
    controller.view.unbind();
  };

  return OnsNavigatorView;
}(), (_descriptor2 = _applyDecoratedDescriptor(_class7.prototype, 'page', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class7.prototype, 'active', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: null
})), _class7)) || _class6) || _class6) || _class6);
var OnsNavigator = exports.OnsNavigator = (_dec9 = (0, _aureliaTemplating.customElement)('ons-navigator'), _dec10 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaDependencyInjection.Container, _aureliaTemplating.CompositionEngine, PageLoader, _aureliaTemplating.ViewSlot), _dec9(_class9 = (0, _aureliaTemplating.noView)(_class9 = _dec10(_class9 = (_class10 = function () {
  function OnsNavigator(element, container, compositionEngine, pageLoader, viewSlot) {
    _classCallCheck(this, OnsNavigator);

    _initDefineProp(this, 'page', _descriptor4, this);

    this.element = element;
    this.container = container;
    this.compositionEngine = compositionEngine;
    this.pageLoader = pageLoader;
    this.viewSlot = viewSlot;

    this.element.pageLoader = new _onsenui2.default.PageLoader(this.load.bind(this), this.unload.bind(this));
    this._pushPage = this.element.pushPage.bind(element);
    this._popPage = this.element.popPage.bind(element);
    this.element.pushPage = this.pushPage.bind(this);
    this.element.popPage = this.popPage.bind(this);

    this.controllers = [];
  }

  OnsNavigator.prototype.created = function created(owningView) {
    this.owningView = owningView;
  };

  OnsNavigator.prototype.bind = function bind(bindingContext, overrideContext) {
    this.container.viewModel = bindingContext;
    this.overrideContext = overrideContext;
  };

  OnsNavigator.prototype.load = function load(_ref2, done) {
    var _this2 = this;

    var page = _ref2.page,
        parent = _ref2.parent,
        params = _ref2.params;

    this.compositionEngine.createController(this.nextPage).then(function (controller) {
      var pageElement = controller.view.firstChild;
      _this2.nextPage = null;
      controller.automate(_this2.overrideContext, _this2.owningView);
      _this2.viewSlot.add(controller.view);
      _this2.controllers.push(controller);
      done(pageElement);
    });
  };

  OnsNavigator.prototype.unload = function unload(pageElement) {
    var _this3 = this;

    var controller = this.controllers.pop();
    return invokeLifecycle(controller.viewModel, 'deactivate').then(function () {
      _this3.viewSlot.remove(controller.view);
      controller.view.unbind();
    });
  };

  OnsNavigator.prototype.pushPage = function pushPage(page, options) {
    var _this4 = this;

    options = options || {};
    var config = {
      moduleId: page,
      model: options.data || {}
    };
    return this.pageLoader.loadPage(this, config).then(function (context) {
      invokeLifecycle(context.viewModel, 'canActivate', context.model).then(function (canActivate) {
        if (canActivate) {
          _this4.nextPage = context;
          _this4._pushPage(page, options);
        }
      });
    });
  };

  OnsNavigator.prototype.popPage = function popPage(options) {
    var _this5 = this;

    var controller = this.controllers[this.controllers.length - 1];
    return invokeLifecycle(controller.viewModel, 'canDeactivate').then(function (canDeactivate) {
      if (canDeactivate) {
        _this5._popPage(options);
      }
    });
  };

  return OnsNavigator;
}(), (_descriptor4 = _applyDecoratedDescriptor(_class10.prototype, 'page', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: null
})), _class10)) || _class9) || _class9) || _class9);