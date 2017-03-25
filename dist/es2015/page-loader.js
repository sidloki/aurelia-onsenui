var _dec, _class;

import { inject } from 'aurelia-dependency-injection';
import { CompositionEngine, useView, customElement } from 'aurelia-templating';
import { relativeToFile } from 'aurelia-path';
import { Origin } from 'aurelia-metadata';

export let PageLoader = (_dec = inject(CompositionEngine), _dec(_class = class PageLoader {

  constructor(compositionEngine) {
    this.compositionEngine = compositionEngine;
  }

  loadPage(parent, config) {
    let childContainer = parent.container.createChild();

    let viewModel = /\.html/.test(config.moduleId) ? createDynamicClass(config.moduleId) : relativeToFile(config.moduleId, Origin.get(parent.container.viewModel.constructor).moduleId);

    let instruction = {
      viewModel: viewModel,
      childContainer: childContainer,
      model: config.model
    };

    return this.compositionEngine.ensureViewModel(instruction);
  }
}) || _class);

function createDynamicClass(moduleId) {
  var _dec2, _dec3, _class2;

  let name = /([^\/^\?]+)\.html/i.exec(moduleId)[1];

  let DynamicClass = (_dec2 = customElement(name), _dec3 = useView(moduleId), _dec2(_class2 = _dec3(_class2 = class DynamicClass {
    bind(bindingContext) {
      this.$parent = bindingContext;
    }
  }) || _class2) || _class2);


  return DynamicClass;
}