var _dec, _dec2, _class;



import { inject } from 'aurelia-dependency-injection';
import { DOM } from 'aurelia-pal';
import { customElement, noView } from 'aurelia-templating';

export var OnsTabbar = (_dec = customElement('ons-tabbar'), _dec2 = inject(DOM.Element), _dec(_class = noView(_class = _dec2(_class = function () {
  function OnsTabbar(element) {
    

    var content = element.querySelector('au-content');
    content.parentNode.replaceChild(content.firstChild, content);

    this.element = element;
    this._switchPage = this.element._switchPage.bind(this.element);
    this.element._switchPage = this.switchPage.bind(this);
  }

  OnsTabbar.prototype.switchPage = function switchPage(element, options) {
    return this._switchPage(element, options).then(function () {
      element.view.attached();
    });
  };

  return OnsTabbar;
}()) || _class) || _class) || _class);