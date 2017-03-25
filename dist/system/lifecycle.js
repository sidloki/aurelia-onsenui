'use strict';

System.register([], function (_export, _context) {
  "use strict";

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

  _export('invokeLifecycle', invokeLifecycle);

  return {
    setters: [],
    execute: function () {}
  };
});