var _dec, _dec2, _class;

import { inject } from 'aurelia-dependency-injection';
import { DOM } from 'aurelia-pal';
import { customElement, noView } from 'aurelia-templating';

export let OnsTabbar = (_dec = customElement('ons-tabbar'), _dec2 = inject(DOM.Element), _dec(_class = noView(_class = _dec2(_class = class OnsTabbar {

  constructor(element) {
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
}) || _class) || _class) || _class);