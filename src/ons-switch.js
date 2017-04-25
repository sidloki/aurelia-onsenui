import {inject} from 'aurelia-dependency-injection';
import {DOM} from 'aurelia-pal';
import {customElement, noView, bindable} from 'aurelia-templating';
import {bindingMode} from 'aurelia-binding';

@customElement('ons-switch')
@noView
@inject(DOM.Element)
export class OnsSwitch {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  element;

  constructor(element) {
    this.element = element;
    this.element.onchange = this.onChange.bind(this);
  }

  onChange() {
    this.value = this.element.checked;
  }

  valueChanged(newValue, oldValue) {
    this.element.checked = newValue;
  }
}
