'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnsBackButton = undefined;

var _dec, _dec2, _class;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaPal = require('aurelia-pal');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaRouter = require('aurelia-router');



var OnsBackButton = exports.OnsBackButton = (_dec = (0, _aureliaTemplating.customElement)('ons-back-button'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaRouter.Router), _dec(_class = (0, _aureliaTemplating.noView)(_class = _dec2(_class = function () {
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