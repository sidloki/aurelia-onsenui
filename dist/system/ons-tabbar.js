'use strict';

System.register(['aurelia-dependency-injection', 'aurelia-pal', 'aurelia-templating'], function (_export, _context) {
  "use strict";

  var inject, DOM, customElement, noView, _dec, _dec2, _class, OnsTabbar;

  

  return {
    setters: [function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }, function (_aureliaPal) {
      DOM = _aureliaPal.DOM;
    }, function (_aureliaTemplating) {
      customElement = _aureliaTemplating.customElement;
      noView = _aureliaTemplating.noView;
    }],
    execute: function () {
      _export('OnsTabbar', OnsTabbar = (_dec = customElement('ons-tabbar'), _dec2 = inject(DOM.Element), _dec(_class = noView(_class = _dec2(_class = function () {
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
      }()) || _class) || _class) || _class));

      _export('OnsTabbar', OnsTabbar);
    }
  };
});