define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.invokeLifecycle = invokeLifecycle;
  function invokeLifecycle(instance, name, model) {
    if (typeof instance[name] === 'function') {
      return Promise.resolve().then(function () {
        return instance[name](model);
      }).then(function (result) {
        if (result !== null && result !== undefined) {
          return result;
        }

        return true;
      });
    }

    return Promise.resolve(true);
  }
});