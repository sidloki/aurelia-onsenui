import ons from 'onsenui';
import * as LogManager from 'aurelia-logging';
import {inject,Container} from 'aurelia-dependency-injection';
import {DOM} from 'aurelia-pal';
import {customElement,noView,ViewSlot,ViewResources,CompositionEngine,bindable,CompositionTransaction,ViewLocator} from 'aurelia-templating';
import {bindingMode} from 'aurelia-binding';
import {Router,PipelineProvider,AppRouter,isNavigationCommand} from 'aurelia-router';
import {RouterView} from 'aurelia-templating-router';
import {History} from 'aurelia-history';
import {EventAggregator} from 'aurelia-event-aggregator';

@customElement('ons-tabbar')
@noView
@inject(DOM.Element)
export class OnsTabbar {
  element;

  constructor(element) {
    // hack to remove au-content element
    let content = element.querySelector('au-content');
    content.parentNode.replaceChild(content.firstChild, content);

    this.element = element;
    this._switchPage = this.element._switchPage.bind(this.element);
    this.element._switchPage = this.switchPage.bind(this);
  }

  switchPage(element, options) {
    return this._switchPage(element, options).then(() => {
      element.view.attached();
    });
  }
}

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
    Object.keys(this.model).forEach(key => {
      if (elementAttributes.indexOf(key) > -1) {
        this.element.setAttribute(key, this.model[key]);
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
      let pageElement = controller.view.fragment.querySelector('ons-page');
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

@customElement('ons-switch')
@noView
@inject(DOM.Element)
export class OnsSwitch {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  element;

  constructor(element) {
    this.element = element;
    this.element.onchange = this.onChange.bind(this);
  }

  onChange() {
    this.value = this.element.checked;
  }

  valueChanged(newValue, oldValue) {
    this.element.checked = newValue;
  }
}

@customElement('ons-select')
@noView
@inject(DOM.Element)
export class OnsSelect {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;

  constructor(element) {
    // hack to remove au-content element
    let content = element.querySelector('au-content');
    content.parentNode.replaceChild(content.firstChild, content);

    this.element = element;
    this.element.onchange = this.onChange.bind(this);
  }

  attached() {
    this.element.value = this.value;
  }

  onChange() {
    this.value = this.element.value;
  }

  valueChanged(newValue, oldValue) {
    this.element.value = newValue;
  }
}

@customElement('ons-range')
@noView
@inject(DOM.Element)
export class OnsRange {
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

@customElement('ons-navigator')
@noView
@inject(DOM.Element, Container, ViewSlot, Router, ViewLocator, CompositionTransaction, CompositionEngine)
export class OnsNavigator extends RouterView {
  @bindable swapOrder;
  @bindable layoutView;
  @bindable layoutViewModel;
  @bindable layoutModel;
  element;

  constructor(element, container, viewSlot, router, viewLocator, compositionTransaction, compositionEngine) {
    super(element, container, viewSlot, router, viewLocator, compositionTransaction, compositionEngine);

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

  load({page, parent, params}, done) {
    let viewPortInstruction = params;
    let previousView = this.view;

    let work = () => {
      let pageElement = this.view.fragment.querySelector('ons-page');
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
}

@customElement('ons-input')
@noView
@inject(DOM.Element)
export class OnsInput {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) checked;
  @bindable inputId;
  @bindable disabled;
  element;

  constructor(element) {
    this.element = element;
    this.element.oninput = this.onInput.bind(this);
    this.element.onchange = this.onChange.bind(this);
    ons._contentReady(this.element, this.onContentReady.bind(this));
  }

  onContentReady() {
    switch (this.element.type) {
      case 'radio':
        this.element.checked =  this.value === this.checked;
        break;
      case 'checkbox':
        this.element.checked =  this.checked.includes(this.value);
        break;
      default:
        break;
    }
  }

  onInput() {
    this.value = this.element.value;
  }

  onChange() {
    switch (this.element.type) {
      case 'radio':
        this.checked = this.value;
        break;
      case 'checkbox':
        let index = this.checked.indexOf(this.value);
        index > -1 ? this.checked.splice(index, index + 1) : this.checked.push(this.value);
        break;
      default:
        this.value = this.element.value;
        break;
    }
  }

  valueChanged(newValue, oldValue) {
    this.element.value = newValue;
  }

  inputIdChanged(newValue, oldValue) {
    this.element.setAttribute('input-id', newValue);
  }

  disabledChanged(newValue, oldValue) {
    if (newValue) {
      this.element.setAttribute('disabled', newValue);
    } else {
      this.element.removeAttribute('disabled');
    }
  }
}

@customElement('ons-back-button')
@noView
@inject(DOM.Element, Router)
export class OnsBackButton {

  constructor(element, router) {
    this.router = router;
    this.element = element;
    this.element.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.router.navigateBack();
  }
}

const logger = LogManager.getLogger('app-router');

@inject(Container, History, PipelineProvider, EventAggregator)
export class OnsRouter extends AppRouter {

  constructor(container, history, piplineProvider, events) {
    super(container, history, piplineProvider, events);
  }

  _dequeueInstruction(instructionCount) {
    return Promise.resolve().then(() => {
      if (this.isNavigating && !instructionCount) {
        return undefined;
      }

      let instruction = this._queue.shift();
      this._queue.length = 0;

      if (!instruction) {
        return undefined;
      }

      this.isNavigating = true;

      let navtracker = this.history.getState('NavigationTracker');
      if (!navtracker && !this.currentNavigationTracker) {
        this.isNavigatingFirst = true;
        this.isNavigatingNew = true;
      } else if (!navtracker) {
        this.isNavigatingNew = true;
      } else if (!this.currentNavigationTracker) {
        this.isNavigatingRefresh = true;
      } else if (this.currentNavigationTracker < navtracker) {
        this.isNavigatingForward = true;
      } else if (this.currentNavigationTracker > navtracker) {
        this.isNavigatingBack = true;
      }
      if (!navtracker) {
        navtracker = Date.now();
        this.history.setState('NavigationTracker', navtracker);
      }
      this.currentNavigationTracker = navtracker;

      instruction.previousInstruction = this.currentInstruction;

      if (!instructionCount) {
        this.events.publish('router:navigation:processing', { instruction });
      } else if (instructionCount === this.maxInstructionCount - 1) {
        logger.error(`${instructionCount + 1} navigation instructions have been attempted without success. Restoring last known good location.`);
        restorePreviousLocation(this);
        return this._dequeueInstruction(instructionCount + 1);
      } else if (instructionCount > this.maxInstructionCount) {
        throw new Error('Maximum navigation attempts exceeded. Giving up.');
      }

      let pipeline = this.pipelineProvider.createPipeline();

      return pipeline
        .run(instruction)
        .then(result => processResult(instruction, result, instructionCount, this))
        .catch(error => {
          return { output: error instanceof Error ? error : new Error(error) };
        })
        .then(result => resolveInstruction(instruction, result, !!instructionCount, this));
    });
  }
}

function processResult(instruction, result, instructionCount, router) {
  if (!(result && 'completed' in result && 'output' in result)) {
    result = result || {};
    result.output = new Error(`Expected router pipeline to return a navigation result, but got [${JSON.stringify(result)}] instead.`);
  }

  let finalResult = null;
  if (isNavigationCommand(result.output)) {
    result.output.navigate(router);
  } else {
    finalResult = result;

    if (!result.completed) {
      if (result.output instanceof Error) {
        logger.error(result.output);
      }

      restorePreviousLocation(router);
    }
  }

  return router._dequeueInstruction(instructionCount + 1)
    .then(innerResult => finalResult || innerResult || result);
}

function resolveInstruction(instruction, result, isInnerInstruction, router) {
  instruction.resolve(result);

  let eventArgs = { instruction, result };
  if (!isInnerInstruction) {
    router.isNavigating = false;
    router.isExplicitNavigation = false;
    router.isExplicitNavigationBack = false;
    router.isNavigatingFirst = false;
    router.isNavigatingNew = false;
    router.isNavigatingRefresh = false;
    router.isNavigatingForward = false;
    router.isNavigatingBack = false;

    let eventName;

    if (result.output instanceof Error) {
      eventName = 'error';
    } else if (!result.completed) {
      eventName = 'canceled';
    } else {
      let queryString = instruction.queryString ? ('?' + instruction.queryString) : '';
      router.history.previousLocation = instruction.fragment + queryString;
      eventName = 'success';
    }

    router.events.publish(`router:navigation:${eventName}`, eventArgs);
    router.events.publish('router:navigation:complete', eventArgs);
  } else {
    router.events.publish('router:navigation:child:complete', eventArgs);
  }

  return result;
}

function restorePreviousLocation(router) {
  let previousLocation = router.history.previousLocation;
  if (previousLocation) {
    router.navigate(router.history.previousLocation, { trigger: false, replace: true });
  } else if (router.fallbackRoute) {
    router.navigate(router.fallbackRoute, { trigger: true, replace: true });
  } else {
    logger.error('Router navigation failed, and no previous location or fallbackRoute could be restored.');
  }
}
