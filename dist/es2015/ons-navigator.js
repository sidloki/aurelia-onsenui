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

export let OnsNavigator = (_dec = customElement('ons-navigator'), _dec2 = inject(DOM.Element, Container, ViewSlot, Router, ViewLocator, CompositionTransaction, CompositionEngine), _dec(_class = noView(_class = _dec2(_class = (_class2 = class OnsNavigator extends RouterView {

  constructor(element, container, viewSlot, router, viewLocator, compositionTransaction, compositionEngine) {
    super(element, container, viewSlot, router, viewLocator, compositionTransaction, compositionEngine);

    _initDefineProp(this, 'swapOrder', _descriptor, this);

    _initDefineProp(this, 'layoutView', _descriptor2, this);

    _initDefineProp(this, 'layoutViewModel', _descriptor3, this);

    _initDefineProp(this, 'layoutModel', _descriptor4, this);

    this.element.pageLoader = new ons.PageLoader(this.load.bind(this), this.unload.bind(this));

    this.view;
    this.viewStack = [];
  }

  swap(viewPortInstruction) {
    let router = this.router;
    if (router.isNavigatingBack) {
      let options = router.currentInstruction.previousInstruction.config.settings.navigator || {};
      options.data = viewPortInstruction;
      return this.element.popPage(options);
    }
    let options = router.currentInstruction.config.settings.navigator || {};
    options.data = viewPortInstruction;
    return this.element.pushPage(viewPortInstruction.moduleId, options);
  }

  load({ page, parent, params }, done) {
    let viewPortInstruction = params;
    let previousView = this.view;

    let work = () => {
      let pageElement = this.view.fragment.firstElementChild;
      this.viewSlot.add(this.view);
      if (previousView) {
        this.viewStack.push(previousView);
      }
      this._notify();
      return done(pageElement);
    };

    let ready = owningView => {
      viewPortInstruction.controller.automate(this.overrideContext, owningView);
      if (this.compositionTransactionOwnershipToken) {
        return this.compositionTransactionOwnershipToken.waitForCompositionComplete().then(() => {
          this.compositionTransactionOwnershipToken = null;
          return work();
        });
      }

      return work();
    };

    this.view = viewPortInstruction.controller.view;

    return ready(this.owningView);
  }

  unload(pageElement) {
    this.viewSlot.remove(this.view);
    this.view.unbind();
    this.view = this.viewStack.pop();
  }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'swapOrder', [bindable], {
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