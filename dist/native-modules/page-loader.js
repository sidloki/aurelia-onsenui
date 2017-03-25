var _dec, _class;



import { inject } from 'aurelia-dependency-injection';
import { CompositionEngine, useView, customElement } from 'aurelia-templating';
import { relativeToFile } from 'aurelia-path';
import { Origin } from 'aurelia-metadata';

export var PageLoader = (_dec = inject(CompositionEngine), _dec(_class = function () {
  function PageLoader(compositionEngine) {
    

    this.compositionEngine = compositionEngine;
  }

  PageLoader.prototype.loadPage = function loadPage(parent, config) {
    var childContainer = parent.container.createChild();

    var viewModel = /\.html/.test(config.moduleId) ? createDynamicClass(config.moduleId) : relativeToFile(config.moduleId, Origin.get(parent.container.viewModel.constructor).moduleId);

    var instruction = {
      viewModel: viewModel,
      childContainer: childContainer,
      model: config.model
    };

    return this.compositionEngine.ensureViewModel(instruction);
  };

  return PageLoader;
}()) || _class);

function createDynamicClass(moduleId) {
  var _dec2, _dec3, _class2;

  var name = /([^\/^\?]+)\.html/i.exec(moduleId)[1];

  var DynamicClass = (_dec2 = customElement(name), _dec3 = useView(moduleId), _dec2(_class2 = _dec3(_class2 = function () {
    function DynamicClass() {
      
    }

    DynamicClass.prototype.bind = function bind(bindingContext) {
      this.$parent = bindingContext;
    };

    return DynamicClass;
  }()) || _class2) || _class2);


  return DynamicClass;
}