var _dec, _dec2, _class;



import { inject } from 'aurelia-dependency-injection';
import { DOM } from 'aurelia-pal';
import { customElement, noView } from 'aurelia-templating';
import { Router } from 'aurelia-router';

export var OnsBackButton = (_dec = customElement('ons-back-button'), _dec2 = inject(DOM.Element, Router), _dec(_class = noView(_class = _dec2(_class = function () {
  function OnsBackButton(element, router) {
    

    this.router = router;
    this.element = element;
    this.element.onClick = this.onClick.bind(this);
  }

  OnsBackButton.prototype.onClick = function onClick() {
    this.router.navigateBack();
  };

  return OnsBackButton;
}()) || _class) || _class) || _class);