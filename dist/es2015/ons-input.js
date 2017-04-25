var _dec, _dec2, _dec3, _dec4, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

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

import { inject } from 'aurelia-dependency-injection';
import { DOM } from 'aurelia-pal';
import { customElement, noView, bindable } from 'aurelia-templating';
import { bindingMode } from 'aurelia-binding';
import ons from 'onsenui';

export let OnsInput = (_dec = customElement('ons-input'), _dec2 = inject(DOM.Element), _dec3 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec4 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec(_class = noView(_class = _dec2(_class = (_class2 = class OnsInput {

  constructor(element) {
    _initDefineProp(this, 'value', _descriptor, this);

    _initDefineProp(this, 'checked', _descriptor2, this);

    _initDefineProp(this, 'inputId', _descriptor3, this);

    _initDefineProp(this, 'disabled', _descriptor4, this);

    this.element = element;
    this.element.oninput = this.onInput.bind(this);
    this.element.onchange = this.onChange.bind(this);
    ons._contentReady(this.element, this.onContentReady.bind(this));
  }

  onContentReady() {
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
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec3], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'checked', [_dec4], {
  enumerable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'inputId', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'disabled', [bindable], {
  enumerable: true,
  initializer: null
})), _class2)) || _class) || _class) || _class);