var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}



function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
import { Container, inject } from 'aurelia-dependency-injection';
import { DOM } from 'aurelia-pal';
import { bindable, CompositionEngine, CompositionTransaction, customElement, noView, ViewSlot, ViewLocator } from 'aurelia-templating';
import { Router } from 'aurelia-router';
import { RouterView } from 'aurelia-templating-router';

export var OnsNavigator = (_dec = customElement('ons-navigator'), _dec2 = inject(DOM.Element, Container, ViewSlot, Router, ViewLocator, CompositionTransaction, CompositionEngine), _dec(_class = noView(_class = _dec2(_class = (_class2 = function (_RouterView) {
  _inherits(OnsNavigator, _RouterView);

  function OnsNavigator(element, container, viewSlot, router, viewLocator, compositionTransaction, compositionEngine) {
    

    var _this = _possibleConstructorReturn(this, _RouterView.call(this, element, container, viewSlot, router, viewLocator, compositionTransaction, compositionEngine));

    _initDefineProp(_this, 'swapOrder', _descriptor, _this);

    _initDefineProp(_this, 'layoutView', _descriptor2, _this);

    _initDefineProp(_this, 'layoutViewModel', _descriptor3, _this);

    _initDefineProp(_this, 'layoutModel', _descriptor4, _this);

    _this.element.pageLoader = new ons.PageLoader(_this.load.bind(_this), _this.unload.bind(_this));

    _this.view;
    _this.viewStack = [];
    return _this;
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

  OnsNavigator.prototype.load = function load(_ref, done) {
    var _this2 = this;

    var page = _ref.page,
        parent = _ref.parent,
        params = _ref.params;

    var viewPortInstruction = params;
    var previousView = this.view;

    var work = function work() {
      var pageElement = _this2.view.fragment.firstElementChild;
      _this2.viewSlot.add(_this2.view);
      if (previousView) {
        _this2.viewStack.push(previousView);
      }
      _this2._notify();
      return done(pageElement);
    };

    var ready = function ready(owningView) {
      viewPortInstruction.controller.automate(_this2.overrideContext, owningView);
      if (_this2.compositionTransactionOwnershipToken) {
        return _this2.compositionTransactionOwnershipToken.waitForCompositionComplete().then(function () {
          _this2.compositionTransactionOwnershipToken = null;
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
}(RouterView), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'swapOrder', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'layoutView', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'layoutViewModel', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'layoutModel', [bindable], {
  enumerable: true,
  initializer: null
})), _class2)) || _class) || _class) || _class);