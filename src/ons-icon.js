import {inject} from 'aurelia-dependency-injection';
import {DOM} from 'aurelia-pal';
import {customElement, noView, bindable} from 'aurelia-templating';

@customElement('ons-icon')
@noView
@inject(DOM.Element)
export class OnsIcon {
  @bindable icon;

  constructor(element) {
    this.element = element;
  }

  iconChanged(newValue, oldValue) {
    this.element.setAttribute('icon', newValue);
  }
}
