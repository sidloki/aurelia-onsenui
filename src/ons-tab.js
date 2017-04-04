import ons from 'onsenui';
import {inject, Container} from 'aurelia-dependency-injection';
import {DOM} from 'aurelia-pal';
import {ViewSlot, CompositionEngine, customElement, noView, bindable} from 'aurelia-templating';
import {PageLoader} from './page-loader';

@customElement('ons-tab')
@noView
@inject(DOM.Element, Container, CompositionEngine, PageLoader, ViewSlot)
export class OnsTab {
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
        let pageElement = controller.view.fragment.firstElementChild;
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
