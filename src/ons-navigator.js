import ons from 'onsenui';
import {inject, Container} from 'aurelia-dependency-injection';
import {DOM} from 'aurelia-pal';
import {ViewSlot, CompositionEngine, customElement, noView, bindable} from 'aurelia-templating';
import {PageLoader} from './page-loader';
import {invokeLifecycle} from './lifecycle';

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
