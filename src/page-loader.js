import {inject} from 'aurelia-dependency-injection';
import {CompositionEngine, useView, customElement} from 'aurelia-templating';
import {relativeToFile} from 'aurelia-path';
import {Origin} from 'aurelia-metadata';

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
