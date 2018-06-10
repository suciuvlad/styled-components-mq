(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("styled-components"));
	else if(typeof define === 'function' && define.amd)
		define(["styled-components"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("styled-components")) : factory(root["styled-components"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n      ', ' {\n        ', '\n      }\n    '], ['\n      ', ' {\n        ', '\n      }\n    ']);

var _styledComponents = __webpack_require__(1);

var _mediaQueries = __webpack_require__(2);

var _mediaQueries2 = _interopRequireDefault(_mediaQueries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

exports.default = function (breakpoints) {
  var mq = (0, _mediaQueries2.default)(breakpoints);

  return function (data) {
    return function () {
      return (0, _styledComponents.css)(_templateObject, mq(data), _styledComponents.css.apply(undefined, arguments));
    };
  };
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var baseFontSize = '16px';

var defaultBreakpoints = {
  xs: 0,
  sm: 544,
  md: 768,
  lg: 992
};

var pxToEm = function pxToEm(value) {
  var compute = parseFloat(value) / parseFloat(baseFontSize);
  return compute + 'em';
};

var findNextBreakpoint = function findNextBreakpoint(breakpoints, needle) {
  var keys = Object.keys(breakpoints);
  var current = keys.find(function (val) {
    return val === needle;
  });
  var index = keys.indexOf(current);

  var key = keys[index + 1];
  if (key) return breakpoints[key];

  return undefined;
};

var parseBreakpoints = function parseBreakpoints(breakpoints) {
  return Object.entries(breakpoints).reduce(function (acc, breakpoint) {
    if (!breakpoint[0]) return acc;
    acc[breakpoint[0]] = parseFloat(breakpoint[1]);
    return acc;
  }, {});
};

exports.default = function () {
  var userBreakpoints = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultBreakpoints;

  var breakpoints = parseBreakpoints(userBreakpoints);

  var validateBreakpoint = function validateBreakpoint(breakpoint) {
    var key = Object.keys(breakpoints).find(function (val) {
      return val === breakpoint;
    });
    if (!key) throw new Error('Breakpoint ' + breakpoint + ' not found.');
    return breakpoints[key];
  };

  return function (props) {
    if (!props) throw new Error('At least one of `name`, `from` or `until` is required.');

    var name = props.name,
        from = props.from,
        until = props.until;


    var media = '';
    var minWidth = 0;
    var maxWidth = 0;

    // inclusive
    if (from) {
      minWidth = validateBreakpoint(from);
      media = media + ' and (min-width: ' + pxToEm(minWidth) + ')';
    }

    // exclusive
    if (until) {
      maxWidth = validateBreakpoint(until) - 0.1;
      media = media + ' and (max-width: ' + pxToEm(maxWidth) + ')';
    }

    media = media.slice(5, media.length);

    var next = void 0;

    if (name && !from && !until) {
      next = findNextBreakpoint(breakpoints, name);
      minWidth = validateBreakpoint(name);

      if (next) {
        maxWidth = next - 0.1;
        media = '(min-width: ' + pxToEm(minWidth) + ') and (max-width: ' + pxToEm(maxWidth) + ')';
      } else media = '(min-width: ' + pxToEm(minWidth) + ')';
    }

    return '@media ' + media;
  };
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=styled-components-mq.js.map