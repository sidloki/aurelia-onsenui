var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

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
import { ViewSlot, CompositionEngine, customElement, noView, bindable } from 'aurelia-templating';
import { PageLoader } from './page-loader';

export let OnsNavigatorView = (_dec = customElement('ons-tab'), _dec2 = inject(DOM.Element, Container, CompositionEngine, PageLoader, ViewSlot), _dec(_class = noView(_class = _dec2(_class = (_class2 = class OnsNavigatorView {

  constructor(element, container, compositionEngine, pageLoader, viewSlot) {
    _initDefineProp(this, 'page', _descriptor, this);

    _initDefineProp(this, 'active', _descriptor2, this);

    this.element = element;
    this.container = container;
    this.compositionEngine = compositionEngine;
    this.pageLoader = pageLoader;
    this.viewSlot = viewSlot;

    this.element.pageLoader = new ons.PageLoader(this.load.bind(this), this.unload.bind(this));

    this.controller;
  }

  created(owningView) {
    this.owningView = owningView;
  }

  bind(bindingContext, overrideContext) {
    this.container.viewModel = bindingContext;
    this.overrideContext = overrideContext;
  }

  load({ page, parent, params }, done) {
    let config = {
      moduleId: page,
      model: params,
      skipActivation: true
    };
    this.pageLoader.loadPage(this, config).then(context => {
      this.compositionEngine.createController(context).then(controller => {
        let pageElement = controller.view.firstChild;
        controller.automate(this.overrideContext, this.owningView);
        this.viewSlot.add(controller.view);
        this.controller = controller;
        done(pageElement);
      });
    });
  }

  unload(pageElement) {
    let controller = this.controller;
    this.viewSlot.remove(controller.view);
    controller.view.unbind();
  }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'page', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'active', [bindable], {
  enumerable: true,
  initializer: null
})), _class2)) || _class) || _class) || _class);