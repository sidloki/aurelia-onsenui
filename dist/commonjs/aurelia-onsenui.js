'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _onsInput = require('./ons-input');

Object.defineProperty(exports, 'OnsInput', {
  enumerable: true,
  get: function get() {
    return _onsInput.OnsInput;
  }
});

var _onsNavigator = require('./ons-navigator');

Object.defineProperty(exports, 'OnsNavigator', {
  enumerable: true,
  get: function get() {
    return _onsNavigator.OnsNavigator;
  }
});

var _onsTab = require('./ons-tab');

Object.defineProperty(exports, 'OnsTab', {
  enumerable: true,
  get: function get() {
    return _onsTab.OnsTab;
  }
});
exports.configure = configure;
function configure(config) {
  config.globalResources(['./ons-input', './ons-navigator', './ons-tab']);
}