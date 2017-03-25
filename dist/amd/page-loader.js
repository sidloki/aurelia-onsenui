define(['exports', 'aurelia-dependency-injection', 'aurelia-templating', 'aurelia-path', 'aurelia-metadata'], function (exports, _aureliaDependencyInjection, _aureliaTemplating, _aureliaPath, _aureliaMetadata) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PageLoader = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var PageLoader = exports.PageLoader = (_dec = (0, _aureliaDependencyInjection.inject)(_aureliaTemplating.CompositionEngine), _dec(_class = function () {
    function PageLoader(compositionEngine) {
      _classCallCheck(this, PageLoader);

      this.compositionEngine = compositionEngine;
    }

    PageLoader.prototype.loadPage = function loadPage(parent, config) {
      var childContainer = parent.container.createChild();

      var viewModel = /\.html/.test(config.moduleId) ? createDynamicClass(config.moduleId) : (0, _aureliaPath.relativeToFile)(config.moduleId, _aureliaMetadata.Origin.get(parent.container.viewModel.constructor).moduleId);

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

    var DynamicClass = (_dec2 = (0, _aureliaTemplating.customElement)(name), _dec3 = (0, _aureliaTemplating.useView)(moduleId), _dec2(_class2 = _dec3(_class2 = function () {
      function DynamicClass() {
        _classCallCheck(this, DynamicClass);
      }

      DynamicClass.prototype.bind = function bind(bindingContext) {
        this.$parent = bindingContext;
      };

      return DynamicClass;
    }()) || _class2) || _class2);


    return DynamicClass;
  }
});