define(['exports', './ons-input', './ons-navigator', './ons-tab'], function (exports, _onsInput, _onsNavigator, _onsTab) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'OnsInput', {
    enumerable: true,
    get: function () {
      return _onsInput.OnsInput;
    }
  });
  Object.defineProperty(exports, 'OnsNavigator', {
    enumerable: true,
    get: function () {
      return _onsNavigator.OnsNavigator;
    }
  });
  Object.defineProperty(exports, 'OnsTab', {
    enumerable: true,
    get: function () {
      return _onsTab.OnsTab;
    }
  });
  exports.configure = configure;
  function configure(config) {
    config.globalResources(['./ons-input', './ons-navigator', './ons-tab']);
  }
});