'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnsInput = undefined;

var _dec, _dec2, _dec3, _dec4, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaPal = require('aurelia-pal');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaBinding = require('aurelia-binding');

var _onsenui = require('onsenui');

var _onsenui2 = _interopRequireDefault(_onsenui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
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

var OnsInput = exports.OnsInput = (_dec = (0, _aureliaTemplating.customElement)('ons-input'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element), _dec3 = (0, _aureliaTemplating.bindable)({ defaultBindingMode: _aureliaBinding.bindingMode.twoWay }), _dec4 = (0, _aureliaTemplating.bindable)({ defaultBindingMode: _aureliaBinding.bindingMode.twoWay }), _dec(_class = (0, _aureliaTemplating.noView)(_class = _dec2(_class = (_class2 = function () {
  function OnsInput(element) {
    

    _initDefineProp(this, 'value', _descriptor, this);

    _initDefineProp(this, 'checked', _descriptor2, this);

    _initDefineProp(this, 'inputId', _descriptor3, this);

    _initDefineProp(this, 'disabled', _descriptor4, this);

    this.element = element;
    this.element.oninput = this.onInput.bind(this);
    this.element.onchange = this.onChange.bind(this);
    _onsenui2.default._contentReady(this.element, this.onContentReady.bind(this));
  }

  OnsInput.prototype.onContentReady = function onContentReady() {
    switch (this.element.type) {
      case 'radio':
        this.element.checked = this.value === this.checked;
        break;
      case 'checkbox':
        this.element.checked = this.checked.includes(this.value);
        break;
      default:
        break;
    }
  };

  OnsInput.prototype.onInput = function onInput() {
    this.value = this.element.value;
  };

  OnsInput.prototype.onChange = function onChange() {
    switch (this.element.type) {
      case 'radio':
        this.checked = this.value;
        break;
      case 'checkbox':
        var index = this.checked.indexOf(this.value);
        index > -1 ? this.checked.splice(index, index + 1) : this.checked.push(this.value);
        break;
      default:
        this.value = this.element.value;
        break;
    }
  };

  OnsInput.prototype.valueChanged = function valueChanged(newValue, oldValue) {
    this.element.value = newValue;
  };

  OnsInput.prototype.inputIdChanged = function inputIdChanged(newValue, oldValue) {
    this.element.setAttribute('input-id', newValue);
  };

  OnsInput.prototype.disabledChanged = function disabledChanged(newValue, oldValue) {
    if (newValue) {
      this.element.setAttribute('disabled', newValue);
    } else {
      this.element.removeAttribute('disabled');
    }
  };

  return OnsInput;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec3], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'checked', [_dec4], {
  enumerable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'inputId', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'disabled', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: null
})), _class2)) || _class) || _class) || _class);