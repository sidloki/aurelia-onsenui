var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

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

import ons from 'onsenui';
import { inject, Container } from 'aurelia-dependency-injection';
import { DOM } from 'aurelia-pal';
import { ViewSlot, ViewResources, CompositionEngine, customElement, noView, bindable } from 'aurelia-templating';

var elementAttributes = ['page', 'icon', 'active-icon', 'label', 'badge', 'active'];

export var OnsTab = (_dec = customElement('ons-tab'), _dec2 = inject(DOM.Element, Container, CompositionEngine, ViewSlot, ViewResources), _dec(_class = noView(_class = _dec2(_class = (_class2 = function () {
  function OnsTab(element, container, compositionEngine, viewSlot, viewResources) {
    

    _initDefineProp(this, 'model', _descriptor, this);

    this.element = element;
    this.container = container;
    this.compositionEngine = compositionEngine;
    this.viewSlot = viewSlot;
    this.viewResources = viewResources;

    this.element.pageLoader = new ons.PageLoader(this.load.bind(this), this.unload.bind(this));
  }

  OnsTab.prototype.created = function created(owningView) {
    this.owningView = owningView;
  };

  OnsTab.prototype.bind = function bind(bindingContext, overrideContext) {
    var _this = this;

    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;
    Object.keys(this.model).forEach(function (key) {
      if (elementAttributes.indexOf(key) > -1) {
        _this.element.setAttribute(key, _this.model[key]);
      }
    });
  };

  OnsTab.prototype.unbind = function unbind(bindingContext, overrideContext) {
    this.bindingContext = null;
    this.overrideContext = null;
  };

  OnsTab.prototype.load = function load(_ref, done) {
    var _this2 = this;

    var page = _ref.page,
        parent = _ref.parent,
        params = _ref.params;

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
      var pageElement = controller.view.fragment.querySelector('ons-page');
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
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'model', [bindable], {
  enumerable: true,
  initializer: null
})), _class2)) || _class) || _class) || _class);

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