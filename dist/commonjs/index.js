'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configure = configure;

var _aureliaPal = require('aurelia-pal');

function configure(config) {
  config.globalResources([_aureliaPal.PLATFORM.moduleName('./ons-input'), _aureliaPal.PLATFORM.moduleName('./ons-navigator'), _aureliaPal.PLATFORM.moduleName('./ons-tab')]);
}