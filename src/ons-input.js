import {inject} from 'aurelia-dependency-injection';
import {DOM} from 'aurelia-pal';
import {customElement, noView, bindable} from 'aurelia-templating';
import {bindingMode} from 'aurelia-binding';

@customElement('ons-input')
@noView
@inject(DOM.Element)
export class OnsInput {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  element;

  constructor(element) {
    this.element = element;
    this.element.oninput = this.onInput.bind(this);
  }

  onInput() {
    this.value = this.element.value;
  }

  valueChanged(newValue, oldValue) {
    this.element.value = newValue;
  }
}
