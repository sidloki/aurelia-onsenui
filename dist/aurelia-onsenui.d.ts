import ons from 'onsenui';
import {
  inject,
  Container
} from 'aurelia-dependency-injection';
import {
  CompositionEngine,
  useView,
  customElement,
  noView,
  bindable,
  ViewSlot
} from 'aurelia-templating';
import {
  relativeToFile
} from 'aurelia-path';
import {
  Origin
} from 'aurelia-metadata';
import {
  DOM
} from 'aurelia-pal';
import {
  bindingMode
} from 'aurelia-binding';
export declare class PageLoader {
  constructor(compositionEngine?: any);
  loadPage(parent?: any, config?: any): any;
}
export declare class OnsInput {
  value: any;
  element: any;
  constructor(element?: any);
  onInput(): any;
  valueChanged(newValue?: any, oldValue?: any): any;
}

/**
 * Call a lifecycle method on a viewModel if it exists.
 * @function
 * @param instance The viewModel instance.
 * @param name The lifecycle method name.
 * @param model The model to pass to the lifecycle method.
 * @returns Promise The result of the lifecycle method.
 */
export declare function invokeLifecycle(instance?: any, name?: any, model?: any): any;
export declare class OnsNavigatorView {
  page: any;
  active: any;
  element: any;
  constructor(element?: any, container?: any, compositionEngine?: any, pageLoader?: any, viewSlot?: any);
  created(owningView?: any): any;
  bind(bindingContext?: any, overrideContext?: any): any;
  load({
    page,
    parent,
    params
  }?: {
    page?: any,
    parent?: any,
    params?: any
  }, done?: any): any;
  unload(pageElement?: any): any;
}
export declare class OnsNavigator {
  page: any;
  element: any;
  constructor(element?: any, container?: any, compositionEngine?: any, pageLoader?: any, viewSlot?: any);
  created(owningView?: any): any;
  bind(bindingContext?: any, overrideContext?: any): any;
  load({
    page,
    parent,
    params
  }?: {
    page?: any,
    parent?: any,
    params?: any
  }, done?: any): any;
  unload(pageElement?: any): any;
  pushPage(page?: any, options?: any): any;
  popPage(options?: any): any;
}