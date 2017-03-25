'use strict';

System.register(['aurelia-dependency-injection', 'aurelia-pal', 'aurelia-templating', 'aurelia-binding'], function (_export, _context) {
  "use strict";

  var inject, DOM, customElement, noView, bindable, bindingMode, _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, OnsInput;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }, function (_aureliaPal) {
      DOM = _aureliaPal.DOM;
    }, function (_aureliaTemplating) {
      customElement = _aureliaTemplating.customElement;
      noView = _aureliaTemplating.noView;
      bindable = _aureliaTemplating.bindable;
    }, function (_aureliaBinding) {
      bindingMode = _aureliaBinding.bindingMode;
    }],
    execute: function () {
      _export('OnsInput', OnsInput = (_dec = customElement('ons-input'), _dec2 = inject(DOM.Element), _dec3 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec(_class = noView(_class = _dec2(_class = (_class2 = function () {
        function OnsInput(element) {
          _classCallCheck(this, OnsInput);

          _initDefineProp(this, 'value', _descriptor, this);

          this.element = element;
          this.element.oninput = this.onInput.bind(this);
        }

        OnsInput.prototype.onInput = function onInput() {
          this.value = this.element.value;
        };

        OnsInput.prototype.valueChanged = function valueChanged(newValue, oldValue) {
          this.element.value = newValue;
        };

        return OnsInput;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec3], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class) || _class));

      _export('OnsInput', OnsInput);
    }
  };
});