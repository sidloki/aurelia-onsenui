'use strict';

System.register(['aurelia-dependency-injection', 'aurelia-pal', 'aurelia-templating', 'aurelia-router'], function (_export, _context) {
  "use strict";

  var inject, DOM, customElement, noView, Router, _dec, _dec2, _class, OnsBackButton;

  

  return {
    setters: [function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }, function (_aureliaPal) {
      DOM = _aureliaPal.DOM;
    }, function (_aureliaTemplating) {
      customElement = _aureliaTemplating.customElement;
      noView = _aureliaTemplating.noView;
    }, function (_aureliaRouter) {
      Router = _aureliaRouter.Router;
    }],
    execute: function () {
      _export('OnsBackButton', OnsBackButton = (_dec = customElement('ons-back-button'), _dec2 = inject(DOM.Element, Router), _dec(_class = noView(_class = _dec2(_class = function () {
        function OnsBackButton(element, router) {
          

          this.router = router;
          this.element = element;
          this.element.onClick = this.onClick.bind(this);
        }

        OnsBackButton.prototype.onClick = function onClick() {
          this.router.navigateBack();
        };

        return OnsBackButton;
      }()) || _class) || _class) || _class));

      _export('OnsBackButton', OnsBackButton);
    }
  };
});