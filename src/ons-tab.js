import ons from 'onsenui';
import {inject, Container} from 'aurelia-dependency-injection';
import {DOM} from 'aurelia-pal';
import {ViewSlot, ViewResources, CompositionEngine, customElement, noView, bindable} from 'aurelia-templating';

const elementAttributes = ['page', 'icon', 'active-icon', 'label', 'badge', 'active'];

@customElement('ons-tab')
@noView
@inject(DOM.Element, Container, CompositionEngine, ViewSlot, ViewResources)
export class OnsTab {
  @bindable model;
  element;

  constructor(element, container, compositionEngine, viewSlot, viewResources) {
    this.element = element;
    this.container = container;
    this.compositionEngine = compositionEngine;
    this.viewSlot = viewSlot;
    this.viewResources = viewResources;

    this.element.pageLoader = new ons.PageLoader(this.load.bind(this), this.unload.bind(this));
  }

  created(owningView) {
    this.owningView = owningView;
  }

  bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;
    Object.entries(this.model).forEach(([key, value]) => {
      if (elementAttributes.indexOf(key) > -1) {
        this.element.setAttribute(key, value);
      }
    });
  }

  unbind(bindingContext, overrideContext) {
    this.bindingContext = null;
    this.overrideContext = null;
  }

  load({page, parent, params}, done) {
    let instruction = {
      container: this.container,
      model: this.model,
      viewResources: this.viewResources
    };
    if (/\.html/.test(page)) {
      instruction.view = page;
    } else {
      instruction.viewModel = page;
    }
    this.compositionEngine.createController(instruction).then((controller) => {
      let pageElement = controller.view.fragment.firstElementChild;
      controller.automate(this.overrideContext, this.owningView);
      pageElement.view = controller.view;
      done(pageElement);
    });
  }

  unload(pageElement) {
    return invokeLifecycle(pageElement.view.controller.viewModel, 'deactivate').then(() => {
      pageElement.view.detached();
      pageElement.view.unbind();
    });
  }
}

function invokeLifecycle(instance, name, model) {
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
