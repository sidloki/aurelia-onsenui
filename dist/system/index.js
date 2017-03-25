'use strict';

System.register(['aurelia-pal'], function (_export, _context) {
  "use strict";

  var PLATFORM;
  function configure(config) {
    config.globalResources([PLATFORM.moduleName('./ons-input'), PLATFORM.moduleName('./ons-navigator'), PLATFORM.moduleName('./ons-tab')]);
  }

  _export('configure', configure);

  return {
    setters: [function (_aureliaPal) {
      PLATFORM = _aureliaPal.PLATFORM;
    }],
    execute: function () {}
  };
});