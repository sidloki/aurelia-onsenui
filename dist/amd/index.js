define(['exports', './aurelia-onsenui'], function (exports, _aureliaOnsenui) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_aureliaOnsenui).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _aureliaOnsenui[key];
      }
    });
  });
});