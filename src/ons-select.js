import {inject} from 'aurelia-dependency-injection';
import {DOM} from 'aurelia-pal';
import {customElement, noView, bindable} from 'aurelia-templating';
import {bindingMode} from 'aurelia-binding';

@customElement('ons-select')
@noView
@inject(DOM.Element)
export class OnsSelect {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;

  constructor(element) {
    // hack to remove au-content element
    let content = element.querySelector('au-content');
    content.parentNode.replaceChild(content.firstChild, content);

    this.element = element;
    this.element.onchange = this.onChange.bind(this);
  }

  attached() {
    this.element.value = this.value;
  }

  onChange() {
    this.value = this.element.value;
  }

  valueChanged(newValue, oldValue) {
    this.element.value = newValue;
  }
}
