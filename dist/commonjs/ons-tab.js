'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnsTab = undefined;

var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

var _onsenui = require('onsenui');

var _onsenui2 = _interopRequireDefault(_onsenui);

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaPal = require('aurelia-pal');

var _aureliaTemplating = require('aurelia-templating');

var _pageLoader = require('./page-loader');

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

var OnsTab = exports.OnsTab = (_dec = (0, _aureliaTemplating.customElement)('ons-tab'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaDependencyInjection.Container, _aureliaTemplating.CompositionEngine, _pageLoader.PageLoader, _aureliaTemplating.ViewSlot), _dec(_class = (0, _aureliaTemplating.noView)(_class = _dec2(_class = (_class2 = function () {
  function OnsTab(element, container, compositionEngine, pageLoader, viewSlot) {
    

    _initDefineProp(this, 'page', _descriptor, this);

    _initDefineProp(this, 'active', _descriptor2, this);

    this.element = element;
    this.container = container;
    this.compositionEngine = compositionEngine;
    this.pageLoader = pageLoader;
    this.viewSlot = viewSlot;

    this.element.pageLoader = new _onsenui2.default.PageLoader(this.load.bind(this), this.unload.bind(this));

    this.controller;
  }

  OnsTab.prototype.created = function created(owningView) {
    this.owningView = owningView;
  };

  OnsTab.prototype.bind = function bind(bindingContext, overrideContext) {
    this.container.viewModel = bindingContext;
    this.overrideContext = overrideContext;
  };

  OnsTab.prototype.load = function load(_ref, done) {
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
        var pageElement = controller.view.fragment.firstElementChild;
        controller.automate(_this.overrideContext, _this.owningView);
        _this.viewSlot.add(controller.view);
        _this.controller = controller;
        done(pageElement);
      });
    });
  };

  OnsTab.prototype.unload = function unload(pageElement) {
    var controller = this.controller;
    this.viewSlot.remove(controller.view);
    controller.view.unbind();
  };

  return OnsTab;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'page', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'active', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: null
})), _class2)) || _class) || _class) || _class);