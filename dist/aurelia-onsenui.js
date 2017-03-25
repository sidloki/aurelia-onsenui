import ons from 'onsenui';
import {inject,Container} from 'aurelia-dependency-injection';
import {CompositionEngine,useView,customElement,noView,bindable,ViewSlot} from 'aurelia-templating';
import {relativeToFile} from 'aurelia-path';
import {Origin} from 'aurelia-metadata';
import {DOM} from 'aurelia-pal';
import {bindingMode} from 'aurelia-binding';

@inject(CompositionEngine)
export class PageLoader {

  constructor(compositionEngine) {
    this.compositionEngine = compositionEngine;
  }

  loadPage(parent, config) {
    let childContainer = parent.container.createChild();

    let viewModel = /\.html/.test(config.moduleId)
      ? createDynamicClass(config.moduleId)
      : relativeToFile(config.moduleId, Origin.get(parent.container.viewModel.constructor).moduleId);

    let instruction = {
      viewModel: viewModel,
      childContainer: childContainer,
      model: config.model
    };

    return this.compositionEngine.ensureViewModel(instruction);
  }
}

function createDynamicClass(moduleId) {
  let name = /([^\/^\?]+)\.html/i.exec(moduleId)[1];

  @customElement(name)
  @useView(moduleId)
  class DynamicClass {
    bind(bindingContext) {
      this.$parent = bindingContext;
    }
  }

  return DynamicClass;
}

@customElement('ons-input')
@noView
@inject(DOM.Element)
export class OnsInput {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  element;

  constructor(element) {
    this.element = element;
    this.element.oninput = this.onInput.bind(this);
  }

  onInput() {
    this.value = this.element.value;
  }

  valueChanged(newValue, oldValue) {
    this.element.value = newValue;
  }
}

/**
 * Call a lifecycle method on a viewModel if it exists.
 * @function
 * @param instance The viewModel instance.
 * @param name The lifecycle method name.
 * @param model The model to pass to the lifecycle method.
 * @returns Promise The result of the lifecycle method.
 */
export function invokeLifecycle(instance, name, model) {
  if (typeof instance[name] === 'function') {
    return Promise.resolve().then(() => {
      return instance[name](model);
    }).then(function(result) {
      if (result !== null && result !== undefined) {
        return result;
      }

      return true;
    });
  }

  return Promise.resolve(true);
}

@customElement('ons-tab')
@noView
@inject(DOM.Element, Container, CompositionEngine, PageLoader, ViewSlot)
export class OnsNavigatorView {
  @bindable page;
  @bindable active;
  element;

  constructor(element, container, compositionEngine, pageLoader, viewSlot) {
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

  load({page, parent, params}, done) {
    let config = {
      moduleId: page,
      model: params,
      skipActivation: true
    };
    this.pageLoader.loadPage(this, config).then((context) => {
      this.compositionEngine.createController(context).then((controller) => {
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
}

@customElement('ons-navigator')
@noView
@inject(DOM.Element, Container, CompositionEngine, PageLoader, ViewSlot)
export class OnsNavigator {
  @bindable page;
  element;

  constructor(element, container, compositionEngine, pageLoader, viewSlot) {
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

  load({page, parent, params}, done) {
    this.compositionEngine.createController(this.nextPage).then((controller) => {
      let pageElement = controller.view.firstChild;
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
    return this.pageLoader.loadPage(this, config).then((context) => {
      invokeLifecycle(context.viewModel, 'canActivate', context.model).then((canActivate) => {
        if (canActivate) {
          this.nextPage = context;
          this._pushPage(page, options);
        }
      });
    });
  }

  popPage(options) {
    let controller = this.controllers[this.controllers.length - 1];
    return invokeLifecycle(controller.viewModel, 'canDeactivate').then((canDeactivate) => {
      if (canDeactivate) {
        this._popPage(options);
      }
    });
  }
}
