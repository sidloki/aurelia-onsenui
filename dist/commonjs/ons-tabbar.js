'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnsTabbar = undefined;

var _dec, _dec2, _class;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaPal = require('aurelia-pal');

var _aureliaTemplating = require('aurelia-templating');



var OnsTabbar = exports.OnsTabbar = (_dec = (0, _aureliaTemplating.customElement)('ons-tabbar'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element), _dec(_class = (0, _aureliaTemplating.noView)(_class = _dec2(_class = function () {
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