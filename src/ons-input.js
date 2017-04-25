import {inject} from 'aurelia-dependency-injection';
import {DOM} from 'aurelia-pal';
import {customElement, noView, bindable} from 'aurelia-templating';
import {bindingMode} from 'aurelia-binding';

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
