'use strict';

System.register(['./ons-input', './ons-navigator', './ons-tab'], function (_export, _context) {
  "use strict";

  function configure(config) {
    config.globalResources(['./ons-input', './ons-navigator', './ons-tab']);
  }

  _export('configure', configure);

  return {
    setters: [function (_onsInput) {
      var _exportObj = {};
      _exportObj.OnsInput = _onsInput.OnsInput;

      _export(_exportObj);
    }, function (_onsNavigator) {
      var _exportObj2 = {};
      _exportObj2.OnsNavigator = _onsNavigator.OnsNavigator;

      _export(_exportObj2);
    }, function (_onsTab) {
      var _exportObj3 = {};
      _exportObj3.OnsTab = _onsTab.OnsTab;

      _export(_exportObj3);
    }],
    execute: function () {}
  };
});