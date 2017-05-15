import ons from 'onsenui';
import * as LogManager from 'aurelia-logging';
import {
  inject,
  Container
} from 'aurelia-dependency-injection';
import {
  DOM
} from 'aurelia-pal';
import {
  customElement,
  noView,
  ViewSlot,
  ViewResources,
  CompositionEngine,
  bindable,
  CompositionTransaction,
  ViewLocator
} from 'aurelia-templating';
import {
  bindingMode
} from 'aurelia-binding';
import {
  Router,
  PipelineProvider,
  AppRouter,
  isNavigationCommand
} from 'aurelia-router';
import {
  RouterView
} from 'aurelia-templating-router';
import {
  History
} from 'aurelia-history';
import {
  EventAggregator
} from 'aurelia-event-aggregator';
export declare class OnsTabbar {
  element: any;
  constructor(element?: any);
  switchPage(element?: any, options?: any): any;
}
export declare class OnsTab {
  model: any;
  element: any;
  constructor(element?: any, container?: any, compositionEngine?: any, viewSlot?: any, viewResources?: any);
  created(owningView?: any): any;
  bind(bindingContext?: any, overrideContext?: any): any;
  unbind(bindingContext?: any, overrideContext?: any): any;
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
export declare class OnsSwitch {
  value: any;
  element: any;
  constructor(element?: any);
  onChange(): any;
  valueChanged(newValue?: any, oldValue?: any): any;
}
export declare class OnsSelect {
  value: any;
  constructor(element?: any);
  attached(): any;
  onChange(): any;
  valueChanged(newValue?: any, oldValue?: any): any;
}
export declare class OnsRange {
  value: any;
  element: any;
  constructor(element?: any);
  onInput(): any;
  valueChanged(newValue?: any, oldValue?: any): any;
}
export declare class OnsNavigator extends RouterView {
  swapOrder: any;
  layoutView: any;
  layoutViewModel: any;
  layoutModel: any;
  element: any;
  constructor(element?: any, container?: any, viewSlot?: any, router?: any, viewLocator?: any, compositionTransaction?: any, compositionEngine?: any);
  swap(viewPortInstruction?: any): any;
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
export declare class OnsInput {
  value: any;
  checked: any;
  inputId: any;
  disabled: any;
  element: any;
  constructor(element?: any);
  onContentReady(): any;
  onInput(): any;
  onChange(): any;
  valueChanged(newValue?: any, oldValue?: any): any;
  inputIdChanged(newValue?: any, oldValue?: any): any;
  disabledChanged(newValue?: any, oldValue?: any): any;
}
export declare class OnsIcon {
  icon: any;
  constructor(element?: any);
  iconChanged(newValue?: any, oldValue?: any): any;
}
export declare class OnsBackButton {
  constructor(element?: any, router?: any);
  onClick(): any;
}
export declare class OnsRouter extends AppRouter {
  constructor(container?: any, history?: any, piplineProvider?: any, events?: any);
}