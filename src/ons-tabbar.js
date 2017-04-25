import {inject} from 'aurelia-dependency-injection';
import {DOM} from 'aurelia-pal';
import {customElement, noView} from 'aurelia-templating';

@customElement('ons-tabbar')
@noView
@inject(DOM.Element)
export class OnsTabbar {
  element;

  constructor(element) {
    // hack to remove au-content element
    let content = element.querySelector('au-content');
    content.parentNode.replaceChild(content.firstChild, content);

    this.element = element;
    this._switchPage = this.element._switchPage.bind(this.element);
    this.element._switchPage = this.switchPage.bind(this);
  }

  switchPage(element, options) {
    return this._switchPage(element, options).then(() => {
      element.view.attached();
    });
  }
}
