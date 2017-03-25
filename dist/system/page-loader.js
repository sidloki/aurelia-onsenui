'use strict';

System.register(['aurelia-dependency-injection', 'aurelia-templating', 'aurelia-path', 'aurelia-metadata'], function (_export, _context) {
  "use strict";

  var inject, CompositionEngine, useView, customElement, relativeToFile, Origin, _dec, _class, PageLoader;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function createDynamicClass(moduleId) {
    var _dec2, _dec3, _class2;

    var name = /([^\/^\?]+)\.html/i.exec(moduleId)[1];

    var DynamicClass = (_dec2 = customElement(name), _dec3 = useView(moduleId), _dec2(_class2 = _dec3(_class2 = function () {
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
  return {
    setters: [function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }, function (_aureliaTemplating) {
      CompositionEngine = _aureliaTemplating.CompositionEngine;
      useView = _aureliaTemplating.useView;
      customElement = _aureliaTemplating.customElement;
    }, function (_aureliaPath) {
      relativeToFile = _aureliaPath.relativeToFile;
    }, function (_aureliaMetadata) {
      Origin = _aureliaMetadata.Origin;
    }],
    execute: function () {
      _export('PageLoader', PageLoader = (_dec = inject(CompositionEngine), _dec(_class = function () {
        function PageLoader(compositionEngine) {
          _classCallCheck(this, PageLoader);

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
      }()) || _class));

      _export('PageLoader', PageLoader);
    }
  };
});