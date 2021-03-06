'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnsIcon = undefined;

var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaPal = require('aurelia-pal');

var _aureliaTemplating = require('aurelia-templating');

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

var OnsIcon = exports.OnsIcon = (_dec = (0, _aureliaTemplating.customElement)('ons-icon'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element), _dec(_class = (0, _aureliaTemplating.noView)(_class = _dec2(_class = (_class2 = function () {
  function OnsIcon(element) {
    

    _initDefineProp(this, 'icon', _descriptor, this);

    this.element = element;
  }

  OnsIcon.prototype.iconChanged = function iconChanged(newValue, oldValue) {
    this.element.setAttribute('icon', newValue);
  };

  return OnsIcon;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'icon', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: null
})), _class2)) || _class) || _class) || _class);