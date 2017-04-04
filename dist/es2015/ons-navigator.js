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
import { ViewSlot, CompositionEngine, customElement, noView, bindable } from 'aurelia-templating';
import { PageLoader } from './page-loader';
import { invokeLifecycle } from './lifecycle';

export let OnsNavigator = (_dec = customElement('ons-navigator'), _dec2 = inject(DOM.Element, Container, CompositionEngine, PageLoader, ViewSlot), _dec(_class = noView(_class = _dec2(_class = (_class2 = class OnsNavigator {

  constructor(element, container, compositionEngine, pageLoader, viewSlot) {
    _initDefineProp(this, 'page', _descriptor, this);

    this.element = element;
    this.container = container;
    this.compositionEngine = compositionEngine;
    this.pageLoader = pageLoader;
    this.viewSlot = viewSlot;

    this.element.pageLoader = new ons.PageLoader(this.load.bind(this), this.unload.bind(this));
    this._pushPage = this.element.pushPage.bind(element);
    this._popPage = this.element.popPage.bind(element);
    this.element.pushPage = this.pushPage.bind(this);
    this.element.popPage = this.popPage.bind(this);

    this.controllers = [];
  }

  created(owningView) {
    this.owningView = owningView;
  }

  bind(bindingContext, overrideContext) {
    this.container.viewModel = bindingContext;
    this.overrideContext = overrideContext;
  }

  load({ page, parent, params }, done) {
    this.compositionEngine.createController(this.nextPage).then(controller => {
      let pageElement = controller.view.fragment.firstElementChild;
      this.nextPage = null;
      controller.automate(this.overrideContext, this.owningView);
      this.viewSlot.add(controller.view);
      this.controllers.push(controller);
      done(pageElement);
    });
  }

  unload(pageElement) {
    let controller = this.controllers.pop();
    return invokeLifecycle(controller.viewModel, 'deactivate').then(() => {
      this.viewSlot.remove(controller.view);
      controller.view.unbind();
    });
  }

  pushPage(page, options) {
    options = options || {};
    let config = {
      moduleId: page,
      model: options.data || {}
    };
    return this.pageLoader.loadPage(this, config).then(context => {
      invokeLifecycle(context.viewModel, 'canActivate', context.model).then(canActivate => {
        if (canActivate) {
          this.nextPage = context;
          this._pushPage(page, options);
        }
      });
    });
  }

  popPage(options) {
    let controller = this.controllers[this.controllers.length - 1];
    return invokeLifecycle(controller.viewModel, 'canDeactivate').then(canDeactivate => {
      if (canDeactivate) {
        this._popPage(options);
      }
    });
  }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'page', [bindable], {
  enumerable: true,
  initializer: null
})), _class2)) || _class) || _class) || _class);