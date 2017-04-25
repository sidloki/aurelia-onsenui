'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnsRouter = undefined;

var _dec, _class;

var _aureliaLogging = require('aurelia-logging');

var LogManager = _interopRequireWildcard(_aureliaLogging);

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaHistory = require('aurelia-history');

var _aureliaRouter = require('aurelia-router');

var _aureliaEventAggregator = require('aurelia-event-aggregator');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }



function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var logger = LogManager.getLogger('app-router');

var OnsRouter = exports.OnsRouter = (_dec = (0, _aureliaDependencyInjection.inject)(_aureliaDependencyInjection.Container, _aureliaHistory.History, _aureliaRouter.PipelineProvider, _aureliaEventAggregator.EventAggregator), _dec(_class = function (_AppRouter) {
  _inherits(OnsRouter, _AppRouter);

  function OnsRouter(container, history, piplineProvider, events) {
    

    return _possibleConstructorReturn(this, _AppRouter.call(this, container, history, piplineProvider, events));
  }

  OnsRouter.prototype._dequeueInstruction = function _dequeueInstruction(instructionCount) {
    var _this2 = this;

    return Promise.resolve().then(function () {
      if (_this2.isNavigating && !instructionCount) {
        return undefined;
      }

      var instruction = _this2._queue.shift();
      _this2._queue.length = 0;

      if (!instruction) {
        return undefined;
      }

      _this2.isNavigating = true;

      var navtracker = _this2.history.getState('NavigationTracker');
      if (!navtracker && !_this2.currentNavigationTracker) {
        _this2.isNavigatingFirst = true;
        _this2.isNavigatingNew = true;
      } else if (!navtracker) {
        _this2.isNavigatingNew = true;
      } else if (!_this2.currentNavigationTracker) {
        _this2.isNavigatingRefresh = true;
      } else if (_this2.currentNavigationTracker < navtracker) {
        _this2.isNavigatingForward = true;
      } else if (_this2.currentNavigationTracker > navtracker) {
        _this2.isNavigatingBack = true;
      }
      if (!navtracker) {
        navtracker = Date.now();
        _this2.history.setState('NavigationTracker', navtracker);
      }
      _this2.currentNavigationTracker = navtracker;

      instruction.previousInstruction = _this2.currentInstruction;

      if (!instructionCount) {
        _this2.events.publish('router:navigation:processing', { instruction: instruction });
      } else if (instructionCount === _this2.maxInstructionCount - 1) {
        logger.error(instructionCount + 1 + ' navigation instructions have been attempted without success. Restoring last known good location.');
        restorePreviousLocation(_this2);
        return _this2._dequeueInstruction(instructionCount + 1);
      } else if (instructionCount > _this2.maxInstructionCount) {
        throw new Error('Maximum navigation attempts exceeded. Giving up.');
      }

      var pipeline = _this2.pipelineProvider.createPipeline();

      return pipeline.run(instruction).then(function (result) {
        return processResult(instruction, result, instructionCount, _this2);
      }).catch(function (error) {
        return { output: error instanceof Error ? error : new Error(error) };
      }).then(function (result) {
        return resolveInstruction(instruction, result, !!instructionCount, _this2);
      });
    });
  };

  return OnsRouter;
}(_aureliaRouter.AppRouter)) || _class);


function processResult(instruction, result, instructionCount, router) {
  if (!(result && 'completed' in result && 'output' in result)) {
    result = result || {};
    result.output = new Error('Expected router pipeline to return a navigation result, but got [' + JSON.stringify(result) + '] instead.');
  }

  var finalResult = null;
  if ((0, _aureliaRouter.isNavigationCommand)(result.output)) {
    result.output.navigate(router);
  } else {
    finalResult = result;

    if (!result.completed) {
      if (result.output instanceof Error) {
        logger.error(result.output);
      }

      restorePreviousLocation(router);
    }
  }

  return router._dequeueInstruction(instructionCount + 1).then(function (innerResult) {
    return finalResult || innerResult || result;
  });
}

function resolveInstruction(instruction, result, isInnerInstruction, router) {
  instruction.resolve(result);

  var eventArgs = { instruction: instruction, result: result };
  if (!isInnerInstruction) {
    router.isNavigating = false;
    router.isExplicitNavigation = false;
    router.isExplicitNavigationBack = false;
    router.isNavigatingFirst = false;
    router.isNavigatingNew = false;
    router.isNavigatingRefresh = false;
    router.isNavigatingForward = false;
    router.isNavigatingBack = false;

    var eventName = void 0;

    if (result.output instanceof Error) {
      eventName = 'error';
    } else if (!result.completed) {
      eventName = 'canceled';
    } else {
      var queryString = instruction.queryString ? '?' + instruction.queryString : '';
      router.history.previousLocation = instruction.fragment + queryString;
      eventName = 'success';
    }

    router.events.publish('router:navigation:' + eventName, eventArgs);
    router.events.publish('router:navigation:complete', eventArgs);
  } else {
    router.events.publish('router:navigation:child:complete', eventArgs);
  }

  return result;
}

function restorePreviousLocation(router) {
  var previousLocation = router.history.previousLocation;
  if (previousLocation) {
    router.navigate(router.history.previousLocation, { trigger: false, replace: true });
  } else if (router.fallbackRoute) {
    router.navigate(router.fallbackRoute, { trigger: true, replace: true });
  } else {
    logger.error('Router navigation failed, and no previous location or fallbackRoute could be restored.');
  }
}