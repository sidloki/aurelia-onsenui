var _dec, _dec2, _class;

import { inject } from 'aurelia-dependency-injection';
import { DOM } from 'aurelia-pal';
import { customElement, noView } from 'aurelia-templating';
import { Router } from 'aurelia-router';

export let OnsBackButton = (_dec = customElement('ons-back-button'), _dec2 = inject(DOM.Element, Router), _dec(_class = noView(_class = _dec2(_class = class OnsBackButton {

  constructor(element, router) {
    this.router = router;
    this.element = element;
    this.element.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.router.navigateBack();
  }
}) || _class) || _class) || _class);