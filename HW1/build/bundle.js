/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 382);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , core      = __webpack_require__(14)
  , hide      = __webpack_require__(15)
  , redefine  = __webpack_require__(18)
  , ctx       = __webpack_require__(25)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target)redefine(target, key, out, type & $export.U);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
var globalScope;
if (typeof window === 'undefined') {
    globalScope = global;
}
else {
    globalScope = window;
}
// Need to declare a new variable for global here since TypeScript
// exports the original value of the symbol.
var _global = globalScope;
exports.global = _global;
// ===============
// implementations
// ===============
/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/;
var reIsPlainProp = /^\w*$/;
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;
/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;
/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;
/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;
var argsTag = '[object Arguments]';
var _devMode = true;
/**
 * Disable Angular's development mode, which turns off assertions and other
 * checks within the framework.
 *
 * One important assertion this disables verifies that a change detection pass
 * does not result in additional changes to any bindings (also known as
 * unidirectional data flow).
 */
function enableProdMode() {
    _devMode = false;
}
exports.enableProdMode = enableProdMode;
function assertionsEnabled() {
    return _devMode;
}
exports.assertionsEnabled = assertionsEnabled;
function isPresent(obj) {
    return obj !== undefined && obj !== null;
}
exports.isPresent = isPresent;
function isBlank(obj) {
    return obj === undefined || obj === null;
}
exports.isBlank = isBlank;
function isString(obj) {
    return typeof obj === "string";
}
exports.isString = isString;
function isFunction(obj) {
    return typeof obj === "function";
}
exports.isFunction = isFunction;
function isBoolean(obj) {
    return typeof obj === "boolean";
}
exports.isBoolean = isBoolean;
function isArray(obj) {
    return Array.isArray(obj);
}
exports.isArray = isArray;
function isNumber(obj) {
    return typeof obj === 'number';
}
exports.isNumber = isNumber;
function isDate(obj) {
    return obj instanceof Date && !isNaN(obj.valueOf());
}
exports.isDate = isDate;
function isType(obj) {
    return isFunction(obj);
}
exports.isType = isType;
function isStringMap(obj) {
    return typeof obj === 'object' && obj !== null;
}
exports.isStringMap = isStringMap;
function isPromise(obj) {
    return obj instanceof _global.Promise;
}
exports.isPromise = isPromise;
function isPromiseLike(obj) {
    return Boolean(isPresent(obj) && obj.then);
}
exports.isPromiseLike = isPromiseLike;
function isObservable(obj) {
    return Boolean(isPresent(obj) && obj.subscribe);
}
exports.isObservable = isObservable;
function isPromiseOrObservable(obj) {
    return isPromiseLike(obj) || isObservable(obj);
}
exports.isPromiseOrObservable = isPromiseOrObservable;
function isScope(obj) {
    return isPresent(obj) && obj.$digest && obj.$on;
}
exports.isScope = isScope;
function isSubscription(obj) {
    return isPresent(obj) && obj.unsubscribe;
}
exports.isSubscription = isSubscription;
function isJsObject(o) {
    return o !== null && (typeof o === "function" || typeof o === "object");
}
exports.isJsObject = isJsObject;
function isArguments(value) {
    // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
    return ('length' in value) && Object.prototype.hasOwnProperty.call(value, 'callee') &&
        (!Object.prototype.propertyIsEnumerable.call(value, 'callee') || Object.prototype.toString.call(value) == argsTag);
}
exports.isArguments = isArguments;
function noop() { }
exports.noop = noop;
function stringify(token) {
    if (typeof token === 'string') {
        return token;
    }
    if (token === undefined || token === null) {
        return '' + token;
    }
    if (token.name) {
        return token.name;
    }
    var res = token.toString();
    var newLineIndex = res.indexOf("\n");
    return (newLineIndex === -1)
        ? res
        : res.substring(0, newLineIndex).replace('\r', '');
}
exports.stringify = stringify;
/**
 * Converts `value` to a string if it's not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
    return value == null ? '' : (value + '');
}
exports.baseToString = baseToString;
/**
 * Converts `value` to property path array if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Array} Returns the property path array.
 */
function toPath(value) {
    if (isArray(value)) {
        return value;
    }
    //return value.split('.');
    var result = [];
    baseToString(value).replace(rePropName, function (match, number, quote, string) {
        var resultValue = quote
            ? string.replace(reEscapeChar, '$1')
            : (number || match);
        result.push(resultValue);
        return resultValue;
    });
    return result;
}
exports.toPath = toPath;
function assign(destination) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    var envAssign = _global.Object['assign'] || _global.angular.extend;
    return envAssign.apply(void 0, [destination].concat(sources));
}
exports.assign = assign;
var ATTRS_BOUNDARIES = /\[|\]/g;
var COMPONENT_SELECTOR = /^\[?[\w|-]*\]?$/;
var SKEWER_CASE = /-(\w)/g;
function resolveDirectiveNameFromSelector(selector) {
    if (!selector.match(COMPONENT_SELECTOR)) {
        throw new Error("Only selectors matching element names or base attributes are supported, got: " + selector);
    }
    return selector
        .trim()
        .replace(ATTRS_BOUNDARIES, '')
        .replace(SKEWER_CASE, function (all, letter) { return letter.toUpperCase(); });
}
exports.resolveDirectiveNameFromSelector = resolveDirectiveNameFromSelector;
function getTypeName(type) {
    var typeName = getFuncName(type);
    return firstToLowerCase(typeName);
}
exports.getTypeName = getTypeName;
/**
 *
 * @param {Function}  func
 * @returns {string}
 * @private
 */
function getFuncName(func) {
    var parsedFnStatement = /function\s*([^\s(]+)/.exec(stringify(func));
    var _a = parsedFnStatement || [], _b = _a[1], name = _b === void 0 ? '' : _b;
    // if Function.name doesn't exist exec will find match otherwise return name property
    return name || stringify(func);
}
exports.getFuncName = getFuncName;
/**
 * controller instance of directive is exposed on jqLiteElement.data()
 * under the name: `$` + Ctor + `Controller`
 * @param name
 * @returns {string}
 */
function controllerKey(name) {
    return '$' + name + 'Controller';
}
exports.controllerKey = controllerKey;
function hasCtorInjectables(Type) {
    return (Array.isArray(Type.$inject) && Type.$inject.length !== 0);
}
exports.hasCtorInjectables = hasCtorInjectables;
function firstToLowerCase(value) {
    return _firstTo(value, String.prototype.toLowerCase);
}
exports.firstToLowerCase = firstToLowerCase;
function firstToUpperCase(value) {
    return _firstTo(value, String.prototype.toUpperCase);
}
exports.firstToUpperCase = firstToUpperCase;
function _firstTo(value, cb) {
    return cb.call(value.charAt(0)) + value.substring(1);
}
function normalizeBlank(obj) {
    return isBlank(obj) ? null : obj;
}
exports.normalizeBlank = normalizeBlank;
function normalizeBool(obj) {
    return isBlank(obj) ? false : obj;
}
exports.normalizeBool = normalizeBool;
function print(obj) {
    console.log(obj);
}
exports.print = print;
/**
 * Angular 2 setValueOnPath
 * supports only `.` path separator
 * @param global
 * @param path
 * @param value
 */
function setValueOnPath(global, path, value) {
    var parts = path.split('.');
    var obj = global;
    while (parts.length > 1) {
        var name = parts.shift();
        if (obj.hasOwnProperty(name) && isPresent(obj[name])) {
            obj = obj[name];
        }
        else {
            obj = obj[name] = {};
        }
    }
    if (obj === undefined || obj === null) {
        obj = {};
    }
    obj[parts.shift()] = value;
}
exports.setValueOnPath = setValueOnPath;
/**
 * Converts `value` to an object if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Object} Returns the object.
 */
function toObject(value) {
    return isJsObject(value)
        ? value
        : Object(value);
}
exports.toObject = toObject;
/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
    if (length === void 0) { length = MAX_SAFE_INTEGER; }
    value = (isNumber(value) || reIsUint.test(value))
        ? +value
        : -1;
    return value > -1 && value % 1 == 0 && value < length;
}
exports.isIndex = isIndex;
/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
    if ((isString(value) && reIsPlainProp.test(value)) || isNumber(value)) {
        return true;
    }
    if (isArray(value)) {
        return false;
    }
    var result = !reIsDeepProp.test(value);
    return result || (object != null && value in toObject(object));
}
exports.isKey = isKey;
//# sourceMappingURL=lang.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(150)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(68)('wks')
  , uid        = __webpack_require__(45)
  , Symbol     = __webpack_require__(2).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(1)
  , IE8_DOM_DEFINE = __webpack_require__(115)
  , toPrimitive    = __webpack_require__(27)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(8) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(4)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(34)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(22);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(52)
  , defined = __webpack_require__(22);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(7)
  , createDesc = __webpack_require__(30);
module.exports = __webpack_require__(8) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(53)
  , createDesc     = __webpack_require__(30)
  , toIObject      = __webpack_require__(12)
  , toPrimitive    = __webpack_require__(27)
  , has            = __webpack_require__(11)
  , IE8_DOM_DEFINE = __webpack_require__(115)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(8) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(11)
  , toObject    = __webpack_require__(10)
  , IE_PROTO    = __webpack_require__(90)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , hide      = __webpack_require__(15)
  , has       = __webpack_require__(11)
  , SRC       = __webpack_require__(45)('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

__webpack_require__(14).inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  var isFunction = typeof val == 'function';
  if(isFunction)has(val, 'name') || hide(val, 'name', key);
  if(O[key] === val)return;
  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if(O === global){
    O[key] = val;
  } else {
    if(!safe){
      delete O[key];
      hide(O, key, val);
    } else {
      if(O[key])O[key] = val;
      else hide(O, key, val);
    }
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
  , fails   = __webpack_require__(4)
  , defined = __webpack_require__(22)
  , quot    = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function(string, tag, attribute, value) {
  var S  = String(defined(string))
    , p1 = '<' + tag;
  if(attribute !== '')p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function(NAME, exec){
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function(){
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var lang_1 = __webpack_require__(3);
var INFINITY = 1 / 0;
/**
 * Wraps Javascript Objects
 */
var StringMapWrapper = (function () {
    function StringMapWrapper() {
    }
    StringMapWrapper.create = function () {
        // Note: We are not using Object.create(null) here due to
        // performance!
        // http://jsperf.com/ng2-object-create-null
        return {};
    };
    StringMapWrapper.contains = function (map, key) {
        return map.hasOwnProperty(key);
    };
    /**
     * The base implementation of `getValueFromPath` without support for string paths
     * and default values.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} path The path of the property to get.
     * @param {string} [pathKey] The key representation of path.
     * @returns {*} Returns the resolved value.
     */
    StringMapWrapper.baseGet = function (object, path, pathKey) {
        if (object == null) {
            return;
        }
        object = lang_1.toObject(object);
        if (pathKey !== undefined && pathKey in object) {
            path = [pathKey];
        }
        var index = 0, length = path.length;
        while (object != null && index < length) {
            object = lang_1.toObject(object)[path[index++]];
        }
        return (index && index == length)
            ? object
            : undefined;
    };
    /**
     * Gets the property value at `path` of `object`. If the resolved value is
     * `undefined` the `defaultValue` is used in its place.
     *
     * @static
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.get(object, 'a[0].b.c');
     * // => 3
     *
     * _.get(object, ['a', '0', 'b', 'c']);
     * // => 3
     *
     * _.get(object, 'a.b.c', 'default');
     * // => 'default'
     */
    StringMapWrapper.getValueFromPath = function (object, path, defaultValue) {
        var result = object == null
            ? undefined
            : StringMapWrapper.baseGet(object, lang_1.toPath(path), (path + ''));
        return result === undefined
            ? defaultValue
            : result;
    };
    /**
     * Sets the property value of `path` on `object`. If a portion of `path`
     * does not exist it's created.
     *
     * @static
     * @param {Object} object The object to augment.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.set(object, 'a[0].b.c', 4);
     * console.log(object.a[0].b.c);
     * // => 4
     *
     * _.set(object, 'x[0].y.z', 5);
     * console.log(object.x[0].y.z);
     * // => 5
     */
    StringMapWrapper.setValueInPath = function (object, path, value) {
        if (object == null) {
            return object;
        }
        var pathKey = (path + '');
        path = (object[pathKey] != null || lang_1.isKey(path, object))
            ? [pathKey]
            : lang_1.toPath(path);
        var index = -1, length = path.length, lastIndex = length - 1, nested = object;
        while (nested != null && ++index < length) {
            var key = path[index];
            if (lang_1.isJsObject(nested)) {
                if (index == lastIndex) {
                    nested[key] = value;
                }
                else if (nested[key] == null) {
                    nested[key] = lang_1.isIndex(path[index + 1])
                        ? []
                        : {};
                }
            }
            nested = nested[key];
        }
        return object;
    };
    StringMapWrapper.get = function (map, key) {
        return map.hasOwnProperty(key)
            ? map[key]
            : undefined;
    };
    StringMapWrapper.set = function (map, key, value) { map[key] = value; };
    StringMapWrapper.keys = function (map) { return Object.keys(map); };
    StringMapWrapper.size = function (map) { return StringMapWrapper.keys(map).length; };
    StringMapWrapper.isEmpty = function (map) {
        for (var prop in map) {
            return false;
        }
        return true;
    };
    StringMapWrapper.delete = function (map, key) { delete map[key]; };
    StringMapWrapper.forEach = function (map, callback) {
        for (var prop in map) {
            if (map.hasOwnProperty(prop)) {
                callback(map[prop], prop);
            }
        }
    };
    StringMapWrapper.values = function (map) {
        return Object.keys(map).reduce(function (r, a) {
            r.push(map[a]);
            return r;
        }, []);
    };
    StringMapWrapper.merge = function (m1, m2) {
        var m = {};
        for (var attr in m1) {
            if (m1.hasOwnProperty(attr)) {
                m[attr] = m1[attr];
            }
        }
        for (var attr in m2) {
            if (m2.hasOwnProperty(attr)) {
                m[attr] = m2[attr];
            }
        }
        return m;
    };
    StringMapWrapper.equals = function (m1, m2) {
        var k1 = Object.keys(m1);
        var k2 = Object.keys(m2);
        if (k1.length != k2.length) {
            return false;
        }
        var key;
        for (var i = 0; i < k1.length; i++) {
            key = k1[i];
            if (m1[key] !== m2[key]) {
                return false;
            }
        }
        return true;
    };
    StringMapWrapper.assign = function (target) {
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        if (!lang_1.isPresent(target)) {
            throw new TypeError('Object.assign cannot be called with null or undefined');
        }
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        if (Object.assign) {
            return (_a = Object).assign.apply(_a, [target].concat(sources));
        }
        var from;
        var to = Object(target);
        for (var s = 0; s < sources.length; s++) {
            from = Object(sources[s]);
            for (var key in from) {
                if (hasOwnProperty.call(from, key)) {
                    to[key] = from[key];
                }
            }
        }
        return to;
        var _a;
    };
    return StringMapWrapper;
}());
exports.StringMapWrapper = StringMapWrapper;
var ListWrapper = (function () {
    function ListWrapper() {
    }
    ListWrapper.create = function () { return []; };
    ListWrapper.size = function (array) { return array.length; };
    // JS has no way to express a statically fixed size list, but dart does so we
    // keep both methods.
    ListWrapper.createFixedSize = function (size) { return new Array(size); };
    ListWrapper.createGrowableSize = function (size) { return new Array(size); };
    ListWrapper.clone = function (array) { return array.slice(0); };
    ListWrapper.forEachWithIndex = function (array, fn) {
        for (var i = 0; i < array.length; i++) {
            fn(array[i], i);
        }
    };
    ListWrapper.first = function (array) {
        if (!array)
            return null;
        return array[0];
    };
    ListWrapper.last = function (array) {
        if (!array || array.length == 0)
            return null;
        return array[array.length - 1];
    };
    ListWrapper.indexOf = function (array, value, startIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        return array.indexOf(value, startIndex);
    };
    ListWrapper.contains = function (list, el) { return list.indexOf(el) !== -1; };
    ListWrapper.reversed = function (array) {
        var a = ListWrapper.clone(array);
        return a.reverse();
    };
    ListWrapper.concat = function (a, b) { return a.concat(b); };
    ListWrapper.insert = function (list, index, value) { list.splice(index, 0, value); };
    ListWrapper.removeAt = function (list, index) {
        var res = list[index];
        list.splice(index, 1);
        return res;
    };
    ListWrapper.removeAll = function (list, items) {
        for (var i = 0; i < items.length; ++i) {
            var index = list.indexOf(items[i]);
            list.splice(index, 1);
        }
    };
    ListWrapper.remove = function (list, el) {
        var index = list.indexOf(el);
        if (index > -1) {
            list.splice(index, 1);
            return true;
        }
        return false;
    };
    ListWrapper.clear = function (list) { list.length = 0; };
    ListWrapper.isEmpty = function (list) { return list.length == 0; };
    ListWrapper.fill = function (list, value, start, end) {
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = null; }
        if (!Array.prototype.fill) {
            Array.prototype.fill = function (value) {
                // Steps 1-2.
                if (this == null) {
                    throw new TypeError('this is null or not defined');
                }
                var O = Object(this);
                // Steps 3-5.
                var len = O.length >>> 0;
                // Steps 6-7.
                var start = arguments[1];
                var relativeStart = start >> 0;
                // Step 8.
                var k = relativeStart < 0
                    ? Math.max(len + relativeStart, 0)
                    : Math.min(relativeStart, len);
                // Steps 9-10.
                var end = arguments[2];
                var relativeEnd = end === undefined
                    ? len
                    : end >> 0;
                // Step 11.
                var final = relativeEnd < 0
                    ? Math.max(len + relativeEnd, 0)
                    : Math.min(relativeEnd, len);
                // Step 12.
                while (k < final) {
                    O[k] = value;
                    k++;
                }
                // Step 13.
                return O;
            };
        }
        list.fill(value, start, end === null
            ? list.length
            : end);
    };
    ListWrapper.equals = function (a, b) {
        if (a.length != b.length)
            return false;
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    };
    ListWrapper.slice = function (l, from, to) {
        if (from === void 0) { from = 0; }
        if (to === void 0) { to = null; }
        return l.slice(from, to === null
            ? undefined
            : to);
    };
    ListWrapper.splice = function (l, from, length) { return l.splice(from, length); };
    ListWrapper.sort = function (l, compareFn) {
        if (lang_1.isPresent(compareFn)) {
            l.sort(compareFn);
        }
        else {
            l.sort();
        }
    };
    ListWrapper.toString = function (l) { return l.toString(); };
    ListWrapper.toJSON = function (l) { return JSON.stringify(l); };
    ListWrapper.maximum = function (list, predicate) {
        if (list.length == 0) {
            return null;
        }
        var solution = null;
        var maxValue = -Infinity;
        for (var index = 0; index < list.length; index++) {
            var candidate = list[index];
            if (lang_1.isBlank(candidate)) {
                continue;
            }
            var candidateValue = predicate(candidate);
            if (candidateValue > maxValue) {
                solution = candidate;
                maxValue = candidateValue;
            }
        }
        return solution;
    };
    ListWrapper.find = function (arr, predicate, ctx) {
        if (lang_1.isFunction(Array.prototype['find'])) {
            return arr.find(predicate, ctx);
        }
        ctx = ctx || this;
        var length = arr.length;
        var i;
        if (!lang_1.isFunction(predicate)) {
            throw new TypeError(predicate + " is not a function");
        }
        for (i = 0; i < length; i++) {
            if (predicate.call(ctx, arr[i], i, arr)) {
                return arr[i];
            }
        }
        return undefined;
    };
    ListWrapper.findIndex = function (arr, predicate, ctx) {
        if (lang_1.isFunction(Array.prototype['findIndex'])) {
            return arr.findIndex(predicate, ctx);
        }
        if (!lang_1.isFunction(predicate)) {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(arr);
        var len = list.length;
        if (len === 0) {
            return -1;
        }
        for (var i = 0; i < len; i++) {
            if (predicate.call(ctx, list[i], i, list)) {
                return i;
            }
        }
        return -1;
    };
    ListWrapper.isFlattenable = function (value) {
        return lang_1.isArray(value) || lang_1.isArguments(value);
    };
    /**
     * Appends the elements of `values` to `array`.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {Array} values The values to append.
     * @returns {Array} Returns `array`.
     */
    ListWrapper.arrayPush = function (array, values) {
        var index = -1, length = values.length, offset = array.length;
        while (++index < length) {
            array[offset + index] = values[index];
        }
        return array;
    };
    /**
     * The base implementation of `_.flatten` with support for restricting flattening.
     *
     * @private
     * @param {Array} array The array to flatten.
     * @param {number} depth The maximum recursion depth.
     * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
     * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
     * @param {Array} [result=[]] The initial result value.
     * @returns {Array} Returns the new flattened array.
     */
    ListWrapper.baseFlatten = function (array, depth, predicate, isStrict, result) {
        if (predicate === void 0) { predicate = ListWrapper.isFlattenable; }
        if (isStrict === void 0) { isStrict = false; }
        if (result === void 0) { result = []; }
        var index = -1;
        var length = array.length;
        while (++index < length) {
            var value = array[index];
            if (depth > 0 && predicate(value)) {
                if (depth > 1) {
                    // Recursively flatten arrays (susceptible to call stack limits).
                    ListWrapper.baseFlatten(value, depth - 1, predicate, isStrict, result);
                }
                else {
                    ListWrapper.arrayPush(result, value);
                }
            }
            else if (!isStrict) {
                result[result.length] = value;
            }
        }
        return result;
    };
    /**
     * Flattens `array` a single level deep.
     *
     * @static
     * @param {Array} array The array to flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flatten([1, [2, [3, [4]], 5]]);
     * // => [1, 2, [3, [4]], 5]
     */
    ListWrapper.flatten = function (array) {
        var length = array ? array.length : 0;
        return length ? ListWrapper.baseFlatten(array, 1) : [];
    };
    /**
     * Recursively flattens `array`.
     *
     * @static
     * @param {Array} array The array to flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flattenDeep([1, [2, [3, [4]], 5]]);
     * // => [1, 2, 3, 4, 5]
     */
    ListWrapper.flattenDeep = function (array) {
        var length = array
            ? array.length
            : 0;
        return length
            ? ListWrapper.baseFlatten(array, INFINITY)
            : [];
    };
    return ListWrapper;
}());
exports.ListWrapper = ListWrapper;
//# sourceMappingURL=collections.js.map

/***/ }),
/* 21 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(4);

module.exports = function(method, arg){
  return !!method && fails(function(){
    arg ? method.call(null, function(){}, 1) : method.call(null);
  });
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = __webpack_require__(25)
  , IObject  = __webpack_require__(52)
  , toObject = __webpack_require__(10)
  , toLength = __webpack_require__(9)
  , asc      = __webpack_require__(155);
module.exports = function(TYPE, $create){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
    , create        = $create || asc;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(13);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(0)
  , core    = __webpack_require__(14)
  , fails   = __webpack_require__(4);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(5);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var Map     = __webpack_require__(132)
  , $export = __webpack_require__(0)
  , shared  = __webpack_require__(68)('metadata')
  , store   = shared.store || (shared.store = new (__webpack_require__(135)));

var getOrCreateMetadataMap = function(target, targetKey, create){
  var targetMetadata = store.get(target);
  if(!targetMetadata){
    if(!create)return undefined;
    store.set(target, targetMetadata = new Map);
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if(!keyMetadata){
    if(!create)return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map);
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function(MetadataKey, MetadataValue, O, P){
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function(target, targetKey){
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false)
    , keys        = [];
  if(metadataMap)metadataMap.forEach(function(_, key){ keys.push(key); });
  return keys;
};
var toMetaKey = function(it){
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function(O){
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(1)
  , dPs         = __webpack_require__(121)
  , enumBugKeys = __webpack_require__(75)
  , IE_PROTO    = __webpack_require__(90)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(74)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(77).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if(__webpack_require__(8)){
  var LIBRARY             = __webpack_require__(40)
    , global              = __webpack_require__(2)
    , fails               = __webpack_require__(4)
    , $export             = __webpack_require__(0)
    , $typed              = __webpack_require__(69)
    , $buffer             = __webpack_require__(97)
    , ctx                 = __webpack_require__(25)
    , anInstance          = __webpack_require__(36)
    , propertyDesc        = __webpack_require__(30)
    , hide                = __webpack_require__(15)
    , redefineAll         = __webpack_require__(42)
    , toInteger           = __webpack_require__(34)
    , toLength            = __webpack_require__(9)
    , toIndex             = __webpack_require__(44)
    , toPrimitive         = __webpack_require__(27)
    , has                 = __webpack_require__(11)
    , same                = __webpack_require__(128)
    , classof             = __webpack_require__(37)
    , isObject            = __webpack_require__(5)
    , toObject            = __webpack_require__(10)
    , isArrayIter         = __webpack_require__(79)
    , create              = __webpack_require__(29)
    , getPrototypeOf      = __webpack_require__(17)
    , gOPN                = __webpack_require__(41).f
    , getIterFn           = __webpack_require__(54)
    , uid                 = __webpack_require__(45)
    , wks                 = __webpack_require__(6)
    , createArrayMethod   = __webpack_require__(24)
    , createArrayIncludes = __webpack_require__(57)
    , speciesConstructor  = __webpack_require__(91)
    , ArrayIterators      = __webpack_require__(99)
    , Iterators           = __webpack_require__(39)
    , $iterDetect         = __webpack_require__(65)
    , setSpecies          = __webpack_require__(43)
    , arrayFill           = __webpack_require__(72)
    , arrayCopyWithin     = __webpack_require__(108)
    , $DP                 = __webpack_require__(7)
    , $GOPD               = __webpack_require__(16)
    , dP                  = $DP.f
    , gOPD                = $GOPD.f
    , RangeError          = global.RangeError
    , TypeError           = global.TypeError
    , Uint8Array          = global.Uint8Array
    , ARRAY_BUFFER        = 'ArrayBuffer'
    , SHARED_BUFFER       = 'Shared' + ARRAY_BUFFER
    , BYTES_PER_ELEMENT   = 'BYTES_PER_ELEMENT'
    , PROTOTYPE           = 'prototype'
    , ArrayProto          = Array[PROTOTYPE]
    , $ArrayBuffer        = $buffer.ArrayBuffer
    , $DataView           = $buffer.DataView
    , arrayForEach        = createArrayMethod(0)
    , arrayFilter         = createArrayMethod(2)
    , arraySome           = createArrayMethod(3)
    , arrayEvery          = createArrayMethod(4)
    , arrayFind           = createArrayMethod(5)
    , arrayFindIndex      = createArrayMethod(6)
    , arrayIncludes       = createArrayIncludes(true)
    , arrayIndexOf        = createArrayIncludes(false)
    , arrayValues         = ArrayIterators.values
    , arrayKeys           = ArrayIterators.keys
    , arrayEntries        = ArrayIterators.entries
    , arrayLastIndexOf    = ArrayProto.lastIndexOf
    , arrayReduce         = ArrayProto.reduce
    , arrayReduceRight    = ArrayProto.reduceRight
    , arrayJoin           = ArrayProto.join
    , arraySort           = ArrayProto.sort
    , arraySlice          = ArrayProto.slice
    , arrayToString       = ArrayProto.toString
    , arrayToLocaleString = ArrayProto.toLocaleString
    , ITERATOR            = wks('iterator')
    , TAG                 = wks('toStringTag')
    , TYPED_CONSTRUCTOR   = uid('typed_constructor')
    , DEF_CONSTRUCTOR     = uid('def_constructor')
    , ALL_CONSTRUCTORS    = $typed.CONSTR
    , TYPED_ARRAY         = $typed.TYPED
    , VIEW                = $typed.VIEW
    , WRONG_LENGTH        = 'Wrong length!';

  var $map = createArrayMethod(1, function(O, length){
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function(){
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function(){
    new Uint8Array(1).set({});
  });

  var strictToLength = function(it, SAME){
    if(it === undefined)throw TypeError(WRONG_LENGTH);
    var number = +it
      , length = toLength(it);
    if(SAME && !same(number, length))throw RangeError(WRONG_LENGTH);
    return length;
  };

  var toOffset = function(it, BYTES){
    var offset = toInteger(it);
    if(offset < 0 || offset % BYTES)throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function(it){
    if(isObject(it) && TYPED_ARRAY in it)return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function(C, length){
    if(!(isObject(C) && TYPED_CONSTRUCTOR in C)){
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function(O, list){
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function(C, list){
    var index  = 0
      , length = list.length
      , result = allocate(C, length);
    while(length > index)result[index] = list[index++];
    return result;
  };

  var addGetter = function(it, key, internal){
    dP(it, key, {get: function(){ return this._d[internal]; }});
  };

  var $from = function from(source /*, mapfn, thisArg */){
    var O       = toObject(source)
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , iterFn  = getIterFn(O)
      , i, length, values, result, step, iterator;
    if(iterFn != undefined && !isArrayIter(iterFn)){
      for(iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++){
        values.push(step.value);
      } O = values;
    }
    if(mapping && aLen > 2)mapfn = ctx(mapfn, arguments[2], 2);
    for(i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++){
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/*...items*/){
    var index  = 0
      , length = arguments.length
      , result = allocate(this, length);
    while(length > index)result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function(){ arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString(){
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /*, end */){
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /*, thisArg */){
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /*, start, end */){ // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /*, thisArg */){
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /*, thisArg */){
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /*, thisArg */){
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /*, thisArg */){
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /*, fromIndex */){
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /*, fromIndex */){
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator){ // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */){ // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /*, thisArg */){
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse(){
      var that   = this
        , length = validate(that).length
        , middle = Math.floor(length / 2)
        , index  = 0
        , value;
      while(index < middle){
        value         = that[index];
        that[index++] = that[--length];
        that[length]  = value;
      } return that;
    },
    some: function some(callbackfn /*, thisArg */){
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn){
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end){
      var O      = validate(this)
        , length = O.length
        , $begin = toIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end){
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /*, offset */){
    validate(this);
    var offset = toOffset(arguments[1], 1)
      , length = this.length
      , src    = toObject(arrayLike)
      , len    = toLength(src.length)
      , index  = 0;
    if(len + offset > length)throw RangeError(WRONG_LENGTH);
    while(index < len)this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries(){
      return arrayEntries.call(validate(this));
    },
    keys: function keys(){
      return arrayKeys.call(validate(this));
    },
    values: function values(){
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function(target, key){
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key){
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc){
    if(isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ){
      target[key] = desc.value;
      return target;
    } else return dP(target, key, desc);
  };

  if(!ALL_CONSTRUCTORS){
    $GOPD.f = $getDesc;
    $DP.f   = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty:           $setDesc
  });

  if(fails(function(){ arrayToString.call({}); })){
    arrayToString = arrayToLocaleString = function toString(){
      return arrayJoin.call(this);
    }
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice:          $slice,
    set:            $set,
    constructor:    function(){ /* noop */ },
    toString:       arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function(){ return this[TYPED_ARRAY]; }
  });

  module.exports = function(KEY, BYTES, wrapper, CLAMPED){
    CLAMPED = !!CLAMPED;
    var NAME       = KEY + (CLAMPED ? 'Clamped' : '') + 'Array'
      , ISNT_UINT8 = NAME != 'Uint8Array'
      , GETTER     = 'get' + KEY
      , SETTER     = 'set' + KEY
      , TypedArray = global[NAME]
      , Base       = TypedArray || {}
      , TAC        = TypedArray && getPrototypeOf(TypedArray)
      , FORCED     = !TypedArray || !$typed.ABV
      , O          = {}
      , TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function(that, index){
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function(that, index, value){
      var data = that._d;
      if(CLAMPED)value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function(that, index){
      dP(that, index, {
        get: function(){
          return getter(this, index);
        },
        set: function(value){
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if(FORCED){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME, '_d');
        var index  = 0
          , offset = 0
          , buffer, byteLength, length, klass;
        if(!isObject(data)){
          length     = strictToLength(data, true)
          byteLength = length * BYTES;
          buffer     = new $ArrayBuffer(byteLength);
        } else if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if($length === undefined){
            if($len % BYTES)throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if(byteLength < 0)throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if(byteLength + offset > $len)throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if(TYPED_ARRAY in data){
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while(index < length)addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if(!$iterDetect(function(iter){
      // V8 works with iterators, but fails in many other cases
      // https://code.google.com/p/v8/issues/detail?id=4552
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if(!isObject(data))return new Base(strictToLength(data, ISNT_UINT8));
        if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if(TYPED_ARRAY in data)return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function(key){
        if(!(key in TypedArray))hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if(!LIBRARY)TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator   = TypedArrayPrototype[ITERATOR]
      , CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined)
      , $iterator         = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if(CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)){
      dP(TypedArrayPrototype, TAG, {
        get: function(){ return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES,
      from: $from,
      of: $of
    });

    if(!(BYTES_PER_ELEMENT in TypedArrayPrototype))hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, {set: $set});

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, {toString: arrayToString});

    $export($export.P + $export.F * fails(function(){
      new TypedArray(1).slice();
    }), NAME, {slice: $slice});

    $export($export.P + $export.F * (fails(function(){
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString()
    }) || !fails(function(){
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, {toLocaleString: $toLocaleString});

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if(!LIBRARY && !CORRECT_ITER_NAME)hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function(){ /* empty */ };

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(45)('meta')
  , isObject = __webpack_require__(5)
  , has      = __webpack_require__(11)
  , setDesc  = __webpack_require__(7).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(4)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(123)
  , enumBugKeys = __webpack_require__(75);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var lang_1 = __webpack_require__(3);
/**
 * `DependencyMetadata` is used by the framework to extend DI.
 * This is internal to Angular and should not be used directly.
 */
var DependencyMetadata = (function () {
    function DependencyMetadata() {
    }
    Object.defineProperty(DependencyMetadata.prototype, "token", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    return DependencyMetadata;
}());
exports.DependencyMetadata = DependencyMetadata;
/**
 * A parameter metadata that specifies a dependency.
 *
 * ### Example ([live demo](http://plnkr.co/edit/6uHYJK?p=preview))
 *
 * ```typescript
 * class Engine {}
 *
 * @Injectable()
 * class Car {
 *   engine;
 *   constructor(@Inject("MyEngine") engine:Engine) {
 *     this.engine = engine;
 *   }
 * }
 *
 * var injector = Injector.resolveAndCreate([
 *  provide("MyEngine", {useClass: Engine}),
 *  Car
 * ]);
 *
 * expect(injector.get(Car).engine instanceof Engine).toBe(true);
 * ```
 *
 * When `@Inject()` is not present, {@link Injector} will use the type annotation of the parameter.
 *
 * ### Example
 *
 * ```typescript
 * class Engine {}
 *
 * @Injectable()
 * class Car {
 *   constructor(public engine: Engine) {} //same as constructor(@Inject(Engine) engine:Engine)
 * }
 *
 * var injector = Injector.resolveAndCreate([Engine, Car]);
 * expect(injector.get(Car).engine instanceof Engine).toBe(true);
 * ```
 */
var InjectMetadata = (function () {
    function InjectMetadata(token) {
        this.token = token;
    }
    InjectMetadata.paramDecoratorForNonConstructor = function (annotationInstance, target, propertyKey, paramIndex) {
        var annotateMethod = target[propertyKey];
        annotateMethod.$inject = annotateMethod.$inject || [];
        annotateMethod.$inject[paramIndex] = annotationInstance.token;
    };
    InjectMetadata.prototype.toString = function () { return "@Inject(" + lang_1.stringify(this.token) + ")"; };
    return InjectMetadata;
}());
exports.InjectMetadata = InjectMetadata;
/**
 * A parameter metadata that marks a dependency as optional. {@link Injector} provides `null` if
 * the dependency is not found.
 *
 * ### Example ([live demo](http://plnkr.co/edit/AsryOm?p=preview))
 *
 * ```typescript
 * class Engine {}
 *
 * @Injectable()
 * class Car {
 *   engine;
 *   constructor(@Optional() engine:Engine) {
 *     this.engine = engine;
 *   }
 * }
 *
 * var injector = Injector.resolveAndCreate([Car]);
 * expect(injector.get(Car).engine).toBeNull();
 * ```
 */
var OptionalMetadata = (function () {
    function OptionalMetadata() {
    }
    OptionalMetadata.prototype.toString = function () { return "@Optional()"; };
    return OptionalMetadata;
}());
exports.OptionalMetadata = OptionalMetadata;
/**
 * A marker metadata that marks a class as available to {@link Injector} for creation.
 *
 * ```typescript
 * @Injectable()
 * class UsefulService {}
 *
 * @Injectable()
 * class NeedsService {
 *   constructor(public service:UsefulService) {}
 * }
 *
 * var injector = Injector.resolveAndCreate([NeedsService, UsefulService]);
 * expect(injector.get(NeedsService).service instanceof UsefulService).toBe(true);
 * ```
 * {@link Injector} will throw {@link NoAnnotationError} when trying to instantiate a class that
 * does not have `@Injectable` marker, as shown in the example below.
 *
 * ```typescript
 * class UsefulService {}
 *
 * class NeedsService {
 *   constructor(public service:UsefulService) {}
 * }
 *
 * var injector = Injector.resolveAndCreate([NeedsService, UsefulService]);
 * expect(() => injector.get(NeedsService)).toThrowError();
 * ```
 */
var InjectableMetadata = (function () {
    function InjectableMetadata(_id) {
        this._id = _id;
    }
    Object.defineProperty(InjectableMetadata.prototype, "id", {
        get: function () { return this._id; },
        set: function (newID) { this._id = newID; },
        enumerable: true,
        configurable: true
    });
    return InjectableMetadata;
}());
exports.InjectableMetadata = InjectableMetadata;
/**
 * Specifies that an {@link Injector} should retrieve a dependency only from itself.
 *
 * ### Example ([live demo](http://plnkr.co/edit/NeagAg?p=preview))
 *
 * ```typescript
 * class Dependency {
 * }
 *
 * @Injectable()
 * class NeedsDependency {
 *   dependency;
 *   constructor(@Self() dependency:Dependency) {
 *     this.dependency = dependency;
 *   }
 * }
 *
 * var inj = Injector.resolveAndCreate([Dependency, NeedsDependency]);
 * var nd = inj.get(NeedsDependency);
 *
 * expect(nd.dependency instanceof Dependency).toBe(true);
 *
 * var inj = Injector.resolveAndCreate([Dependency]);
 * var child = inj.resolveAndCreateChild([NeedsDependency]);
 * expect(() => child.get(NeedsDependency)).toThrowError();
 * ```
 */
var SelfMetadata = (function () {
    function SelfMetadata() {
    }
    SelfMetadata.prototype.toString = function () { return "@Self()"; };
    return SelfMetadata;
}());
exports.SelfMetadata = SelfMetadata;
/**
 * Specifies that the dependency resolution should start from the parent injector.
 *
 * ### Example ([live demo](http://plnkr.co/edit/Wchdzb?p=preview))
 *
 * ```typescript
 * class Dependency {
 * }
 *
 * @Injectable()
 * class NeedsDependency {
 *   dependency;
 *   constructor(@SkipSelf() dependency:Dependency) {
 *     this.dependency = dependency;
 *   }
 * }
 *
 * var parent = Injector.resolveAndCreate([Dependency]);
 * var child = parent.resolveAndCreateChild([NeedsDependency]);
 * expect(child.get(NeedsDependency).dependency instanceof Depedency).toBe(true);
 *
 * var inj = Injector.resolveAndCreate([Dependency, NeedsDependency]);
 * expect(() => inj.get(NeedsDependency)).toThrowError();
 * ```
 */
var SkipSelfMetadata = (function () {
    function SkipSelfMetadata() {
    }
    SkipSelfMetadata.prototype.toString = function () { return "@SkipSelf()"; };
    return SkipSelfMetadata;
}());
exports.SkipSelfMetadata = SkipSelfMetadata;
/**
 * Specifies that an injector should retrieve a dependency from any injector until reaching the
 * closest host.
 *
 * In Angular, a component element is automatically declared as a host for all the injectors in
 * its view.
 *
 * ### Example ([live demo](http://plnkr.co/edit/GX79pV?p=preview))
 *
 * In the following example `App` contains `ParentCmp`, which contains `ChildDirective`.
 * So `ParentCmp` is the host of `ChildDirective`.
 *
 * `ChildDirective` depends on two services: `HostService` and `OtherService`.
 * `HostService` is defined at `ParentCmp`, and `OtherService` is defined at `App`.
 *
 *```typescript
 * class OtherService {}
 * class HostService {}
 *
 * @Directive({
 *   selector: 'child-directive'
 * })
 * class ChildDirective {
 *   constructor(@Optional() @Host() os:OtherService, @Optional() @Host() hs:HostService){
 *     console.log("os is null", os);
 *     console.log("hs is NOT null", hs);
 *   }
 * }
 *
 * @Component({
 *   selector: 'parent-cmp',
 *   providers: [HostService],
 *   template: `
 *     Dir: <child-directive></child-directive>
 *   `,
 *   directives: [ChildDirective]
 * })
 * class ParentCmp {
 * }
 *
 * @Component({
 *   selector: 'app',
 *   providers: [OtherService],
 *   template: `
 *     Parent: <parent-cmp></parent-cmp>
 *   `,
 *   directives: [ParentCmp]
 * })
 * class App {
 * }
 *
 * bootstrap(App);
 *```
 */
var HostMetadata = (function () {
    function HostMetadata() {
    }
    HostMetadata.prototype.toString = function () { return "@Host()"; };
    return HostMetadata;
}());
exports.HostMetadata = HostMetadata;
//# sourceMappingURL=metadata.js.map

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(21)
  , TAG = __webpack_require__(6)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var ctx         = __webpack_require__(25)
  , call        = __webpack_require__(117)
  , isArrayIter = __webpack_require__(79)
  , anObject    = __webpack_require__(1)
  , toLength    = __webpack_require__(9)
  , getIterFn   = __webpack_require__(54)
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = false;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(123)
  , hiddenKeys = __webpack_require__(75).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(18);
module.exports = function(target, src, safe){
  for(var key in src)redefine(target, key, src[key], safe);
  return target;
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global      = __webpack_require__(2)
  , dP          = __webpack_require__(7)
  , DESCRIPTORS = __webpack_require__(8)
  , SPECIES     = __webpack_require__(6)('species');

module.exports = function(KEY){
  var C = global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(34)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 45 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var metadata_1 = __webpack_require__(35);
/**
 * Directives allow you to attach behavior to elements in the DOM.
 *
 * {@link DirectiveMetadata}s with an embedded view are called {@link ComponentMetadata}s.
 *
 * A directive consists of a single directive annotation and a controller class. When the
 * directive's `selector` matches
 * elements in the DOM, the following steps occur:
 *
 * 1. For each directive, the `ElementInjector` attempts to resolve the directive's constructor
 * arguments.
 * 2. Angular instantiates directives for each matched element using `ElementInjector` in a
 * depth-first order,
 *    as declared in the HTML.
 *
 * ## Understanding How Injection Works
 *
 * There are three stages of injection resolution.
 * - *Pre-existing Injectors*:
 *   - The terminal {@link Injector} cannot resolve dependencies. It either throws an error or, if
 * the dependency was
 *     specified as `@Optional`, returns `null`.
 *   - The platform injector resolves browser singleton resources, such as: cookies, title,
 * location, and others.
 * - *Component Injectors*: Each component instance has its own {@link Injector}, and they follow
 * the same parent-child hierarchy
 *     as the component instances in the DOM.
 * - *Element Injectors*: Each component instance has a Shadow DOM. Within the Shadow DOM each
 * element has an `ElementInjector`
 *     which follow the same parent-child hierarchy as the DOM elements themselves.
 *
 * When a template is instantiated, it also must instantiate the corresponding directives in a
 * depth-first order. The
 * current `ElementInjector` resolves the constructor dependencies for each directive.
 *
 * Angular then resolves dependencies as follows, according to the order in which they appear in the
 * {@link ViewMetadata}:
 *
 * 1. Dependencies on the current element
 * 2. Dependencies on element injectors and their parents until it encounters a Shadow DOM boundary
 * 3. Dependencies on component injectors and their parents until it encounters the root component
 * 4. Dependencies on pre-existing injectors
 *
 *
 * The `ElementInjector` can inject other directives, element-specific special objects, or it can
 * delegate to the parent
 * injector.
 *
 * To inject other directives, declare the constructor parameter as:
 * - `directive:DirectiveType`: a directive on the current element only
 * - `@Host() directive:DirectiveType`: any directive that matches the type between the current
 * element and the
 *    Shadow DOM root.
 * - `@Query(DirectiveType) query:QueryList<DirectiveType>`: A live collection of direct child
 * directives.
 * - `@QueryDescendants(DirectiveType) query:QueryList<DirectiveType>`: A live collection of any
 * child directives.
 *
 * To inject element-specific special objects, declare the constructor parameter as:
 * - `element: ElementRef` to obtain a reference to logical element in the view.
 * - `viewContainer: ViewContainerRef` to control child template instantiation, for
 * {@link DirectiveMetadata} directives only
 * - `bindingPropagation: BindingPropagation` to control change detection in a more granular way.
 *
 * ### Example
 *
 * The following example demonstrates how dependency injection resolves constructor arguments in
 * practice.
 *
 *
 * Assume this HTML template:
 *
 * ```
 * <div dependency="1">
 *   <div dependency="2">
 *     <div dependency="3" my-directive>
 *       <div dependency="4">
 *         <div dependency="5"></div>
 *       </div>
 *       <div dependency="6"></div>
 *     </div>
 *   </div>
 * </div>
 * ```
 *
 * With the following `dependency` decorator and `SomeService` injectable class.
 *
 * ```
 * @Injectable()
 * class SomeService {
 * }
 *
 * @Directive({
 *   selector: '[dependency]',
 *   inputs: [
 *     'id: dependency'
 *   ]
 * })
 * class Dependency {
 *   id:string;
 * }
 * ```
 *
 * Let's step through the different ways in which `MyDirective` could be declared...
 *
 *
 * ### No injection
 *
 * Here the constructor is declared with no arguments, therefore nothing is injected into
 * `MyDirective`.
 *
 * ```
 * @Directive({ selector: '[my-directive]' })
 * class MyDirective {
 *   constructor() {
 *   }
 * }
 * ```
 *
 * This directive would be instantiated with no dependencies.
 *
 *
 * ### Component-level injection
 *
 * Directives can inject any injectable instance from the closest component injector or any of its
 * parents.
 *
 * Here, the constructor declares a parameter, `someService`, and injects the `SomeService` type
 * from the parent
 * component's injector.
 * ```
 * @Directive({ selector: '[my-directive]' })
 * class MyDirective {
 *   constructor(someService: SomeService) {
 *   }
 * }
 * ```
 *
 * This directive would be instantiated with a dependency on `SomeService`.
 *
 *
 * ### Injecting a directive from the current element
 *
 * Directives can inject other directives declared on the current element.
 *
 * ```
 * @Directive({ selector: '[my-directive]' })
 * class MyDirective {
 *   constructor(dependency: Dependency) {
 *     expect(dependency.id).toEqual(3);
 *   }
 * }
 * ```
 * This directive would be instantiated with `Dependency` declared at the same element, in this case
 * `dependency="3"`.
 *
 * ### Injecting a directive from any ancestor elements
 *
 * Directives can inject other directives declared on any ancestor element (in the current Shadow
 * DOM), i.e. on the current element, the
 * parent element, or its parents.
 * ```
 * @Directive({ selector: '[my-directive]' })
 * class MyDirective {
 *   constructor(@Host() dependency: Dependency) {
 *     expect(dependency.id).toEqual(2);
 *   }
 * }
 * ```
 *
 * `@Host` checks the current element, the parent, as well as its parents recursively. If
 * `dependency="2"` didn't
 * exist on the direct parent, this injection would
 * have returned
 * `dependency="1"`.
 *
 *
 * ### Injecting a live collection of direct child directives
 *
 *
 * A directive can also query for other child directives. Since parent directives are instantiated
 * before child directives, a directive can't simply inject the list of child directives. Instead,
 * the directive injects a {@link QueryList}, which updates its contents as children are added,
 * removed, or moved by a directive that uses a {@link ViewContainerRef} such as a `ngFor`, an
 * `ngIf`, or an `ngSwitch`.
 *
 * ```
 * @Directive({ selector: '[my-directive]' })
 * class MyDirective {
 *   constructor(@Query(Dependency) dependencies:QueryList<Dependency>) {
 *   }
 * }
 * ```
 *
 * This directive would be instantiated with a {@link QueryList} which contains `Dependency` 4 and
 * `Dependency` 6. Here, `Dependency` 5 would not be included, because it is not a direct child.
 *
 * ### Injecting a live collection of descendant directives
 *
 * By passing the descendant flag to `@Query` above, we can include the children of the child
 * elements.
 *
 * ```
 * @Directive({ selector: '[my-directive]' })
 * class MyDirective {
 *   constructor(@Query(Dependency, {descendants: true}) dependencies:QueryList<Dependency>) {
 *   }
 * }
 * ```
 *
 * This directive would be instantiated with a Query which would contain `Dependency` 4, 5 and 6.
 *
 * ### Optional injection
 *
 * The normal behavior of directives is to return an error when a specified dependency cannot be
 * resolved. If you
 * would like to inject `null` on unresolved dependency instead, you can annotate that dependency
 * with `@Optional()`.
 * This explicitly permits the author of a template to treat some of the surrounding directives as
 * optional.
 *
 * ```
 * @Directive({ selector: '[my-directive]' })
 * class MyDirective {
 *   constructor(@Optional() dependency:Dependency) {
 *   }
 * }
 * ```
 *
 * This directive would be instantiated with a `Dependency` directive found on the current element.
 * If none can be
 * found, the injector supplies `null` instead of throwing an error.
 *
 * ### Example
 *
 * Here we use a decorator directive to simply define basic tool-tip behavior.
 *
 * ```
 * @Directive({
 *   selector: '[tooltip]',
 *   inputs: [
 *     'text: tooltip'
 *   ],
 *   host: {
 *     '(mouseenter)': 'onMouseEnter()',
 *     '(mouseleave)': 'onMouseLeave()'
 *   }
 * })
 * class Tooltip{
 *   text:string;
 *   overlay:Overlay; // NOT YET IMPLEMENTED
 *   overlayManager:OverlayManager; // NOT YET IMPLEMENTED
 *
 *   constructor(overlayManager:OverlayManager) {
 *     this.overlay = overlay;
 *   }
 *
 *   onMouseEnter() {
 *     // exact signature to be determined
 *     this.overlay = this.overlayManager.open(text, ...);
 *   }
 *
 *   onMouseLeave() {
 *     this.overlay.close();
 *     this.overlay = null;
 *   }
 * }
 * ```
 * In our HTML template, we can then add this behavior to a `<div>` or any other element with the
 * `tooltip` selector,
 * like so:
 *
 * ```
 * <div tooltip="some text here"></div>
 * ```
 *
 * Directives can also control the instantiation, destruction, and positioning of inline template
 * elements:
 *
 * A directive uses a {@link ViewContainerRef} to instantiate, insert, move, and destroy views at
 * runtime.
 * The {@link ViewContainerRef} is created as a result of `<template>` element, and represents a
 * location in the current view
 * where these actions are performed.
 *
 * Views are always created as children of the current {@link ViewMetadata}, and as siblings of the
 * `<template>` element. Thus a
 * directive in a child view cannot inject the directive that created it.
 *
 * Since directives that create views via ViewContainers are common in Angular, and using the full
 * `<template>` element syntax is wordy, Angular
 * also supports a shorthand notation: `<li *foo="bar">` and `<li template="foo: bar">` are
 * equivalent.
 *
 * Thus,
 *
 * ```
 * <ul>
 *   <li *foo="bar" title="text"></li>
 * </ul>
 * ```
 *
 * Expands in use to:
 *
 * ```
 * <ul>
 *   <template [foo]="bar">
 *     <li title="text"></li>
 *   </template>
 * </ul>
 * ```
 *
 * Notice that although the shorthand places `*foo="bar"` within the `<li>` element, the binding for
 * the directive
 * controller is correctly instantiated on the `<template>` element rather than the `<li>` element.
 *
 * ## Lifecycle hooks
 *
 * When the directive class implements some {@link angular2/lifecycle_hooks} the callbacks are
 * called by the change detection at defined points in time during the life of the directive.
 *
 * ### Example
 *
 * Let's suppose we want to implement the `unless` behavior, to conditionally include a template.
 *
 * Here is a simple directive that triggers on an `unless` selector:
 *
 * ```
 * @Directive({
 *   selector: '[unless]',
 *   inputs: ['unless']
 * })
 * export class Unless {
 *   viewContainer: ViewContainerRef;
 *   templateRef: TemplateRef;
 *   prevCondition: boolean;
 *
 *   constructor(viewContainer: ViewContainerRef, templateRef: TemplateRef) {
 *     this.viewContainer = viewContainer;
 *     this.templateRef = templateRef;
 *     this.prevCondition = null;
 *   }
 *
 *   set unless(newCondition) {
 *     if (newCondition && (isBlank(this.prevCondition) || !this.prevCondition)) {
 *       this.prevCondition = true;
 *       this.viewContainer.clear();
 *     } else if (!newCondition && (isBlank(this.prevCondition) || this.prevCondition)) {
 *       this.prevCondition = false;
 *       this.viewContainer.create(this.templateRef);
 *     }
 *   }
 * }
 * ```
 *
 * We can then use this `unless` selector in a template:
 * ```
 * <ul>
 *   <li *unless="expr"></li>
 * </ul>
 * ```
 *
 * Once the directive instantiates the child view, the shorthand notation for the template expands
 * and the result is:
 *
 * ```
 * <ul>
 *   <template [unless]="exp">
 *     <li></li>
 *   </template>
 *   <li></li>
 * </ul>
 * ```
 *
 * Note also that although the `<li></li>` template still exists inside the `<template></template>`,
 * the instantiated
 * view occurs on the second `<li></li>` which is a sibling to the `<template>` element.
 */
var DirectiveMetadata = (function (_super) {
    __extends(DirectiveMetadata, _super);
    function DirectiveMetadata(_a) {
        var _b = _a === void 0 ? {} : _a, selector = _b.selector, inputs = _b.inputs, attrs = _b.attrs, outputs = _b.outputs, host = _b.host, providers = _b.providers, exportAs = _b.exportAs, queries = _b.queries, legacy = _b.legacy;
        var _this = _super.call(this) || this;
        _this.selector = selector;
        _this._inputs = inputs;
        _this._attrs = attrs;
        _this._outputs = outputs;
        _this.host = host;
        _this.exportAs = exportAs;
        _this.queries = queries;
        _this._providers = providers;
        _this.legacy = legacy;
        return _this;
    }
    Object.defineProperty(DirectiveMetadata.prototype, "inputs", {
        /**
         * Enumerates the set of data-bound input properties for a directive
         *
         * Angular automatically updates input properties during change detection.
         *
         * The `inputs` property defines a set of `directiveProperty` to `bindingProperty`
         * configuration:
         *
         * - `directiveProperty` specifies the component property where the value is written.
         * - `bindingProperty` specifies the DOM property where the value is read from.
         *
         * When `bindingProperty` is not provided, it is assumed to be equal to `directiveProperty`.
         *
         * ### Example ([live demo](http://plnkr.co/edit/ivhfXY?p=preview))
         *
         * The following example creates a component with two data-bound properties.
         *
         * ```typescript
         * @Component({
         *   selector: 'bank-account',
         *   inputs: ['bankName', 'id: account-id'],
         *   template: `
         *     Bank Name: {{bankName}}
         *     Account Id: {{id}}
         *   `
         * })
         * class BankAccount {
         *   bankName: string;
         *   id: string;
         *
         *   // this property is not bound, and won't be automatically updated by Angular
         *   normalizedBankName: string;
         * }
         *
         * @Component({
         *   selector: 'app',
         *   template: `
         *     <bank-account bank-name="RBC" account-id="4747"></bank-account>
         *   `,
         *   directives: [BankAccount]
         * })
         * class App {}
         *
         * bootstrap(App);
         * ```
         *
         */
        get: function () {
            return this._inputs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DirectiveMetadata.prototype, "attrs", {
        /**
         * Enumerates the set of attribute-bound input properties for a directive
         *
         * Angular automatically updates input properties during change detection.
         *
         * The `attrs` property defines a set of `directiveProperty` to `bindingProperty`
         * configuration:
         *
         * - `directiveProperty` specifies the component property where the value is written.
         * - `bindingProperty` specifies the DOM property where the value is read from.
         *
         * When `bindingProperty` is not provided, it is assumed to be equal to `directiveProperty`.
         *
         * #### Behind the scenes:
         * This is just Angular 1 `@` binding on `bindToController` object.
         *
         * So this `attrs: ['bankName', 'id: account-id']`
         * is equal to: `bindToController{bankName:'@',id:'@accountId'}`
         *
         *
         * The following example creates a component with two attribute-bound properties.
         *
         * ```typescript
         * @Component({
         *   selector: 'bank-account',
         *   attrs: ['bankName', 'id: accountId'],
         *   template: `
         *     Bank Name: {{ctrl.bankName}}
         *     Account Id: {{ctrl.id}}
         *   `
         * })
         * class BankAccount {
         *   bankName: string;
         *   id: string;
         *
         *   // this property is not bound, and won't be automatically updated by Angular
         *   normalizedBankName: string;
         * }
         *
         * @Component({
         *   selector: 'app',
         *   template: `
         *     <bank-account bank-name="RBC" account-id="4747"></bank-account>
         *   `
         * })
         * class App {}
         *
         * ```
         *
         * Will output:
         * ```html
         * <bank-account bank-name="RBC" account-id="4747">
         *    Bank Name: RBC
         *    Account Id: 4747
         * </bank-account>
         * ```
         *
         */
        get: function () {
            return this._attrs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DirectiveMetadata.prototype, "outputs", {
        /**
         * Enumerates the set of event-bound output properties.
         *
         * When an output property emits an event, an event handler attached to that event
         * the template is invoked.
         *
         * The `outputs` property defines a set of `directiveProperty` to `bindingProperty`
         * configuration:
         *
         * - `directiveProperty` specifies the component property that emits events.
         * - `bindingProperty` specifies the DOM property the event handler is attached to.
         *
         * ### Example ([live demo](http://plnkr.co/edit/d5CNq7?p=preview))
         *
         * ```typescript
         * @Directive({
         *   selector: 'interval-dir',
         *   outputs: ['everySecond', 'five5Secs: everyFiveSeconds']
         * })
         * class IntervalDir {
         *   everySecond = new EventEmitter();
         *   five5Secs = new EventEmitter();
         *
         *   constructor() {
         *     setInterval(() => this.everySecond.emit("event"), 1000);
         *     setInterval(() => this.five5Secs.emit("event"), 5000);
         *   }
         * }
         *
         * @Component({
         *   selector: 'app',
         *   template: `
         *     <interval-dir (every-second)="everySecond()" (every-five-seconds)="everyFiveSeconds()">
         *     </interval-dir>
         *   `,
         *   directives: [IntervalDir]
         * })
         * class App {
         *   everySecond() { console.log('second'); }
         *   everyFiveSeconds() { console.log('five seconds'); }
         * }
         * bootstrap(App);
         * ```
         *
         */
        get: function () {
            return this._outputs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DirectiveMetadata.prototype, "providers", {
        /**
         * Defines the set of injectable objects that are visible to a Directive and its light DOM
         * children.
         *
         * ## Simple Example
         *
         * Here is an example of a class that can be injected:
         *
         * ```
         * class Greeter {
         *    greet(name:string) {
         *      return 'Hello ' + name + '!';
         *    }
         * }
         *
         * @Directive({
         *   selector: 'greet',
         *   bindings: [
         *     Greeter
         *   ]
         * })
         * class HelloWorld {
         *   greeter:Greeter;
         *
         *   constructor(greeter:Greeter) {
         *     this.greeter = greeter;
         *   }
         * }
         * ```
         */
        get: function () {
            return this._providers;
        },
        enumerable: true,
        configurable: true
    });
    return DirectiveMetadata;
}(metadata_1.InjectableMetadata));
exports.DirectiveMetadata = DirectiveMetadata;
/**
 * Declare reusable UI building blocks for an application.
 *
 * Each Angular component requires a single `@Component` annotation. The
 * `@Component`
 * annotation specifies when a component is instantiated, and which properties and hostListeners it
 * binds to.
 *
 * When a component is instantiated, Angular
 * - creates a shadow DOM for the component.
 * - loads the selected template into the shadow DOM.
 * - creates all the injectable objects configured with `providers` and `viewProviders`.
 *
 * All template expressions and statements are then evaluated against the component instance.
 *
 * ## Lifecycle hooks
 *
 * When the component class implements some {@link angular2/lifecycle_hooks} the callbacks are
 * called by the change detection at defined points in time during the life of the component.
 *
 * ### Example
 *
 * {@example core/ts/metadata/metadata.ts region='component'}
 */
var ComponentMetadata = (function (_super) {
    __extends(ComponentMetadata, _super);
    function ComponentMetadata(_a) {
        var _b = _a === void 0 ? {} : _a, selector = _b.selector, inputs = _b.inputs, attrs = _b.attrs, outputs = _b.outputs, host = _b.host, exportAs = _b.exportAs, moduleId = _b.moduleId, providers = _b.providers, viewProviders = _b.viewProviders, _c = _b.changeDetection, changeDetection = _c === void 0 ? 1 /* Default */ : _c, queries = _b.queries, templateUrl = _b.templateUrl, template = _b.template, styleUrls = _b.styleUrls, styles = _b.styles, legacy = _b.legacy;
        var _this = _super.call(this, {
            selector: selector,
            inputs: inputs,
            attrs: attrs,
            outputs: outputs,
            host: host,
            exportAs: exportAs,
            providers: providers,
            queries: queries,
            legacy: legacy
        }) || this;
        _this.changeDetection = changeDetection;
        _this._viewProviders = viewProviders;
        _this.templateUrl = templateUrl;
        _this.template = template;
        _this.styleUrls = styleUrls;
        _this.styles = styles;
        _this.moduleId = moduleId;
        return _this;
    }
    Object.defineProperty(ComponentMetadata.prototype, "viewProviders", {
        /**
         * Defines the set of injectable objects that are visible to its view DOM children.
         *
         * ## Simple Example
         *
         * Here is an example of a class that can be injected:
         *
         * ```
         * class Greeter {
         *    greet(name:string) {
         *      return 'Hello ' + name + '!';
         *    }
         * }
         *
         * @Directive({
         *   selector: 'needs-greeter'
         * })
         * class NeedsGreeter {
         *   greeter:Greeter;
         *
         *   constructor(greeter:Greeter) {
         *     this.greeter = greeter;
         *   }
         * }
         *
         * @Component({
         *   selector: 'greet',
         *   viewProviders: [
         *     Greeter
         *   ],
         *   template: `<needs-greeter></needs-greeter>`,
         *   directives: [NeedsGreeter]
         * })
         * class HelloWorld {
         * }
         *
         * ```
         */
        get: function () {
            return this._viewProviders;
        },
        enumerable: true,
        configurable: true
    });
    return ComponentMetadata;
}(DirectiveMetadata));
exports.ComponentMetadata = ComponentMetadata;
/**
 * Declares a data-bound input property.
 *
 * Angular automatically updates data-bound properties during change detection.
 *
 * `InputMetadata` takes an optional parameter that specifies the name
 * used when instantiating a component in the template. When not provided,
 * the name of the decorated property is used.
 *
 * ### Example
 *
 * The following example creates a component with two input properties.
 *
 * ```typescript
 * @Component({
 *   selector: 'bank-account',
 *   template: `
 *     Bank Name: {{bankName}}
 *     Account Id: {{id}}
 *   `
 * })
 * class BankAccount {
 *   @Input() bankName: string;
 *   @Input('account-id') id: string;
 *
 *   // this property is not bound, and won't be automatically updated by Angular
 *   normalizedBankName: string;
 * }
 *
 * @Component({
 *   selector: 'app',
 *   template: `
 *     <bank-account bank-name="RBC" account-id="4747"></bank-account>
 *   `,
 *   directives: [BankAccount]
 * })
 * class App {}
 *
 * bootstrap(App);
 * ```
 */
var InputMetadata = (function () {
    /**
     *
     * @param {string?} bindingPropertyName Name used when instantiating a component in the template.
     */
    function InputMetadata(bindingPropertyName) {
        this.bindingPropertyName = bindingPropertyName;
    }
    return InputMetadata;
}());
exports.InputMetadata = InputMetadata;
/**
 * Declares a data-bound attribute property.
 *
 * Angular automatically updates data-bound properties during change detection.
 *
 * `AttrMetadata` takes an optional parameter that specifies the name
 * used when instantiating a component in the template. When not provided,
 * the name of the decorated property is used.
 *
 *
 * #### Behind the scenes:
 * This is just Angular 1 `@` binding on `bindToController` object.
 *
 * So this `attrs: ['bankName', 'id: account-id']`
 * is equal to: `bindToController{bankName:'@',id:'@accountId'}`
 *
 * ### Example
 *
 * The following example creates a component with two attribute-bound properties.
 *
 * ```typescript
 * @Component({
 *   selector: 'bank-account',
 *   template: `
 *     Bank Name: {{ctrl.bankName}}
 *     Account Id: {{ctrl.id}}
 *   `
 * })
 * class BankAccount {
 *    @Attr() bankName: string;
 *    @Attr('accountId') id: string;
 *
 *   // this property is not bound, and won't be automatically updated by Angular
 *   normalizedBankName: string;
 * }
 *
 * @Component({
 *   selector: 'app',
 *   template: `
 *     <bank-account bank-name="RBC" account-id="4747"></bank-account>
 *   `
 * })
 * class App {}
 * ```
 *
 * Will output:
 * ```html
 * <bank-account bank-name="RBC" account-id="4747">
 *    Bank Name: RBC
 *    Account Id: 4747
 * </bank-account>
 * ```
 *
 */
var AttrMetadata = (function () {
    /**
     *
     * @param {string?} bindingPropertyName Name used when instantiating a component in the template.
     */
    function AttrMetadata(bindingPropertyName) {
        this.bindingPropertyName = bindingPropertyName;
    }
    return AttrMetadata;
}());
exports.AttrMetadata = AttrMetadata;
/**
 * Declares an event-bound output property.
 *
 * When an output property emits an event, an event handler attached to that event
 * the template is invoked.
 *
 * `OutputMetadata` takes an optional parameter that specifies the name
 * used when instantiating a component in the template. When not provided,
 * the name of the decorated property is used.
 *
 * ### Example
 *
 * ```typescript
 * @Directive({
 *   selector: 'interval-dir',
 * })
 * class IntervalDir {
 *   @Output() everySecond = new EventEmitter();
 *   @Output('everyFiveSeconds') five5Secs = new EventEmitter();
 *
 *   constructor() {
 *     setInterval(() => this.everySecond.emit("event"), 1000);
 *     setInterval(() => this.five5Secs.emit("event"), 5000);
 *   }
 * }
 *
 * @Component({
 *   selector: 'app',
 *   template: `
 *     <interval-dir (every-second)="everySecond()" (every-five-seconds)="everyFiveSeconds()">
 *     </interval-dir>
 *   `,
 *   directives: [IntervalDir]
 * })
 * class App {
 *   everySecond() { console.log('second'); }
 *   everyFiveSeconds() { console.log('five seconds'); }
 * }
 * bootstrap(App);
 * ```
 */
var OutputMetadata = (function () {
    /**
     *
     * @param {string?} bindingPropertyName Name used when instantiating a component in the template.
     */
    function OutputMetadata(bindingPropertyName) {
        this.bindingPropertyName = bindingPropertyName;
    }
    return OutputMetadata;
}());
exports.OutputMetadata = OutputMetadata;
/**
 * Declares a host property binding.
 *
 * Angular automatically checks host property bindings during change detection.
 * If a binding changes, it will update the host element of the directive.
 *
 * `HostBindingMetadata` takes an optional parameter that specifies the property
 * name of the host element that will be updated. When not provided,
 * the class property name is used.
 *
 * ### Example
 *
 * The following example creates a directive that sets the `valid` and `invalid` classes
 * on the DOM element that has ngModel directive on it.
 *
 * ```typescript
 * @Directive({selector: '[ngModel]'})
 * class NgModelStatus {
 *   constructor(public control:NgModel) {}
 *   @HostBinding('[class.valid]') get valid { return this.control.valid; }
 *   @HostBinding('[class.invalid]') get invalid { return this.control.invalid; }
 * }
 *
 * @Component({
 *   selector: 'app',
 *   template: `<input [(ngModel)]="prop">`,
 *   directives: [FORM_DIRECTIVES, NgModelStatus]
 * })
 * class App {
 *   prop;
 * }
 *
 * bootstrap(App);
 * ```
 */
var HostBindingMetadata = (function () {
    function HostBindingMetadata(hostPropertyName) {
        this.hostPropertyName = hostPropertyName;
    }
    return HostBindingMetadata;
}());
exports.HostBindingMetadata = HostBindingMetadata;
/**
 * Declares a host listener.
 *
 * Angular will invoke the decorated method when the host element emits the specified event.
 *
 * If the decorated method returns `false`, then `preventDefault` is applied on the DOM
 * event.
 *
 * ### Example
 *
 * The following example declares a directive that attaches a click listener to the button and
 * counts clicks.
 *
 * ```typescript
 * @Directive({selector: 'button[counting]'})
 * class CountClicks {
 *   numberOfClicks = 0;
 *
 *   @HostListener('click', ['$event.target'])
 *   onClick(btn) {
 *     console.log("button", btn, "number of clicks:", this.numberOfClicks++);
 *   }
 * }
 *
 * @Component({
 *   selector: 'app',
 *   template: `<button counting>Increment</button>`,
 *   directives: [CountClicks]
 * })
 * class App {}
 *
 * bootstrap(App);
 * ```
 */
var HostListenerMetadata = (function () {
    function HostListenerMetadata(eventName, args) {
        this.eventName = eventName;
        this.args = args;
    }
    return HostListenerMetadata;
}());
exports.HostListenerMetadata = HostListenerMetadata;
/**
 * Declares an Angular Module.
 */
var NgModuleMetadata = (function (_super) {
    __extends(NgModuleMetadata, _super);
    function NgModuleMetadata(options) {
        if (options === void 0) { options = {}; }
        var _this = 
        // We cannot use destructuring of the constructor argument because `exports` is a
        // protected symbol in CommonJS and closure tries to aggressively optimize it away.
        _super.call(this) || this;
        _this._providers = options.providers;
        _this.declarations = options.declarations;
        _this.imports = options.imports;
        return _this;
    }
    Object.defineProperty(NgModuleMetadata.prototype, "providers", {
        get: function () { return this._providers; },
        enumerable: true,
        configurable: true
    });
    return NgModuleMetadata;
}(metadata_1.InjectableMetadata));
exports.NgModuleMetadata = NgModuleMetadata;
//# sourceMappingURL=metadata_directives.js.map

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var reflector_1 = __webpack_require__(364);
var reflection_capabilities_1 = __webpack_require__(363);
/**
 * The {@link Reflector} used internally in Angular to access metadata
 * about symbols.
 */
exports.reflector = new reflector_1.Reflector(new reflection_capabilities_1.ReflectionCapabilities());
//# sourceMappingURL=reflection.js.map

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(6)('unscopables')
  , ArrayProto  = Array.prototype;
if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(15)(ArrayProto, UNSCOPABLES, {});
module.exports = function(key){
  ArrayProto[UNSCOPABLES][key] = true;
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(7).f
  , has = __webpack_require__(11)
  , TAG = __webpack_require__(6)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
  , defined = __webpack_require__(22)
  , fails   = __webpack_require__(4)
  , spaces  = __webpack_require__(95)
  , space   = '[' + spaces + ']'
  , non     = '\u200b\u0085'
  , ltrim   = RegExp('^' + space + space + '*')
  , rtrim   = RegExp(space + space + '*$');

var exporter = function(KEY, exec, ALIAS){
  var exp   = {};
  var FORCE = fails(function(){
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if(ALIAS)exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function(string, TYPE){
  string = String(defined(string));
  if(TYPE & 1)string = string.replace(ltrim, '');
  if(TYPE & 2)string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var lang_1 = __webpack_require__(3);
var reflection_1 = __webpack_require__(47);
var pipe_provider_1 = __webpack_require__(362);
var directive_provider_1 = __webpack_require__(353);
var collections_1 = __webpack_require__(20);
var forward_ref_1 = __webpack_require__(55);
var exceptions_1 = __webpack_require__(143);
var provider_util_1 = __webpack_require__(56);
var provider_util_2 = __webpack_require__(56);
var provider_util_3 = __webpack_require__(56);
var Provider = (function () {
    function Provider(token, _a) {
        var useClass = _a.useClass, useValue = _a.useValue, useExisting = _a.useExisting, useFactory = _a.useFactory, deps = _a.deps, multi = _a.multi;
        this.token = token;
        this.useClass = useClass;
        this.useValue = useValue;
        this.useExisting = useExisting;
        this.useFactory = useFactory;
        this.dependencies = deps;
        this._multi = multi;
    }
    Object.defineProperty(Provider.prototype, "multi", {
        /**
         * Creates multiple providers matching the same token (a multi-provider).
         *
         * Multi-providers are used for creating pluggable service, where the system comes
         * with some default providers, and the user can register additional providers.
         * The combination of the default providers and the additional providers will be
         * used to drive the behavior of the system.
         *
         * ### Example
         *
         * ```typescript
         * var injector = Injector.resolveAndCreate([
         *   new Provider("Strings", { useValue: "String1", multi: true}),
         *   new Provider("Strings", { useValue: "String2", multi: true})
         * ]);
         *
         * expect(injector.get("Strings")).toEqual(["String1", "String2"]);
         * ```
         *
         * Multi-providers and regular providers cannot be mixed. The following
         * will throw an exception:
         *
         * ```typescript
         * var injector = Injector.resolveAndCreate([
         *   new Provider("Strings", { useValue: "String1", multi: true }),
         *   new Provider("Strings", { useValue: "String2"})
         * ]);
         * ```
         */
        get: function () { return lang_1.normalizeBool(this._multi); },
        enumerable: true,
        configurable: true
    });
    return Provider;
}());
exports.Provider = Provider;
var ProviderBuilder = (function () {
    function ProviderBuilder() {
    }
    ProviderBuilder.createFromType = function (type, _a) {
        var useClass = _a.useClass, useValue = _a.useValue, useFactory = _a.useFactory, deps = _a.deps;
        // ...provide('myFactory',{useFactory: () => () => { return new Foo(); } })
        if (lang_1.isPresent(useFactory)) {
            var factoryToken = getInjectableName(type);
            var injectableDeps = lang_1.isArray(deps) ? deps.map(getInjectableName) : [];
            useFactory.$inject = injectableDeps;
            return [
                factoryToken,
                useFactory
            ];
        }
        // ...provide(opaqueTokenInst,{useValue: {foo:12312} })
        // ...provide('myValue',{useValue: {foo:12312} })
        if (lang_1.isPresent(useValue)) {
            var valueToken = getInjectableName(type);
            return [
                valueToken,
                useValue
            ];
        }
        var injectableType = lang_1.isString(type) || provider_util_1.isOpaqueToken(type)
            ? forward_ref_1.resolveForwardRef(useClass)
            : forward_ref_1.resolveForwardRef(type);
        var overrideName = lang_1.isString(type) || provider_util_1.isOpaqueToken(type)
            ? getInjectableName(type)
            : '';
        if (!lang_1.isType(injectableType)) {
            throw new Error("\n      Provider registration: \"" + lang_1.stringify(injectableType) + "\":\n      =======================================================\n      token " + lang_1.stringify(injectableType) + " must be type of Type, You cannot provide none class\n      ");
        }
        /**
         *
         * @type {any[]}
         */
        var annotations = reflection_1.reflector.annotations(injectableType);
        var rootAnnotation = annotations[0];
        // No Annotation === it's config function !!!
        // NOTE: we are not checking anymore if user annotated the class or not,
        // we cannot do that anymore at the costs for nic config functions registration
        if (collections_1.ListWrapper.isEmpty(annotations)) {
            return [injectableType];
        }
        if (collections_1.ListWrapper.size(annotations) > 1) {
            var hasComponentAnnotation = annotations.some(function (meta) { return provider_util_2.isComponent(meta); });
            var hasNotAllowedSecondAnnotation = annotations.some(function (meta) {
                return provider_util_1.isDirectiveLike(meta) || provider_util_1.isService(meta) || provider_util_1.isPipe(meta);
            });
            if (!hasComponentAnnotation || (hasNotAllowedSecondAnnotation && hasComponentAnnotation)) {
                throw Error("\n        Provider registration: \"" + lang_1.stringify(injectableType) + "\":\n        =======================================================\n        - you cannot use more than 1 class decorator,\n        - you've used " + annotations.map(function (meta) { return lang_1.stringify(meta.constructor); }) + "\n        Multiple class decorators are allowed only for component class: [ @Component, @StateConfig? ]\n        ");
            }
        }
        injectableType.$inject = _dependenciesFor(injectableType);
        if (provider_util_1.isPipe(rootAnnotation)) {
            return pipe_provider_1.pipeProvider.createFromType(injectableType);
        }
        if (provider_util_1.isDirectiveLike(rootAnnotation)) {
            return directive_provider_1.directiveProvider.createFromType(injectableType);
        }
        if (provider_util_1.isService(rootAnnotation)) {
            return [
                overrideName || rootAnnotation.id,
                injectableType
            ];
        }
    };
    return ProviderBuilder;
}());
/**
 * should extract the string token from provided Type and add $inject angular 1 annotation to constructor if @Inject
 * was used
 * @returns {[string,Type]}
 * @deprecated
 */
function provide(type, _a) {
    var _b = _a === void 0 ? {} : _a, useClass = _b.useClass, useValue = _b.useValue, useFactory = _b.useFactory, deps = _b.deps;
    return ProviderBuilder.createFromType(type, { useClass: useClass, useValue: useValue, useFactory: useFactory, deps: deps });
}
exports.provide = provide;
/**
 * creates $inject array Angular 1 DI annotation strings for provided Type
 * @param typeOrFunc
 * @returns {any}
 * @private
 * @internal
 */
function _dependenciesFor(typeOrFunc) {
    var params = reflection_1.reflector.parameters(typeOrFunc);
    if (lang_1.isBlank(params))
        return [];
    if (params.some(function (param) { return lang_1.isBlank(param) || collections_1.ListWrapper.isEmpty(param); })) {
        throw new Error(exceptions_1.getErrorMsg(typeOrFunc, "you cannot have holes in constructor DI injection"));
    }
    return params
        .map(function (p) { return _extractToken(p); });
}
exports._dependenciesFor = _dependenciesFor;
/**
 * should extract service/values/directives/pipes token from constructor @Inject() paramMetadata
 * @param metadata
 * @private
 * @internal
 */
function _extractToken(metadata) {
    // this is token obtained via design:paramtypes via Reflect.metadata
    var paramMetadata = metadata.filter(lang_1.isType)[0];
    // this is token obtained from @Inject() usage  for DI
    var injectMetadata = metadata.filter(provider_util_3.isInjectMetadata)[0];
    if (lang_1.isBlank(injectMetadata) && lang_1.isBlank(paramMetadata)) {
        return;
    }
    var _a = (injectMetadata || {}).token, token = _a === void 0 ? undefined : _a;
    var injectable = forward_ref_1.resolveForwardRef(token) || paramMetadata;
    return getInjectableName(injectable);
}
exports._extractToken = _extractToken;
/**
 *  A utility function that can be used to get the angular 1 injectable's name. Needed for some cases, since
 *  injectable names are auto-created.
 *
 *  Works for string/OpaqueToken/Type
 *  Note: Type must be decorated otherwise it throws
 *
 *  @example
 *  ```typescript
 *  import { Injectable, getInjectableName } from 'ng-metadata/core';
 *  // this is given some random name like 'myService48' when it's created with `module.service`
 *
 *  @Injectable
 *  class MyService {}
 *
 *  console.log(getInjectableName(MyService)); // 'myService48'
 *  ```
 *
 * @param {ProviderType}  injectable
 * @returns {string}
 */
function getInjectableName(injectable) {
    // @Inject('foo') foo
    if (lang_1.isString(injectable)) {
        return injectable;
    }
    // const fooToken = new OpaqueToken('foo')
    // @Inject(fooToken) foo
    if (provider_util_1.isOpaqueToken(injectable)) {
        return injectable.desc;
    }
    // @Injectable()
    // class SomeService(){}
    //
    // @Inject(SomeService) someSvc
    // someSvc: SomeService
    if (lang_1.isType(injectable)) {
        // only the first class annotations is injectable
        var annotation = reflection_1.reflector.annotations(injectable)[0];
        if (lang_1.isBlank(annotation)) {
            throw new Error("\n        cannot get injectable name token from none decorated class " + lang_1.getFuncName(injectable) + "\n        Only decorated classes by one of [ @Injectable,@Directive,@Component,@Pipe ], can be injected by reference\n      ");
        }
        if (provider_util_1.isPipe(annotation)) {
            return annotation.name;
        }
        if (provider_util_1.isDirectiveLike(annotation)) {
            return lang_1.resolveDirectiveNameFromSelector(annotation.selector);
        }
        if (provider_util_1.isService(annotation)) {
            return annotation.id;
        }
    }
}
exports.getInjectableName = getInjectableName;
/**
 *
 * @param metadata
 * @returns {boolean}
 * @private
 * @internal
 * @deprecated
 *
 * @TODO: delete this
 */
function _areAllDirectiveInjectionsAtTail(metadata) {
    return metadata.every(function (paramMetadata, idx, arr) {
        var isCurrentDirectiveInjection = paramMetadata.length > 1;
        var hasPrev = idx > 0;
        var hasNext = idx < arr.length - 1;
        if (hasPrev) {
            var prevInjection = arr[idx - 1];
            var isPrevDirectiveInjection = prevInjection.length > 1;
            if (isPrevDirectiveInjection && !isCurrentDirectiveInjection) {
                return false;
            }
        }
        if (hasNext) {
            var nextInjection = arr[idx + 1];
            var isNextDirectiveInjection = nextInjection.length > 1;
            if (!isNextDirectiveInjection && isNextDirectiveInjection) {
                return false;
            }
        }
        return true;
    });
}
exports._areAllDirectiveInjectionsAtTail = _areAllDirectiveInjectionsAtTail;
//# sourceMappingURL=provider.js.map

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(21);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 53 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(37)
  , ITERATOR  = __webpack_require__(6)('iterator')
  , Iterators = __webpack_require__(39);
module.exports = __webpack_require__(14).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var lang_1 = __webpack_require__(3);
/**
 * Allows to refer to references which are not yet defined.
 *
 * For instance, `forwardRef` is used when the `token` which we need to refer to for the purposes of
 * DI is declared,
 * but not yet defined. It is also used when the `token` which we use when creating a query is not
 * yet defined.
 *
 * ### Example
 * {@example core/di/ts/forward_ref/forward_ref.ts region='forward_ref'}
 */
function forwardRef(forwardRefFn) {
    forwardRefFn.__forward_ref__ = forwardRef;
    forwardRefFn.toString = function () { return lang_1.stringify(this()); };
    return forwardRefFn;
}
exports.forwardRef = forwardRef;
/**
 * Lazily retrieves the reference value from a forwardRef.
 *
 * Acts as the identity function when given a non-forward-ref value.
 *
 * ### Example ([live demo](http://plnkr.co/edit/GU72mJrk1fiodChcmiDR?p=preview))
 *
 * ```typescript
 * var ref = forwardRef(() => "refValue");
 * expect(resolveForwardRef(ref)).toEqual("refValue");
 * expect(resolveForwardRef("regularValue")).toEqual("regularValue");
 * ```
 *
 * See: {@link forwardRef}
 */
function resolveForwardRef(type) {
    if (_isForwardRef(type)) {
        return type();
    }
    else {
        return type;
    }
    function _isForwardRef(type) {
        return lang_1.isFunction(type) && type.hasOwnProperty('__forward_ref__') && type.__forward_ref__ === forwardRef;
    }
}
exports.resolveForwardRef = resolveForwardRef;
//# sourceMappingURL=forward_ref.js.map

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var lang_1 = __webpack_require__(3);
var metadata_directives_1 = __webpack_require__(46);
var metadata_1 = __webpack_require__(103);
var provider_1 = __webpack_require__(51);
var opaque_token_1 = __webpack_require__(139);
var metadata_2 = __webpack_require__(35);
function isProviderLiteral(obj) {
    return obj && typeof obj == 'object' && obj.provide;
}
exports.isProviderLiteral = isProviderLiteral;
function createProvider(obj) {
    return new provider_1.Provider(obj.provide, obj);
}
exports.createProvider = createProvider;
function isOpaqueToken(obj) {
    return obj instanceof opaque_token_1.OpaqueToken;
}
exports.isOpaqueToken = isOpaqueToken;
function isDirectiveLike(annotation) {
    return lang_1.isString(annotation.selector) && annotation instanceof metadata_directives_1.DirectiveMetadata;
}
exports.isDirectiveLike = isDirectiveLike;
function isDirective(annotation) {
    return isDirectiveLike(annotation) && !_hasTemplate(annotation);
}
exports.isDirective = isDirective;
function isComponent(annotation) {
    return lang_1.isString(annotation.selector) && _hasTemplate(annotation) && annotation instanceof metadata_directives_1.ComponentMetadata;
}
exports.isComponent = isComponent;
function _hasTemplate(annotation) {
    return lang_1.isPresent(annotation.template || annotation.templateUrl);
}
function isService(annotation) {
    return annotation instanceof metadata_2.InjectableMetadata;
}
exports.isService = isService;
function isPipe(annotation) {
    return lang_1.isString(annotation.name) && annotation instanceof metadata_1.PipeMetadata;
}
exports.isPipe = isPipe;
function isInjectMetadata(injectMeta) {
    return injectMeta instanceof metadata_2.InjectMetadata;
}
exports.isInjectMetadata = isInjectMetadata;
function isNgModule(annotation) {
    return annotation instanceof metadata_directives_1.NgModuleMetadata;
}
exports.isNgModule = isNgModule;
//# sourceMappingURL=provider_util.js.map

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(12)
  , toLength  = __webpack_require__(9)
  , toIndex   = __webpack_require__(44);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global            = __webpack_require__(2)
  , $export           = __webpack_require__(0)
  , redefine          = __webpack_require__(18)
  , redefineAll       = __webpack_require__(42)
  , meta              = __webpack_require__(32)
  , forOf             = __webpack_require__(38)
  , anInstance        = __webpack_require__(36)
  , isObject          = __webpack_require__(5)
  , fails             = __webpack_require__(4)
  , $iterDetect       = __webpack_require__(65)
  , setToStringTag    = __webpack_require__(49)
  , inheritIfRequired = __webpack_require__(78);

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  var fixMethod = function(KEY){
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a){
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance             = new C
      // early implementations not supports chaining
      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
      // for early implementations -0 and +0 not the same
      , BUGGY_ZERO = !IS_WEAK && fails(function(){
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new C()
          , index     = 5;
        while(index--)$instance[ADDER](index, index);
        return !$instance.has(-0);
      });
    if(!ACCEPT_ITERABLES){ 
      C = wrapper(function(target, iterable){
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base, target, C);
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
    // weak collections should not contains .clear method
    if(IS_WEAK && proto.clear)delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide     = __webpack_require__(15)
  , redefine = __webpack_require__(18)
  , fails    = __webpack_require__(4)
  , defined  = __webpack_require__(22)
  , wks      = __webpack_require__(6);

module.exports = function(KEY, length, exec){
  var SYMBOL   = wks(KEY)
    , fns      = exec(defined, SYMBOL, ''[KEY])
    , strfn    = fns[0]
    , rxfn     = fns[1];
  if(fails(function(){
    var O = {};
    O[SYMBOL] = function(){ return 7; };
    return ''[KEY](O) != 7;
  })){
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function(string, arg){ return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function(string){ return rxfn.call(string, this); }
    );
  }
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(1);
module.exports = function(){
  var that   = anObject(this)
    , result = '';
  if(that.global)     result += 'g';
  if(that.ignoreCase) result += 'i';
  if(that.multiline)  result += 'm';
  if(that.unicode)    result += 'u';
  if(that.sticky)     result += 'y';
  return result;
};

/***/ }),
/* 61 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(5)
  , cof      = __webpack_require__(21)
  , MATCH    = __webpack_require__(6)('match');
module.exports = function(it){
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(29)
  , descriptor     = __webpack_require__(30)
  , setToStringTag = __webpack_require__(49)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(15)(IteratorPrototype, __webpack_require__(6)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(40)
  , $export        = __webpack_require__(0)
  , redefine       = __webpack_require__(18)
  , hide           = __webpack_require__(15)
  , has            = __webpack_require__(11)
  , Iterators      = __webpack_require__(39)
  , $iterCreate    = __webpack_require__(63)
  , setToStringTag = __webpack_require__(49)
  , getPrototypeOf = __webpack_require__(17)
  , ITERATOR       = __webpack_require__(6)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(6)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(40)|| !__webpack_require__(4)(function(){
  var K = Math.random();
  // In FF throws only define methods
  __defineSetter__.call(null, K, function(){ /* empty */});
  delete __webpack_require__(2)[K];
});

/***/ }),
/* 67 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2)
  , hide   = __webpack_require__(15)
  , uid    = __webpack_require__(45)
  , TYPED  = uid('typed_array')
  , VIEW   = uid('view')
  , ABV    = !!(global.ArrayBuffer && global.DataView)
  , CONSTR = ABV
  , i = 0, l = 9, Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while(i < l){
  if(Typed = global[TypedArrayConstructors[i++]]){
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV:    ABV,
  CONSTR: CONSTR,
  TYPED:  TYPED,
  VIEW:   VIEW
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lang_1 = __webpack_require__(3);
var forward_ref_1 = __webpack_require__(55);
var metadata_1 = __webpack_require__(35);
/**
 * Declares an injectable parameter to be a live list of directives or variable
 * bindings from the content children of a directive.
 *
 * ### Example ([live demo](http://plnkr.co/edit/lY9m8HLy7z06vDoUaSN2?p=preview))
 *
 * Assume that `<tabs>` component would like to get a list its children `<pane>`
 * components as shown in this example:
 *
 * ```html
 * <tabs>
 *   <pane title="Overview">...</pane>
 *   <pane *ngFor="#o of objects" [title]="o.title">{{o.text}}</pane>
 * </tabs>
 * ```
 *
 * The preferred solution is to query for `Pane` directives using this decorator.
 *
 * ```javascript
 * @Component({
 *   selector: 'pane',
 *   inputs: ['title']
 * })
 * class Pane {
 *   title:string;
 * }
 *
 * @Component({
 *  selector: 'tabs',
 *  template: `
 *    <ul>
 *      <li *ngFor="#pane of panes">{{pane.title}}</li>
 *    </ul>
 *    <content></content>
 *  `
 * })
 * class Tabs {
 *   panes: QueryList<Pane>;
 *   constructor(@Query(Pane) panes:QueryList<Pane>) {
  *    this.panes = panes;
  *  }
 * }
 * ```
 *
 * A query can look for variable bindings by passing in a string with desired binding symbol.
 *
 * ### Example ([live demo](http://plnkr.co/edit/sT2j25cH1dURAyBRCKx1?p=preview))
 * ```html
 * <seeker>
 *   <div #findme>...</div>
 * </seeker>
 *
 * @Component({ selector: 'seeker' })
 * class Seeker {
 *   constructor(@Query('findme') elList: QueryList<ElementRef>) {...}
 * }
 * ```
 *
 * In this case the object that is injected depend on the type of the variable
 * binding. It can be an ElementRef, a directive or a component.
 *
 * Passing in a comma separated list of variable bindings will query for all of them.
 *
 * ```html
 * <seeker>
 *   <div #find-me>...</div>
 *   <div #find-me-too>...</div>
 * </seeker>
 *
 *  @Component({
 *   selector: 'seeker'
 * })
 * class Seeker {
 *   constructor(@Query('findMe, findMeToo') elList: QueryList<ElementRef>) {...}
 * }
 * ```
 *
 * Configure whether query looks for direct children or all descendants
 * of the querying element, by using the `descendants` parameter.
 * It is set to `false` by default.
 *
 * ### Example ([live demo](http://plnkr.co/edit/wtGeB977bv7qvA5FTYl9?p=preview))
 * ```html
 * <container #first>
 *   <item>a</item>
 *   <item>b</item>
 *   <container #second>
 *     <item>c</item>
 *   </container>
 * </container>
 * ```
 *
 * When querying for items, the first container will see only `a` and `b` by default,
 * but with `Query(TextDirective, {descendants: true})` it will see `c` too.
 *
 * The queried directives are kept in a depth-first pre-order with respect to their
 * positions in the DOM.
 *
 * Query does not look deep into any subcomponent views.
 *
 * Query is updated as part of the change-detection cycle. Since change detection
 * happens after construction of a directive, QueryList will always be empty when observed in the
 * constructor.
 *
 * The injected object is an unmodifiable live list.
 * See {@link QueryList} for more details.
 */
var QueryMetadata = (function (_super) {
    __extends(QueryMetadata, _super);
    function QueryMetadata(_selector, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.descendants, descendants = _c === void 0 ? false : _c, _d = _b.first, first = _d === void 0 ? false : _d;
        var _this = _super.call(this) || this;
        _this._selector = _selector;
        _this.descendants = descendants;
        _this.first = first;
        return _this;
    }
    Object.defineProperty(QueryMetadata.prototype, "isViewQuery", {
        /**
         * always `false` to differentiate it with {@link ViewQueryMetadata}.
         */
        get: function () { return false; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryMetadata.prototype, "selector", {
        /**
         * what this is querying for.
         */
        get: function () { return forward_ref_1.resolveForwardRef(this._selector); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryMetadata.prototype, "isVarBindingQuery", {
        /**
         * whether this is querying for a variable binding or a directive.
         */
        get: function () { return lang_1.isString(this.selector); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryMetadata.prototype, "varBindings", {
        /**
         * returns a list of variable bindings this is querying for.
         * Only applicable if this is a variable bindings query.
         */
        get: function () {
            return this.isVarBindingQuery
                ? this.selector.split(',')
                : [];
        },
        enumerable: true,
        configurable: true
    });
    QueryMetadata.prototype.toString = function () { return "@Query(" + lang_1.stringify(this.selector) + ")"; };
    return QueryMetadata;
}(metadata_1.DependencyMetadata));
exports.QueryMetadata = QueryMetadata;
/**
 * Configures a content query.
 *
 * Content queries are set before the `ngAfterContentInit` callback is called.
 *
 * ### Example
 *
 * ```
 * @Directive({
 *   selector: 'someDir'
 * })
 * class SomeDir {
 *   @ContentChildren(ChildDirective) contentChildren: QueryList<ChildDirective>;
 *
 *   ngAfterContentInit() {
 *     // contentChildren is set
 *   }
 * }
 * ```
 */
var ContentChildrenMetadata = (function (_super) {
    __extends(ContentChildrenMetadata, _super);
    function ContentChildrenMetadata(_selector, _a) {
        var _b = (_a === void 0 ? {} : _a).descendants, descendants = _b === void 0 ? false : _b;
        return _super.call(this, _selector, { descendants: descendants }) || this;
    }
    return ContentChildrenMetadata;
}(QueryMetadata));
exports.ContentChildrenMetadata = ContentChildrenMetadata;
/**
 * Configures a content query.
 *
 * Content queries are set before the `ngAfterContentInit` callback is called.
 *
 * ### Example
 *
 * ```
 * @Directive({
 *   selector: 'someDir'
 * })
 * class SomeDir {
 *   @ContentChild(ChildDirective) contentChild;
 *
 *   ngAfterContentInit() {
 *     // contentChild is set
 *   }
 * }
 * ```
 */
var ContentChildMetadata = (function (_super) {
    __extends(ContentChildMetadata, _super);
    function ContentChildMetadata(_selector) {
        return _super.call(this, _selector, { descendants: true, first: true }) || this;
    }
    return ContentChildMetadata;
}(QueryMetadata));
exports.ContentChildMetadata = ContentChildMetadata;
/**
 * Similar to {@link QueryMetadata}, but querying the component view, instead of
 * the content children.
 *
 * ### Example ([live demo](http://plnkr.co/edit/eNsFHDf7YjyM6IzKxM1j?p=preview))
 *
 * ```javascript
 * @Component({...})
 * @View({
 *   template: `
 *     <item> a </item>
 *     <item> b </item>
 *     <item> c </item>
 *   `
 * })
 * class MyComponent {
 *   shown: boolean;
 *
 *   constructor(private @Query(Item) items:QueryList<Item>) {
 *     items.onChange(() => console.log(items.length));
 *   }
 * }
 * ```
 *
 * Supports the same querying parameters as {@link QueryMetadata}, except
 * `descendants`. This always queries the whole view.
 *
 * As `shown` is flipped between true and false, items will contain zero of one
 * items.
 *
 * Specifies that a {@link QueryList} should be injected.
 *
 * The injected object is an iterable and observable live list.
 * See {@link QueryList} for more details.
 */
var ViewQueryMetadata = (function (_super) {
    __extends(ViewQueryMetadata, _super);
    function ViewQueryMetadata(_selector, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.descendants, descendants = _c === void 0 ? false : _c, _d = _b.first, first = _d === void 0 ? false : _d;
        return _super.call(this, _selector, { descendants: descendants, first: first }) || this;
    }
    Object.defineProperty(ViewQueryMetadata.prototype, "isViewQuery", {
        /**
         * always `true` to differentiate it with {@link QueryMetadata}.
         */
        get: function () { return true; },
        enumerable: true,
        configurable: true
    });
    ViewQueryMetadata.prototype.toString = function () { return "@ViewQuery(" + lang_1.stringify(this.selector) + ")"; };
    return ViewQueryMetadata;
}(QueryMetadata));
exports.ViewQueryMetadata = ViewQueryMetadata;
/**
 * Configures a view query.
 *
 * View queries are set before the `ngAfterViewInit` callback is called.
 *
 * ### Example
 *
 * ```
 * @Component({
 *   selector: 'someDir',
 *   templateUrl: 'someTemplate',
 *   directives: [ItemDirective]
 * })
 * class SomeDir {
 *   @ViewChildren(ItemDirective) viewChildren: QueryList<ItemDirective>;
 *
 *   ngAfterViewInit() {
 *     // viewChildren is set
 *   }
 * }
 * ```
 */
var ViewChildrenMetadata = (function (_super) {
    __extends(ViewChildrenMetadata, _super);
    function ViewChildrenMetadata(_selector) {
        return _super.call(this, _selector, { descendants: true }) || this;
    }
    return ViewChildrenMetadata;
}(ViewQueryMetadata));
exports.ViewChildrenMetadata = ViewChildrenMetadata;
/**
 * Configures a view query.
 *
 * View queries are set before the `ngAfterViewInit` callback is called.
 *
 * ### Example
 *
 * ```
 * @Component({
 *   selector: 'someDir',
 *   templateUrl: 'someTemplate',
 *   directives: [ItemDirective]
 * })
 * class SomeDir {
 *   @ViewChild(ItemDirective) viewChild:ItemDirective;
 *
 *   ngAfterViewInit() {
 *     // viewChild is set
 *   }
 * }
 * ```
 */
var ViewChildMetadata = (function (_super) {
    __extends(ViewChildMetadata, _super);
    function ViewChildMetadata(_selector) {
        return _super.call(this, _selector, { descendants: true, first: true }) || this;
    }
    return ViewChildMetadata;
}(ViewQueryMetadata));
exports.ViewChildMetadata = ViewChildMetadata;
//# sourceMappingURL=metadata_di.js.map

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var lang_1 = __webpack_require__(3);
var reflection_1 = __webpack_require__(47);
var metadata_1 = __webpack_require__(35);
var key_1 = __webpack_require__(345);
function makeDecorator(AnnotationCls, chainFn) {
    if (chainFn === void 0) { chainFn = null; }
    function DecoratorFactory(objOrType) {
        var annotationInstance = new AnnotationCls(objOrType);
        if (this instanceof AnnotationCls) {
            return annotationInstance;
        }
        else {
            //var chainAnnotation = isFunction( this ) && this.annotations instanceof Array
            //  ? this.annotations
            //  : [];
            //chainAnnotation.push(annotationInstance);
            if (chainFn) {
                chainFn(TypeDecorator);
            }
            return TypeDecorator;
        }
        function TypeDecorator(cls) {
            /**
             * here we are creating generated name for Services
             * so we can acquire the key for AngularJS DI
             * and we have unique names after mangling our JS
             */
            if (annotationInstance instanceof metadata_1.InjectableMetadata) {
                // set id if it was explicitly provided by user @Injectable('mySvc') otherwise generate
                annotationInstance.id = annotationInstance.id || key_1.globalKeyRegistry.get(cls);
            }
            var annotations = reflection_1.reflector.ownAnnotations(cls);
            annotations = annotations || [];
            annotations.push(annotationInstance);
            reflection_1.reflector.registerAnnotations(annotations, cls);
            return cls;
        }
    }
    DecoratorFactory.prototype = Object.create(AnnotationCls.prototype);
    return DecoratorFactory;
}
exports.makeDecorator = makeDecorator;
function makeParamDecorator(annotationCls, overrideParamDecorator) {
    if (overrideParamDecorator === void 0) { overrideParamDecorator = null; }
    function ParamDecoratorFactory() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // create new annotation instance with annotation decorator on proto
        var annotationInstance = Object.create(annotationCls.prototype);
        annotationCls.apply(annotationInstance, args);
        if (this instanceof annotationCls) {
            return annotationInstance;
        }
        else {
            //(ParamDecorator as any).annotation = annotationInstance;
            return ParamDecorator;
        }
        /**
         * paramDecorators are 2 dimensional arrays
         * @param cls
         * @param unusedKey
         * @param index
         * @returns {any}
         * @constructor
         */
        function ParamDecorator(cls, unusedKey, index) {
            // this is special behaviour for non constructor param Injection
            if (lang_1.isFunction(overrideParamDecorator) && lang_1.isPresent(unusedKey)) {
                return overrideParamDecorator(annotationInstance, cls, unusedKey, index);
            }
            var parameters = reflection_1.reflector.rawParameters(cls);
            parameters = parameters || [];
            // there might be gaps if some in between parameters do not have annotations.
            // we pad with nulls.
            while (parameters.length <= index) {
                parameters.push(null);
            }
            parameters[index] = parameters[index] || [];
            var annotationsForParam = parameters[index];
            annotationsForParam.push(annotationInstance);
            reflection_1.reflector.registerParameters(parameters, cls);
            return cls;
        }
    }
    ParamDecoratorFactory.prototype = Object.create(annotationCls.prototype);
    return ParamDecoratorFactory;
}
exports.makeParamDecorator = makeParamDecorator;
function makePropDecorator(decoratorCls) {
    function PropDecoratorFactory() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var decoratorInstance = Object.create(decoratorCls.prototype);
        decoratorCls.apply(decoratorInstance, args);
        // check if this decorator was already invoked
        // - if it was return it again, just with newly applied arguments
        // - this is possible thanks to PropDecoratorFactory.prototype = Object.create(decoratorCls.prototype);
        if (this instanceof decoratorCls) {
            return decoratorInstance;
        }
        else {
            return function PropDecorator(target, name) {
                var meta = reflection_1.reflector.ownPropMetadata(target.constructor);
                meta = meta || {};
                meta[name] = meta[name] || [];
                meta[name].unshift(decoratorInstance);
                reflection_1.reflector.registerPropMetadata(meta, target.constructor);
            };
        }
    }
    // caching
    PropDecoratorFactory.prototype = Object.create(decoratorCls.prototype);
    return PropDecoratorFactory;
}
exports.makePropDecorator = makePropDecorator;
//# sourceMappingURL=decorators.js.map

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(10)
  , toIndex  = __webpack_require__(44)
  , toLength = __webpack_require__(9);
module.exports = function fill(value /*, start = 0, end = @length */){
  var O      = toObject(this)
    , length = toLength(O.length)
    , aLen   = arguments.length
    , index  = toIndex(aLen > 1 ? arguments[1] : undefined, length)
    , end    = aLen > 2 ? arguments[2] : undefined
    , endPos = end === undefined ? length : toIndex(end, length);
  while(endPos > index)O[index++] = value;
  return O;
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(7)
  , createDesc      = __webpack_require__(30);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5)
  , document = __webpack_require__(2).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 75 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(6)('match');
module.exports = function(KEY){
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch(e){
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch(f){ /* empty */ }
  } return true;
};

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2).document && document.documentElement;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var isObject       = __webpack_require__(5)
  , setPrototypeOf = __webpack_require__(89).set;
module.exports = function(that, target, C){
  var P, S = target.constructor;
  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
    setPrototypeOf(that, P);
  } return that;
};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(39)
  , ITERATOR   = __webpack_require__(6)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(21);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 82 */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x){
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;

/***/ }),
/* 83 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x){
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , macrotask = __webpack_require__(96).set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = __webpack_require__(21)(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(33)
  , gOPS     = __webpack_require__(67)
  , pIE      = __webpack_require__(53)
  , toObject = __webpack_require__(10)
  , IObject  = __webpack_require__(52)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(4)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN     = __webpack_require__(41)
  , gOPS     = __webpack_require__(67)
  , anObject = __webpack_require__(1)
  , Reflect  = __webpack_require__(2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
  var keys       = gOPN.f(anObject(it))
    , getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var path      = __webpack_require__(127)
  , invoke    = __webpack_require__(61)
  , aFunction = __webpack_require__(13);
module.exports = function(/* ...pargs */){
  var fn     = aFunction(this)
    , length = arguments.length
    , pargs  = Array(length)
    , i      = 0
    , _      = path._
    , holder = false;
  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
  return function(/* ...args */){
    var that = this
      , aLen = arguments.length
      , j = 0, k = 0, args;
    if(!holder && !aLen)return invoke(fn, pargs, that);
    args = pargs.slice();
    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
    while(aLen > k)args.push(arguments[k++]);
    return invoke(fn, args, that);
  };
};

/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports = function(regExp, replace){
  var replacer = replace === Object(replace) ? function(part){
    return replace[part];
  } : replace;
  return function(it){
    return String(it).replace(regExp, replacer);
  };
};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(5)
  , anObject = __webpack_require__(1);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(25)(Function.call, __webpack_require__(16).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(68)('keys')
  , uid    = __webpack_require__(45);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = __webpack_require__(1)
  , aFunction = __webpack_require__(13)
  , SPECIES   = __webpack_require__(6)('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(34)
  , defined   = __webpack_require__(22);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(62)
  , defined  = __webpack_require__(22);

module.exports = function(that, searchString, NAME){
  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(34)
  , defined   = __webpack_require__(22);

module.exports = function repeat(count){
  var str = String(defined(this))
    , res = ''
    , n   = toInteger(count);
  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
  return res;
};

/***/ }),
/* 95 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var ctx                = __webpack_require__(25)
  , invoke             = __webpack_require__(61)
  , html               = __webpack_require__(77)
  , cel                = __webpack_require__(74)
  , global             = __webpack_require__(2)
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(__webpack_require__(21)(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global         = __webpack_require__(2)
  , DESCRIPTORS    = __webpack_require__(8)
  , LIBRARY        = __webpack_require__(40)
  , $typed         = __webpack_require__(69)
  , hide           = __webpack_require__(15)
  , redefineAll    = __webpack_require__(42)
  , fails          = __webpack_require__(4)
  , anInstance     = __webpack_require__(36)
  , toInteger      = __webpack_require__(34)
  , toLength       = __webpack_require__(9)
  , gOPN           = __webpack_require__(41).f
  , dP             = __webpack_require__(7).f
  , arrayFill      = __webpack_require__(72)
  , setToStringTag = __webpack_require__(49)
  , ARRAY_BUFFER   = 'ArrayBuffer'
  , DATA_VIEW      = 'DataView'
  , PROTOTYPE      = 'prototype'
  , WRONG_LENGTH   = 'Wrong length!'
  , WRONG_INDEX    = 'Wrong index!'
  , $ArrayBuffer   = global[ARRAY_BUFFER]
  , $DataView      = global[DATA_VIEW]
  , Math           = global.Math
  , RangeError     = global.RangeError
  , Infinity       = global.Infinity
  , BaseBuffer     = $ArrayBuffer
  , abs            = Math.abs
  , pow            = Math.pow
  , floor          = Math.floor
  , log            = Math.log
  , LN2            = Math.LN2
  , BUFFER         = 'buffer'
  , BYTE_LENGTH    = 'byteLength'
  , BYTE_OFFSET    = 'byteOffset'
  , $BUFFER        = DESCRIPTORS ? '_b' : BUFFER
  , $LENGTH        = DESCRIPTORS ? '_l' : BYTE_LENGTH
  , $OFFSET        = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
var packIEEE754 = function(value, mLen, nBytes){
  var buffer = Array(nBytes)
    , eLen   = nBytes * 8 - mLen - 1
    , eMax   = (1 << eLen) - 1
    , eBias  = eMax >> 1
    , rt     = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0
    , i      = 0
    , s      = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0
    , e, m, c;
  value = abs(value)
  if(value != value || value === Infinity){
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if(value * (c = pow(2, -e)) < 1){
      e--;
      c *= 2;
    }
    if(e + eBias >= 1){
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if(value * c >= 2){
      e++;
      c /= 2;
    }
    if(e + eBias >= eMax){
      m = 0;
      e = eMax;
    } else if(e + eBias >= 1){
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for(; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for(; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
};
var unpackIEEE754 = function(buffer, mLen, nBytes){
  var eLen  = nBytes * 8 - mLen - 1
    , eMax  = (1 << eLen) - 1
    , eBias = eMax >> 1
    , nBits = eLen - 7
    , i     = nBytes - 1
    , s     = buffer[i--]
    , e     = s & 127
    , m;
  s >>= 7;
  for(; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for(; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if(e === 0){
    e = 1 - eBias;
  } else if(e === eMax){
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
};

var unpackI32 = function(bytes){
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
};
var packI8 = function(it){
  return [it & 0xff];
};
var packI16 = function(it){
  return [it & 0xff, it >> 8 & 0xff];
};
var packI32 = function(it){
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
};
var packF64 = function(it){
  return packIEEE754(it, 52, 8);
};
var packF32 = function(it){
  return packIEEE754(it, 23, 4);
};

var addGetter = function(C, key, internal){
  dP(C[PROTOTYPE], key, {get: function(){ return this[internal]; }});
};

var get = function(view, bytes, index, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
};
var set = function(view, bytes, index, conversion, value, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = conversion(+value);
  for(var i = 0; i < bytes; i++)store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
};

var validateArrayBufferArguments = function(that, length){
  anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
  var numberLength = +length
    , byteLength   = toLength(numberLength);
  if(numberLength != byteLength)throw RangeError(WRONG_LENGTH);
  return byteLength;
};

if(!$typed.ABV){
  $ArrayBuffer = function ArrayBuffer(length){
    var byteLength = validateArrayBufferArguments(this, length);
    this._b       = arrayFill.call(Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength){
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH]
      , offset       = toInteger(byteOffset);
    if(offset < 0 || offset > bufferLength)throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if(offset + byteLength > bufferLength)throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if(DESCRIPTORS){
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset){
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset){
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /*, littleEndian */){
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if(!fails(function(){
    new $ArrayBuffer;     // eslint-disable-line no-new
  }) || !fails(function(){
    new $ArrayBuffer(.5); // eslint-disable-line no-new
  })){
    $ArrayBuffer = function ArrayBuffer(length){
      return new BaseBuffer(validateArrayBufferArguments(this, length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for(var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j; ){
      if(!((key = keys[j++]) in $ArrayBuffer))hide($ArrayBuffer, key, BaseBuffer[key]);
    };
    if(!LIBRARY)ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2))
    , $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if(view.getInt8(0) || !view.getInt8(1))redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(2)
  , core           = __webpack_require__(14)
  , LIBRARY        = __webpack_require__(40)
  , wksExt         = __webpack_require__(130)
  , defineProperty = __webpack_require__(7).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(48)
  , step             = __webpack_require__(81)
  , Iterators        = __webpack_require__(39)
  , toIObject        = __webpack_require__(12);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(64)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var metadata_1 = __webpack_require__(35);
var decorators_1 = __webpack_require__(71);
/**
 * Factory for creating {@link InjectMetadata}.
 */
exports.Inject = decorators_1.makeParamDecorator(metadata_1.InjectMetadata, metadata_1.InjectMetadata.paramDecoratorForNonConstructor);
/**
 * Factory for creating {@link OptionalMetadata}.
 */
exports.Optional = decorators_1.makeParamDecorator(metadata_1.OptionalMetadata);
/**
 * Factory for creating {@link InjectableMetadata}.
 */
exports.Injectable = decorators_1.makeDecorator(metadata_1.InjectableMetadata);
/**
 * Factory for creating {@link SelfMetadata}.
 */
exports.Self = decorators_1.makeParamDecorator(metadata_1.SelfMetadata);
/**
 * Factory for creating {@link HostMetadata}.
 */
exports.Host = decorators_1.makeParamDecorator(metadata_1.HostMetadata);
/**
 * Factory for creating {@link SkipSelfMetadata}.
 */
exports.SkipSelf = decorators_1.makeParamDecorator(metadata_1.SkipSelfMetadata);
//# sourceMappingURL=decorators.js.map

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var metadata_directives_1 = __webpack_require__(46);
/**
 * use #isDirective instead
 * @deprecated
 */
function isAttrDirective(metadata) {
    return metadata instanceof metadata_directives_1.DirectiveMetadata && !(metadata instanceof metadata_directives_1.ComponentMetadata);
}
exports.isAttrDirective = isAttrDirective;
/**
 * use #isComponent instead
 * @deprecated
 */
function isComponentDirective(metadata) {
    return metadata instanceof metadata_directives_1.ComponentMetadata;
}
exports.isComponentDirective = isComponentDirective;
/**
 *
 * @param scope
 * @param element
 * @param ctrl
 * @param implementsNgOnDestroy
 * @param watchersToDispose
 * @param observersToDispose
 * @private
 */
function _setupDestroyHandler(scope, element, ctrl, implementsNgOnDestroy, watchersToDispose, observersToDispose) {
    if (watchersToDispose === void 0) { watchersToDispose = []; }
    if (observersToDispose === void 0) { observersToDispose = []; }
    scope.$on('$destroy', function () {
        if (implementsNgOnDestroy) {
            ctrl.ngOnDestroy();
        }
        watchersToDispose.forEach(function (_watcherDispose) { return _watcherDispose(); });
        observersToDispose.forEach(function (_observerDispose) { return _observerDispose(); });
    });
}
exports._setupDestroyHandler = _setupDestroyHandler;
//# sourceMappingURL=directives_utils.js.map

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LifecycleHooks;
(function (LifecycleHooks) {
    LifecycleHooks[LifecycleHooks["OnInit"] = 0] = "OnInit";
    LifecycleHooks[LifecycleHooks["OnDestroy"] = 1] = "OnDestroy";
    LifecycleHooks[LifecycleHooks["DoCheck"] = 2] = "DoCheck";
    LifecycleHooks[LifecycleHooks["OnChanges"] = 3] = "OnChanges";
    LifecycleHooks[LifecycleHooks["AfterContentInit"] = 4] = "AfterContentInit";
    LifecycleHooks[LifecycleHooks["AfterContentChecked"] = 5] = "AfterContentChecked";
    LifecycleHooks[LifecycleHooks["AfterViewInit"] = 6] = "AfterViewInit";
    LifecycleHooks[LifecycleHooks["AfterViewChecked"] = 7] = "AfterViewChecked";
    LifecycleHooks[LifecycleHooks["_OnChildrenChanged"] = 8] = "_OnChildrenChanged";
})(LifecycleHooks = exports.LifecycleHooks || (exports.LifecycleHooks = {}));
/**
 * @internal
 */
exports.LIFECYCLE_HOOKS_VALUES = [
    LifecycleHooks.OnInit,
    LifecycleHooks.OnDestroy,
    LifecycleHooks.DoCheck,
    LifecycleHooks.OnChanges,
    LifecycleHooks.AfterContentInit,
    LifecycleHooks.AfterContentChecked,
    LifecycleHooks.AfterViewInit,
    LifecycleHooks.AfterViewChecked,
    LifecycleHooks._OnChildrenChanged
];
var ChildrenChangeHook;
(function (ChildrenChangeHook) {
    ChildrenChangeHook[ChildrenChangeHook["FromView"] = 0] = "FromView";
    ChildrenChangeHook[ChildrenChangeHook["FromContent"] = 1] = "FromContent";
})(ChildrenChangeHook = exports.ChildrenChangeHook || (exports.ChildrenChangeHook = {}));
//# sourceMappingURL=directive_lifecycle_interfaces.js.map

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lang_1 = __webpack_require__(3);
var metadata_1 = __webpack_require__(35);
/**
 * Declare reusable pipe function.
 *
 * A "pure" pipe is only re-evaluated when either the input or any of the arguments change.
 *
 * When not specified, pipes default to being pure.
 *
 * ### Example
 *
 * {@example core/ts/metadata/metadata.ts region='pipe'}
 */
var PipeMetadata = (function (_super) {
    __extends(PipeMetadata, _super);
    function PipeMetadata(_a) {
        var name = _a.name, pure = _a.pure;
        var _this = _super.call(this) || this;
        _this.name = name;
        _this._pure = pure;
        return _this;
    }
    Object.defineProperty(PipeMetadata.prototype, "pure", {
        get: function () { return lang_1.isPresent(this._pure) ? this._pure : true; },
        enumerable: true,
        configurable: true
    });
    return PipeMetadata;
}(metadata_1.InjectableMetadata));
exports.PipeMetadata = PipeMetadata;
//# sourceMappingURL=metadata.js.map

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isArray_1 = __webpack_require__(377);
var isObject_1 = __webpack_require__(378);
var isFunction_1 = __webpack_require__(149);
var tryCatch_1 = __webpack_require__(380);
var errorObject_1 = __webpack_require__(148);
var UnsubscriptionError_1 = __webpack_require__(376);
/**
 * Represents a disposable resource, such as the execution of an Observable. A
 * Subscription has one important method, `unsubscribe`, that takes no argument
 * and just disposes the resource held by the subscription.
 *
 * Additionally, subscriptions may be grouped together through the `add()`
 * method, which will attach a child Subscription to the current Subscription.
 * When a Subscription is unsubscribed, all its children (and its grandchildren)
 * will be unsubscribed as well.
 *
 * @class Subscription
 */
var Subscription = (function () {
    /**
     * @param {function(): void} [unsubscribe] A function describing how to
     * perform the disposal of resources when the `unsubscribe` method is called.
     */
    function Subscription(unsubscribe) {
        /**
         * A flag to indicate whether this Subscription has already been unsubscribed.
         * @type {boolean}
         */
        this.closed = false;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    /**
     * Disposes the resources held by the subscription. May, for instance, cancel
     * an ongoing Observable execution or cancel any other type of work that
     * started when the Subscription was created.
     * @return {void}
     */
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        var _a = this, _parent = _a._parent, _parents = _a._parents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this.closed = true;
        this._parent = null;
        this._parents = null;
        // null out _subscriptions first so any child subscriptions that attempt
        // to remove themselves from this subscription will noop
        this._subscriptions = null;
        var index = -1;
        var len = _parents ? _parents.length : 0;
        // if this._parent is null, then so is this._parents, and we
        // don't have to remove ourselves from any parent subscriptions.
        while (_parent) {
            _parent.remove(this);
            // if this._parents is null or index >= len,
            // then _parent is set to null, and the loop exits
            _parent = ++index < len && _parents[index] || null;
        }
        if (isFunction_1.isFunction(_unsubscribe)) {
            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
            if (trial === errorObject_1.errorObject) {
                hasErrors = true;
                errors = errors || (errorObject_1.errorObject.e instanceof UnsubscriptionError_1.UnsubscriptionError ?
                    flattenUnsubscriptionErrors(errorObject_1.errorObject.e.errors) : [errorObject_1.errorObject.e]);
            }
        }
        if (isArray_1.isArray(_subscriptions)) {
            index = -1;
            len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject_1.isObject(sub)) {
                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                    if (trial === errorObject_1.errorObject) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = errorObject_1.errorObject.e;
                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                            errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
    };
    /**
     * Adds a tear down to be called during the unsubscribe() of this
     * Subscription.
     *
     * If the tear down being added is a subscription that is already
     * unsubscribed, is the same reference `add` is being called on, or is
     * `Subscription.EMPTY`, it will not be added.
     *
     * If this subscription is already in an `closed` state, the passed
     * tear down logic will be executed immediately.
     *
     * @param {TeardownLogic} teardown The additional logic to execute on
     * teardown.
     * @return {Subscription} Returns the Subscription used or created to be
     * added to the inner subscriptions list. This Subscription can be used with
     * `remove()` to remove the passed teardown logic from the inner subscriptions
     * list.
     */
    Subscription.prototype.add = function (teardown) {
        if (!teardown || (teardown === Subscription.EMPTY)) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var subscription = teardown;
        switch (typeof teardown) {
            case 'function':
                subscription = new Subscription(teardown);
            case 'object':
                if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
                    return subscription;
                }
                else if (this.closed) {
                    subscription.unsubscribe();
                    return subscription;
                }
                else if (typeof subscription._addParent !== 'function' /* quack quack */) {
                    var tmp = subscription;
                    subscription = new Subscription();
                    subscription._subscriptions = [tmp];
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        var subscriptions = this._subscriptions || (this._subscriptions = []);
        subscriptions.push(subscription);
        subscription._addParent(this);
        return subscription;
    };
    /**
     * Removes a Subscription from the internal list of subscriptions that will
     * unsubscribe during the unsubscribe process of this Subscription.
     * @param {Subscription} subscription The subscription to remove.
     * @return {void}
     */
    Subscription.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.prototype._addParent = function (parent) {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        if (!_parent || _parent === parent) {
            // If we don't have a parent, or the new parent is the same as the
            // current parent, then set this._parent to the new parent.
            this._parent = parent;
        }
        else if (!_parents) {
            // If there's already one parent, but not multiple, allocate an Array to
            // store the rest of the parent Subscriptions.
            this._parents = [parent];
        }
        else if (_parents.indexOf(parent) === -1) {
            // Only add the new parent to the _parents list if it's not already there.
            _parents.push(parent);
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());
exports.Subscription = Subscription;
function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError_1.UnsubscriptionError) ? err.errors : err); }, []);
}
//# sourceMappingURL=Subscription.js.map

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(106);
var Symbol = root_1.root.Symbol;
exports.rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
    Symbol.for('rxSubscriber') : '@@rxSubscriber';
/**
 * @deprecated use rxSubscriber instead
 */
exports.$$rxSubscriber = exports.rxSubscriber;
//# sourceMappingURL=rxSubscriber.js.map

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
/**
 * window: browser in DOM main thread
 * self: browser in WebWorker
 * global: Node.js/other
 */
exports.root = (typeof window == 'object' && window.window === window && window
    || typeof self == 'object' && self.self === self && self
    || typeof global == 'object' && global.global === global && global);
if (!exports.root) {
    throw new Error('RxJS could not find any global context (window, self, global)');
}
//# sourceMappingURL=root.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(150)))

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(21);
module.exports = function(it, msg){
  if(typeof it != 'number' && cof(it) != 'Number')throw TypeError(msg);
  return +it;
};

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(10)
  , toIndex  = __webpack_require__(44)
  , toLength = __webpack_require__(9);

module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
  var O     = toObject(this)
    , len   = toLength(O.length)
    , to    = toIndex(target, len)
    , from  = toIndex(start, len)
    , end   = arguments.length > 2 ? arguments[2] : undefined
    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
    , inc   = 1;
  if(from < to && to < from + count){
    inc  = -1;
    from += count - 1;
    to   += count - 1;
  }
  while(count-- > 0){
    if(from in O)O[to] = O[from];
    else delete O[to];
    to   += inc;
    from += inc;
  } return O;
};

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(38);

module.exports = function(iter, ITERATOR){
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(13)
  , toObject  = __webpack_require__(10)
  , IObject   = __webpack_require__(52)
  , toLength  = __webpack_require__(9);

module.exports = function(that, callbackfn, aLen, memo, isRight){
  aFunction(callbackfn);
  var O      = toObject(that)
    , self   = IObject(O)
    , length = toLength(O.length)
    , index  = isRight ? length - 1 : 0
    , i      = isRight ? -1 : 1;
  if(aLen < 2)for(;;){
    if(index in self){
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if(isRight ? index < 0 : length <= index){
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for(;isRight ? index >= 0 : length > index; index += i)if(index in self){
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction  = __webpack_require__(13)
  , isObject   = __webpack_require__(5)
  , invoke     = __webpack_require__(61)
  , arraySlice = [].slice
  , factories  = {};

var construct = function(F, len, args){
  if(!(len in factories)){
    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /*, args... */){
  var fn       = aFunction(this)
    , partArgs = arraySlice.call(arguments, 1);
  var bound = function(/* args... */){
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if(isObject(fn.prototype))bound.prototype = fn.prototype;
  return bound;
};

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP          = __webpack_require__(7).f
  , create      = __webpack_require__(29)
  , redefineAll = __webpack_require__(42)
  , ctx         = __webpack_require__(25)
  , anInstance  = __webpack_require__(36)
  , defined     = __webpack_require__(22)
  , forOf       = __webpack_require__(38)
  , $iterDefine = __webpack_require__(64)
  , step        = __webpack_require__(81)
  , setSpecies  = __webpack_require__(43)
  , DESCRIPTORS = __webpack_require__(8)
  , fastKey     = __webpack_require__(32).fastKey
  , SIZE        = DESCRIPTORS ? '_s' : 'size';

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        anInstance(this, C, 'forEach');
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)dP(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(37)
  , from    = __webpack_require__(109);
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll       = __webpack_require__(42)
  , getWeak           = __webpack_require__(32).getWeak
  , anObject          = __webpack_require__(1)
  , isObject          = __webpack_require__(5)
  , anInstance        = __webpack_require__(36)
  , forOf             = __webpack_require__(38)
  , createArrayMethod = __webpack_require__(24)
  , $has              = __webpack_require__(11)
  , arrayFind         = createArrayMethod(5)
  , arrayFindIndex    = createArrayMethod(6)
  , id                = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function(that){
  return that._l || (that._l = new UncaughtFrozenStore);
};
var UncaughtFrozenStore = function(){
  this.a = [];
};
var findUncaughtFrozen = function(store, key){
  return arrayFind(store.a, function(it){
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function(key){
    var entry = findUncaughtFrozen(this, key);
    if(entry)return entry[1];
  },
  has: function(key){
    return !!findUncaughtFrozen(this, key);
  },
  set: function(key, value){
    var entry = findUncaughtFrozen(this, key);
    if(entry)entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function(key){
    var index = arrayFindIndex(this.a, function(it){
      return it[0] === key;
    });
    if(~index)this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var data = getWeak(anObject(key), true);
    if(data === true)uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(8) && !__webpack_require__(4)(function(){
  return Object.defineProperty(__webpack_require__(74)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(5)
  , floor    = Math.floor;
module.exports = function isInteger(it){
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(1);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(33)
  , toIObject = __webpack_require__(12);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 119 */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x){
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var dP        = __webpack_require__(7)
  , gOPD      = __webpack_require__(16)
  , ownKeys   = __webpack_require__(86)
  , toIObject = __webpack_require__(12);

module.exports = function define(target, mixin){
  var keys   = ownKeys(toIObject(mixin))
    , length = keys.length
    , i = 0, key;
  while(length > i)dP.f(target, key = keys[i++], gOPD.f(mixin, key));
  return target;
};

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(7)
  , anObject = __webpack_require__(1)
  , getKeys  = __webpack_require__(33);

module.exports = __webpack_require__(8) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(12)
  , gOPN      = __webpack_require__(41).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(11)
  , toIObject    = __webpack_require__(12)
  , arrayIndexOf = __webpack_require__(57)(false)
  , IE_PROTO     = __webpack_require__(90)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(33)
  , toIObject = __webpack_require__(12)
  , isEnum    = __webpack_require__(53).f;
module.exports = function(isEntries){
  return function(it){
    var O      = toIObject(it)
      , keys   = getKeys(O)
      , length = keys.length
      , i      = 0
      , result = []
      , key;
    while(length > i)if(isEnum.call(O, key = keys[i++])){
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(2).parseFloat
  , $trim       = __webpack_require__(50).trim;

module.exports = 1 / $parseFloat(__webpack_require__(95) + '-0') !== -Infinity ? function parseFloat(str){
  var string = $trim(String(str), 3)
    , result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(2).parseInt
  , $trim     = __webpack_require__(50).trim
  , ws        = __webpack_require__(95)
  , hex       = /^[\-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix){
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);

/***/ }),
/* 128 */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(9)
  , repeat   = __webpack_require__(94)
  , defined  = __webpack_require__(22);

module.exports = function(that, maxLength, fillString, left){
  var S            = String(defined(that))
    , stringLength = S.length
    , fillStr      = fillString === undefined ? ' ' : String(fillString)
    , intMaxLength = toLength(maxLength);
  if(intMaxLength <= stringLength || fillStr == '')return S;
  var fillLen = intMaxLength - stringLength
    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(6);

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(37)
  , ITERATOR  = __webpack_require__(6)('iterator')
  , Iterators = __webpack_require__(39);
module.exports = __webpack_require__(14).isIterable = function(it){
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    || Iterators.hasOwnProperty(classof(O));
};

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(112);

// 23.1 Map Objects
module.exports = __webpack_require__(58)('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if(__webpack_require__(8) && /./g.flags != 'g')__webpack_require__(7).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(60)
});

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(112);

// 23.2 Set Objects
module.exports = __webpack_require__(58)('Set', function(get){
  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each         = __webpack_require__(24)(0)
  , redefine     = __webpack_require__(18)
  , meta         = __webpack_require__(32)
  , assign       = __webpack_require__(85)
  , weak         = __webpack_require__(114)
  , isObject     = __webpack_require__(5)
  , getWeak      = meta.getWeak
  , isExtensible = Object.isExtensible
  , uncaughtFrozenStore = weak.ufstore
  , tmp          = {}
  , InternalMap;

var wrapper = function(get){
  return function WeakMap(){
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      var data = getWeak(key);
      if(data === true)return uncaughtFrozenStore(this).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(58)('WeakMap', wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  InternalMap = weak.getConstructor(wrapper);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    redefine(proto, key, function(a, b){
      // store frozen objects on internal weakmap shim
      if(isObject(a) && !isExtensible(a)){
        if(!this._f)this._f = new InternalMap;
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(344));
var util_1 = __webpack_require__(366);
exports.bundle = util_1.bundle;
var directives_1 = __webpack_require__(347);
exports.Directive = directives_1.Directive;
exports.Component = directives_1.Component;
exports.NgModule = directives_1.NgModule;
exports.Attr = directives_1.Attr;
exports.Input = directives_1.Input;
exports.Output = directives_1.Output;
exports.HostBinding = directives_1.HostBinding;
exports.HostListener = directives_1.HostListener;
exports.ViewChild = directives_1.ViewChild;
exports.ViewChildren = directives_1.ViewChildren;
exports.ContentChild = directives_1.ContentChild;
exports.ContentChildren = directives_1.ContentChildren;
var pipes_1 = __webpack_require__(360);
exports.Pipe = pipes_1.Pipe;
__export(__webpack_require__(341));
var lang_1 = __webpack_require__(3);
exports.enableProdMode = lang_1.enableProdMode;
var facade_1 = __webpack_require__(367);
exports.EventEmitter = facade_1.EventEmitter;
//# sourceMappingURL=core.js.map

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var lang_1 = __webpack_require__(3);
var UninitializedValue = (function () {
    function UninitializedValue() {
    }
    return UninitializedValue;
}());
exports.UninitializedValue = UninitializedValue;
var uninitialized = new UninitializedValue();
/**
 * Represents a basic change from a previous to a new value.
 */
var SimpleChange = (function () {
    function SimpleChange(previousValue, currentValue) {
        this.previousValue = previousValue;
        this.currentValue = currentValue;
    }
    /**
     * Check whether the new value is the first value assigned.
     */
    SimpleChange.prototype.isFirstChange = function () { return this.previousValue === uninitialized; };
    return SimpleChange;
}());
exports.SimpleChange = SimpleChange;
var ChangeDetectionUtil = (function () {
    function ChangeDetectionUtil() {
    }
    ChangeDetectionUtil.simpleChange = function (previousValue, currentValue) {
        return new SimpleChange(previousValue, currentValue);
    };
    ChangeDetectionUtil.isOnPushChangeDetectionStrategy = function (changeDetectionStrategy) {
        return lang_1.isPresent(changeDetectionStrategy) && changeDetectionStrategy === 0 /* OnPush */;
    };
    return ChangeDetectionUtil;
}());
ChangeDetectionUtil.uninitialized = uninitialized;
exports.ChangeDetectionUtil = ChangeDetectionUtil;
//# sourceMappingURL=change_detection_util.js.map

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var decorators_1 = __webpack_require__(100);
var ChangeDetectorRef = ChangeDetectorRef_1 = (function () {
    function ChangeDetectorRef($scope) {
        this.$scope = $scope;
    }
    ChangeDetectorRef.create = function ($scope) {
        return new ChangeDetectorRef_1($scope);
    };
    /**
     * Marks all {@link ChangeDetectionStrategy#OnPush} ancestors as to be checked.
     *
     * <!-- TODO: Add a link to a chapter on OnPush components -->
     *
     * ### Example ([live demo](http://plnkr.co/edit/GC512b?p=preview))
     *
     * ```typescript
     * @Component({
     *   selector: 'cmp',
     *   changeDetection: ChangeDetectionStrategy.OnPush,
     *   template: `Number of ticks: {{numberOfTicks}}`
     * })
     * class Cmp {
     *   numberOfTicks = 0;
     *
     *   constructor(ref: ChangeDetectorRef) {
     *     setInterval(() => {
     *       this.numberOfTicks ++
     *       // the following is required, otherwise the view will not be updated
     *       this.ref.markForCheck();
     *     }, 1000);
     *   }
     * }
     *
     * @Component({
     *   selector: 'app',
     *   changeDetection: ChangeDetectionStrategy.OnPush,
     *   template: `
     *     <cmp><cmp>
     *   `,
     *   directives: [Cmp]
     * })
     * class App {
     * }
     *
     * bootstrap(App);
     * ```
     */
    ChangeDetectorRef.prototype.markForCheck = function () { this.$scope.$applyAsync(); };
    /**
     * Detaches the change detector from the change detector tree.
     *
     * The detached change detector will not be checked until it is reattached.
     *
     * This can also be used in combination with {@link ChangeDetectorRef#detectChanges} to implement
     * local change
     * detection checks.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
     *
     * ### Example
     *
     * The following example defines a component with a large list of readonly data.
     * Imagine the data changes constantly, many times per second. For performance reasons,
     * we want to check and update the list every five seconds. We can do that by detaching
     * the component's change detector and doing a local check every five seconds.
     *
     * ```typescript
     * class DataProvider {
     *   // in a real application the returned data will be different every time
     *   get data() {
     *     return [1,2,3,4,5];
     *   }
     * }
     *
     * @Component({
     *   selector: 'giant-list',
     *   template: `
     *     <li *ngFor="let d of dataProvider.data">Data {{d}}</lig>
     *   `,
     *   directives: [NgFor]
     * })
     * class GiantList {
     *   constructor(private ref: ChangeDetectorRef, private dataProvider:DataProvider) {
     *     ref.detach();
     *     setInterval(() => {
     *       this.ref.detectChanges();
     *     }, 5000);
     *   }
     * }
     *
     * @Component({
     *   selector: 'app',
     *   providers: [DataProvider],
     *   template: `
     *     <giant-list><giant-list>
     *   `,
     *   directives: [GiantList]
     * })
     * class App {
     * }
     *
     * bootstrap(App);
     * ```
     */
    ChangeDetectorRef.prototype.detach = function () { disconnectScope(this.$scope); };
    /**
     * Checks the change detector and its children.
     *
     * This can also be used in combination with {@link ChangeDetectorRef#detach} to implement local
     * change detection
     * checks.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
     *
     * ### Example
     *
     * The following example defines a component with a large list of readonly data.
     * Imagine, the data changes constantly, many times per second. For performance reasons,
     * we want to check and update the list every five seconds.
     *
     * We can do that by detaching the component's change detector and doing a local change detection
     * check
     * every five seconds.
     *
     * See {@link ChangeDetectorRef#detach} for more information.
     */
    ChangeDetectorRef.prototype.detectChanges = function () { this.$scope.$digest(); };
    /**
     * Checks the change detector and its children, and throws if any changes are detected.
     *
     * This is used in development mode to verify that running change detection doesn't introduce
     * other changes.
     */
    ChangeDetectorRef.prototype.checkNoChanges = function () { };
    /**
     * Reattach the change detector to the change detector tree.
     *
     * This also marks OnPush ancestors as to be checked. This reattached change detector will be
     * checked during the next change detection run.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     *
     * ### Example ([live demo](http://plnkr.co/edit/aUhZha?p=preview))
     *
     * The following example creates a component displaying `live` data. The component will detach
     * its change detector from the main change detector tree when the component's live property
     * is set to false.
     *
     * ```typescript
     * class DataProvider {
     *   data = 1;
     *
     *   constructor() {
     *     setInterval(() => {
     *       this.data = this.data * 2;
     *     }, 500);
     *   }
     * }
     *
     * @Component({
     *   selector: 'live-data',
     *   inputs: ['live'],
     *   template: `Data: {{dataProvider.data}}`
     * })
     * class LiveData {
     *   constructor(private ref: ChangeDetectorRef, private dataProvider:DataProvider) {}
     *
     *   set live(value) {
     *     if (value)
     *       this.ref.reattach();
     *     else
     *       this.ref.detach();
     *   }
     * }
     *
     * @Component({
     *   selector: 'app',
     *   providers: [DataProvider],
     *   template: `
     *     Live Update: <input type="checkbox" [(ngModel)]="live">
     *     <live-data [live]="live"><live-data>
     *   `,
     *   directives: [LiveData, FORM_DIRECTIVES]
     * })
     * class App {
     *   live = true;
     * }
     *
     * bootstrap(App);
     * ```
     */
    ChangeDetectorRef.prototype.reattach = function () { reconnectScope(this.$scope); };
    return ChangeDetectorRef;
}());
ChangeDetectorRef = ChangeDetectorRef_1 = __decorate([
    decorators_1.Injectable('changeDetectorRef'),
    __metadata("design:paramtypes", [Object])
], ChangeDetectorRef);
exports.ChangeDetectorRef = ChangeDetectorRef;
// Stop watchers and events from firing on a scope without destroying it,
// by disconnecting it from its parent and its siblings' linked lists.
function disconnectScope(scope) {
    if (!scope)
        return;
    // we can't destroy the root scope or a scope that has been already destroyed
    if (scope.$root === scope)
        return;
    if (scope.$$destroyed)
        return;
    var parent = scope.$parent;
    scope.$$disconnected = true;
    // See Scope.$destroy
    if (parent.$$childHead === scope)
        parent.$$childHead = scope.$$nextSibling;
    if (parent.$$childTail === scope)
        parent.$$childTail = scope.$$prevSibling;
    if (scope.$$prevSibling)
        scope.$$prevSibling.$$nextSibling = scope.$$nextSibling;
    if (scope.$$nextSibling)
        scope.$$nextSibling.$$prevSibling = scope.$$prevSibling;
    scope.$$nextSibling = scope.$$prevSibling = null;
}
// Undo the effects of disconnectScope above.
function reconnectScope(scope) {
    if (!scope)
        return;
    // we can't disconnect the root node or scope already disconnected
    if (scope.$root === scope)
        return;
    if (!scope.$$disconnected)
        return;
    var child = scope;
    var parent = child.$parent;
    child.$$disconnected = false;
    // See Scope.$new for this logic...
    child.$$prevSibling = parent.$$childTail;
    if (parent.$$childHead) {
        parent.$$childTail.$$nextSibling = child;
        parent.$$childTail = child;
    }
    else {
        parent.$$childHead = parent.$$childTail = child;
    }
}
var ChangeDetectorRef_1;
//# sourceMappingURL=change_detector_ref.js.map

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Creates a token that can be used in a DI Provider.
 *
 * ### Example ([live demo](http://plnkr.co/edit/Ys9ezXpj2Mnoy3Uc8KBp?p=preview))
 *
 * ```typescript
 * var t = new OpaqueToken("value");
 *
 * var injector = Injector.resolveAndCreate([
 *   provide(t, {useValue: "providedValue"})
 * ]);
 *
 * expect(injector.get(t)).toEqual("providedValue");
 * ```
 *
 * Using an `OpaqueToken` is preferable to using strings as tokens because of possible collisions
 * caused by multiple providers using the same string as two different tokens.
 *
 * Using an `OpaqueToken` is preferable to using an `Object` as tokens because it provides better
 * error messages.
 */
var OpaqueToken = (function () {
    function OpaqueToken(_desc) {
        this._desc = _desc;
    }
    Object.defineProperty(OpaqueToken.prototype, "desc", {
        get: function () { return this._desc; },
        enumerable: true,
        configurable: true
    });
    OpaqueToken.prototype.toString = function () { return "Token " + this._desc; };
    return OpaqueToken;
}());
exports.OpaqueToken = OpaqueToken;
//# sourceMappingURL=opaque_token.js.map

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.INPUT_MODE_REGEX = /^(<|=|@)?(\??)(\w*)$/;
exports.BINDING_MODE = Object.freeze({
    oneWay: '<',
    twoWay: '=',
    output: '&',
    attr: '@',
    optional: '?'
});
//# sourceMappingURL=constants.js.map

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var lang_1 = __webpack_require__(3);
var reflection_1 = __webpack_require__(47);
var provider_1 = __webpack_require__(51);
var provider_util_1 = __webpack_require__(56);
var reflective_provider_1 = __webpack_require__(346);
var collections_1 = __webpack_require__(20);
function _bundleComponent(ComponentClass, otherProviders, existingAngular1Module) {
    if (otherProviders === void 0) { otherProviders = []; }
    // Support registering downgraded ng2 components directly
    var downgradedNgComponentName = reflection_1.reflector.downgradedNg2ComponentName(ComponentClass);
    if (downgradedNgComponentName) {
        var angular1Module_1 = existingAngular1Module || lang_1.global.angular.module(downgradedNgComponentName, []);
        angular1Module_1.directive(downgradedNgComponentName, ComponentClass);
        return angular1Module_1;
    }
    var angular1ModuleName = provider_1.getInjectableName(ComponentClass);
    var angular1Module = existingAngular1Module || lang_1.global.angular.module(angular1ModuleName, []);
    var annotations = reflection_1.reflector.annotations(ComponentClass);
    var cmpAnnotation = annotations[0];
    var _a = cmpAnnotation.providers, providers = _a === void 0 ? [] : _a, _b = cmpAnnotation.viewProviders, viewProviders = _b === void 0 ? [] : _b;
    // process component
    var _c = provider_1.provide(ComponentClass), cmpName = _c[0], cmpFactoryFn = _c[1];
    var _d = reflective_provider_1._getAngular1ModuleMetadataByType(ComponentClass), providerName = _d.providerName, providerMethod = _d.providerMethod, moduleMethod = _d.moduleMethod;
    if (reflective_provider_1._isTypeRegistered(cmpName, angular1Module, providerName, providerMethod)) {
        return angular1Module;
    }
    // @TODO register via this once requires are resolved for 3 types of attr directive from template
    // _registerTypeProvider( angular1Module, ComponentClass, { moduleMethod, name: cmpName, value: cmpFactoryFn } );
    angular1Module[moduleMethod](cmpName, cmpFactoryFn);
    // 1. process component/directive decorator providers/viewProviders
    reflective_provider_1._normalizeProviders(angular1Module, providers);
    reflective_provider_1._normalizeProviders(angular1Module, viewProviders);
    // 2. process otherProviders argument
    // - providers can be string(angular1Module reference), Type, StringMap(providerLiteral)
    // - directives can't be registered as via global providers only @Injectable,@Pipe,{provide:any,use*:any}
    // registerProviders(angular1Module, otherProviders);
    reflective_provider_1._normalizeProviders(angular1Module, otherProviders);
    return angular1Module;
}
function bundle(NgModuleClass, otherProviders, existingAngular1Module) {
    if (otherProviders === void 0) { otherProviders = []; }
    var angular1ModuleName = provider_1.getInjectableName(NgModuleClass);
    var angular1Module = existingAngular1Module || lang_1.global.angular.module(angular1ModuleName, []);
    var annotations = reflection_1.reflector.annotations(NgModuleClass);
    var ngModuleAnnotation = annotations[0];
    if (!provider_util_1.isNgModule(ngModuleAnnotation)) {
        throw new Error("bundle() requires a decorated NgModule as its first argument");
    }
    var _a = ngModuleAnnotation.declarations, declarations = _a === void 0 ? [] : _a, _b = ngModuleAnnotation.providers, providers = _b === void 0 ? [] : _b, _c = ngModuleAnnotation.imports, imports = _c === void 0 ? [] : _c;
    /**
     * Process `declarations`
     */
    collections_1.ListWrapper.flattenDeep(declarations).forEach(function (directiveType) {
        _bundleComponent(directiveType, [], angular1Module);
    });
    /**
     * Process `providers`
     */
    reflective_provider_1._normalizeProviders(angular1Module, providers);
    /**
     * Process `imports`
     */
    // 1. imports which are not NgModules
    var nonNgModuleImports = imports.filter(function (imported) {
        if (!lang_1.isFunction(imported)) {
            return true;
        }
        var annotations = reflection_1.reflector.annotations(imported);
        return !provider_util_1.isNgModule(ngModuleAnnotation);
    });
    reflective_provider_1._normalizeProviders(angular1Module, nonNgModuleImports);
    // 2.imports which are NgModules
    var NgModuleImports = imports.filter(function (imported) {
        if (!lang_1.isFunction(imported)) {
            return false;
        }
        var annotations = reflection_1.reflector.annotations(imported);
        return provider_util_1.isNgModule(ngModuleAnnotation);
    });
    NgModuleImports.forEach(function (importedNgModule) {
        bundle(importedNgModule, [], angular1Module);
    });
    /**
     * Process `otherProviders`
     */
    reflective_provider_1._normalizeProviders(angular1Module, otherProviders);
    return angular1Module;
}
exports.bundle = bundle;
//# sourceMappingURL=bundler.js.map

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lang_1 = __webpack_require__(3);
var Subject_1 = __webpack_require__(372);
/**
 * Use by directives and components to emit custom Events.
 *
 * ### Examples
 *
 * In the following example, `ZippyComponent` alternatively emits `open` and `close` events when its
 * title gets clicked:
 *
 * ```
 * @Component({
 *   selector: 'zippy',
 *   template: `
 *   <div class="zippy">
 *     <div ng-click="$ctrl.toggle()">Toggle</div>
 *     <div ng-hide="!$ctrl.visible">
 *       <ng-transclude></ng-transclude>
 *     </div>
 *  </div>`
 * })
 * export class ZippyComponent {
 *   visible: boolean = true;
 *
 *   @Output() open = new EventEmitter<boolean>();
 *   @Output() close = new EventEmitter<boolean>();
 *
 *   toggle() {
 *     this.visible = !this.visible;
 *     if (this.visible) {
 *       this.open.emit( this.visible );
 *     } else {
 *       this.close.emit( this.visible );
 *     }
 *   }
 * }
 * ```
 *
 * Use Rx.Observable but provides an adapter to make it work as specified here:
 * https://github.com/jhusain/observable-spec
 *
 * Once a reference implementation of the spec is available, switch to it.
 */
var EventEmitter = (function (_super) {
    __extends(EventEmitter, _super);
    /**
     * Creates an instance of [EventEmitter], which depending on [isAsync],
     * delivers events synchronously or asynchronously.
     */
    function EventEmitter(isAsync) {
        if (isAsync === void 0) { isAsync = false; }
        var _this = _super.call(this) || this;
        /** @internal */
        _this._ngExpressionBindingCb = lang_1.noop;
        _this.__isAsync = isAsync;
        return _this;
    }
    /** @internal */
    EventEmitter.prototype.wrapNgExpBindingToEmitter = function (cb) {
        //used in reassignBindingsAndCreteEventEmitters to attach the original @Output binding to the instance new EventEmitter
        this._ngExpressionBindingCb = cb;
        // this could create memory leaks because the subscription would be never terminated
        // super.subscribe((newValue)=>this._ngExpressionBindingCb({$event:newValue}));
    };
    EventEmitter.prototype.emit = function (value) {
        var payload = { $event: value };
        // push just the value
        _super.prototype.next.call(this, value);
        // our & binding needs to be called via { $event: value } because Angular 1 locals
        this._ngExpressionBindingCb(payload);
    };
    EventEmitter.prototype.subscribe = function (generatorOrNext, error, complete) {
        var schedulerFn /** TODO #9100 */;
        var errorFn = function (err) { return null; };
        var completeFn = function () { return null; };
        if (generatorOrNext && typeof generatorOrNext === 'object') {
            schedulerFn = this.__isAsync
                ? function (value /** TODO #9100 */) { setTimeout(function () { return generatorOrNext.next(value); }); }
                : function (value /** TODO #9100 */) { generatorOrNext.next(value); };
            if (generatorOrNext.error) {
                errorFn = this.__isAsync
                    ? function (err) { setTimeout(function () { return generatorOrNext.error(err); }); }
                    : function (err) { generatorOrNext.error(err); };
            }
            if (generatorOrNext.complete) {
                completeFn = this.__isAsync
                    ? function () { setTimeout(function () { return generatorOrNext.complete(); }); }
                    : function () { generatorOrNext.complete(); };
            }
        }
        else {
            schedulerFn = this.__isAsync
                ? function (value /** TODO #9100 */) { setTimeout(function () { return generatorOrNext(value); }); }
                : function (value /** TODO #9100 */) { generatorOrNext(value); };
            if (error) {
                errorFn = this.__isAsync ? function (err) { setTimeout(function () { return error(err); }); } : function (err) { error(err); };
            }
            if (complete) {
                completeFn = this.__isAsync ? function () { setTimeout(function () { return complete(); }); } : function () { complete(); };
            }
        }
        return _super.prototype.subscribe.call(this, schedulerFn, errorFn, completeFn);
    };
    return EventEmitter;
}(Subject_1.Subject));
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=async.js.map

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lang_1 = __webpack_require__(3);
var BaseException = (function (_super) {
    __extends(BaseException, _super);
    function BaseException(message) {
        if (message === void 0) { message = "--"; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.stack = new Error(message).stack;
        return _this;
    }
    BaseException.prototype.toString = function () { return this.message; };
    return BaseException;
}(Error));
exports.BaseException = BaseException;
function getErrorMsg(typeOrFunc, msg) {
    return "\n      " + lang_1.getFuncName(typeOrFunc) + ":\n      ===========================\n      " + msg + "\n    ";
}
exports.getErrorMsg = getErrorMsg;
//# sourceMappingURL=exceptions.js.map

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var lang_1 = __webpack_require__(3);
var _kebabCase = _caseTransformerFactory('-');
var _snakeCase = _caseTransformerFactory('_');
var StringWrapper = (function () {
    function StringWrapper() {
    }
    StringWrapper.fromCharCode = function (code) { return String.fromCharCode(code); };
    StringWrapper.charCodeAt = function (s, index) { return s.charCodeAt(index); };
    StringWrapper.split = function (s, regExp) { return s.split(regExp); };
    StringWrapper.equals = function (s, s2) { return s === s2; };
    StringWrapper.stripLeft = function (s, charVal) {
        if (s && s.length) {
            var pos = 0;
            for (var i = 0; i < s.length; i++) {
                if (s[i] != charVal)
                    break;
                pos++;
            }
            s = s.substring(pos);
        }
        return s;
    };
    StringWrapper.stripRight = function (s, charVal) {
        if (s && s.length) {
            var pos = s.length;
            for (var i = s.length - 1; i >= 0; i--) {
                if (s[i] != charVal)
                    break;
                pos--;
            }
            s = s.substring(0, pos);
        }
        return s;
    };
    StringWrapper.replace = function (s, from, replace) {
        return s.replace(from, replace);
    };
    StringWrapper.replaceAll = function (s, from, replace) {
        return s.replace(from, replace);
    };
    StringWrapper.slice = function (s, from, to) {
        if (from === void 0) { from = 0; }
        if (to === void 0) { to = null; }
        return s.slice(from, to === null
            ? undefined
            : to);
    };
    StringWrapper.replaceAllMapped = function (s, from, cb) {
        return s.replace(from, function () {
            var matches = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                matches[_i] = arguments[_i];
            }
            // Remove offset & string from the result array
            matches.splice(-2, 2);
            // The callback receives match, p1, ..., pn
            return cb(matches);
        });
    };
    StringWrapper.compare = function (a, b) {
        if (a < b) {
            return -1;
        }
        else if (a > b) {
            return 1;
        }
        else {
            return 0;
        }
    };
    StringWrapper.includes = function (str, searchString, position) {
        if (position === void 0) { position = 0; }
        if (String.prototype.includes) {
            return str.includes(searchString, position);
        }
        return str.indexOf(searchString, position) === position;
    };
    StringWrapper.startsWith = function (str, searchString, position) {
        if (position === void 0) { position = 0; }
        if (String.prototype.startsWith) {
            return str.startsWith(searchString, position);
        }
        return str.indexOf(searchString, position) === position;
    };
    StringWrapper.endsWith = function (str, searchString, position) {
        if (String.prototype.endsWith) {
            return str.endsWith(searchString, position);
        }
        var subjectString = str.toString();
        if (!lang_1.isNumber(position) || !isFinite(position)
            || Math.floor(position) !== position || position > subjectString.length) {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
    StringWrapper.kebabCase = function (name) {
        return _kebabCase(name);
    };
    StringWrapper.snakeCase = function (name) {
        return _snakeCase(name);
    };
    return StringWrapper;
}());
exports.StringWrapper = StringWrapper;
function _caseTransformerFactory(separator) {
    var SNAKE_CASE_REGEXP = /[A-Z]/g;
    return _caseTransform;
    function _caseTransform(name) {
        return name.replace(SNAKE_CASE_REGEXP, function (match, offset) {
            return (offset
                ? separator
                : '') + match.toLowerCase();
        });
    }
}
//# sourceMappingURL=primitives.js.map

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @whatItDoes Represents a type that a Component or other object is instances of.
 *
 * @description
 *
 * An example of a `Type` is `MyCustomComponent` class, which in JavaScript is be represented by
 * the `MyCustomComponent` constructor function.
 *
 * @stable
 */
exports.Type = Function;
//# sourceMappingURL=type.js.map

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.empty = {
    closed: true,
    next: function (value) { },
    error: function (err) { throw err; },
    complete: function () { }
};
//# sourceMappingURL=Observer.js.map

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isFunction_1 = __webpack_require__(149);
var Subscription_1 = __webpack_require__(104);
var Observer_1 = __webpack_require__(146);
var rxSubscriber_1 = __webpack_require__(105);
/**
 * Implements the {@link Observer} interface and extends the
 * {@link Subscription} class. While the {@link Observer} is the public API for
 * consuming the values of an {@link Observable}, all Observers get converted to
 * a Subscriber, in order to provide Subscription-like capabilities such as
 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
 * implementing operators, but it is rarely used as a public API.
 *
 * @class Subscriber<T>
 */
var Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    /**
     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
     * defined Observer or a `next` callback function.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     */
    function Subscriber(destinationOrNext, error, complete) {
        _super.call(this);
        this.syncErrorValue = null;
        this.syncErrorThrown = false;
        this.syncErrorThrowable = false;
        this.isStopped = false;
        switch (arguments.length) {
            case 0:
                this.destination = Observer_1.empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    this.destination = Observer_1.empty;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        this.destination = destinationOrNext;
                        this.destination.add(this);
                    }
                    else {
                        this.syncErrorThrowable = true;
                        this.destination = new SafeSubscriber(this, destinationOrNext);
                    }
                    break;
                }
            default:
                this.syncErrorThrowable = true;
                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
                break;
        }
    }
    Subscriber.prototype[rxSubscriber_1.rxSubscriber] = function () { return this; };
    /**
     * A static factory for a Subscriber, given a (potentially partial) definition
     * of an Observer.
     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
     * Observer represented by the given arguments.
     */
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    /**
     * The {@link Observer} callback to receive notifications of type `next` from
     * the Observable, with a value. The Observable may call this method 0 or more
     * times.
     * @param {T} [value] The `next` value.
     * @return {void}
     */
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    /**
     * The {@link Observer} callback to receive notifications of type `error` from
     * the Observable, with an attached {@link Error}. Notifies the Observer that
     * the Observable has experienced an error condition.
     * @param {any} [err] The `error` exception.
     * @return {void}
     */
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    /**
     * The {@link Observer} callback to receive a valueless notification of type
     * `complete` from the Observable. Notifies the Observer that the Observable
     * has finished sending push-based notifications.
     * @return {void}
     */
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    Subscriber.prototype._unsubscribeAndRecycle = function () {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        this._parent = null;
        this._parents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parent = _parent;
        this._parents = _parents;
        return this;
    };
    return Subscriber;
}(Subscription_1.Subscription));
exports.Subscriber = Subscriber;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SafeSubscriber = (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
        _super.call(this);
        this._parentSubscriber = _parentSubscriber;
        var next;
        var context = this;
        if (isFunction_1.isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (observerOrNext !== Observer_1.empty) {
                context = Object.create(observerOrNext);
                if (isFunction_1.isFunction(context.unsubscribe)) {
                    this.add(context.unsubscribe.bind(context));
                }
                context.unsubscribe = this.unsubscribe.bind(this);
            }
        }
        this._context = context;
        this._next = next;
        this._error = error;
        this._complete = complete;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parentSubscriber = this._parentSubscriber;
            if (!_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._error) {
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parentSubscriber.syncErrorThrowable) {
                this.unsubscribe();
                throw err;
            }
            else {
                _parentSubscriber.syncErrorValue = err;
                _parentSubscriber.syncErrorThrown = true;
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._complete) {
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._complete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, this._complete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            throw err;
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            parent.syncErrorValue = err;
            parent.syncErrorThrown = true;
            return true;
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));
//# sourceMappingURL=Subscriber.js.map

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// typeof any so that it we don't have to cast when comparing a result to the error object
exports.errorObject = { e: {} };
//# sourceMappingURL=errorObject.js.map

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isFunction(x) {
    return typeof x === 'function';
}
exports.isFunction = isFunction;
//# sourceMappingURL=isFunction.js.map

/***/ }),
/* 150 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(340);
__webpack_require__(159);
__webpack_require__(54);
__webpack_require__(161);
__webpack_require__(131);
__webpack_require__(158);
__webpack_require__(160);
__webpack_require__(165);
__webpack_require__(163);
__webpack_require__(164);
__webpack_require__(166);
__webpack_require__(162);
__webpack_require__(167);
__webpack_require__(168);
__webpack_require__(169);
module.exports = __webpack_require__(14);

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(368));
//# sourceMappingURL=platform-browser-dynamic.js.map

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(136);
var app_component_1 = __webpack_require__(381);
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [],
        declarations: [
            app_component_1.AppComponent,
        ],
        providers: []
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5)
  , isArray  = __webpack_require__(80)
  , SPECIES  = __webpack_require__(6)('species');

module.exports = function(original){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return C === undefined ? Array : C;
};

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(154);

module.exports = function(original, length){
  return new (speciesConstructor(original))(length);
};

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject    = __webpack_require__(1)
  , toPrimitive = __webpack_require__(27)
  , NUMBER      = 'number';

module.exports = function(hint){
  if(hint !== 'string' && hint !== NUMBER && hint !== 'default')throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(33)
  , gOPS    = __webpack_require__(67)
  , pIE     = __webpack_require__(53);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

var global  = __webpack_require__(2)
  , core    = __webpack_require__(14)
  , $export = __webpack_require__(0)
  , partial = __webpack_require__(87);
// https://esdiscuss.org/topic/promise-returning-delay-function
$export($export.G + $export.F, {
  delay: function delay(time){
    return new (core.Promise || global.Promise)(function(resolve){
      setTimeout(partial.call(resolve, true), time);
    });
  }
});

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx            = __webpack_require__(25)
  , $export        = __webpack_require__(0)
  , createDesc     = __webpack_require__(30)
  , assign         = __webpack_require__(85)
  , create         = __webpack_require__(29)
  , getPrototypeOf = __webpack_require__(17)
  , getKeys        = __webpack_require__(33)
  , dP             = __webpack_require__(7)
  , keyOf          = __webpack_require__(118)
  , aFunction      = __webpack_require__(13)
  , forOf          = __webpack_require__(38)
  , isIterable     = __webpack_require__(131)
  , $iterCreate    = __webpack_require__(63)
  , step           = __webpack_require__(81)
  , isObject       = __webpack_require__(5)
  , toIObject      = __webpack_require__(12)
  , DESCRIPTORS    = __webpack_require__(8)
  , has            = __webpack_require__(11);

// 0 -> Dict.forEach
// 1 -> Dict.map
// 2 -> Dict.filter
// 3 -> Dict.some
// 4 -> Dict.every
// 5 -> Dict.find
// 6 -> Dict.findKey
// 7 -> Dict.mapPairs
var createDictMethod = function(TYPE){
  var IS_MAP   = TYPE == 1
    , IS_EVERY = TYPE == 4;
  return function(object, callbackfn, that /* = undefined */){
    var f      = ctx(callbackfn, that, 3)
      , O      = toIObject(object)
      , result = IS_MAP || TYPE == 7 || TYPE == 2
          ? new (typeof this == 'function' ? this : Dict) : undefined
      , key, val, res;
    for(key in O)if(has(O, key)){
      val = O[key];
      res = f(val, key, object);
      if(TYPE){
        if(IS_MAP)result[key] = res;            // map
        else if(res)switch(TYPE){
          case 2: result[key] = val; break;     // filter
          case 3: return true;                  // some
          case 5: return val;                   // find
          case 6: return key;                   // findKey
          case 7: result[res[0]] = res[1];      // mapPairs
        } else if(IS_EVERY)return false;        // every
      }
    }
    return TYPE == 3 || IS_EVERY ? IS_EVERY : result;
  };
};
var findKey = createDictMethod(6);

var createDictIter = function(kind){
  return function(it){
    return new DictIterator(it, kind);
  };
};
var DictIterator = function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._a = getKeys(iterated);   // keys
  this._i = 0;                   // next index
  this._k = kind;                // kind
};
$iterCreate(DictIterator, 'Dict', function(){
  var that = this
    , O    = that._t
    , keys = that._a
    , kind = that._k
    , key;
  do {
    if(that._i >= keys.length){
      that._t = undefined;
      return step(1);
    }
  } while(!has(O, key = keys[that._i++]));
  if(kind == 'keys'  )return step(0, key);
  if(kind == 'values')return step(0, O[key]);
  return step(0, [key, O[key]]);
});

function Dict(iterable){
  var dict = create(null);
  if(iterable != undefined){
    if(isIterable(iterable)){
      forOf(iterable, true, function(key, value){
        dict[key] = value;
      });
    } else assign(dict, iterable);
  }
  return dict;
}
Dict.prototype = null;

function reduce(object, mapfn, init){
  aFunction(mapfn);
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , i      = 0
    , memo, key;
  if(arguments.length < 3){
    if(!length)throw TypeError('Reduce of empty object with no initial value');
    memo = O[keys[i++]];
  } else memo = Object(init);
  while(length > i)if(has(O, key = keys[i++])){
    memo = mapfn(memo, O[key], key, object);
  }
  return memo;
}

function includes(object, el){
  return (el == el ? keyOf(object, el) : findKey(object, function(it){
    return it != it;
  })) !== undefined;
}

function get(object, key){
  if(has(object, key))return object[key];
}
function set(object, key, value){
  if(DESCRIPTORS && key in Object)dP.f(object, key, createDesc(0, value));
  else object[key] = value;
  return object;
}

function isDict(it){
  return isObject(it) && getPrototypeOf(it) === Dict.prototype;
}

$export($export.G + $export.F, {Dict: Dict});

$export($export.S, 'Dict', {
  keys:     createDictIter('keys'),
  values:   createDictIter('values'),
  entries:  createDictIter('entries'),
  forEach:  createDictMethod(0),
  map:      createDictMethod(1),
  filter:   createDictMethod(2),
  some:     createDictMethod(3),
  every:    createDictMethod(4),
  find:     createDictMethod(5),
  findKey:  findKey,
  mapPairs: createDictMethod(7),
  reduce:   reduce,
  keyOf:    keyOf,
  includes: includes,
  has:      has,
  get:      get,
  set:      set,
  isDict:   isDict
});

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

var path    = __webpack_require__(127)
  , $export = __webpack_require__(0);

// Placeholder
__webpack_require__(14)._ = path._ = path._ || {};

$export($export.P + $export.F, 'Function', {part: __webpack_require__(87)});

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1)
  , get      = __webpack_require__(54);
module.exports = __webpack_require__(14).getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(64)(Number, 'Number', function(iterated){
  this._l = +iterated;
  this._i = 0;
}, function(){
  var i    = this._i++
    , done = !(i < this._l);
  return {done: done, value: done ? undefined : i};
});

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', {classof: __webpack_require__(37)});

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
  , define  = __webpack_require__(120);

$export($export.S + $export.F, 'Object', {define: define});

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', {isObject: __webpack_require__(5)});

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
  , define  = __webpack_require__(120)
  , create  = __webpack_require__(29);

$export($export.S + $export.F, 'Object', {
  make: function(proto, mixin){
    return define(create(proto), mixin);
  }
});

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(0)
  , $re     = __webpack_require__(88)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $re = __webpack_require__(88)(/[&<>"']/g, {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;'
});

$export($export.P + $export.F, 'String', {escapeHTML: function escapeHTML(){ return $re(this); }});

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $re = __webpack_require__(88)(/&(?:amp|lt|gt|quot|apos);/g, {
  '&amp;':  '&',
  '&lt;':   '<',
  '&gt;':   '>',
  '&quot;': '"',
  '&apos;': "'"
});

$export($export.P + $export.F, 'String', {unescapeHTML:  function unescapeHTML(){ return $re(this); }});

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', {copyWithin: __webpack_require__(108)});

__webpack_require__(48)('copyWithin');

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $every  = __webpack_require__(24)(4);

$export($export.P + $export.F * !__webpack_require__(23)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */){
    return $every(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', {fill: __webpack_require__(72)});

__webpack_require__(48)('fill');

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $filter = __webpack_require__(24)(2);

$export($export.P + $export.F * !__webpack_require__(23)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */){
    return $filter(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(0)
  , $find   = __webpack_require__(24)(6)
  , KEY     = 'findIndex'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(48)(KEY);

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(0)
  , $find   = __webpack_require__(24)(5)
  , KEY     = 'find'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(48)(KEY);

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export  = __webpack_require__(0)
  , $forEach = __webpack_require__(24)(0)
  , STRICT   = __webpack_require__(23)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */){
    return $forEach(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx            = __webpack_require__(25)
  , $export        = __webpack_require__(0)
  , toObject       = __webpack_require__(10)
  , call           = __webpack_require__(117)
  , isArrayIter    = __webpack_require__(79)
  , toLength       = __webpack_require__(9)
  , createProperty = __webpack_require__(73)
  , getIterFn      = __webpack_require__(54);

$export($export.S + $export.F * !__webpack_require__(65)(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export       = __webpack_require__(0)
  , $indexOf      = __webpack_require__(57)(false)
  , $native       = [].indexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(23)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /*, fromIndex = 0 */){
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(0);

$export($export.S, 'Array', {isArray: __webpack_require__(80)});

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export   = __webpack_require__(0)
  , toIObject = __webpack_require__(12)
  , arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(52) != Object || !__webpack_require__(23)(arrayJoin)), 'Array', {
  join: function join(separator){
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export       = __webpack_require__(0)
  , toIObject     = __webpack_require__(12)
  , toInteger     = __webpack_require__(34)
  , toLength      = __webpack_require__(9)
  , $native       = [].lastIndexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(23)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */){
    // convert -0 to +0
    if(NEGATIVE_ZERO)return $native.apply(this, arguments) || 0;
    var O      = toIObject(this)
      , length = toLength(O.length)
      , index  = length - 1;
    if(arguments.length > 1)index = Math.min(index, toInteger(arguments[1]));
    if(index < 0)index = length + index;
    for(;index >= 0; index--)if(index in O)if(O[index] === searchElement)return index || 0;
    return -1;
  }
});

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $map    = __webpack_require__(24)(1);

$export($export.P + $export.F * !__webpack_require__(23)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */){
    return $map(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export        = __webpack_require__(0)
  , createProperty = __webpack_require__(73);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(4)(function(){
  function F(){}
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */){
    var index  = 0
      , aLen   = arguments.length
      , result = new (typeof this == 'function' ? this : Array)(aLen);
    while(aLen > index)createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $reduce = __webpack_require__(110);

$export($export.P + $export.F * !__webpack_require__(23)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $reduce = __webpack_require__(110);

$export($export.P + $export.F * !__webpack_require__(23)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export    = __webpack_require__(0)
  , html       = __webpack_require__(77)
  , cof        = __webpack_require__(21)
  , toIndex    = __webpack_require__(44)
  , toLength   = __webpack_require__(9)
  , arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(4)(function(){
  if(html)arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end){
    var len   = toLength(this.length)
      , klass = cof(this);
    end = end === undefined ? len : end;
    if(klass == 'Array')return arraySlice.call(this, begin, end);
    var start  = toIndex(begin, len)
      , upTo   = toIndex(end, len)
      , size   = toLength(upTo - start)
      , cloned = Array(size)
      , i      = 0;
    for(; i < size; i++)cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $some   = __webpack_require__(24)(3);

$export($export.P + $export.F * !__webpack_require__(23)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */){
    return $some(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export   = __webpack_require__(0)
  , aFunction = __webpack_require__(13)
  , toObject  = __webpack_require__(10)
  , fails     = __webpack_require__(4)
  , $sort     = [].sort
  , test      = [1, 2, 3];

$export($export.P + $export.F * (fails(function(){
  // IE8-
  test.sort(undefined);
}) || !fails(function(){
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(23)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn){
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(43)('Array');

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(0);

$export($export.S, 'Date', {now: function(){ return new Date().getTime(); }});

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(0)
  , fails   = __webpack_require__(4)
  , getTime = Date.prototype.getTime;

var lz = function(num){
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (fails(function(){
  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
}) || !fails(function(){
  new Date(NaN).toISOString();
})), 'Date', {
  toISOString: function toISOString(){
    if(!isFinite(getTime.call(this)))throw RangeError('Invalid time value');
    var d = this
      , y = d.getUTCFullYear()
      , m = d.getUTCMilliseconds()
      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
  }
});

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export     = __webpack_require__(0)
  , toObject    = __webpack_require__(10)
  , toPrimitive = __webpack_require__(27);

$export($export.P + $export.F * __webpack_require__(4)(function(){
  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({toISOString: function(){ return 1; }}) !== 1;
}), 'Date', {
  toJSON: function toJSON(key){
    var O  = toObject(this)
      , pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(6)('toPrimitive')
  , proto        = Date.prototype;

if(!(TO_PRIMITIVE in proto))__webpack_require__(15)(proto, TO_PRIMITIVE, __webpack_require__(156));

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

var DateProto    = Date.prototype
  , INVALID_DATE = 'Invalid Date'
  , TO_STRING    = 'toString'
  , $toString    = DateProto[TO_STRING]
  , getTime      = DateProto.getTime;
if(new Date(NaN) + '' != INVALID_DATE){
  __webpack_require__(18)(DateProto, TO_STRING, function toString(){
    var value = getTime.call(this);
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(0);

$export($export.P, 'Function', {bind: __webpack_require__(111)});

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject       = __webpack_require__(5)
  , getPrototypeOf = __webpack_require__(17)
  , HAS_INSTANCE   = __webpack_require__(6)('hasInstance')
  , FunctionProto  = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if(!(HAS_INSTANCE in FunctionProto))__webpack_require__(7).f(FunctionProto, HAS_INSTANCE, {value: function(O){
  if(typeof this != 'function' || !isObject(O))return false;
  if(!isObject(this.prototype))return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while(O = getPrototypeOf(O))if(this.prototype === O)return true;
  return false;
}});

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(7).f
  , createDesc = __webpack_require__(30)
  , has        = __webpack_require__(11)
  , FProto     = Function.prototype
  , nameRE     = /^\s*function ([^ (]*)/
  , NAME       = 'name';

var isExtensible = Object.isExtensible || function(){
  return true;
};

// 19.2.4.2 name
NAME in FProto || __webpack_require__(8) && dP(FProto, NAME, {
  configurable: true,
  get: function(){
    try {
      var that = this
        , name = ('' + that).match(nameRE)[1];
      has(that, NAME) || !isExtensible(that) || dP(that, NAME, createDesc(5, name));
      return name;
    } catch(e){
      return '';
    }
  }
});

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(0)
  , log1p   = __webpack_require__(119)
  , sqrt    = Math.sqrt
  , $acosh  = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN 
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x){
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(0)
  , $asinh  = Math.asinh;

function asinh(x){
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0 
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {asinh: asinh});

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(0)
  , $atanh  = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0 
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x){
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(0)
  , sign    = __webpack_require__(83);

$export($export.S, 'Math', {
  cbrt: function cbrt(x){
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clz32: function clz32(x){
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(0)
  , exp     = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x){
    return (exp(x = +x) + exp(-x)) / 2;
  }
});

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(0)
  , $expm1  = __webpack_require__(82);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', {expm1: $expm1});

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export   = __webpack_require__(0)
  , sign      = __webpack_require__(83)
  , pow       = Math.pow
  , EPSILON   = pow(2, -52)
  , EPSILON32 = pow(2, -23)
  , MAX32     = pow(2, 127) * (2 - EPSILON32)
  , MIN32     = pow(2, -126);

var roundTiesToEven = function(n){
  return n + 1 / EPSILON - 1 / EPSILON;
};


$export($export.S, 'Math', {
  fround: function fround(x){
    var $abs  = Math.abs(x)
      , $sign = sign(x)
      , a, result;
    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs);
    if(result > MAX32 || result != result)return $sign * Infinity;
    return $sign * result;
  }
});

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(0)
  , abs     = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
    var sum  = 0
      , i    = 0
      , aLen = arguments.length
      , larg = 0
      , arg, div;
    while(i < aLen){
      arg = abs(arguments[i++]);
      if(larg < arg){
        div  = larg / arg;
        sum  = sum * div * div + 1;
        larg = arg;
      } else if(arg > 0){
        div  = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(0)
  , $imul   = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(4)(function(){
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y){
    var UINT16 = 0xffff
      , xn = +x
      , yn = +y
      , xl = UINT16 & xn
      , yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log10: function log10(x){
    return Math.log(x) / Math.LN10;
  }
});

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {log1p: __webpack_require__(119)});

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log2: function log2(x){
    return Math.log(x) / Math.LN2;
  }
});

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {sign: __webpack_require__(83)});

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(0)
  , expm1   = __webpack_require__(82)
  , exp     = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(4)(function(){
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x){
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(0)
  , expm1   = __webpack_require__(82)
  , exp     = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x){
    var a = expm1(x = +x)
      , b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  trunc: function trunc(it){
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global            = __webpack_require__(2)
  , has               = __webpack_require__(11)
  , cof               = __webpack_require__(21)
  , inheritIfRequired = __webpack_require__(78)
  , toPrimitive       = __webpack_require__(27)
  , fails             = __webpack_require__(4)
  , gOPN              = __webpack_require__(41).f
  , gOPD              = __webpack_require__(16).f
  , dP                = __webpack_require__(7).f
  , $trim             = __webpack_require__(50).trim
  , NUMBER            = 'Number'
  , $Number           = global[NUMBER]
  , Base              = $Number
  , proto             = $Number.prototype
  // Opera ~12 has broken Object#toString
  , BROKEN_COF        = cof(__webpack_require__(29)(proto)) == NUMBER
  , TRIM              = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function(argument){
  var it = toPrimitive(argument, false);
  if(typeof it == 'string' && it.length > 2){
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0)
      , third, radix, maxCode;
    if(first === 43 || first === 45){
      third = it.charCodeAt(2);
      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if(first === 48){
      switch(it.charCodeAt(1)){
        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default : return +it;
      }
      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if(code < 48 || code > maxCode)return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
  $Number = function Number(value){
    var it = arguments.length < 1 ? 0 : value
      , that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for(var keys = __webpack_require__(8) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++){
    if(has(Base, key = keys[j]) && !has($Number, key)){
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(18)(global, NUMBER, $Number);
}

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(0);

$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export   = __webpack_require__(0)
  , _isFinite = __webpack_require__(2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  }
});

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {isInteger: __webpack_require__(116)});

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number){
    return number != number;
  }
});

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export   = __webpack_require__(0)
  , isInteger = __webpack_require__(116)
  , abs       = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number){
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

var $export     = __webpack_require__(0)
  , $parseFloat = __webpack_require__(125);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {parseFloat: $parseFloat});

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(0)
  , $parseInt = __webpack_require__(126);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {parseInt: $parseInt});

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(0)
  , toInteger    = __webpack_require__(34)
  , aNumberValue = __webpack_require__(107)
  , repeat       = __webpack_require__(94)
  , $toFixed     = 1..toFixed
  , floor        = Math.floor
  , data         = [0, 0, 0, 0, 0, 0]
  , ERROR        = 'Number.toFixed: incorrect invocation!'
  , ZERO         = '0';

var multiply = function(n, c){
  var i  = -1
    , c2 = c;
  while(++i < 6){
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function(n){
  var i = 6
    , c = 0;
  while(--i >= 0){
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function(){
  var i = 6
    , s = '';
  while(--i >= 0){
    if(s !== '' || i === 0 || data[i] !== 0){
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function(x, n, acc){
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function(x){
  var n  = 0
    , x2 = x;
  while(x2 >= 4096){
    n += 12;
    x2 /= 4096;
  }
  while(x2 >= 2){
    n  += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128..toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(4)(function(){
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits){
    var x = aNumberValue(this, ERROR)
      , f = toInteger(fractionDigits)
      , s = ''
      , m = ZERO
      , e, z, j, k;
    if(f < 0 || f > 20)throw RangeError(ERROR);
    if(x != x)return 'NaN';
    if(x <= -1e21 || x >= 1e21)return String(x);
    if(x < 0){
      s = '-';
      x = -x;
    }
    if(x > 1e-21){
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if(e > 0){
        multiply(0, z);
        j = f;
        while(j >= 7){
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while(j >= 23){
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if(f > 0){
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(0)
  , $fails       = __webpack_require__(4)
  , aNumberValue = __webpack_require__(107)
  , $toPrecision = 1..toPrecision;

$export($export.P + $export.F * ($fails(function(){
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function(){
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision){
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision); 
  }
});

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(85)});

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(29)});

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(8), 'Object', {defineProperties: __webpack_require__(121)});

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(8), 'Object', {defineProperty: __webpack_require__(7).f});

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(5)
  , meta     = __webpack_require__(32).onFreeze;

__webpack_require__(26)('freeze', function($freeze){
  return function freeze(it){
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = __webpack_require__(12)
  , $getOwnPropertyDescriptor = __webpack_require__(16).f;

__webpack_require__(26)('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(26)('getOwnPropertyNames', function(){
  return __webpack_require__(122).f;
});

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = __webpack_require__(10)
  , $getPrototypeOf = __webpack_require__(17);

__webpack_require__(26)('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(5);

__webpack_require__(26)('isExtensible', function($isExtensible){
  return function isExtensible(it){
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(5);

__webpack_require__(26)('isFrozen', function($isFrozen){
  return function isFrozen(it){
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(5);

__webpack_require__(26)('isSealed', function($isSealed){
  return function isSealed(it){
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(0);
$export($export.S, 'Object', {is: __webpack_require__(128)});

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(10)
  , $keys    = __webpack_require__(33);

__webpack_require__(26)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(5)
  , meta     = __webpack_require__(32).onFreeze;

__webpack_require__(26)('preventExtensions', function($preventExtensions){
  return function preventExtensions(it){
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(5)
  , meta     = __webpack_require__(32).onFreeze;

__webpack_require__(26)('seal', function($seal){
  return function seal(it){
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(0);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(89).set});

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(37)
  , test    = {};
test[__webpack_require__(6)('toStringTag')] = 'z';
if(test + '' != '[object z]'){
  __webpack_require__(18)(Object.prototype, 'toString', function toString(){
    return '[object ' + classof(this) + ']';
  }, true);
}

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

var $export     = __webpack_require__(0)
  , $parseFloat = __webpack_require__(125);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), {parseFloat: $parseFloat});

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(0)
  , $parseInt = __webpack_require__(126);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), {parseInt: $parseInt});

/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY            = __webpack_require__(40)
  , global             = __webpack_require__(2)
  , ctx                = __webpack_require__(25)
  , classof            = __webpack_require__(37)
  , $export            = __webpack_require__(0)
  , isObject           = __webpack_require__(5)
  , aFunction          = __webpack_require__(13)
  , anInstance         = __webpack_require__(36)
  , forOf              = __webpack_require__(38)
  , speciesConstructor = __webpack_require__(91)
  , task               = __webpack_require__(96).set
  , microtask          = __webpack_require__(84)()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[__webpack_require__(6)('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(42)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
__webpack_require__(49)($Promise, PROMISE);
__webpack_require__(43)(PROMISE);
Wrapper = __webpack_require__(14)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(65)(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});

/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export   = __webpack_require__(0)
  , aFunction = __webpack_require__(13)
  , anObject  = __webpack_require__(1)
  , rApply    = (__webpack_require__(2).Reflect || {}).apply
  , fApply    = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(4)(function(){
  rApply(function(){});
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList){
    var T = aFunction(target)
      , L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});

/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export    = __webpack_require__(0)
  , create     = __webpack_require__(29)
  , aFunction  = __webpack_require__(13)
  , anObject   = __webpack_require__(1)
  , isObject   = __webpack_require__(5)
  , fails      = __webpack_require__(4)
  , bind       = __webpack_require__(111)
  , rConstruct = (__webpack_require__(2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function(){
  function F(){}
  return !(rConstruct(function(){}, [], F) instanceof F);
});
var ARGS_BUG = !fails(function(){
  rConstruct(function(){});
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /*, newTarget*/){
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if(ARGS_BUG && !NEW_TARGET_BUG)return rConstruct(Target, args, newTarget);
    if(Target == newTarget){
      // w/o altered newTarget, optimization for 0-4 arguments
      switch(args.length){
        case 0: return new Target;
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args));
    }
    // with altered newTarget, not support built-in constructors
    var proto    = newTarget.prototype
      , instance = create(isObject(proto) ? proto : Object.prototype)
      , result   = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP          = __webpack_require__(7)
  , $export     = __webpack_require__(0)
  , anObject    = __webpack_require__(1)
  , toPrimitive = __webpack_require__(27);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(4)(function(){
  Reflect.defineProperty(dP.f({}, 1, {value: 1}), 1, {value: 2});
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes){
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export  = __webpack_require__(0)
  , gOPD     = __webpack_require__(16).f
  , anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey){
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});

/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export  = __webpack_require__(0)
  , anObject = __webpack_require__(1);
var Enumerate = function(iterated){
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = []       // keys
    , key;
  for(key in iterated)keys.push(key);
};
__webpack_require__(63)(Enumerate, 'Object', function(){
  var that = this
    , keys = that._k
    , key;
  do {
    if(that._i >= keys.length)return {value: undefined, done: true};
  } while(!((key = keys[that._i++]) in that._t));
  return {value: key, done: false};
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target){
    return new Enumerate(target);
  }
});

/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD     = __webpack_require__(16)
  , $export  = __webpack_require__(0)
  , anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
    return gOPD.f(anObject(target), propertyKey);
  }
});

/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export  = __webpack_require__(0)
  , getProto = __webpack_require__(17)
  , anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target){
    return getProto(anObject(target));
  }
});

/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD           = __webpack_require__(16)
  , getPrototypeOf = __webpack_require__(17)
  , has            = __webpack_require__(11)
  , $export        = __webpack_require__(0)
  , isObject       = __webpack_require__(5)
  , anObject       = __webpack_require__(1);

function get(target, propertyKey/*, receiver*/){
  var receiver = arguments.length < 3 ? target : arguments[2]
    , desc, proto;
  if(anObject(target) === receiver)return target[propertyKey];
  if(desc = gOPD.f(target, propertyKey))return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if(isObject(proto = getPrototypeOf(target)))return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', {get: get});

/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey){
    return propertyKey in target;
  }
});

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export       = __webpack_require__(0)
  , anObject      = __webpack_require__(1)
  , $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target){
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});

/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {ownKeys: __webpack_require__(86)});

/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export            = __webpack_require__(0)
  , anObject           = __webpack_require__(1)
  , $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target){
    anObject(target);
    try {
      if($preventExtensions)$preventExtensions(target);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export  = __webpack_require__(0)
  , setProto = __webpack_require__(89);

if(setProto)$export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto){
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP             = __webpack_require__(7)
  , gOPD           = __webpack_require__(16)
  , getPrototypeOf = __webpack_require__(17)
  , has            = __webpack_require__(11)
  , $export        = __webpack_require__(0)
  , createDesc     = __webpack_require__(30)
  , anObject       = __webpack_require__(1)
  , isObject       = __webpack_require__(5);

function set(target, propertyKey, V/*, receiver*/){
  var receiver = arguments.length < 4 ? target : arguments[3]
    , ownDesc  = gOPD.f(anObject(target), propertyKey)
    , existingDescriptor, proto;
  if(!ownDesc){
    if(isObject(proto = getPrototypeOf(target))){
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if(has(ownDesc, 'value')){
    if(ownDesc.writable === false || !isObject(receiver))return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', {set: set});

/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

var global            = __webpack_require__(2)
  , inheritIfRequired = __webpack_require__(78)
  , dP                = __webpack_require__(7).f
  , gOPN              = __webpack_require__(41).f
  , isRegExp          = __webpack_require__(62)
  , $flags            = __webpack_require__(60)
  , $RegExp           = global.RegExp
  , Base              = $RegExp
  , proto             = $RegExp.prototype
  , re1               = /a/g
  , re2               = /a/g
  // "new" creates a new object, old webkit buggy here
  , CORRECT_NEW       = new $RegExp(re1) !== re1;

if(__webpack_require__(8) && (!CORRECT_NEW || __webpack_require__(4)(function(){
  re2[__webpack_require__(6)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))){
  $RegExp = function RegExp(p, f){
    var tiRE = this instanceof $RegExp
      , piRE = isRegExp(p)
      , fiU  = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function(key){
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function(){ return Base[key]; },
      set: function(it){ Base[key] = it; }
    });
  };
  for(var keys = gOPN(Base), i = 0; keys.length > i; )proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(18)(global, 'RegExp', $RegExp);
}

__webpack_require__(43)('RegExp');

/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(59)('match', 1, function(defined, MATCH, $match){
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});

/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(59)('replace', 2, function(defined, REPLACE, $replace){
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue){
    'use strict';
    var O  = defined(this)
      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});

/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(59)('search', 1, function(defined, SEARCH, $search){
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});

/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(59)('split', 2, function(defined, SPLIT, $split){
  'use strict';
  var isRegExp   = __webpack_require__(62)
    , _split     = $split
    , $push      = [].push
    , $SPLIT     = 'split'
    , LENGTH     = 'length'
    , LAST_INDEX = 'lastIndex';
  if(
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ){
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function(separator, limit){
      var string = String(this);
      if(separator === undefined && limit === 0)return [];
      // If `separator` is not a regex, use native split
      if(!isRegExp(separator))return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if(!NPCG)separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while(match = separatorCopy.exec(string)){
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if(lastIndex > lastLastIndex){
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          if(!NPCG && match[LENGTH] > 1)match[0].replace(separator2, function(){
            for(i = 1; i < arguments[LENGTH] - 2; i++)if(arguments[i] === undefined)match[i] = undefined;
          });
          if(match[LENGTH] > 1 && match.index < string[LENGTH])$push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if(output[LENGTH] >= splitLimit)break;
        }
        if(separatorCopy[LAST_INDEX] === match.index)separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if(lastLastIndex === string[LENGTH]){
        if(lastLength || !separatorCopy.test(''))output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if('0'[$SPLIT](undefined, 0)[LENGTH]){
    $split = function(separator, limit){
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit){
    var O  = defined(this)
      , fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});

/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(133);
var anObject    = __webpack_require__(1)
  , $flags      = __webpack_require__(60)
  , DESCRIPTORS = __webpack_require__(8)
  , TO_STRING   = 'toString'
  , $toString   = /./[TO_STRING];

var define = function(fn){
  __webpack_require__(18)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if(__webpack_require__(4)(function(){ return $toString.call({source: 'a', flags: 'b'}) != '/a/b'; })){
  define(function toString(){
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if($toString.name != TO_STRING){
  define(function toString(){
    return $toString.call(this);
  });
}

/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(19)('anchor', function(createHTML){
  return function anchor(name){
    return createHTML(this, 'a', 'name', name);
  }
});

/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(19)('big', function(createHTML){
  return function big(){
    return createHTML(this, 'big', '', '');
  }
});

/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(19)('blink', function(createHTML){
  return function blink(){
    return createHTML(this, 'blink', '', '');
  }
});

/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(19)('bold', function(createHTML){
  return function bold(){
    return createHTML(this, 'b', '', '');
  }
});

/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $at     = __webpack_require__(92)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos){
    return $at(this, pos);
  }
});

/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export   = __webpack_require__(0)
  , toLength  = __webpack_require__(9)
  , context   = __webpack_require__(93)
  , ENDS_WITH = 'endsWith'
  , $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(76)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /*, endPosition = @length */){
    var that = context(this, searchString, ENDS_WITH)
      , endPosition = arguments.length > 1 ? arguments[1] : undefined
      , len    = toLength(that.length)
      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
      , search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});

/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(19)('fixed', function(createHTML){
  return function fixed(){
    return createHTML(this, 'tt', '', '');
  }
});

/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(19)('fontcolor', function(createHTML){
  return function fontcolor(color){
    return createHTML(this, 'font', 'color', color);
  }
});

/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(19)('fontsize', function(createHTML){
  return function fontsize(size){
    return createHTML(this, 'font', 'size', size);
  }
});

/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

var $export        = __webpack_require__(0)
  , toIndex        = __webpack_require__(44)
  , fromCharCode   = String.fromCharCode
  , $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
    var res  = []
      , aLen = arguments.length
      , i    = 0
      , code;
    while(aLen > i){
      code = +arguments[i++];
      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});

/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export  = __webpack_require__(0)
  , context  = __webpack_require__(93)
  , INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(76)(INCLUDES), 'String', {
  includes: function includes(searchString /*, position = 0 */){
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(19)('italics', function(createHTML){
  return function italics(){
    return createHTML(this, 'i', '', '');
  }
});

/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(92)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(64)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(19)('link', function(createHTML){
  return function link(url){
    return createHTML(this, 'a', 'href', url);
  }
});

/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(0)
  , toIObject = __webpack_require__(12)
  , toLength  = __webpack_require__(9);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite){
    var tpl  = toIObject(callSite.raw)
      , len  = toLength(tpl.length)
      , aLen = arguments.length
      , res  = []
      , i    = 0;
    while(len > i){
      res.push(String(tpl[i++]));
      if(i < aLen)res.push(String(arguments[i]));
    } return res.join('');
  }
});

/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(94)
});

/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(19)('small', function(createHTML){
  return function small(){
    return createHTML(this, 'small', '', '');
  }
});

/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export     = __webpack_require__(0)
  , toLength    = __webpack_require__(9)
  , context     = __webpack_require__(93)
  , STARTS_WITH = 'startsWith'
  , $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(76)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /*, position = 0 */){
    var that   = context(this, searchString, STARTS_WITH)
      , index  = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length))
      , search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(19)('strike', function(createHTML){
  return function strike(){
    return createHTML(this, 'strike', '', '');
  }
});

/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(19)('sub', function(createHTML){
  return function sub(){
    return createHTML(this, 'sub', '', '');
  }
});

/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(19)('sup', function(createHTML){
  return function sup(){
    return createHTML(this, 'sup', '', '');
  }
});

/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(50)('trim', function($trim){
  return function trim(){
    return $trim(this, 3);
  };
});

/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(2)
  , has            = __webpack_require__(11)
  , DESCRIPTORS    = __webpack_require__(8)
  , $export        = __webpack_require__(0)
  , redefine       = __webpack_require__(18)
  , META           = __webpack_require__(32).KEY
  , $fails         = __webpack_require__(4)
  , shared         = __webpack_require__(68)
  , setToStringTag = __webpack_require__(49)
  , uid            = __webpack_require__(45)
  , wks            = __webpack_require__(6)
  , wksExt         = __webpack_require__(130)
  , wksDefine      = __webpack_require__(98)
  , keyOf          = __webpack_require__(118)
  , enumKeys       = __webpack_require__(157)
  , isArray        = __webpack_require__(80)
  , anObject       = __webpack_require__(1)
  , toIObject      = __webpack_require__(12)
  , toPrimitive    = __webpack_require__(27)
  , createDesc     = __webpack_require__(30)
  , _create        = __webpack_require__(29)
  , gOPNExt        = __webpack_require__(122)
  , $GOPD          = __webpack_require__(16)
  , $DP            = __webpack_require__(7)
  , $keys          = __webpack_require__(33)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(41).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(53).f  = $propertyIsEnumerable;
  __webpack_require__(67).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(40)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(15)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(0)
  , $typed       = __webpack_require__(69)
  , buffer       = __webpack_require__(97)
  , anObject     = __webpack_require__(1)
  , toIndex      = __webpack_require__(44)
  , toLength     = __webpack_require__(9)
  , isObject     = __webpack_require__(5)
  , ArrayBuffer  = __webpack_require__(2).ArrayBuffer
  , speciesConstructor = __webpack_require__(91)
  , $ArrayBuffer = buffer.ArrayBuffer
  , $DataView    = buffer.DataView
  , $isView      = $typed.ABV && ArrayBuffer.isView
  , $slice       = $ArrayBuffer.prototype.slice
  , VIEW         = $typed.VIEW
  , ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), {ArrayBuffer: $ArrayBuffer});

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it){
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(4)(function(){
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end){
    if($slice !== undefined && end === undefined)return $slice.call(anObject(this), start); // FF fix
    var len    = anObject(this).byteLength
      , first  = toIndex(start, len)
      , final  = toIndex(end === undefined ? len : end, len)
      , result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first))
      , viewS  = new $DataView(this)
      , viewT  = new $DataView(result)
      , index  = 0;
    while(first < final){
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(43)(ARRAY_BUFFER);

/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
$export($export.G + $export.W + $export.F * !__webpack_require__(69).ABV, {
  DataView: __webpack_require__(97).DataView
});

/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(31)('Float32', 4, function(init){
  return function Float32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(31)('Float64', 8, function(init){
  return function Float64Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(31)('Int16', 2, function(init){
  return function Int16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(31)('Int32', 4, function(init){
  return function Int32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(31)('Int8', 1, function(init){
  return function Int8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(31)('Uint16', 2, function(init){
  return function Uint16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(31)('Uint32', 4, function(init){
  return function Uint32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(31)('Uint8', 1, function(init){
  return function Uint8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(31)('Uint8', 1, function(init){
  return function Uint8ClampedArray(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
}, true);

/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(114);

// 23.4 WeakSet Objects
__webpack_require__(58)('WeakSet', function(get){
  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value){
    return weak.def(this, value, true);
  }
}, weak, false, true);

/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export   = __webpack_require__(0)
  , $includes = __webpack_require__(57)(true);

$export($export.P, 'Array', {
  includes: function includes(el /*, fromIndex = 0 */){
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(48)('includes');

/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export   = __webpack_require__(0)
  , microtask = __webpack_require__(84)()
  , process   = __webpack_require__(2).process
  , isNode    = __webpack_require__(21)(process) == 'process';

$export($export.G, {
  asap: function asap(fn){
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});

/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(0)
  , cof     = __webpack_require__(21);

$export($export.S, 'Error', {
  isError: function isError(it){
    return cof(it) === 'Error';
  }
});

/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = __webpack_require__(0);

$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(113)('Map')});

/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});

/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >> 16
      , v1 = $v >> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});

/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});

/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >>> 16
      , v1 = $v >>> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});

/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export         = __webpack_require__(0)
  , toObject        = __webpack_require__(10)
  , aFunction       = __webpack_require__(13)
  , $defineProperty = __webpack_require__(7);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(8) && $export($export.P + __webpack_require__(66), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter){
    $defineProperty.f(toObject(this), P, {get: aFunction(getter), enumerable: true, configurable: true});
  }
});

/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export         = __webpack_require__(0)
  , toObject        = __webpack_require__(10)
  , aFunction       = __webpack_require__(13)
  , $defineProperty = __webpack_require__(7);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(8) && $export($export.P + __webpack_require__(66), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter){
    $defineProperty.f(toObject(this), P, {set: aFunction(setter), enumerable: true, configurable: true});
  }
});

/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export  = __webpack_require__(0)
  , $entries = __webpack_require__(124)(true);

$export($export.S, 'Object', {
  entries: function entries(it){
    return $entries(it);
  }
});

/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export        = __webpack_require__(0)
  , ownKeys        = __webpack_require__(86)
  , toIObject      = __webpack_require__(12)
  , gOPD           = __webpack_require__(16)
  , createProperty = __webpack_require__(73);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
    var O       = toIObject(object)
      , getDesc = gOPD.f
      , keys    = ownKeys(O)
      , result  = {}
      , i       = 0
      , key;
    while(keys.length > i)createProperty(result, key = keys[i++], getDesc(O, key));
    return result;
  }
});

/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export                  = __webpack_require__(0)
  , toObject                 = __webpack_require__(10)
  , toPrimitive              = __webpack_require__(27)
  , getPrototypeOf           = __webpack_require__(17)
  , getOwnPropertyDescriptor = __webpack_require__(16).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(8) && $export($export.P + __webpack_require__(66), 'Object', {
  __lookupGetter__: function __lookupGetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.get;
    } while(O = getPrototypeOf(O));
  }
});

/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export                  = __webpack_require__(0)
  , toObject                 = __webpack_require__(10)
  , toPrimitive              = __webpack_require__(27)
  , getPrototypeOf           = __webpack_require__(17)
  , getOwnPropertyDescriptor = __webpack_require__(16).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(8) && $export($export.P + __webpack_require__(66), 'Object', {
  __lookupSetter__: function __lookupSetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.set;
    } while(O = getPrototypeOf(O));
  }
});

/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0)
  , $values = __webpack_require__(124)(false);

$export($export.S, 'Object', {
  values: function values(it){
    return $values(it);
  }
});

/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export     = __webpack_require__(0)
  , global      = __webpack_require__(2)
  , core        = __webpack_require__(14)
  , microtask   = __webpack_require__(84)()
  , OBSERVABLE  = __webpack_require__(6)('observable')
  , aFunction   = __webpack_require__(13)
  , anObject    = __webpack_require__(1)
  , anInstance  = __webpack_require__(36)
  , redefineAll = __webpack_require__(42)
  , hide        = __webpack_require__(15)
  , forOf       = __webpack_require__(38)
  , RETURN      = forOf.RETURN;

var getMethod = function(fn){
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function(subscription){
  var cleanup = subscription._c;
  if(cleanup){
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function(subscription){
  return subscription._o === undefined;
};

var closeSubscription = function(subscription){
  if(!subscriptionClosed(subscription)){
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function(observer, subscriber){
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup      = subscriber(observer)
      , subscription = cleanup;
    if(cleanup != null){
      if(typeof cleanup.unsubscribe === 'function')cleanup = function(){ subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch(e){
    observer.error(e);
    return;
  } if(subscriptionClosed(this))cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe(){ closeSubscription(this); }
});

var SubscriptionObserver = function(subscription){
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if(m)return m.call(observer, value);
      } catch(e){
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value){
    var subscription = this._s;
    if(subscriptionClosed(subscription))throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if(!m)throw value;
      value = m.call(observer, value);
    } catch(e){
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch(e){
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber){
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer){
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn){
    var that = this;
    return new (core.Promise || global.Promise)(function(resolve, reject){
      aFunction(fn);
      var subscription = that.subscribe({
        next : function(value){
          try {
            return fn(value);
          } catch(e){
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x){
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if(method){
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function(observer){
        return observable.subscribe(observer);
      });
    }
    return new C(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          try {
            if(forOf(x, false, function(it){
              observer.next(it);
              if(done)return RETURN;
            }) === RETURN)return;
          } catch(e){
            if(done)throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  },
  of: function of(){
    for(var i = 0, l = arguments.length, items = Array(l); i < l;)items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          for(var i = 0; i < items.length; ++i){
            observer.next(items[i]);
            if(done)return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function(){ return this; });

$export($export.G, {Observable: $Observable});

__webpack_require__(43)('Observable');

/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

var metadata                  = __webpack_require__(28)
  , anObject                  = __webpack_require__(1)
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey){
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
}});

/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(28)
  , anObject               = __webpack_require__(1)
  , toMetaKey              = metadata.key
  , getOrCreateMetadataMap = metadata.map
  , store                  = metadata.store;

metadata.exp({deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */){
  var targetKey   = arguments.length < 3 ? undefined : toMetaKey(arguments[2])
    , metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if(metadataMap === undefined || !metadataMap['delete'](metadataKey))return false;
  if(metadataMap.size)return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
}});

/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

var Set                     = __webpack_require__(134)
  , from                    = __webpack_require__(109)
  , metadata                = __webpack_require__(28)
  , anObject                = __webpack_require__(1)
  , getPrototypeOf          = __webpack_require__(17)
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

var ordinaryMetadataKeys = function(O, P){
  var oKeys  = ordinaryOwnMetadataKeys(O, P)
    , parent = getPrototypeOf(O);
  if(parent === null)return oKeys;
  var pKeys  = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({getMetadataKeys: function getMetadataKeys(target /*, targetKey */){
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});

/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(28)
  , anObject               = __webpack_require__(1)
  , getPrototypeOf         = __webpack_require__(17)
  , ordinaryHasOwnMetadata = metadata.has
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

var ordinaryGetMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({getMetadata: function getMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

var metadata                = __webpack_require__(28)
  , anObject                = __webpack_require__(1)
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

metadata.exp({getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */){
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});

/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(28)
  , anObject               = __webpack_require__(1)
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

metadata.exp({getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(28)
  , anObject               = __webpack_require__(1)
  , getPrototypeOf         = __webpack_require__(17)
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

var ordinaryHasMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(28)
  , anObject               = __webpack_require__(1)
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

metadata.exp({hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

var metadata                  = __webpack_require__(28)
  , anObject                  = __webpack_require__(1)
  , aFunction                 = __webpack_require__(13)
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({metadata: function metadata(metadataKey, metadataValue){
  return function decorator(target, targetKey){
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
}});

/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = __webpack_require__(0);

$export($export.P + $export.R, 'Set', {toJSON: __webpack_require__(113)('Set')});

/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(0)
  , $at     = __webpack_require__(92)(true);

$export($export.P, 'String', {
  at: function at(pos){
    return $at(this, pos);
  }
});

/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export     = __webpack_require__(0)
  , defined     = __webpack_require__(22)
  , toLength    = __webpack_require__(9)
  , isRegExp    = __webpack_require__(62)
  , getFlags    = __webpack_require__(60)
  , RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function(regexp, string){
  this._r = regexp;
  this._s = string;
};

__webpack_require__(63)($RegExpStringIterator, 'RegExp String', function next(){
  var match = this._r.exec(this._s);
  return {value: match, done: match === null};
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp){
    defined(this);
    if(!isRegExp(regexp))throw TypeError(regexp + ' is not a regexp!');
    var S     = String(this)
      , flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp)
      , rx    = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});

/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0)
  , $pad    = __webpack_require__(129);

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0)
  , $pad    = __webpack_require__(129);

$export($export.P, 'String', {
  padStart: function padStart(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(50)('trimLeft', function($trim){
  return function trimLeft(){
    return $trim(this, 1);
  };
}, 'trimStart');

/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(50)('trimRight', function($trim){
  return function trimRight(){
    return $trim(this, 2);
  };
}, 'trimEnd');

/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(98)('asyncIterator');

/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(98)('observable');

/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-global
var $export = __webpack_require__(0);

$export($export.S, 'System', {global: __webpack_require__(2)});

/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators    = __webpack_require__(99)
  , redefine      = __webpack_require__(18)
  , global        = __webpack_require__(2)
  , hide          = __webpack_require__(15)
  , Iterators     = __webpack_require__(39)
  , wks           = __webpack_require__(6)
  , ITERATOR      = wks('iterator')
  , TO_STRING_TAG = wks('toStringTag')
  , ArrayValues   = Iterators.Array;

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype
    , key;
  if(proto){
    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
  }
}

/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
  , $task   = __webpack_require__(96);
$export($export.G + $export.B, {
  setImmediate:   $task.set,
  clearImmediate: $task.clear
});

/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global     = __webpack_require__(2)
  , $export    = __webpack_require__(0)
  , invoke     = __webpack_require__(61)
  , partial    = __webpack_require__(87)
  , navigator  = global.navigator
  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function(set){
  return MSIE ? function(fn, time /*, ...args */){
    return set(invoke(
      partial,
      [].slice.call(arguments, 2),
      typeof fn == 'function' ? fn : Function(fn)
    ), time);
  } : set;
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout:  wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});

/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(289);
__webpack_require__(228);
__webpack_require__(230);
__webpack_require__(229);
__webpack_require__(232);
__webpack_require__(234);
__webpack_require__(239);
__webpack_require__(233);
__webpack_require__(231);
__webpack_require__(241);
__webpack_require__(240);
__webpack_require__(236);
__webpack_require__(237);
__webpack_require__(235);
__webpack_require__(227);
__webpack_require__(238);
__webpack_require__(242);
__webpack_require__(243);
__webpack_require__(195);
__webpack_require__(197);
__webpack_require__(196);
__webpack_require__(245);
__webpack_require__(244);
__webpack_require__(215);
__webpack_require__(225);
__webpack_require__(226);
__webpack_require__(216);
__webpack_require__(217);
__webpack_require__(218);
__webpack_require__(219);
__webpack_require__(220);
__webpack_require__(221);
__webpack_require__(222);
__webpack_require__(223);
__webpack_require__(224);
__webpack_require__(198);
__webpack_require__(199);
__webpack_require__(200);
__webpack_require__(201);
__webpack_require__(202);
__webpack_require__(203);
__webpack_require__(204);
__webpack_require__(205);
__webpack_require__(206);
__webpack_require__(207);
__webpack_require__(208);
__webpack_require__(209);
__webpack_require__(210);
__webpack_require__(211);
__webpack_require__(212);
__webpack_require__(213);
__webpack_require__(214);
__webpack_require__(276);
__webpack_require__(281);
__webpack_require__(288);
__webpack_require__(279);
__webpack_require__(271);
__webpack_require__(272);
__webpack_require__(277);
__webpack_require__(282);
__webpack_require__(284);
__webpack_require__(267);
__webpack_require__(268);
__webpack_require__(269);
__webpack_require__(270);
__webpack_require__(273);
__webpack_require__(274);
__webpack_require__(275);
__webpack_require__(278);
__webpack_require__(280);
__webpack_require__(283);
__webpack_require__(285);
__webpack_require__(286);
__webpack_require__(287);
__webpack_require__(190);
__webpack_require__(192);
__webpack_require__(191);
__webpack_require__(194);
__webpack_require__(193);
__webpack_require__(179);
__webpack_require__(177);
__webpack_require__(183);
__webpack_require__(180);
__webpack_require__(186);
__webpack_require__(188);
__webpack_require__(176);
__webpack_require__(182);
__webpack_require__(173);
__webpack_require__(187);
__webpack_require__(171);
__webpack_require__(185);
__webpack_require__(184);
__webpack_require__(178);
__webpack_require__(181);
__webpack_require__(170);
__webpack_require__(172);
__webpack_require__(175);
__webpack_require__(174);
__webpack_require__(189);
__webpack_require__(99);
__webpack_require__(261);
__webpack_require__(266);
__webpack_require__(133);
__webpack_require__(262);
__webpack_require__(263);
__webpack_require__(264);
__webpack_require__(265);
__webpack_require__(246);
__webpack_require__(132);
__webpack_require__(134);
__webpack_require__(135);
__webpack_require__(301);
__webpack_require__(290);
__webpack_require__(291);
__webpack_require__(296);
__webpack_require__(299);
__webpack_require__(300);
__webpack_require__(294);
__webpack_require__(297);
__webpack_require__(295);
__webpack_require__(298);
__webpack_require__(292);
__webpack_require__(293);
__webpack_require__(247);
__webpack_require__(248);
__webpack_require__(249);
__webpack_require__(250);
__webpack_require__(251);
__webpack_require__(254);
__webpack_require__(252);
__webpack_require__(253);
__webpack_require__(255);
__webpack_require__(256);
__webpack_require__(257);
__webpack_require__(258);
__webpack_require__(260);
__webpack_require__(259);
__webpack_require__(302);
__webpack_require__(328);
__webpack_require__(331);
__webpack_require__(330);
__webpack_require__(332);
__webpack_require__(333);
__webpack_require__(329);
__webpack_require__(334);
__webpack_require__(335);
__webpack_require__(313);
__webpack_require__(316);
__webpack_require__(312);
__webpack_require__(310);
__webpack_require__(311);
__webpack_require__(314);
__webpack_require__(315);
__webpack_require__(305);
__webpack_require__(327);
__webpack_require__(336);
__webpack_require__(304);
__webpack_require__(306);
__webpack_require__(308);
__webpack_require__(307);
__webpack_require__(309);
__webpack_require__(318);
__webpack_require__(319);
__webpack_require__(321);
__webpack_require__(320);
__webpack_require__(323);
__webpack_require__(322);
__webpack_require__(324);
__webpack_require__(325);
__webpack_require__(326);
__webpack_require__(303);
__webpack_require__(317);
__webpack_require__(339);
__webpack_require__(338);
__webpack_require__(337);
module.exports = __webpack_require__(14);

/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var change_detection_util_1 = __webpack_require__(137);
exports.SimpleChange = change_detection_util_1.SimpleChange;
var constants_1 = __webpack_require__(343);
exports.ChangeDetectionStrategy = constants_1.ChangeDetectionStrategy;
var change_detector_ref_1 = __webpack_require__(138);
exports.ChangeDetectorRef = change_detector_ref_1.ChangeDetectorRef;
//# sourceMappingURL=change_detection.js.map

/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// @TODO this needs to be in a singleton
var lang_1 = __webpack_require__(3);
var TTL = 10;
var onChangesTtl = TTL;
var ChangesQueue = (function () {
    function ChangesQueue() {
    }
    ChangesQueue.prototype.buildFlushOnChanges = function ($rootScope) {
        var _context = this;
        buildFlushOnChangesCb($rootScope);
        function buildFlushOnChangesCb($rootScope) {
            if (lang_1.isFunction(_context.flushOnChangesQueue)) {
                return _context.flushOnChangesQueue;
            }
            _context.flushOnChangesQueue = getFlushOnChangesQueueCb($rootScope);
            return _context.flushOnChangesQueue;
        }
        function getFlushOnChangesQueueCb($rootScope) {
            // This function is called in a $$postDigest to trigger all the onChanges hooks in a single digest
            return function _flushOnChangesQueue() {
                try {
                    if (!(--onChangesTtl)) {
                        // We have hit the TTL limit so reset everything
                        _context.onChangesQueue = undefined;
                        throw new Error("infchng, " + TTL + " ngOnChanges() iterations reached. Aborting!\n");
                    }
                    // We must run this hook in an apply since the $$postDigest runs outside apply
                    $rootScope.$apply(function () {
                        for (var i = 0, ii = _context.onChangesQueue.length; i < ii; ++i) {
                            _context.onChangesQueue[i]();
                        }
                        // Reset the queue to trigger a new schedule next time there is a change
                        _context.onChangesQueue = undefined;
                    });
                }
                finally {
                    onChangesTtl++;
                }
            };
        }
    };
    return ChangesQueue;
}());
exports.ChangesQueue = ChangesQueue;
exports.changesQueueService = new ChangesQueue();
//# sourceMappingURL=changes_queue.js.map

/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var lang_1 = __webpack_require__(3);
/**
 * Describes the current state of the change detector.
 */
var ChangeDetectorState;
(function (ChangeDetectorState) {
    /**
     * `NeverChecked` means that the change detector has not been checked yet, and
     * initialization methods should be called during detection.
     */
    ChangeDetectorState[ChangeDetectorState["NeverChecked"] = 0] = "NeverChecked";
    /**
     * `CheckedBefore` means that the change detector has successfully completed at least
     * one detection previously.
     */
    ChangeDetectorState[ChangeDetectorState["CheckedBefore"] = 1] = "CheckedBefore";
    /**
     * `Errored` means that the change detector encountered an error checking a binding
     * or calling a directive lifecycle method and is now in an inconsistent state. Change
     * detectors in this state will no longer detect changes.
     */
    ChangeDetectorState[ChangeDetectorState["Errored"] = 2] = "Errored";
})(ChangeDetectorState = exports.ChangeDetectorState || (exports.ChangeDetectorState = {}));
/**
 * Describes within the change detector which strategy will be used the next time change
 * detection is triggered.
 */
var ChangeDetectionStrategy;
(function (ChangeDetectionStrategy) {
    /**
     * `CheckedOnce` means that after calling detectChanges the mode of the change detector
     * will become `Checked`.
     */
    // CheckOnce,
    /**
     * `Checked` means that the change detector should be skipped until its mode changes to
     * `CheckOnce`.
     */
    // Checked,
    /**
     * `CheckAlways` means that after calling detectChanges the mode of the change detector
     * will remain `CheckAlways`.
     */
    // CheckAlways,
    /**
     * `Detached` means that the change detector sub tree is not a part of the main tree and
     * should be skipped.
     */
    // Detached,
    /**
     * `OnPush` means that the change detector's mode will be set to `CheckOnce` during hydration.
     */
    ChangeDetectionStrategy[ChangeDetectionStrategy["OnPush"] = 0] = "OnPush";
    /**
     * `Default` means that the change detector's mode will be set to `CheckAlways` during hydration.
     */
    ChangeDetectionStrategy[ChangeDetectionStrategy["Default"] = 1] = "Default";
})(ChangeDetectionStrategy = exports.ChangeDetectionStrategy || (exports.ChangeDetectionStrategy = {}));
/**
 * List of possible {@link ChangeDetectionStrategy} values.
 */
exports.CHANGE_DETECTION_STRATEGY_VALUES = [
    // ChangeDetectionStrategy.CheckOnce,
    // ChangeDetectionStrategy.Checked,
    // ChangeDetectionStrategy.CheckAlways,
    // ChangeDetectionStrategy.Detached,
    0 /* OnPush */,
    1 /* Default */
];
/**
 * List of possible {@link ChangeDetectorState} values.
 */
exports.CHANGE_DETECTOR_STATE_VALUES = [
    0 /* NeverChecked */,
    1 /* CheckedBefore */,
    2 /* Errored */
];
function isDefaultChangeDetectionStrategy(changeDetectionStrategy) {
    return lang_1.isBlank(changeDetectionStrategy) || changeDetectionStrategy === 1 /* Default */;
}
exports.isDefaultChangeDetectionStrategy = isDefaultChangeDetectionStrategy;
//# sourceMappingURL=constants.js.map

/***/ }),
/* 344 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(100));
__export(__webpack_require__(35));
var opaque_token_1 = __webpack_require__(139);
exports.OpaqueToken = opaque_token_1.OpaqueToken;
var forward_ref_1 = __webpack_require__(55);
exports.forwardRef = forward_ref_1.forwardRef;
var provider_1 = __webpack_require__(51);
exports.provide = provider_1.provide;
exports.getInjectableName = provider_1.getInjectableName;
//# sourceMappingURL=di.js.map

/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var lang_1 = __webpack_require__(3);
var collections_1 = __webpack_require__(20);
var lang_2 = __webpack_require__(3);
var lang_3 = __webpack_require__(3);
/**
 * @TODO
 * this module is not used, we can leverage the Key creation for
 * caching @Inject token to string names for performance
 */
/**
 * A unique object used for retrieving items from the {@link Injector}.
 *
 * Keys have:
 * - a system-wide unique `id`.
 * - a `token`.
 *
 * `Key` is used internally by {@link Injector} because its system-wide unique `id` allows the
 * injector to store created objects in a more efficient way.
 *
 * `Key` should not be created directly. {@link Injector} creates keys automatically when resolving
 * providers.
 */
//export class Key {
//  /**
//   * Private
//   */
//  constructor( public token: Object, public id: number ) {
//    if ( isBlank( token ) ) {
//      throw new Error( 'Token must be defined!' );
//    }
//  }
//
//  /**
//   * Returns a stringified token.
//   */
//  get displayName(): string { return stringify( this.token ); }
//
//  /**
//   * Retrieves a `Key` for a token.
//   */
//  static get( token: Object ): Key { return _globalKeyRegistry.get( resolveForwardRef( token ) ); }
//
//  /**
//   * @returns the number of keys registered in the system.
//   */
//  static get numberOfKeys(): number { return _globalKeyRegistry.numberOfKeys; }
//}
/**
 * @internal
 */
var KeyRegistry = (function () {
    function KeyRegistry() {
        this._allKeys = collections_1.ListWrapper.create();
        this._idCounter = 0;
    }
    //get( token: string | OpaqueToken | Type ): string {
    //  // Return it if it is already a string like `'$http'` or `'$state'`
    //  if(isString(token)) {
    //    return token;
    //  }
    //  if(token instanceof OpaqueToken){
    //    return token.desc;
    //  }
    //
    //  const tokenString = stringify( token );
    //  const hasToken = StringMapWrapper.contains( this._allKeys, tokenString );
    //
    //  if ( hasToken ) {
    //    return tokenString;
    //  }
    //
    //  const newKey = `${ tokenString }${ this._uniqueId() }`;
    //  StringMapWrapper.set( this._allKeys, newKey, token );
    //  return newKey;
    //}
    /**
     *
     * @param token
     * @returns {*}
     */
    KeyRegistry.prototype.get = function (token) {
        if (!lang_2.isType(token)) {
            throw new Error("KeyRegistry#get:\n                        ================\n                        you'v tried to create a key for `" + token + "`\n                        creating and getting key tokens is avaialable only for Type");
        }
        var newKey = "" + lang_3.getTypeName(token) + KeyRegistry._suffix + this._uniqueId();
        this._allKeys.push(newKey);
        return newKey;
    };
    Object.defineProperty(KeyRegistry.prototype, "numberOfKeys", {
        get: function () { return collections_1.ListWrapper.size(this._allKeys); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyRegistry.prototype, "allKeys", {
        get: function () { return collections_1.ListWrapper.clone(this._allKeys); },
        enumerable: true,
        configurable: true
    });
    /**
     * just for testing purposes
     * @private
     * @internal
     */
    KeyRegistry.prototype._reset = function () {
        collections_1.ListWrapper.clear(this._allKeys);
        this._idCounter = 0;
    };
    /**
     * Generates a unique ID. If `prefix` is provided the ID is appended to it.
     *
     * @param {string} [prefix] The value to prefix the ID with.
     * @returns {string} Returns the unique ID.
     * @example
     *
     * _uniqueId('contact_');
     * // => 'contact_104'
     *
     * _uniqueId();
     * // => '105'
     */
    KeyRegistry.prototype._uniqueId = function (prefix) {
        var id = ++this._idCounter;
        return "" + lang_1.baseToString(prefix) + id;
    };
    return KeyRegistry;
}());
KeyRegistry._suffix = "#";
exports.KeyRegistry = KeyRegistry;
exports.globalKeyRegistry = new KeyRegistry();
//# sourceMappingURL=key.js.map

/***/ }),
/* 346 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var lang_1 = __webpack_require__(3);
var reflection_1 = __webpack_require__(47);
var provider_1 = __webpack_require__(51);
var provider_util_1 = __webpack_require__(56);
/**
 * process provider literals and return map for angular1Module consumption
 * @param provider
 * @returns {{method: string, name: string, value: any}}
 */
function resolveReflectiveProvider(provider) {
    var token = provider.token;
    if (lang_1.isPresent(provider.useValue)) {
        var _a = provider_1.provide(token, { useValue: provider.useValue }), name_1 = _a[0], value = _a[1];
        var method = 'value';
        return { method: method, name: name_1, value: value };
    }
    if (provider.useFactory) {
        var _b = provider_1.provide(token, { useFactory: provider.useFactory, deps: provider.dependencies }), name_2 = _b[0], value = _b[1];
        var method = 'factory';
        return { method: method, name: name_2, value: value };
    }
    if (provider.useClass) {
        var _c = provider_1.provide(token, { useClass: provider.useClass }), name_3 = _c[0], value = _c[1];
        var method = 'service';
        return { method: method, name: name_3, value: value };
    }
    if (provider.useExisting) {
        var _d = provider_1.provide(provider.useExisting), name_4 = _d[0], value = _d[1];
        var method = 'factory';
        throw new Error('useExisting is unimplemented');
    }
    throw new Error('invalid provider type! please specify one of: [useValue,useFactory,useClass]');
}
exports.resolveReflectiveProvider = resolveReflectiveProvider;
/**
 * returns StringMap of values needed for angular1Module registration and duplicity checks
 * @param injectable
 * @returns {any}
 * @private
 */
function _getAngular1ModuleMetadataByType(injectable) {
    // only the first class annotations is injectable
    var annotation = reflection_1.reflector.annotations(injectable)[0];
    if (lang_1.isBlank(annotation)) {
        // support configPhase ( function or pure class )
        if (lang_1.isType(injectable)) {
            return {
                providerName: '$injector',
                providerMethod: 'invoke',
                moduleMethod: 'config'
            };
        }
        throw new Error("\n        cannot get injectable name token from none decorated class " + lang_1.getFuncName(injectable) + "\n        Only decorated classes by one of [ @Injectable,@Directive,@Component,@Pipe ], can be injected by reference\n      ");
    }
    if (provider_util_1.isPipe(annotation)) {
        return {
            providerName: '$filterProvider',
            providerMethod: 'register',
            moduleMethod: 'filter'
        };
    }
    if (provider_util_1.isDirectiveLike(annotation)) {
        return {
            providerName: '$compileProvider',
            providerMethod: 'directive',
            moduleMethod: 'directive'
        };
    }
    if (provider_util_1.isService(annotation)) {
        return {
            providerName: '$provide',
            providerMethod: 'service',
            moduleMethod: 'service'
        };
    }
}
exports._getAngular1ModuleMetadataByType = _getAngular1ModuleMetadataByType;
/**
 * run through Component tree and register everything that is registered via Metadata
 * - works for nested arrays like angular 2 does ;)
 * @param angular1Module
 * @param providers
 * @returns {ng.IModule}
 * @private
 */
function _normalizeProviders(angular1Module, providers) {
    providers.forEach(function (providerType) {
        // this is for legacy Angular 1 module
        if (lang_1.isString(providerType)) {
            angular1Module.requires.push(providerType);
            return;
        }
        // this works only for value,factory,aliased services
        // you cannot register directive/pipe within provider literal
        if (provider_util_1.isProviderLiteral(providerType)) {
            var provider = provider_util_1.createProvider(providerType);
            var _a = resolveReflectiveProvider(provider), method = _a.method, name_5 = _a.name, value = _a.value;
            if (!_isTypeRegistered(name_5, angular1Module, '$provide', method)) {
                angular1Module[method](name_5, value);
            }
            return;
        }
        // this is for pipes/directives/services
        if (lang_1.isType(providerType)) {
            // const provider = createProvider( {provide:b, useClass:b} );
            // const { method, name, value } = resolveReflectiveProvider( provider );
            var _b = provider_1.provide(providerType), name_6 = _b[0], value = _b[1];
            var _c = _getAngular1ModuleMetadataByType(providerType), providerName = _c.providerName, providerMethod = _c.providerMethod, moduleMethod = _c.moduleMethod;
            // config phase support
            if (lang_1.isType(name_6)) {
                angular1Module.config(name_6);
                return;
            }
            if (!_isTypeRegistered(name_6, angular1Module, providerName, providerMethod)) {
                // @TODO register via this once requires are resolved for 3 types of attr directive from template
                // _registerTypeProvider( angular1Module, providerType, { moduleMethod, name, value } );
                angular1Module[moduleMethod](name_6, value);
            }
            return;
        }
        // un flattened array, unwrap and parse next array level of providers
        if (lang_1.isArray(providerType)) {
            _normalizeProviders(angular1Module, providerType);
        }
        else {
            throw new Error("InvalidProviderError(" + providerType + ")");
        }
    });
    // return res;
    return angular1Module;
}
exports._normalizeProviders = _normalizeProviders;
/**
 * check if `findRegisteredType` is registered within angular1Module, so we don't have duplicates
 * @param findRegisteredType
 * @param angular1Module
 * @param instanceType
 * @param methodName
 * @returns {boolean}
 * @private
 */
function _isTypeRegistered(findRegisteredType, angular1Module, instanceType, methodName) {
    var invokeQueue = angular1Module._invokeQueue;
    var types = invokeQueue
        .filter(function (_a) {
        var type = _a[0], fnName = _a[1];
        return type === instanceType && fnName === methodName;
    })
        .map(function (_a) {
        var type = _a[0], fnName = _a[1], registeredProvider = _a[2];
        return registeredProvider;
    });
    return types.some(function (_a) {
        var typeName = _a[0], typeFn = _a[1];
        return findRegisteredType === typeName;
    });
}
exports._isTypeRegistered = _isTypeRegistered;
/**
 * we need to register 3 types of attribute directives, if we are registering directive,
 * because we need to allow all 3 types of binding on the defined directive [name],(name),name
 * @private
 */
function _registerTypeProvider(angular1Module, provider, _a) {
    var moduleMethod = _a.moduleMethod, name = _a.name, value = _a.value;
    // only the first class annotations is injectable
    var annotation = reflection_1.reflector.annotations(provider)[0];
    if (lang_1.isBlank(annotation)) {
        return;
    }
    // we need to register attr directives for all possible binding types
    if (provider_util_1.isDirective(annotation)) {
        angular1Module[moduleMethod](name, value);
        angular1Module[moduleMethod]("[" + name + "]", value);
        angular1Module[moduleMethod]("(" + name + ")", value);
    }
    else {
        angular1Module[moduleMethod](name, value);
    }
}
exports._registerTypeProvider = _registerTypeProvider;
//# sourceMappingURL=reflective_provider.js.map

/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(352));
__export(__webpack_require__(70));
__export(__webpack_require__(46));
//# sourceMappingURL=directives.js.map

/***/ }),
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var directives_utils_1 = __webpack_require__(101);
var change_detection_util_1 = __webpack_require__(137);
var changes_queue_1 = __webpack_require__(342);
var collections_1 = __webpack_require__(20);
var lang_1 = __webpack_require__(3);
var async_1 = __webpack_require__(142);
var constants_1 = __webpack_require__(140);
var binding_parser_1 = __webpack_require__(349);
/**
 * Create Bindings manually for both Directive/Component
 * @returns {{watchers: Array, observers: Array}}
 * @internal
 * @private
 */
function _createDirectiveBindings(hasIsolateScope, ngScope, ngAttrs, ctrl, metadata, _a) {
    /*  let BOOLEAN_ATTR = {};
     'multiple,selected,checked,disabled,readOnly,required,open'
     .split(',')
     .forEach(function(value) {
     BOOLEAN_ATTR[value.toLocaleLowerCase()] = value;
     });*/
    var $interpolate = _a.$interpolate, $parse = _a.$parse, $rootScope = _a.$rootScope;
    var isBindingImmutable = directives_utils_1.isComponentDirective(metadata) && change_detection_util_1.ChangeDetectionUtil.isOnPushChangeDetectionStrategy(metadata.changeDetection);
    var scope = hasIsolateScope
        ? ngScope.$parent
        : ngScope;
    var _b = metadata.inputs, inputs = _b === void 0 ? [] : _b, _c = metadata.outputs, outputs = _c === void 0 ? [] : _c;
    var parsedBindings = binding_parser_1.setupFields(ngAttrs, inputs, outputs);
    var _internalWatchers = [];
    var _internalObservers = [];
    // onChanges tmp vars
    var initialChanges = {};
    var changes;
    // this will create flush queue internally only once
    // we need to call this here because we need $rootScope service
    changes_queue_1.changesQueueService.buildFlushOnChanges($rootScope);
    // setup @Inputs '<' or '='
    collections_1.StringMapWrapper.forEach(parsedBindings.inputs, function (config, propName) {
        var exp = config.exp, attrName = config.attrName, mode = config.mode;
        // support for TWO_WAY only for components
        var hasTwoWayBinding = hasIsolateScope && mode === constants_1.BINDING_MODE.twoWay;
        var removeWatch = hasTwoWayBinding
            ? _createTwoWayBinding(propName, attrName, exp)
            : _createOneWayBinding(propName, attrName, exp, isBindingImmutable);
        _internalWatchers.push(removeWatch);
    });
    // setup @Input('@')
    collections_1.StringMapWrapper.forEach(parsedBindings.attrs, function (config, propName) {
        var attrName = config.attrName, exp = config.exp, mode = config.mode;
        var removeObserver = _createAttrBinding(propName, attrName, exp);
        _internalObservers.push(removeObserver);
    });
    // setup @Outputs
    collections_1.StringMapWrapper.forEach(parsedBindings.outputs, function (config, propName) {
        var exp = config.exp, attrName = config.attrName, mode = config.mode;
        _createOutputBinding(propName, attrName, exp);
    });
    function _createOneWayBinding(propName, attrName, exp, isImmutable) {
        if (isImmutable === void 0) { isImmutable = false; }
        if (!exp)
            return;
        var parentGet = $parse(exp);
        var initialValue = ctrl[propName] = parentGet(scope);
        initialChanges[propName] = change_detection_util_1.ChangeDetectionUtil.simpleChange(change_detection_util_1.ChangeDetectionUtil.uninitialized, ctrl[propName]);
        return scope.$watch(parentGet, function parentValueWatchAction(newValue, oldValue) {
            // https://github.com/angular/angular.js/commit/d9448dcb9f901ceb04deda1d5f3d5aac8442a718
            // https://github.com/angular/angular.js/commit/304796471292f9805b9cf77e51aacc9cfbb09921
            if (oldValue === newValue) {
                if (oldValue === initialValue)
                    return;
                oldValue = initialValue;
            }
            recordChanges(propName, newValue, oldValue);
            ctrl[propName] = isImmutable ? lang_1.global.angular.copy(newValue) : newValue;
        }, parentGet.literal);
    }
    function _createTwoWayBinding(propName, attrName, exp) {
        if (!exp)
            return;
        var lastValue;
        var parentGet = $parse(exp);
        var parentSet = parentGet.assign || function () {
            // reset the change, or we will throw this exception on every $digest
            lastValue = ctrl[propName] = parentGet(scope);
            throw new Error("nonassign,\n          Expression '" + ngAttrs[attrName] + "' in attribute '" + attrName + "' used with directive '{2}' is non-assignable!");
        };
        var compare = parentGet.literal ? lang_1.global.angular.equals : simpleCompare;
        var parentValueWatch = function parentValueWatch(parentValue) {
            if (!compare(parentValue, ctrl[propName])) {
                // we are out of sync and need to copy
                if (!compare(parentValue, lastValue)) {
                    // parent changed and it has precedence
                    ctrl[propName] = parentValue;
                }
                else {
                    // if the parent can be assigned then do so
                    parentSet(scope, parentValue = ctrl[propName]);
                }
            }
            return lastValue = parentValue;
        };
        parentValueWatch.$stateful = true;
        lastValue = ctrl[propName] = parentGet(scope);
        // NOTE: we don't support collection watch, it's not good for performance
        // if (definition.collection) {
        //   removeWatch = scope.$watchCollection(attributes[attrName], parentValueWatch);
        // } else {
        //   removeWatch = scope.$watch($parse(attributes[attrName], parentValueWatch), null, parentGet.literal);
        // }
        // removeWatchCollection.push(removeWatch);
        return scope.$watch(
        // $parse( ngAttrs[ attrName ], parentValueWatch ),
        $parse(exp, parentValueWatch), null, parentGet.literal);
        function simpleCompare(a, b) { return a === b || (a !== a && b !== b); }
    }
    function _createOutputBinding(propName, attrName, exp) {
        // Don't assign Object.prototype method to scope
        var parentGet = exp
            ? $parse(exp)
            : lang_1.noop;
        // Don't assign noop to ctrl if expression is not valid
        if (parentGet === lang_1.noop)
            return;
        // here we assign property to EventEmitter instance directly
        var emitter = new async_1.EventEmitter();
        emitter.wrapNgExpBindingToEmitter(function _exprBindingCb(locals) {
            return parentGet(scope, locals);
        });
        ctrl[propName] = emitter;
    }
    function _createAttrBinding(propName, attrName, exp) {
        var lastValue = exp;
        // register watchers for further changes
        // The observer function will be invoked once during the next $digest following compilation.
        // The observer is then invoked whenever the interpolated value changes.
        var _disposeObserver = ngAttrs.$observe(attrName, function (value) {
            // https://github.com/angular/angular.js/commit/499e1b2adf27f32d671123f8dceadb3df2ad84a9
            if (lang_1.isString(value) || lang_1.isBoolean(value)) {
                var oldValue = ctrl[propName];
                recordChanges(propName, value, oldValue);
                ctrl[propName] = value;
            }
        });
        ngAttrs.$$observers[attrName].$$scope = scope;
        if (lang_1.isString(lastValue)) {
            // If the attribute has been provided then we trigger an interpolation to ensure
            // the value is there for use in the link fn
            ctrl[propName] = $interpolate(lastValue)(scope);
        }
        else if (lang_1.isBoolean(lastValue)) {
            // If the attributes is one of the BOOLEAN_ATTR then Angular will have converted
            // the value to boolean rather than a string, so we special case this situation
            ctrl[propName] = lastValue;
        }
        initialChanges[propName] = change_detection_util_1.ChangeDetectionUtil.simpleChange(change_detection_util_1.ChangeDetectionUtil.uninitialized, ctrl[propName]);
        return _disposeObserver;
    }
    function recordChanges(key, currentValue, previousValue) {
        if (lang_1.isFunction(ctrl.ngOnChanges) && currentValue !== previousValue) {
            // If we have not already scheduled the top level onChangesQueue handler then do so now
            if (!changes_queue_1.changesQueueService.onChangesQueue) {
                scope.$$postDigest(changes_queue_1.changesQueueService.flushOnChangesQueue);
                changes_queue_1.changesQueueService.onChangesQueue = [];
            }
            // If we have not already queued a trigger of onChanges for this controller then do so now
            if (!changes) {
                changes = {};
                changes_queue_1.changesQueueService.onChangesQueue.push(triggerOnChangesHook);
            }
            // If the has been a change on this property already then we need to reuse the previous value
            if (changes[key]) {
                previousValue = changes[key].previousValue;
            }
            // Store this change
            changes[key] = change_detection_util_1.ChangeDetectionUtil.simpleChange(previousValue, currentValue);
        }
    }
    function triggerOnChangesHook() {
        ctrl.ngOnChanges(changes);
        // Now clear the changes so that we schedule onChanges when more changes arrive
        changes = undefined;
    }
    function removeWatches() {
        var removeWatchCollection = _internalWatchers.concat(_internalObservers);
        for (var i = 0, ii = removeWatchCollection.length; i < ii; ++i) {
            if (removeWatchCollection[i] && lang_1.isFunction(removeWatchCollection[i])) {
                removeWatchCollection[i]();
            }
        }
    }
    return {
        initialChanges: initialChanges,
        removeWatches: removeWatches,
        _watchers: { watchers: _internalWatchers, observers: _internalObservers }
    };
}
exports._createDirectiveBindings = _createDirectiveBindings;
//# sourceMappingURL=binding_factory.js.map

/***/ }),
/* 349 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var collections_1 = __webpack_require__(20);
var constants_1 = __webpack_require__(140);
function setupFields(ngAttrs, rawInputs, rawOutputs) {
    if (rawInputs === void 0) { rawInputs = []; }
    if (rawOutputs === void 0) { rawOutputs = []; }
    var _a = _setupInputs(_parseFields(rawInputs), ngAttrs), inputs = _a.inputs, attrs = _a.attrs;
    var outputs = _setupOutputs(_parseFields(rawOutputs), ngAttrs).outputs;
    return {
        inputs: inputs,
        attrs: attrs,
        outputs: outputs
    };
}
exports.setupFields = setupFields;
function _parseFields(names) {
    var attrProps = [];
    if (!names) {
        return attrProps;
    }
    for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
        var name_1 = names_1[_i];
        var parts = name_1.split(':');
        var prop = parts[0].trim();
        var attr = (parts[1] || parts[0]).trim();
        var isTypeByDeclaration = _isTypeByDeclaration(attr);
        var attrName = _getNormalizedAttrName(attr, prop, isTypeByDeclaration);
        var type = _getBindingType(attr, isTypeByDeclaration);
        attrProps.push({
            prop: prop,
            attr: attrName,
            bracketAttr: "[" + attrName + "]",
            parenAttr: "(" + attrName + ")",
            bracketParenAttr: "[(" + attrName + ")]",
            type: type,
            typeByTemplate: !isTypeByDeclaration
        });
    }
    return attrProps;
}
exports._parseFields = _parseFields;
function _getBindingType(originalAttr, isTypeByDeclaration) {
    return isTypeByDeclaration
        ? originalAttr.charAt(0)
        : '';
}
function _isTypeByDeclaration(attr) {
    return collections_1.ListWrapper.contains([
        constants_1.BINDING_MODE.attr, constants_1.BINDING_MODE.oneWay, constants_1.BINDING_MODE.twoWay
    ], attr.charAt(0));
}
function _getNormalizedAttrName(originalAttr, propName, isTypeByDeclaration) {
    if (!isTypeByDeclaration) {
        return originalAttr;
    }
    return originalAttr.length > 1
        ? originalAttr.substring(1)
        : propName;
}
function _setupInputs(inputs, ngAttrs) {
    var parsedAttrs = {};
    var parsedInputs = {};
    for (var _i = 0, inputs_1 = inputs; _i < inputs_1.length; _i++) {
        var input = inputs_1[_i];
        if (input.typeByTemplate) {
            if (ngAttrs.hasOwnProperty(input.attr)) {
                // @
                parsedAttrs[input.prop] = {
                    mode: constants_1.BINDING_MODE.attr,
                    exp: ngAttrs[input.attr],
                    attrName: input.attr
                };
            }
            else if (ngAttrs.hasOwnProperty(input.bracketAttr)) {
                // <
                parsedInputs[input.prop] = {
                    mode: constants_1.BINDING_MODE.oneWay,
                    exp: ngAttrs[input.bracketAttr],
                    attrName: input.bracketAttr
                };
            }
            else if (ngAttrs.hasOwnProperty(input.bracketParenAttr)) {
                // =
                parsedInputs[input.prop] = {
                    mode: constants_1.BINDING_MODE.twoWay,
                    exp: ngAttrs[input.bracketParenAttr],
                    attrName: input.bracketParenAttr
                };
            }
        }
        else {
            if (ngAttrs.hasOwnProperty(input.attr)) {
                var attrMetadata = { mode: input.type, exp: ngAttrs[input.attr], attrName: input.attr };
                if (input.type === constants_1.BINDING_MODE.attr) {
                    parsedAttrs[input.prop] = attrMetadata;
                }
                else {
                    parsedInputs[input.prop] = attrMetadata;
                }
            }
        }
    }
    return {
        inputs: parsedInputs,
        attrs: parsedAttrs
    };
}
exports._setupInputs = _setupInputs;
function _setupOutputs(outputs, ngAttrs) {
    var parsedOutputs = {};
    for (var i = 0; i < outputs.length; i = i + 1) {
        var output = outputs[i];
        var baseParsedAttrField = { mode: constants_1.BINDING_MODE.output, exp: undefined, attrName: '' };
        // & via event
        if (ngAttrs.hasOwnProperty(output.attr)) {
            parsedOutputs[output.prop] = collections_1.StringMapWrapper.assign({}, baseParsedAttrField, { exp: ngAttrs[output.attr], attrName: output.attr });
        }
        else if (ngAttrs.hasOwnProperty(output.parenAttr)) {
            parsedOutputs[output.prop] = collections_1.StringMapWrapper.assign({}, baseParsedAttrField, { exp: ngAttrs[output.parenAttr], attrName: output.parenAttr });
        }
    }
    return { outputs: parsedOutputs };
}
exports._setupOutputs = _setupOutputs;
/**
 * parses input/output/attrs string arrays from metadata fro further processing
 * @param inputs
 * @param outputs
 * @param attrs
 * @returns {{inputs: ParsedBindingsMap, outputs: ParsedBindingsMap, attrs: ParsedBindingsMap}}
 * @private
 * @deprecated
 */
function _parseBindings(_a) {
    var _b = _a.inputs, inputs = _b === void 0 ? [] : _b, _c = _a.outputs, outputs = _c === void 0 ? [] : _c, _d = _a.attrs, attrs = _d === void 0 ? [] : _d;
    var SPLIT_BY = ':';
    return {
        inputs: _parseByMode(inputs, constants_1.BINDING_MODE.twoWay, [constants_1.BINDING_MODE.attr]),
        outputs: _parseByMode(outputs, constants_1.BINDING_MODE.output),
        attrs: collections_1.StringMapWrapper.merge(
        // this will be removed in 2.0
        _parseByMode(attrs, constants_1.BINDING_MODE.attr), 
        // attrs build from @Input('@')
        _parseByMode(inputs, constants_1.BINDING_MODE.twoWay, [constants_1.BINDING_MODE.oneWay, constants_1.BINDING_MODE.twoWay]))
    };
    function _parseByMode(bindingArr, defaultMode, excludeMode) {
        if (excludeMode === void 0) { excludeMode = []; }
        return bindingArr.reduce(function (acc, binding) {
            var _a = binding.split(SPLIT_BY).map(function (part) { return part.trim(); }), name = _a[0], _b = _a[1], modeConfigAndAlias = _b === void 0 ? '' : _b;
            var parsedConfigAndAlias = modeConfigAndAlias.match(constants_1.INPUT_MODE_REGEX);
            var _c = parsedConfigAndAlias || [], _d = _c[1], mode = _d === void 0 ? defaultMode : _d, _e = _c[2], optional = _e === void 0 ? '' : _e, _f = _c[3], alias = _f === void 0 ? '' : _f;
            // exit early if processed mode is not allowed
            // for example if we are parsing Input('@') which produces attr binding instead of one or two way
            if (excludeMode.indexOf(mode) !== -1) {
                return acc;
            }
            // @TODO remove this in next version where template parsing will be implemented
            if ((defaultMode !== constants_1.BINDING_MODE.output) && !(parsedConfigAndAlias && parsedConfigAndAlias[1])) {
                console.warn("\n        You need to explicitly provide type of binding(=,<,@) within your <code>'@Input() " + name + ";</code>.\n        Next version 2.0 will create binding by parsing template if you provide '@Input()' without binding type.\n        ");
            }
            acc[name] = {
                mode: mode,
                alias: alias,
                optional: optional === constants_1.BINDING_MODE.optional || true
            };
            return acc;
        }, {});
    }
}
exports._parseBindings = _parseBindings;
//# sourceMappingURL=binding_parser.js.map

/***/ }),
/* 350 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.REQUIRE_PREFIX_REGEXP = /^(?:(\^\^?)?(\?)?(\^\^?)?)?/;
//# sourceMappingURL=constants.js.map

/***/ }),
/* 351 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var collections_1 = __webpack_require__(20);
var change_detector_ref_1 = __webpack_require__(138);
var binding_factory_1 = __webpack_require__(348);
var directives_utils_1 = __webpack_require__(101);
var lang_1 = __webpack_require__(3);
var primitives_1 = __webpack_require__(144);
var constants_1 = __webpack_require__(350);
function directiveControllerFactory(caller, controller, $injector, locals, requireMap, _ddo, metadata) {
    var $scope = locals.$scope, $element = locals.$element, $attrs = locals.$attrs;
    var _services = {
        $parse: $injector.get('$parse'),
        $interpolate: $injector.get('$interpolate'),
        $rootScope: $injector.get('$rootScope')
    };
    var _localServices = {
        changeDetectorRef: change_detector_ref_1.ChangeDetectorRef.create($scope)
    };
    // Create an instance of the controller without calling its constructor
    var instance = Object.create(controller.prototype);
    // NOTE: this is not needed because we are creating bindings manually because of
    // angular behaviour https://github.com/ngParty/ng-metadata/issues/53
    // ===================================================================
    // Remember, angular has already set those bindings on the `caller`
    // argument. Now we need to extend them onto our `instance`. It is important
    // to extend after defining the properties. That way we fire the setters.
    //
    // StringMapWrapper.assign( instance, caller );
    // setup @Input/@Output/@Attrs for @Component/@Directive
    var _a = binding_factory_1._createDirectiveBindings(!directives_utils_1.isAttrDirective(metadata), $scope, $attrs, instance, metadata, _services), removeWatches = _a.removeWatches, initialChanges = _a.initialChanges;
    cleanUpWatchers(removeWatches);
    // change injectables to proper inject directives
    // we wanna do this only if we inject some locals/directives
    if (collections_1.StringMapWrapper.size(requireMap)) {
        controller.$inject = createNewInjectablesToMatchLocalDi(controller.$inject, requireMap);
    }
    var $requires = getEmptyRequiredControllers(requireMap);
    // $injector.invoke will delete any @Input/@Attr/@Output which were resolved within _createDirectiveBindings
    // and which have set default values in constructor. We need to store them and reassign after this invoke
    var initialInstanceBindingValues = getInitialBindings(instance);
    // Finally, invoke the constructor using the injection array and the captured locals
    $injector.invoke(controller, instance, collections_1.StringMapWrapper.assign(locals, _localServices, $requires));
    // reassign back the initial binding values, just in case if we used default values
    collections_1.StringMapWrapper.assign(instance, initialInstanceBindingValues);
    /*if ( isFunction( instance.ngOnDestroy ) ) {
     $scope.$on( '$destroy', instance.ngOnDestroy.bind( instance ) );
     }*/
    /*if (typeof instance.ngAfterViewInit === 'function') {
     ddo.ngAfterViewInitBound = instance.ngAfterViewInit.bind(instance);
     }*/
    // https://github.com/angular/angular.js/commit/0ad2b70862d49ecc4355a16d767c0ca9358ecc3e
    // onChanges is called before onInit
    if (lang_1.isFunction(instance.ngOnChanges)) {
        instance.ngOnChanges(initialChanges);
    }
    _ddo._ngOnInitBound = function _ngOnInitBound() {
        // invoke again only if there are any directive requires
        // #perf
        if (collections_1.StringMapWrapper.size(requireMap)) {
            var $requires_1 = getRequiredControllers(requireMap, $element, controller);
            // $injector.invoke will delete any @Input/@Attr/@Output which were resolved within _createDirectiveBindings
            // and which have set default values in constructor. We need to store them and reassign after this invoke
            var initialInstanceBindingValues_1 = getInitialBindings(instance);
            $injector.invoke(controller, instance, collections_1.StringMapWrapper.assign(locals, _localServices, $requires_1));
            // reassign back the initial binding values, just in case if we used default values
            collections_1.StringMapWrapper.assign(instance, initialInstanceBindingValues_1);
        }
        if (lang_1.isFunction(instance.ngOnInit)) {
            instance.ngOnInit();
        }
        // DoCheck is called after OnChanges and OnInit
        if (lang_1.isFunction(instance.ngDoCheck)) {
            var removeDoCheckWatcher = $postDigestWatch($scope, function () { return instance.ngDoCheck(); });
            cleanUpWatchers(removeDoCheckWatcher);
        }
    };
    // Return the controller instance
    return instance;
    function cleanUpWatchers(cb) {
        $scope.$on('$destroy', function () { return cb; });
    }
}
exports.directiveControllerFactory = directiveControllerFactory;
/**
 * Note: $$postDigest will not trigger another digest cycle.
 * So any modification to $scope inside $$postDigest will not get reflected in the DOM
 */
function $postDigestWatch(scope, cb) {
    var hasRegistered = false;
    var removeDoCheckWatcher = scope.$watch(function () {
        if (hasRegistered) {
            return;
        }
        hasRegistered = true;
        scope.$$postDigest(function () {
            hasRegistered = false;
            cb();
        });
    });
    return removeDoCheckWatcher;
}
function getInitialBindings(instance) {
    var initialBindingValues = {};
    collections_1.StringMapWrapper.forEach(instance, function (value, propName) {
        if (instance[propName]) {
            initialBindingValues[propName] = value;
        }
    });
    return initialBindingValues;
}
/**
 * Angular 1 copy of how to require other directives
 * @param require
 * @param $element
 * @param directive
 * @returns {any|null}
 */
function getRequiredControllers(require, $element, directive) {
    var value;
    if (lang_1.isString(require)) {
        var match = require.match(constants_1.REQUIRE_PREFIX_REGEXP);
        var name = require.substring(match[0].length);
        var inheritType = match[1] || match[3];
        var optional = match[2] === '?';
        //If only parents then start at the parent element
        if (inheritType === '^^') {
            $element = $element.parent();
        }
        if (!value) {
            var dataName = "$" + name + "Controller";
            value = inheritType ? $element.inheritedData(dataName) : $element.data(dataName);
        }
        if (!value && !optional) {
            throw new Error("Directive/Controller '" + name + "', required by directive '" + lang_1.getFuncName(directive) + "', can't be found!");
        }
    }
    else if (lang_1.isArray(require)) {
        value = [];
        for (var i = 0, ii = require.length; i < ii; i++) {
            value[i] = getRequiredControllers(require[i], $element, directive);
        }
    }
    else if (lang_1.isJsObject(require)) {
        value = {};
        collections_1.StringMapWrapper.forEach(require, function (controller, property) {
            value[property] = getRequiredControllers(controller, $element, directive);
        });
    }
    return value || null;
}
exports.getRequiredControllers = getRequiredControllers;
function getEmptyRequiredControllers(requireMap) {
    return collections_1.StringMapWrapper.keys(requireMap).reduce(function (acc, keyName) {
        acc[keyName] = undefined;
        return acc;
    }, {});
}
exports.getEmptyRequiredControllers = getEmptyRequiredControllers;
function createNewInjectablesToMatchLocalDi(originalInjectables, requireMap) {
    var requireKeys = collections_1.StringMapWrapper.keys(requireMap);
    return originalInjectables.slice()
        .map(function (injectable) {
        var replaceInjName = requireKeys
            .filter(function (keyName) { return primitives_1.StringWrapper.startsWith(keyName, injectable); })[0];
        // if found remove that key so we won't assign the same
        if (replaceInjName) {
            var idx = requireKeys.indexOf(replaceInjName);
            requireKeys.splice(idx, 1);
        }
        return replaceInjName || injectable;
    });
}
exports.createNewInjectablesToMatchLocalDi = createNewInjectablesToMatchLocalDi;
/**
 * @deprecated
 * @TODO remove?
 */
function injectionArgs(fn, locals, serviceName, injects) {
    var args = [], 
    // $inject = createInjector.$$annotate(fn, strictDi, serviceName);
    $inject = injects;
    for (var i = 0, length = $inject.length; i < length; i++) {
        var key = $inject[i];
        if (typeof key !== 'string') {
            throw new Error("itkn, Incorrect injection token! Expected service name as string, got " + key);
        }
        /*    args.push( locals && locals.hasOwnProperty( key )
         ? locals[ key ]
         : getService( key, serviceName ) );*/
        args.push(locals[key]);
    }
    return args;
}
//# sourceMappingURL=controller_factory.js.map

/***/ }),
/* 352 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var decorators_1 = __webpack_require__(71);
var metadata_di_1 = __webpack_require__(70);
var metadata_directives_1 = __webpack_require__(46);
exports.Component = decorators_1.makeDecorator(metadata_directives_1.ComponentMetadata);
exports.Directive = decorators_1.makeDecorator(metadata_directives_1.DirectiveMetadata);
exports.ContentChildren = decorators_1.makePropDecorator(metadata_di_1.ContentChildrenMetadata);
exports.ContentChild = decorators_1.makePropDecorator(metadata_di_1.ContentChildMetadata);
exports.ViewChildren = decorators_1.makePropDecorator(metadata_di_1.ViewChildrenMetadata);
exports.ViewChild = decorators_1.makePropDecorator(metadata_di_1.ViewChildMetadata);
exports.Input = decorators_1.makePropDecorator(metadata_directives_1.InputMetadata);
/**
 *
 * @type {any}
 * @deprecated use @Input('@') instead. Will be removed in 2.0
 */
exports.Attr = decorators_1.makePropDecorator(metadata_directives_1.AttrMetadata);
exports.Output = decorators_1.makePropDecorator(metadata_directives_1.OutputMetadata);
exports.HostBinding = decorators_1.makePropDecorator(metadata_directives_1.HostBindingMetadata);
exports.HostListener = decorators_1.makePropDecorator(metadata_directives_1.HostListenerMetadata);
/**
 * Declares an ng module.
 * @experimental
 * @Annotation
 */
exports.NgModule = decorators_1.makeDecorator(metadata_directives_1.NgModuleMetadata);
//# sourceMappingURL=decorators.js.map

/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var directive_resolver_1 = __webpack_require__(358);
var lang_1 = __webpack_require__(3);
var collections_1 = __webpack_require__(20);
var directive_lifecycles_reflector_1 = __webpack_require__(357);
var directive_lifecycle_interfaces_1 = __webpack_require__(102);
var metadata_directives_1 = __webpack_require__(46);
var controller_factory_1 = __webpack_require__(351);
var children_resolver_1 = __webpack_require__(356);
var host_parser_1 = __webpack_require__(354);
var host_resolver_1 = __webpack_require__(355);
var directives_utils_1 = __webpack_require__(101);
/**
 * @internal
 */
var DirectiveProvider = (function () {
    function DirectiveProvider(directiveResolver) {
        this.directiveResolver = directiveResolver;
    }
    /**
     * creates directiveName and DirectiveFactory for angularJS container
     *
     * it produces directive for classes decorated with @Directive with following DDO:
     * ```
     * {
     * require: ['directiveName'],
     * controller: ClassDirective,
     * link: postLinkFn
     * }
     * ```
     *
     * it produces component for classes decorated with @Component with following DDO:
     * ```
     * {
     * require: ['directiveName'],
     * controller: ClassDirective,
     * controllerAs: '$ctrl',
     * template: 'component template string',
     * scope:{},
     * bindToController:{},
     * transclude: false,
     * link: postLinkFn
     * }
     * ```
     * @param type
     * @returns {string|function(): ng.IDirective[]}
     */
    DirectiveProvider.prototype.createFromType = function (type) {
        var metadata = this.directiveResolver.resolve(type);
        var directiveName = lang_1.resolveDirectiveNameFromSelector(metadata.selector);
        var requireMap = this.directiveResolver.getRequiredDirectivesMap(type);
        var lfHooks = directive_lifecycles_reflector_1.resolveImplementedLifeCycleHooks(type);
        var _ddo = {
            restrict: 'A',
            controller: _controller,
            link: {
                pre: function () { _ddo._ngOnInitBound(); },
                post: this._createLink(type, metadata, lfHooks)
            },
            // @TODO this will be removed after @Query handling is moved to directiveControllerFactory
            require: this._createRequires(requireMap, directiveName),
            _ngOnInitBound: lang_1.noop
        };
        // Component controllers must be created from a factory. Checkout out
        // util/directive-controller.js for more information about what's going on here
        _controller.$inject = ['$scope', '$element', '$attrs', '$transclude', '$injector'];
        function _controller($scope, $element, $attrs, $transclude, $injector) {
            var locals = { $scope: $scope, $element: $element, $attrs: $attrs, $transclude: $transclude };
            return controller_factory_1.directiveControllerFactory(this, type, $injector, locals, requireMap, _ddo, metadata);
        }
        // specific DDO augmentation for @Component
        if (metadata instanceof metadata_directives_1.ComponentMetadata) {
            var assetsPath = this.directiveResolver.parseAssetUrl(metadata);
            var componentSpecificDDO = {
                restrict: 'E',
                scope: {},
                bindToController: {},
                controllerAs: DirectiveProvider._controllerAs,
                transclude: DirectiveProvider._transclude
            };
            if (metadata.template && metadata.templateUrl) {
                throw new Error('cannot have both template and templateUrl');
            }
            if (metadata.template) {
                componentSpecificDDO.template = metadata.template;
            }
            if (metadata.templateUrl) {
                componentSpecificDDO.templateUrl = "" + assetsPath + metadata.templateUrl;
            }
            collections_1.StringMapWrapper.assign(_ddo, componentSpecificDDO);
        }
        // allow compile defined as static method on Type
        if (lang_1.isFunction(type.compile)) {
            _ddo.compile = function compile(tElement, tAttrs) {
                var linkFn = type.compile(tElement, tAttrs);
                // if user custom compile fn returns link use that one instead use generated
                return lang_1.isJsObject(linkFn)
                    ? linkFn
                    : this.link;
            };
        }
        // allow link defined as static method on Type override the created one
        // you should not use this very often
        // Note: if you use this any @Host property decorators or lifeCycle hooks wont work
        if (lang_1.isFunction(type.link)) {
            _ddo.link = type.link;
        }
        // legacy property overrides all generated DDO stuff
        var ddo = this._createDDO(_ddo, metadata.legacy);
        function directiveFactory() { return ddo; }
        // ==========================
        // ngComponentRouter Support:
        // ==========================
        // @TODO(pete) remove the following `forEach` before we release 1.6.0
        // The component-router@0.2.0 looks for the annotations on the controller constructor
        // Nothing in Angular looks for annotations on the factory function but we can't remove
        // it from 1.5.x yet.
        // Copy any annotation properties (starting with $) over to the factory and controller constructor functions
        // These could be used by libraries such as the new component router
        collections_1.StringMapWrapper.forEach(ddo, function (val, key) {
            if (key.charAt(0) === '$') {
                directiveFactory[key] = val;
                // Don't try to copy over annotations to named controller
                if (lang_1.isFunction(ddo.controller)) {
                    ddo.controller[key] = val;
                }
            }
        });
        // support componentRouter $canActivate lc hook as static instead of defined within legacy object
        // componentRouter reads all lc hooks from directiveFactory ¯\_(ツ)_/¯
        // @TODO update this when new component router will be available for Angular 1 ( 1.6 release probably )
        if (lang_1.isFunction(type.$canActivate)) {
            directiveFactory.$canActivate = type.$canActivate;
        }
        return [directiveName, directiveFactory];
    };
    DirectiveProvider.prototype._createDDO = function (ddo, legacyDDO) {
        return lang_1.assign({}, DirectiveProvider._ddoShell, ddo, legacyDDO);
    };
    /**
     *
     * @param requireMap
     * @param directiveName
     * @returns {Array}
     * @private
     * @internal
     */
    DirectiveProvider.prototype._createRequires = function (requireMap, directiveName) {
        return [directiveName].concat(collections_1.StringMapWrapper.values(requireMap));
    };
    /**
     * Directive lifeCycles:
     * - ngOnInit from preLink (all children compiled and DOM ready)
     * - ngAfterContentInit from postLink ( DOM in children ready )
     * - ngOnDestroy from postLink
     *
     * Component lifeCycles:
     * - ngOnInit from preLink (controller require ready)
     * - ngAfterViewInit from postLink ( all children in view+content compiled and DOM ready )
     * - ngAfterContentInit from postLink ( same as ngAfterViewInit )
     * - ngOnDestroy from postLink
     * @param type
     * @param metadata
     * @param lfHooks
     * @private
     * @internal
     */
    DirectiveProvider.prototype._createLink = function (type, metadata, lfHooks) {
        if ((lfHooks.ngAfterContentChecked || lfHooks.ngAfterViewChecked) && collections_1.StringMapWrapper.size(metadata.queries) === 0) {
            throw new Error("\n              Hooks Impl for " + lang_1.stringify(type) + ":\n              ===================================\n              You've implement AfterContentChecked/AfterViewChecked lifecycle, but @ViewChild(ren)/@ContentChild(ren) decorators are not used.\n              we cannot invoke After(Content|View)Checked without provided @Query decorators\n              ");
        }
        if (metadata instanceof metadata_directives_1.ComponentMetadata) {
            if ((lfHooks.ngAfterContentInit || lfHooks.ngAfterContentChecked) && !collections_1.StringMapWrapper.getValueFromPath(metadata, 'legacy.transclude')) {
                throw new Error("\n              Hooks Impl for " + lang_1.stringify(type) + ":\n              ===================================\n              You cannot implement AfterContentInit lifecycle, without allowed transclusion.\n              turn transclusion on within decorator like this: @Component({legacy:{transclude:true}})\n              ");
            }
        }
        // we need to implement this if query are present on class, because during postLink _ngOnChildrenChanged is not yet
        // implemented on controller instance
        if (collections_1.StringMapWrapper.size(metadata.queries)) {
            type.prototype._ngOnChildrenChanged = lang_1.noop;
        }
        var hostProcessed = host_parser_1._parseHost(metadata.host);
        return postLink;
        function postLink(scope, element, attrs, controller, transclude) {
            var _watchers = [];
            var ctrl = controller[0], requiredCtrls = controller.slice(1);
            host_resolver_1._setHostStaticAttributes(element, hostProcessed.hostStatic);
            // setup @HostBindings
            _watchers.push.apply(_watchers, host_resolver_1._setHostBindings(scope, element, ctrl, hostProcessed.hostBindings));
            // setup @HostListeners
            host_resolver_1._setHostListeners(scope, element, ctrl, hostProcessed.hostListeners);
            // @ContentChild/@ContentChildren/@ViewChild/@ViewChildren related logic
            var parentCheckedNotifiers = children_resolver_1._getParentCheckNotifiers(ctrl, requiredCtrls);
            _watchers.push.apply(_watchers, parentCheckedNotifiers);
            children_resolver_1._setupQuery(scope, element, ctrl, metadata.queries);
            // AfterContentInit/AfterViewInit Hooks
            // if there are query defined schedule $evalAsync semaphore
            if (collections_1.StringMapWrapper.size(metadata.queries)) {
                ctrl._ngOnChildrenChanged(directive_lifecycle_interfaces_1.ChildrenChangeHook.FromView, [
                    parentCheckedNotifiers.forEach(function (cb) { return cb(); }),
                    ctrl.ngAfterViewInit && ctrl.ngAfterViewInit.bind(ctrl),
                    ctrl.ngAfterViewChecked && ctrl.ngAfterViewChecked.bind(ctrl),
                ]);
                ctrl._ngOnChildrenChanged(directive_lifecycle_interfaces_1.ChildrenChangeHook.FromContent, [
                    parentCheckedNotifiers.forEach(function (cb) { return cb(); }),
                    ctrl.ngAfterContentInit && ctrl.ngAfterContentInit.bind(ctrl),
                    ctrl.ngAfterContentChecked && ctrl.ngAfterContentChecked.bind(ctrl),
                ]);
            }
            else {
                // no @ContentChild/@ViewChild(ref) decorators exist, call just controller init method
                parentCheckedNotifiers.forEach(function (cb) { return cb(); });
                ctrl.ngAfterViewInit && ctrl.ngAfterViewInit();
                ctrl.ngAfterContentInit && ctrl.ngAfterContentInit();
            }
            directives_utils_1._setupDestroyHandler(scope, element, ctrl, lfHooks.ngOnDestroy, _watchers);
        }
    };
    return DirectiveProvider;
}());
DirectiveProvider._ddoShell = {
    require: [],
    controller: lang_1.noop,
    link: { pre: lang_1.noop, post: lang_1.noop }
};
DirectiveProvider._controllerAs = "$ctrl";
DirectiveProvider._transclude = false;
exports.DirectiveProvider = DirectiveProvider;
exports.directiveProvider = new DirectiveProvider(new directive_resolver_1.DirectiveResolver());
//# sourceMappingURL=directive_provider.js.map

/***/ }),
/* 354 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var lang_1 = __webpack_require__(3);
var collections_1 = __webpack_require__(20);
var HOST_BINDING_KEY_REGEX = /^\[.*\]$/;
var HOST_LISTENER_KEY_REGEX = /^\(.*\)$/;
var HAS_CLASS_REGEX = /^class./;
var HAS_ATTR_REGEX = /^attr./;
function _parseHost(host) {
    if (!lang_1.isPresent(host)) {
        return;
    }
    var hostStatic = {};
    var hostBindingsRaw = [];
    var hostListeners = {};
    collections_1.StringMapWrapper.forEach(host, function (hostValue, hostKey) {
        var hostMap = (_a = {}, _a[stripBindingOrListenerBrackets(hostKey)] = hostValue, _a);
        if (isStaticHost(hostKey)) {
            lang_1.assign(hostStatic, hostMap);
            return;
        }
        if (isHostBinding(hostKey)) {
            hostBindingsRaw.push(hostMap);
            return;
        }
        if (isHostListener(hostKey)) {
            lang_1.assign(hostListeners, processHostListenerCallback(hostMap));
        }
        var _a;
    });
    var hostBindings = hostBindingsRaw
        .reduce(function (acc, hostBindingObj) {
        var hostObjKey = Object.keys(hostBindingObj)[0];
        var hostObjValue = hostBindingObj[hostObjKey];
        if (HAS_CLASS_REGEX.test(hostObjKey)) {
            acc.classes[hostObjKey.replace(HAS_CLASS_REGEX, '')] = hostObjValue;
            return acc;
        }
        if (HAS_ATTR_REGEX.test(hostObjKey)) {
            acc.attributes[hostObjKey.replace(HAS_ATTR_REGEX, '')] = hostObjValue;
            return acc;
        }
        lang_1.assign(acc.properties, hostBindingObj);
        return acc;
    }, {
        classes: {},
        attributes: {},
        properties: {}
    });
    return {
        hostStatic: hostStatic,
        hostBindings: hostBindings,
        hostListeners: hostListeners
    };
    function isHostBinding(hostKey) {
        return HOST_BINDING_KEY_REGEX.test(hostKey);
    }
    function isHostListener(hostKey) {
        return HOST_LISTENER_KEY_REGEX.test(hostKey);
    }
    function isStaticHost(hostKey) {
        return !(isHostBinding(hostKey) || isHostListener(hostKey));
    }
    function stripBindingOrListenerBrackets(hostKey) {
        return hostKey.replace(/\[|\]|\(|\)/g, '');
    }
    function processHostListenerCallback(hostListener) {
        // eventKey is 'click' or 'document: click' etc
        var eventKey = Object.keys(hostListener)[0];
        // cbString is just value 'onMove($event.target)' or 'onMove()'
        var cbString = hostListener[eventKey];
        // here we parse out callback method and its argument to separate strings
        // - for instance we got from 'onMove($event.target)' --> 'onMove','$event.target'
        var _a = /^(\w+)\(([$\w.\s,]*)\)$/.exec(cbString), cbMethodName = _a[1], cbMethodArgs = _a[2];
        var eventValue = [
            cbMethodName
        ].concat(cbMethodArgs.split(',').filter(function (argument) { return Boolean(argument); }).map(function (argument) { return argument.trim(); }));
        return _b = {},
            _b[eventKey.replace(/\s/g, '')] = eventValue,
            _b;
        var _b;
    }
}
exports._parseHost = _parseHost;
//# sourceMappingURL=host_parser.js.map

/***/ }),
/* 355 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var lang_1 = __webpack_require__(3);
var collections_1 = __webpack_require__(20);
var primitives_1 = __webpack_require__(144);
/**
 *
 * @param element
 * @param staticAttributes
 * @private
 */
function _setHostStaticAttributes(element, staticAttributes) {
    element.attr(staticAttributes);
}
exports._setHostStaticAttributes = _setHostStaticAttributes;
/**
 *
 * @param scope
 * @param element
 * @param ctrl
 * @param hostBindings
 * @returns {Array}
 * @internal
 * @private
 */
function _setHostBindings(scope, element, ctrl, hostBindings) {
    // setup @HostBindings
    return _createWatcherByType('classes', hostBindings).concat(_createWatcherByType('attributes', hostBindings), _createWatcherByType('properties', hostBindings));
    /**
     * registers $scope.$watch for appropriate hostBinding
     * the watcher watches property on controller instance
     * @param type
     * @param hostBinding
     * @returns {Array}
     * @private
     */
    function _createWatcherByType(type, hostBinding) {
        var _watchersByType = [];
        collections_1.StringMapWrapper.forEach(hostBinding[type], function (watchPropName, keyToSet) {
            _watchersByType.push(scope.$watch(function () { return ctrl[watchPropName]; }, function (newValue) {
                if (type === 'classes') {
                    element.toggleClass(keyToSet, newValue);
                }
                if (type === 'attributes') {
                    element.attr(keyToSet, newValue);
                }
                if (type === 'properties') {
                    collections_1.StringMapWrapper.setValueInPath(element[0], keyToSet, newValue);
                }
            }));
        });
        return _watchersByType;
    }
}
exports._setHostBindings = _setHostBindings;
/**
 *
 * @param scope
 * @param element
 * @param ctrl
 * @param hostListeners
 * @internal
 * @private
 */
function _setHostListeners(scope, element, ctrl, hostListeners) {
    collections_1.StringMapWrapper.forEach(hostListeners, _registerHostListener);
    function _registerHostListener(cbArray, eventKey) {
        var methodName = cbArray[0], methodParams = cbArray.slice(1);
        var _a = _getTargetAndEvent(eventKey, element), event = _a.event, target = _a.target;
        // console.log( event );
        target.on(event, eventHandler);
        // global event
        if (target !== element) {
            scope.$on('$destroy', function () { return target.off(event, eventHandler); });
        }
        function eventHandler(evt) {
            var cbParams = _getHostListenerCbParams(evt, methodParams);
            scope.$apply(function () {
                var noPreventDefault = ctrl[methodName].apply(ctrl, cbParams);
                // HostListener event.preventDefault if method returns false
                if (noPreventDefault === false) {
                    evt.preventDefault();
                }
            });
        }
    }
}
exports._setHostListeners = _setHostListeners;
/**
 * return $event or it's property if found via path
 * @param event
 * @param eventParams
 * @returns {Array}
 * @private
 */
function _getHostListenerCbParams(event, eventParams) {
    var ALLOWED_EVENT_NAME = '$event';
    return eventParams.reduce(function (acc, eventPath) {
        if (!primitives_1.StringWrapper.startsWith(eventPath, ALLOWED_EVENT_NAME)) {
            throw new Error("\n              only $event.* is supported. Please provide correct listener parameter @example: $event,$event.target\n              ");
        }
        if (eventPath === ALLOWED_EVENT_NAME) {
            return acc.concat([event]);
        }
        return acc.concat([collections_1.StringMapWrapper.getValueFromPath(event, eventPath.replace(ALLOWED_EVENT_NAME, ''))]);
    }, []);
}
exports._getHostListenerCbParams = _getHostListenerCbParams;
function _getGlobalTargetReference($injector, targetName) {
    var globalEventTargets = ['document', 'window', 'body'];
    var $document = $injector.get("$document");
    if (targetName === 'document') {
        return $document;
    }
    if (targetName === 'window') {
        return lang_1.global.angular.element($injector.get("$" + targetName));
    }
    if (targetName === 'body') {
        return lang_1.global.angular.element($document[0][targetName]);
    }
    throw new Error("unsupported global target '" + targetName + "', only '" + globalEventTargets + "' are supported");
}
/**
 *
 * @param definedHostEvent this will be just simple 'event' string name or 'globalTarget:event'
 * @param hostElement
 * @returns {any}
 * @private
 */
function _getTargetAndEvent(definedHostEvent, hostElement) {
    // global target
    var eventWithGlobalTarget = definedHostEvent.split(/\s*:\s*/);
    if (eventWithGlobalTarget.length === 2) {
        var globalTarget = eventWithGlobalTarget[0], eventOnTarget = eventWithGlobalTarget[1];
        return {
            event: eventOnTarget,
            target: _getGlobalTargetReference(hostElement.injector(), globalTarget)
        };
    }
    return {
        event: definedHostEvent,
        target: hostElement
    };
}
//# sourceMappingURL=host_resolver.js.map

/***/ }),
/* 356 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var lang_1 = __webpack_require__(3);
var collections_1 = __webpack_require__(20);
var directive_lifecycle_interfaces_1 = __webpack_require__(102);
var reflection_1 = __webpack_require__(47);
var provider_1 = __webpack_require__(51);
var metadata_directives_1 = __webpack_require__(46);
var metadata_di_1 = __webpack_require__(70);
/**
 * setup watchers for children component/directives provided by @Query decorators
 * - setup @ContentChild/@ContentChildren/@ViewChild/@ViewChildren
 * @param scope
 * @param element
 * @param ctrl
 * @param queries
 * @private
 */
function _setupQuery(scope, element, ctrl, queries) {
    var SEMAPHORE_PROP_NAMES = Object.freeze({
        view: '__readViewChildrenOrderScheduled',
        content: '__readContentChildrenOrderScheduled'
    });
    var DOM_RESOLVER_TYPES = Object.freeze({
        view: 'view',
        content: 'content'
    });
    if (collections_1.StringMapWrapper.size(queries) === 0) {
        return;
    }
    var onChildrenChangedCb = _getOnChildrenResolvers(element, ctrl, queries);
    ctrl.__readContentChildrenOrderScheduled = false;
    ctrl.__readViewChildrenOrderScheduled = false;
    // this is our created _ngOnChildrenChanged which will be called by children directives
    var _ngOnChildrenChanged = function (type, onFirstChangeDoneCb, domResolverCb) {
        if (onFirstChangeDoneCb === void 0) { onFirstChangeDoneCb = []; }
        if (domResolverCb === void 0) { domResolverCb = onChildrenChangedCb; }
        var orderScheduledSemaphorePropName = '';
        var domResolverCbType = '';
        if (type === directive_lifecycle_interfaces_1.ChildrenChangeHook.FromView) {
            orderScheduledSemaphorePropName = SEMAPHORE_PROP_NAMES.view;
            domResolverCbType = DOM_RESOLVER_TYPES.view;
        }
        else if (type === directive_lifecycle_interfaces_1.ChildrenChangeHook.FromContent) {
            domResolverCbType = DOM_RESOLVER_TYPES.content;
            orderScheduledSemaphorePropName = SEMAPHORE_PROP_NAMES.content;
        }
        else {
            throw new Error("_ngOnChildrenChanged: queryType(" + type + ") must be one of FromView|FromContent");
        }
        if (ctrl[orderScheduledSemaphorePropName]) {
            return;
        }
        ctrl[orderScheduledSemaphorePropName] = true;
        // we execute callback within $evalAsync to extend $digest loop count, which will not trigger another
        // $rootScope.$digest === #perfmatters
        scope.$evalAsync(function () {
            // turn semaphore On back again
            ctrl[orderScheduledSemaphorePropName] = false;
            // query DOM and assign instances/jqLite to controller properties
            domResolverCb[domResolverCbType].forEach(function (cb) { return cb(); });
            // when DOM is queried we can execute DirectiveComponent life cycles which have been registered
            // AfterViewInit | AfterContentInit
            onFirstChangeDoneCb.forEach(function (cb) { lang_1.isFunction(cb) && cb(); });
        });
    };
    // this method needs to be called from children which are we querying
    // if they are rendered dynamically/async
    ctrl._ngOnChildrenChanged = _ngOnChildrenChanged.bind(ctrl);
    /**
     * get all callbacks which will be executed withing $scope.$evalAsync,
     * which are querying for DOM elements and gets controller instances from host element children
     * @param element
     * @param ctrl
     * @param queries
     * @returns {view: Function[], content: Function[]}
     * @private
     */
    function _getOnChildrenResolvers(element, ctrl, queries) {
        var _onChildrenChangedCbMap = (_a = {},
            _a[DOM_RESOLVER_TYPES.view] = [],
            _a[DOM_RESOLVER_TYPES.content] = [],
            _a);
        collections_1.StringMapWrapper.forEach(queries, function (meta, key) {
            if (meta instanceof metadata_di_1.ViewChildMetadata) {
                _onChildrenChangedCbMap[DOM_RESOLVER_TYPES.view].push(_resolveViewChild(element, ctrl, key, meta));
            }
            if (meta instanceof metadata_di_1.ViewChildrenMetadata) {
                _onChildrenChangedCbMap[DOM_RESOLVER_TYPES.view].push(_resolveViewChildren(element, ctrl, key, meta));
            }
            if (meta instanceof metadata_di_1.ContentChildMetadata) {
                _onChildrenChangedCbMap[DOM_RESOLVER_TYPES.content].push(_resolveContentChild(element, ctrl, key, meta));
            }
            if (meta instanceof metadata_di_1.ContentChildrenMetadata) {
                _onChildrenChangedCbMap[DOM_RESOLVER_TYPES.content].push(_resolveContentChildren(element, ctrl, key, meta));
            }
        });
        return _onChildrenChangedCbMap;
        function _resolveViewChild(element, ctrl, key, meta) {
            return _resolveChildrenFactory(element, ctrl, key, meta.selector, DOM_RESOLVER_TYPES.view, true);
        }
        function _resolveContentChild(element, ctrl, key, meta) {
            return _resolveChildrenFactory(element, ctrl, key, meta.selector, DOM_RESOLVER_TYPES.content, true);
        }
        function _resolveViewChildren(element, ctrl, key, meta) {
            return _resolveChildrenFactory(element, ctrl, key, meta.selector, DOM_RESOLVER_TYPES.view);
        }
        function _resolveContentChildren(element, ctrl, key, meta) {
            return _resolveChildrenFactory(element, ctrl, key, meta.selector, DOM_RESOLVER_TYPES.content);
        }
        var _a;
    }
}
exports._setupQuery = _setupQuery;
/**
 * resolving DOM instances by provided @ContentChild(ref)/@ViewChild(ref)
 * - if querying for string, we handle it as a selector and return jqLite instances
 * - if querying for Type( directive | component ) we get proper selector and controller from
 * provided Type reference, query the DOM and return that controller instance if exists, otherwise null
 * @param element
 * @param ctrl
 * @param key
 * @param cssSelector
 * @param type
 * @param firstOnly
 * @returns {function(): void}
 * @private
 */
function _resolveChildrenFactory(element, ctrl, key, cssSelector, type, firstOnly) {
    if (firstOnly === void 0) { firstOnly = false; }
    var _a = _getSelectorAndCtrlName(cssSelector), selector = _a.selector, childCtrlName = _a.childCtrlName;
    return _childResolver;
    function _childResolver() {
        if (firstOnly) {
            ctrl[key] = null;
            var child = _getChildElements(element, selector, type, firstOnly);
            var childInstance = lang_1.isString(cssSelector)
                ? child
                : getControllerOnElement(child, childCtrlName);
            ctrl[key] = childInstance;
        }
        else {
            ctrl[key] = [];
            var children = _getChildElements(element, selector, type);
            if (lang_1.isString(cssSelector)) {
                ctrl[key] = children;
                return;
            }
            for (var i = 0; i < children.length; i++) {
                ctrl[key].push(getControllerOnElement(children.eq(i), childCtrlName));
            }
        }
    }
}
exports._resolveChildrenFactory = _resolveChildrenFactory;
/**
 * query View/Content DOM for particular child elements/attributes selector
 * @param $element
 * @param selector
 * @param type
 * @param firstOnly
 * @returns {IAugmentedJQuery}
 * @private
 */
function _getChildElements($element, selector, type, firstOnly) {
    if (firstOnly === void 0) { firstOnly = false; }
    var querySelector = '';
    if (type === 'view') {
        // Note: we are guarding only for first nested child inside ng-transclude
        // this would be to complicated and DOM heavy to select only selectors outside ng-transclude
        // - it should be author responsibility to not include Component view directive within <ng-transclude> and querying for them
        querySelector = ":not(ng-transclude):not([ng-transclude]) > " + selector;
    }
    if (type === 'content') {
        querySelector = "ng-transclude " + selector + ", [ng-transclude] " + selector;
    }
    var queryMethod = firstOnly
        ? 'querySelector'
        : 'querySelectorAll';
    return lang_1.global.angular.element($element[0][queryMethod](querySelector));
}
exports._getChildElements = _getChildElements;
function _getSelectorAndCtrlName(childSelector) {
    var selector = _getSelector(childSelector);
    var childCtrlName = provider_1.getInjectableName(childSelector);
    return { selector: selector, childCtrlName: childCtrlName };
}
exports._getSelectorAndCtrlName = _getSelectorAndCtrlName;
/**
 * get CSS selector from Component/Directive decorated class metadata
 * @param selector
 * @returns {string}
 * @private
 */
function _getSelector(selector) {
    if (lang_1.isString(selector)) {
        return selector;
    }
    if (lang_1.isType(selector)) {
        var annotation = reflection_1.reflector.annotations(selector)[0];
        if (annotation instanceof metadata_directives_1.DirectiveMetadata) {
            return annotation.selector;
        }
    }
    throw new Error("cannot query for non Directive/Component type " + lang_1.getFuncName(selector));
}
exports._getSelector = _getSelector;
/**
 * creates functions which will be called from parent component which is querying this component
 * - component which queries needs to be injected to child,
 * here child creates special callbacks by type of @Query which will be called from postLink and on scope destroy so
 * we clean up GC
 * @param ctrl
 * @param requiredCtrls
 * @returns {Object|Array|T|function()[]}
 * @private
 */
function _getParentCheckNotifiers(ctrl, requiredCtrls) {
    var parentCheckedNotifiers = requiredCtrls.reduce(function (acc, requiredCtrl) {
        if (!lang_1.isJsObject(requiredCtrl)) {
            return acc;
        }
        var Ctor = requiredCtrl.constructor;
        if (!lang_1.isType(Ctor)) {
            return acc;
        }
        var propMeta = reflection_1.reflector.propMetadata(Ctor);
        if (!collections_1.StringMapWrapper.size(propMeta)) {
            return acc;
        }
        var _parentCheckedNotifiers = [];
        collections_1.StringMapWrapper.forEach(propMeta, function (propMetaPropArr) {
            propMetaPropArr
                .filter(function (propMetaInstance) {
                // check if propMeta is one of @Query types and that it queries for Directive/Component ( typeof selector == function )
                if (!((propMetaInstance instanceof metadata_di_1.QueryMetadata) && lang_1.isType(propMetaInstance.selector))) {
                    return false;
                }
                // check if current child is really queried from its parent
                return ctrl instanceof propMetaInstance.selector;
            })
                .forEach(function (propMetaInstance) {
                // parent queried for this child with one from @ContentChild/@ContentChildren
                if (!propMetaInstance.isViewQuery) {
                    _parentCheckedNotifiers.push(function () { return requiredCtrl._ngOnChildrenChanged(directive_lifecycle_interfaces_1.ChildrenChangeHook.FromContent, [requiredCtrl.ngAfterContentChecked.bind(requiredCtrl)]); });
                }
                // parent queried for this child with one from @ViewChild/@ViewChildren
                if (propMetaInstance.isViewQuery) {
                    _parentCheckedNotifiers.push(function () { return requiredCtrl._ngOnChildrenChanged(directive_lifecycle_interfaces_1.ChildrenChangeHook.FromView, [requiredCtrl.ngAfterViewChecked.bind(requiredCtrl)]); });
                }
            });
        });
        return acc.concat(_parentCheckedNotifiers);
    }, []);
    return collections_1.ListWrapper.size(parentCheckedNotifiers)
        ? parentCheckedNotifiers
        : [lang_1.noop];
}
exports._getParentCheckNotifiers = _getParentCheckNotifiers;
function getControllerOnElement($element, ctrlName) {
    if (!$element) {
        return null;
    }
    return $element.controller(ctrlName);
}
exports.getControllerOnElement = getControllerOnElement;
//# sourceMappingURL=children_resolver.js.map

/***/ }),
/* 357 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var type_1 = __webpack_require__(145);
var directive_lifecycle_interfaces_1 = __webpack_require__(102);
function hasLifecycleHook(lcInterface, token) {
    if (!(token instanceof type_1.Type))
        return false;
    var proto = token.prototype;
    switch (lcInterface) {
        case directive_lifecycle_interfaces_1.LifecycleHooks.AfterContentInit:
            return !!proto.ngAfterContentInit;
        case directive_lifecycle_interfaces_1.LifecycleHooks.AfterContentChecked:
            return !!proto.ngAfterContentChecked;
        case directive_lifecycle_interfaces_1.LifecycleHooks.AfterViewInit:
            return !!proto.ngAfterViewInit;
        case directive_lifecycle_interfaces_1.LifecycleHooks.AfterViewChecked:
            return !!proto.ngAfterViewChecked;
        case directive_lifecycle_interfaces_1.LifecycleHooks.OnDestroy:
            return !!proto.ngOnDestroy;
        case directive_lifecycle_interfaces_1.LifecycleHooks.OnInit:
            return !!proto.ngOnInit;
        case directive_lifecycle_interfaces_1.LifecycleHooks.OnChanges:
            return !!proto.ngOnChanges;
        case directive_lifecycle_interfaces_1.LifecycleHooks.DoCheck:
            return !!proto.ngDoCheck;
        case directive_lifecycle_interfaces_1.LifecycleHooks._OnChildrenChanged:
            return !!proto._ngOnChildrenChanged;
        default:
            return false;
    }
}
exports.hasLifecycleHook = hasLifecycleHook;
/**
 * @internal
 */
function resolveImplementedLifeCycleHooks(type) {
    return {
        ngOnInit: hasLifecycleHook(directive_lifecycle_interfaces_1.LifecycleHooks.OnInit, type),
        ngOnChanges: hasLifecycleHook(directive_lifecycle_interfaces_1.LifecycleHooks.OnChanges, type),
        ngDoCheck: hasLifecycleHook(directive_lifecycle_interfaces_1.LifecycleHooks.DoCheck, type),
        ngAfterContentInit: hasLifecycleHook(directive_lifecycle_interfaces_1.LifecycleHooks.AfterContentInit, type),
        ngAfterContentChecked: hasLifecycleHook(directive_lifecycle_interfaces_1.LifecycleHooks.AfterContentChecked, type),
        ngAfterViewInit: hasLifecycleHook(directive_lifecycle_interfaces_1.LifecycleHooks.AfterViewInit, type),
        ngAfterViewChecked: hasLifecycleHook(directive_lifecycle_interfaces_1.LifecycleHooks.AfterViewChecked, type),
        ngOnDestroy: hasLifecycleHook(directive_lifecycle_interfaces_1.LifecycleHooks.OnDestroy, type),
        _ngOnChildrenChanged: hasLifecycleHook(directive_lifecycle_interfaces_1.LifecycleHooks._OnChildrenChanged, type)
    };
}
exports.resolveImplementedLifeCycleHooks = resolveImplementedLifeCycleHooks;
//# sourceMappingURL=directive_lifecycles_reflector.js.map

/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var lang_1 = __webpack_require__(3);
var collections_1 = __webpack_require__(20);
var reflection_1 = __webpack_require__(47);
var metadata_directives_1 = __webpack_require__(46);
var metadata_di_1 = __webpack_require__(70);
var metadata_1 = __webpack_require__(35);
var provider_1 = __webpack_require__(51);
var forward_ref_1 = __webpack_require__(55);
var exceptions_1 = __webpack_require__(143);
// asset:<package-name>/<realm>/<path-to-module>
// var _ASSET_URL_RE = /asset:([^\/]+)\/([^\/]+)\/(.+)/g;
// <path-to-module>/filename.js
var ASSET_URL_RE = /^(.+)\/.+\.js$/;
function _isDirectiveMetadata(type) {
    return type instanceof metadata_directives_1.DirectiveMetadata;
}
/**
 * return required string map for provided local DI
 * ```typescript
 * // for
 * constructor(@Inject('ngModel') @Self() @Optional() ngModel){}
 * // it returns:
 * { ngModel: '?ngModel' }
 *
 * // when MyComponent is
 * @Component({ selector: 'myCoolCmp', template:`hello`})
 * class MyComponent{}
 * // for
 * constructor(@Host() @Optional() myCmp: MyComponent){}
 * // it returns:
 * { myCmp: '^myCoolCmp' }
 * ```
 * @param paramsMeta
 * @param idx
 * @param typeOrFunc
 * @returns {{[directiveName]:string}}
 * @private
 */
function _transformInjectedDirectivesMeta(paramsMeta, idx, typeOrFunc) {
    if (!_isInjectableParamsDirective(paramsMeta)) {
        return;
    }
    // @TODO unite this with _extractToken from provider.ts
    var injectInst = collections_1.ListWrapper.find(paramsMeta, function (param) { return param instanceof metadata_1.InjectMetadata; });
    var injectType = collections_1.ListWrapper.find(paramsMeta, lang_1.isType);
    var _a = (injectInst || { token: injectType }).token, token = _a === void 0 ? undefined : _a;
    // we need to decrement param count if user uses both @Inject() and :MyType
    var paramsMetaLength = (injectInst && injectType)
        ? paramsMeta.length - 1
        : paramsMeta.length;
    if (!token) {
        throw new Error(exceptions_1.getErrorMsg(typeOrFunc, "no Directive instance name provided within @Inject() or :DirectiveClass annotation missing"));
    }
    var isHost = collections_1.ListWrapper.findIndex(paramsMeta, function (param) { return param instanceof metadata_1.HostMetadata; }) !== -1;
    var isOptional = collections_1.ListWrapper.findIndex(paramsMeta, function (param) { return param instanceof metadata_1.OptionalMetadata; }) !== -1;
    var isSelf = collections_1.ListWrapper.findIndex(paramsMeta, function (param) { return param instanceof metadata_1.SelfMetadata; }) !== -1;
    var isSkipSelf = collections_1.ListWrapper.findIndex(paramsMeta, function (param) { return param instanceof metadata_1.SkipSelfMetadata; }) !== -1;
    if (isOptional && paramsMetaLength !== 3) {
        throw new Error(exceptions_1.getErrorMsg(typeOrFunc, "you cannot use @Optional() without related decorator for injecting Directives. use one of @Host|@Self()|@SkipSelf() + @Optional()"));
    }
    if (isSelf && isSkipSelf) {
        throw new Error(exceptions_1.getErrorMsg(typeOrFunc, "you cannot provide both @Self() and @SkipSelf() with @Inject(" + lang_1.getFuncName(token) + ") for Directive Injection"));
    }
    if ((isHost && isSelf) || (isHost && isSkipSelf)) {
        throw new Error(exceptions_1.getErrorMsg(typeOrFunc, "you cannot provide both @Host(),@SkipSelf() or @Host(),@Self() with @Inject(" + lang_1.getFuncName(token) + ") for Directive Injections"));
    }
    var locateType = _getLocateTypeSymbol();
    var optionalType = isOptional ? '?' : '';
    var requireExpressionPrefix = "" + optionalType + locateType;
    var directiveName = _getDirectiveName(token);
    // we need to generate unique names because if we require same directive controllers,
    // with different locale decorators it would merge to one which is wrong
    return _b = {},
        _b[directiveName + "#" + idx] = "" + requireExpressionPrefix + directiveName,
        _b;
    function _getDirectiveName(token) {
        return lang_1.isType(forward_ref_1.resolveForwardRef(token))
            ? provider_1.getInjectableName(forward_ref_1.resolveForwardRef(token))
            : token;
    }
    function _getLocateTypeSymbol() {
        if (isSelf) {
            return '';
        }
        if (isHost) {
            return '^';
        }
        if (isSkipSelf) {
            return '^^';
        }
    }
    // exit if user uses both @Inject() and :Type for DI because this is not directive injection
    function _isInjectableParamsDirective(paramsMeta) {
        // if there is just @Inject or Type from design:paramtypes return
        if (paramsMeta.length < 2) {
            return false;
        }
        if (paramsMeta.length === 2) {
            var injectableParamCount = paramsMeta.filter(function (inj) { return inj instanceof metadata_1.InjectMetadata || lang_1.isType(inj); }).length;
            if (injectableParamCount === 2) {
                return false;
            }
        }
        return true;
    }
    var _b;
}
/**
 * Resolve a `Type` for {@link DirectiveMetadata}.
 */
var DirectiveResolver = (function () {
    function DirectiveResolver() {
    }
    /**
     * Return {@link DirectiveMetadata} for a given `Type`.
     */
    DirectiveResolver.prototype.resolve = function (type) {
        var metadata = this._getDirectiveMeta(type);
        var propertyMetadata = reflection_1.reflector.propMetadata(type);
        return this._mergeWithPropertyMetadata(metadata, propertyMetadata);
    };
    /**
     * transform parameter annotations to required directives map so we can use it
     * for DDO creation
     *
     * map consist of :
     *  - key == name of directive
     *  - value == Angular 1 require expression
     *  ```js
     *  {
     *    ngModel: 'ngModel',
     *    form: '^^form',
     *    foo: '^foo',
     *    moo: '?^foo',
     *  }
     *  ```
     *
     * @param {Type} type
     * @returns {StringMap}
     */
    DirectiveResolver.prototype.getRequiredDirectivesMap = function (type) {
        var metadata = this._getDirectiveMeta(type);
        var paramMetadata = reflection_1.reflector.parameters(type);
        if (lang_1.isPresent(paramMetadata)) {
            return paramMetadata
                .reduce(function (acc, paramMetaArr, idx) {
                var requireExp = _transformInjectedDirectivesMeta(paramMetaArr, idx, type);
                if (lang_1.isPresent(requireExp)) {
                    lang_1.assign(acc, requireExp);
                }
                return acc;
            }, {});
        }
        return {};
    };
    DirectiveResolver.prototype.parseAssetUrl = function (cmpMetadata) {
        if (lang_1.isBlank(cmpMetadata.moduleId)) {
            return '';
        }
        var moduleId = cmpMetadata.moduleId;
        var _a = moduleId.match(ASSET_URL_RE) || [], _b = _a[1], urlPathMatch = _b === void 0 ? '' : _b;
        return urlPathMatch + "/";
    };
    /**
     *
     * @param type
     * @returns {DirectiveMetadata}
     * @throws Error
     * @private
     */
    DirectiveResolver.prototype._getDirectiveMeta = function (type) {
        var typeMetadata = reflection_1.reflector.annotations(forward_ref_1.resolveForwardRef(type));
        if (lang_1.isPresent(typeMetadata)) {
            var metadata = collections_1.ListWrapper.find(typeMetadata, _isDirectiveMetadata);
            if (lang_1.isPresent(metadata)) {
                return metadata;
            }
        }
        throw new Error("No Directive annotation found on " + lang_1.stringify(type));
    };
    DirectiveResolver.prototype._mergeWithPropertyMetadata = function (directiveMetadata, propertyMetadata) {
        var inputs = [];
        var attrs = [];
        var outputs = [];
        var host = {};
        var queries = {};
        collections_1.StringMapWrapper.forEach(propertyMetadata, function (metadata, propName) {
            metadata.forEach(function (propMetaInst) {
                if (propMetaInst instanceof metadata_directives_1.InputMetadata) {
                    if (lang_1.isPresent(propMetaInst.bindingPropertyName)) {
                        inputs.push(propName + ": " + propMetaInst.bindingPropertyName);
                    }
                    else {
                        inputs.push(propName);
                    }
                }
                if (propMetaInst instanceof metadata_directives_1.AttrMetadata) {
                    if (lang_1.isPresent(propMetaInst.bindingPropertyName)) {
                        attrs.push(propName + ": " + propMetaInst.bindingPropertyName);
                    }
                    else {
                        attrs.push(propName);
                    }
                }
                if (propMetaInst instanceof metadata_directives_1.OutputMetadata) {
                    if (lang_1.isPresent(propMetaInst.bindingPropertyName)) {
                        outputs.push(propName + ": " + propMetaInst.bindingPropertyName);
                    }
                    else {
                        outputs.push(propName);
                    }
                }
                if (propMetaInst instanceof metadata_directives_1.HostBindingMetadata) {
                    if (lang_1.isPresent(propMetaInst.hostPropertyName)) {
                        host["[" + propMetaInst.hostPropertyName + "]"] = propName;
                    }
                    else {
                        host["[" + propName + "]"] = propName;
                    }
                }
                if (propMetaInst instanceof metadata_directives_1.HostListenerMetadata) {
                    var args = lang_1.isPresent(propMetaInst.args)
                        ? propMetaInst.args.join(', ')
                        : '';
                    host["(" + propMetaInst.eventName + ")"] = propName + "(" + args + ")";
                }
                if (propMetaInst instanceof metadata_di_1.ContentChildrenMetadata) {
                    queries[propName] = propMetaInst;
                }
                if (propMetaInst instanceof metadata_di_1.ViewChildrenMetadata) {
                    queries[propName] = propMetaInst;
                }
                if (propMetaInst instanceof metadata_di_1.ContentChildMetadata) {
                    queries[propName] = propMetaInst;
                }
                if (propMetaInst instanceof metadata_di_1.ViewChildMetadata) {
                    queries[propName] = propMetaInst;
                }
            });
        });
        return this._merge(directiveMetadata, inputs, attrs, outputs, host, queries);
    };
    DirectiveResolver.prototype._merge = function (dm, inputs, attrs, outputs, host, queries) {
        var mergedInputs = lang_1.isPresent(dm.inputs)
            ? collections_1.ListWrapper.concat(dm.inputs, inputs)
            : inputs;
        var mergedAttrs = lang_1.isPresent(dm.attrs)
            ? collections_1.ListWrapper.concat(dm.attrs, attrs)
            : attrs;
        var mergedOutputs = lang_1.isPresent(dm.outputs)
            ? collections_1.ListWrapper.concat(dm.outputs, outputs)
            : outputs;
        var mergedHost = lang_1.isPresent(dm.host)
            ? collections_1.StringMapWrapper.merge(dm.host, host)
            : host;
        var mergedQueries = lang_1.isPresent(dm.queries)
            ? collections_1.StringMapWrapper.merge(dm.queries, queries)
            : queries;
        var directiveSettings = {
            selector: dm.selector,
            inputs: mergedInputs,
            attrs: mergedAttrs,
            outputs: mergedOutputs,
            host: mergedHost,
            queries: mergedQueries,
            legacy: dm.legacy
        };
        if (dm instanceof metadata_directives_1.ComponentMetadata) {
            var componentSettings = collections_1.StringMapWrapper.assign({}, directiveSettings, {
                moduleId: dm.moduleId,
                template: dm.template,
                templateUrl: dm.templateUrl,
                changeDetection: lang_1.isPresent(dm.changeDetection) ? dm.changeDetection : 1 /* Default */
            });
            return new metadata_directives_1.ComponentMetadata(componentSettings);
        }
        else {
            return new metadata_directives_1.DirectiveMetadata(directiveSettings);
        }
    };
    return DirectiveResolver;
}());
exports.DirectiveResolver = DirectiveResolver;
//# sourceMappingURL=directive_resolver.js.map

/***/ }),
/* 359 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var lang_1 = __webpack_require__(3);
var collections_1 = __webpack_require__(20);
var metadata_1 = __webpack_require__(103);
var reflection_1 = __webpack_require__(47);
var forward_ref_1 = __webpack_require__(55);
function _isPipeMetadata(type) {
    return type instanceof metadata_1.PipeMetadata;
}
/**
 * Resolve a `Type` for {@link PipeMetadata}.
 *
 */
var PipeResolver = (function () {
    function PipeResolver() {
    }
    /**
     * Return {@link PipeMetadata} for a given `Type`.
     */
    PipeResolver.prototype.resolve = function (type) {
        var metas = reflection_1.reflector.annotations(forward_ref_1.resolveForwardRef(type));
        if (lang_1.isPresent(metas)) {
            var annotation = collections_1.ListWrapper.find(metas, _isPipeMetadata);
            if (lang_1.isPresent(annotation)) {
                return annotation;
            }
        }
        throw new Error("No Pipe decorator found on " + lang_1.stringify(type));
    };
    return PipeResolver;
}());
exports.PipeResolver = PipeResolver;
//# sourceMappingURL=pipe_resolver.js.map

/***/ }),
/* 360 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var decorators_1 = __webpack_require__(361);
exports.Pipe = decorators_1.Pipe;
//# sourceMappingURL=pipes.js.map

/***/ }),
/* 361 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var decorators_1 = __webpack_require__(71);
var metadata_1 = __webpack_require__(103);
exports.Pipe = decorators_1.makeDecorator(metadata_1.PipeMetadata);
//# sourceMappingURL=decorators.js.map

/***/ }),
/* 362 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var lang_1 = __webpack_require__(3);
var pipe_resolver_1 = __webpack_require__(359);
/**
 * @internal
 */
var PipeProvider = (function () {
    function PipeProvider(pipeResolver) {
        this.pipeResolver = pipeResolver;
    }
    PipeProvider.prototype.createFromType = function (type) {
        var metadata = this.pipeResolver.resolve(type);
        if (!lang_1.isFunction(type.prototype.transform)) {
            throw new Error("@Pipe: must implement '#transform' method");
        }
        filterFactory.$inject = ['$injector'];
        function filterFactory($injector) {
            var pipeInstance = $injector.instantiate(type);
            // return angular 1 filter function
            var filterFn = pipeInstance.transform.bind(pipeInstance);
            if (metadata.pure === false) {
                filterFn.$stateful = true;
            }
            return filterFn;
        }
        return [
            metadata.name,
            filterFactory
        ];
    };
    return PipeProvider;
}());
exports.PipeProvider = PipeProvider;
/** @internal */
exports.pipeProvider = new PipeProvider(new pipe_resolver_1.PipeResolver());
//# sourceMappingURL=pipe_provider.js.map

/***/ }),
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var lang_1 = __webpack_require__(3);
var collections_1 = __webpack_require__(20);
// import {BaseException} from 'angular2/src/facade/exceptions';
// This will be needed when we will used Reflect APIs
var Reflect = lang_1.global.Reflect;
if (!isReflectMetadata(Reflect)) {
    throw "\n    Reflect.*metadata shim is required when using class decorators.\n    You can use one of: \n    - \"reflect-metadata\" (https://www.npmjs.com/package/reflect-metadata) \n    - \"core-js/es7/reflect\" (https://github.com/zloirock/core-js)\n  ";
}
/**
 * @internal
 */
exports.CLASS_META_KEY = 'annotations';
/**
 * @internal
 */
exports.PARAM_META_KEY = 'parameters';
/**
 * @internal
 */
exports.PARAM_REFLECT_META_KEY = 'design:paramtypes';
/**
 * @internal
 */
exports.PROP_META_KEY = 'propMetadata';
/**
 * @internal
 */
exports.DOWNGRADED_COMPONENT_NAME_KEY = 'downgradeComponentName';
function isReflectMetadata(reflect) {
    return lang_1.isPresent(reflect) && lang_1.isPresent(reflect.getMetadata);
}
var ReflectionCapabilities = (function () {
    function ReflectionCapabilities(reflect) {
        if (reflect === void 0) { reflect = lang_1.global.Reflect; }
        this._reflect = reflect;
    }
    ReflectionCapabilities.prototype.isReflectionEnabled = function () { return true; };
    ReflectionCapabilities.prototype.factory = function (t) {
        switch (t.length) {
            case 0:
                return function () { return new t(); };
            case 1:
                return function (a1) { return new t(a1); };
            case 2:
                return function (a1, a2) { return new t(a1, a2); };
            case 3:
                return function (a1, a2, a3) { return new t(a1, a2, a3); };
            case 4:
                return function (a1, a2, a3, a4) { return new t(a1, a2, a3, a4); };
            case 5:
                return function (a1, a2, a3, a4, a5) { return new t(a1, a2, a3, a4, a5); };
            case 6:
                return function (a1, a2, a3, a4, a5, a6) {
                    return new t(a1, a2, a3, a4, a5, a6);
                };
            case 7:
                return function (a1, a2, a3, a4, a5, a6, a7) {
                    return new t(a1, a2, a3, a4, a5, a6, a7);
                };
            case 8:
                return function (a1, a2, a3, a4, a5, a6, a7, a8) {
                    return new t(a1, a2, a3, a4, a5, a6, a7, a8);
                };
            case 9:
                return function (a1, a2, a3, a4, a5, a6, a7, a8, a9) {
                    return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9);
                };
            case 10:
                return function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) { return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10); };
            case 11:
                return function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) { return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11); };
            case 12:
                return function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
                    return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12);
                };
            case 13:
                return function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13) {
                    return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13);
                };
            case 14:
                return function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14) {
                    return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14);
                };
            case 15:
                return function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
                    return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15);
                };
            case 16:
                return function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16) {
                    return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16);
                };
            case 17:
                return function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17) {
                    return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17);
                };
            case 18:
                return function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18) { return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18); };
            case 19:
                return function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19) { return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19); };
            case 20:
                return function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20) { return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20); };
        }
        throw new Error("Cannot create a factory for '" + lang_1.stringify(t) + "' because its constructor has more than 20 arguments");
    };
    /** @internal */
    ReflectionCapabilities.prototype._zipTypesAndAnnotations = function (paramTypes, paramAnnotations) {
        var result;
        if (typeof paramTypes === 'undefined') {
            result = new Array(paramAnnotations.length);
        }
        else {
            result = new Array(paramTypes.length);
        }
        for (var i = 0; i < result.length; i++) {
            // TS outputs Object for parameters without types, while Traceur omits
            // the annotations. For now we preserve the Traceur behavior to aid
            // migration, but this can be revisited.
            if (typeof paramTypes === 'undefined') {
                result[i] = [];
            }
            else if (paramTypes[i] != Object) {
                result[i] = [paramTypes[i]];
            }
            else {
                result[i] = [];
            }
            if (lang_1.isPresent(paramAnnotations) && lang_1.isPresent(paramAnnotations[i])) {
                result[i] = result[i].concat(paramAnnotations[i]);
            }
        }
        return result;
    };
    ReflectionCapabilities.prototype.parameters = function (typeOrFunc) {
        // // Prefer the direct API.
        // if (isPresent((<any>typeOrFunc).parameters)) {
        //   return (<any>typeOrFunc).parameters;
        // }
        if (isReflectMetadata(this._reflect)) {
            // get parameter created with @Inject()
            var paramAnnotations = this._reflect.getMetadata(exports.PARAM_META_KEY, typeOrFunc);
            // get parameter created via TS type annotations
            var paramTypes = this._reflect.getMetadata(exports.PARAM_REFLECT_META_KEY, typeOrFunc);
            if (lang_1.isPresent(paramTypes) || lang_1.isPresent(paramAnnotations)) {
                return this._zipTypesAndAnnotations(paramTypes, paramAnnotations);
            }
        }
        // The array has to be filled with `undefined` because holes would be skipped by `some`
        var parameters = new Array(typeOrFunc.length);
        collections_1.ListWrapper.fill(parameters, undefined);
        // parameters.fill(undefined);
        return parameters;
    };
    ReflectionCapabilities.prototype.rawParameters = function (typeOrFunc) {
        return this._reflect.getMetadata(exports.PARAM_META_KEY, typeOrFunc);
    };
    ReflectionCapabilities.prototype.registerParameters = function (parameters, type) {
        this._reflect.defineMetadata(exports.PARAM_META_KEY, parameters, type);
    };
    ReflectionCapabilities.prototype.annotations = function (typeOrFunc) {
        // // Prefer the direct API.
        // if (isPresent((<any>typeOrFunc).annotations)) {
        //   var annotations = (<any>typeOrFunc).annotations;
        //   if (isFunction(annotations) && annotations.annotations) {
        //     annotations = annotations.annotations;
        //   }
        //   return annotations;
        // }
        if (isReflectMetadata(this._reflect)) {
            var annotations = this._reflect.getMetadata(exports.CLASS_META_KEY, typeOrFunc);
            if (lang_1.isPresent(annotations))
                return annotations;
        }
        return [];
    };
    ReflectionCapabilities.prototype.ownAnnotations = function (typeOrFunc) {
        return this._reflect.getOwnMetadata(exports.CLASS_META_KEY, typeOrFunc);
    };
    ReflectionCapabilities.prototype.registerAnnotations = function (annotations, typeOrFunc) {
        this._reflect.defineMetadata(exports.CLASS_META_KEY, annotations, typeOrFunc);
    };
    ReflectionCapabilities.prototype.propMetadata = function (typeOrFunc) {
        // // Prefer the direct API.
        // if (isPresent((<any>typeOrFunc).propMetadata)) {
        //   var propMetadata = (<any>typeOrFunc).propMetadata;
        //   if (isFunction(propMetadata) && propMetadata.propMetadata) {
        //     propMetadata = propMetadata.propMetadata;
        //   }
        //   return propMetadata;
        // }
        if (isReflectMetadata(this._reflect)) {
            var propMetadata = this._reflect.getMetadata(exports.PROP_META_KEY, typeOrFunc);
            if (lang_1.isPresent(propMetadata))
                return propMetadata;
        }
        return {};
    };
    ReflectionCapabilities.prototype.ownPropMetadata = function (typeOrFunc) {
        return this._reflect.getOwnMetadata(exports.PROP_META_KEY, typeOrFunc);
    };
    ReflectionCapabilities.prototype.registerPropMetadata = function (propMetadata, typeOrFunc) {
        this._reflect.defineMetadata(exports.PROP_META_KEY, propMetadata, typeOrFunc);
    };
    ReflectionCapabilities.prototype.registerDowngradedNg2ComponentName = function (componentName, typeOrFunc) {
        this._reflect.defineMetadata(exports.DOWNGRADED_COMPONENT_NAME_KEY, componentName, typeOrFunc);
    };
    ReflectionCapabilities.prototype.downgradedNg2ComponentName = function (typeOrFunc) {
        return this._reflect.getOwnMetadata(exports.DOWNGRADED_COMPONENT_NAME_KEY, typeOrFunc);
    };
    ReflectionCapabilities.prototype.interfaces = function (type) {
        // throw new BaseException("JavaScript does not support interfaces");
        throw new Error('JavaScript does not support interfaces');
    };
    ReflectionCapabilities.prototype.getter = function (name) { return new Function('o', 'return o.' + name + ';'); };
    ReflectionCapabilities.prototype.setter = function (name) {
        return new Function('o', 'v', 'return o.' + name + ' = v;');
    };
    ReflectionCapabilities.prototype.method = function (name) {
        var functionBody = "if (!o." + name + ") throw new Error('\"" + name + "\" is undefined');\n        return o." + name + ".apply(o, args);";
        return new Function('o', 'args', functionBody);
    };
    return ReflectionCapabilities;
}());
exports.ReflectionCapabilities = ReflectionCapabilities;
//# sourceMappingURL=reflection_capabilities.js.map

/***/ }),
/* 364 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var reflector_reader_1 = __webpack_require__(365);
/**
 * Reflective information about a symbol, including annotations, interfaces, and other metadata.
 */
var ReflectionInfo = (function () {
    function ReflectionInfo(annotations, parameters, factory, interfaces, propMetadata) {
        this.annotations = annotations;
        this.parameters = parameters;
        this.factory = factory;
        this.interfaces = interfaces;
        this.propMetadata = propMetadata;
    }
    return ReflectionInfo;
}());
exports.ReflectionInfo = ReflectionInfo;
/**
 * Provides access to reflection data about symbols. Used internally by Angular
 * to power dependency injection and compilation.
 */
var Reflector = (function (_super) {
    __extends(Reflector, _super);
    function Reflector(reflectionCapabilities) {
        var _this = _super.call(this) || this;
        // this._usedKeys = null;
        _this.reflectionCapabilities = reflectionCapabilities;
        return _this;
    }
    Reflector.prototype.isReflectionEnabled = function () { return this.reflectionCapabilities.isReflectionEnabled(); };
    Reflector.prototype.parameters = function (typeOrFunc) {
        // // get cached
        // if (this._injectableInfo.has(typeOrFunc)) {
        //   var res = this._getReflectionInfo(typeOrFunc).parameters;
        //   return isPresent(res) ? res : [];
        // } else {
        return this.reflectionCapabilities.parameters(typeOrFunc);
        // }
    };
    Reflector.prototype.rawParameters = function (typeOrFunc) {
        return this.reflectionCapabilities.rawParameters(typeOrFunc);
    };
    Reflector.prototype.registerParameters = function (parameters, typeOrFunc) {
        this.reflectionCapabilities.registerParameters(parameters, typeOrFunc);
    };
    Reflector.prototype.annotations = function (typeOrFunc) {
        // // get cached
        // if (this._injectableInfo.has(typeOrFunc)) {
        //   var res = this._getReflectionInfo(typeOrFunc).annotations;
        //   return isPresent(res) ? res : [];
        // } else {
        return this.reflectionCapabilities.annotations(typeOrFunc);
        // }
    };
    Reflector.prototype.ownAnnotations = function (typeOrFunc) {
        return this.reflectionCapabilities.ownAnnotations(typeOrFunc);
    };
    Reflector.prototype.registerAnnotations = function (parameters, typeOrFunc) {
        this.reflectionCapabilities.registerAnnotations(parameters, typeOrFunc);
    };
    Reflector.prototype.propMetadata = function (typeOrFunc) {
        // // get cached
        // if (this._injectableInfo.has(typeOrFunc)) {
        //   var res = this._getReflectionInfo(typeOrFunc).propMetadata;
        //   return isPresent(res) ? res : {};
        // } else {
        return this.reflectionCapabilities.propMetadata(typeOrFunc);
        // }
    };
    Reflector.prototype.ownPropMetadata = function (typeOrFunc) {
        return this.reflectionCapabilities.ownPropMetadata(typeOrFunc);
    };
    Reflector.prototype.registerPropMetadata = function (parameters, typeOrFunc) {
        this.reflectionCapabilities.registerPropMetadata(parameters, typeOrFunc);
    };
    Reflector.prototype.registerDowngradedNg2ComponentName = function (componentName, typeOrFunc) {
        this.reflectionCapabilities.registerDowngradedNg2ComponentName(componentName, typeOrFunc);
    };
    Reflector.prototype.downgradedNg2ComponentName = function (typeOrFunc) {
        return this.reflectionCapabilities.downgradedNg2ComponentName(typeOrFunc);
    };
    /** @internal */
    Reflector.prototype._getReflectionInfo = function (typeOrFunc) {
        /*if (isPresent(this._usedKeys)) {
         this._usedKeys.add(typeOrFunc);
         }
         return this._injectableInfo.get(typeOrFunc);*/
    };
    /** @internal */
    Reflector.prototype._containsReflectionInfo = function (typeOrFunc) { };
    return Reflector;
}(reflector_reader_1.ReflectorReader));
exports.Reflector = Reflector;
//# sourceMappingURL=reflector.js.map

/***/ }),
/* 365 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Provides read-only access to reflection data about symbols. Used internally by Angular
 * to power dependency injection and compilation.
 */
var ReflectorReader = (function () {
    function ReflectorReader() {
    }
    return ReflectorReader;
}());
exports.ReflectorReader = ReflectorReader;
//# sourceMappingURL=reflector_reader.js.map

/***/ }),
/* 366 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(71));
var bundler_1 = __webpack_require__(141);
exports.bundle = bundler_1.bundle;
//# sourceMappingURL=util.js.map

/***/ }),
/* 367 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Public API for Facade
// None :)

var type_1 = __webpack_require__(145);
exports.Type = type_1.Type;
var async_1 = __webpack_require__(142);
exports.EventEmitter = async_1.EventEmitter;
//# sourceMappingURL=facade.js.map

/***/ }),
/* 368 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var browser_utils_1 = __webpack_require__(369);
__export(__webpack_require__(370));
exports.platformBrowserDynamic = function () {
    return {
        bootstrapModule: browser_utils_1.createBootstrapFn(),
    };
};
//# sourceMappingURL=browser.js.map

/***/ }),
/* 369 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var lang_1 = __webpack_require__(3);
var bundler_1 = __webpack_require__(141);
function _getAppRoot(element) {
    if (typeof element === 'string') {
        return document.querySelector(element);
    }
    return element;
}
prodModeConfig.$inject = ['$compileProvider', '$httpProvider'];
function prodModeConfig($compileProvider, $httpProvider) {
    $compileProvider.debugInfoEnabled(false);
    $httpProvider.useApplyAsync(true);
}
function createBootstrapFn(bootstrapFn) {
    if (bootstrapFn === void 0) { bootstrapFn = lang_1.global.angular.bootstrap.bind(lang_1.global.angular); }
    /**
     * bootstrap angular app
     * @param {Type}  NgModule
     * @param {Array<any>}  providers
     */
    return function bootstrapModule(NgModule) {
        var angular1Module = bundler_1.bundle(NgModule);
        var angular1ModuleName = angular1Module.name;
        var strictDi = true;
        var element = document;
        if (lang_1.assertionsEnabled()) {
            console.info('Angular is running in the development mode. Call enableProdMode() to enable the production mode.');
        }
        else {
            lang_1.global.angular.module(angular1ModuleName).config(prodModeConfig);
        }
        var appRoot = _getAppRoot(element);
        lang_1.global.angular.element(document).ready(function () {
            bootstrapFn(appRoot, [angular1ModuleName], {
                strictDi: strictDi
            });
        });
    };
}
exports.createBootstrapFn = createBootstrapFn;
//# sourceMappingURL=browser_utils.js.map

/***/ }),
/* 370 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var decorators_1 = __webpack_require__(100);
/**
 * A service that can be used to get and set the title of a current HTML document.
 *
 * Since an Angular 2 application can't be bootstrapped on the entire HTML document (`<html>` tag)
 * it is not possible to bind to the `text` property of the `HTMLTitleElement` elements
 * (representing the `<title>` tag). Instead, this service can be used to set and get the current
 * title value.
 *
 * **NOTE:**
 * you need to import this service and register within root component ( root module in Angular 1 terms )
 *
 * ```typescript
 * // index.ts
 *
 * import * as angular from 'angular';
 * import { provide } from 'ng-metadata/core';
 * import { Title } from 'ng-metadata/platform';
 *
 * import { AppComponent} from './app';
 *
 * export AppModule = angular.module('myApp',[])
 *  // we need to register the service manually
    .service( ...provide( Title ) )
    .directive( ...provide( AppComponent ))
 * ```
 */
var Title = (function () {
    function Title($document) {
        this.$document = $document;
    }
    /**
     * Get the title of the current HTML document.
     * @returns {string}
     */
    Title.prototype.getTitle = function () { return this.$document[0].title; };
    /**
     * Set the title of the current HTML document.
     * @param newTitle
     */
    Title.prototype.setTitle = function (newTitle) { this.$document[0].title = newTitle || ''; };
    return Title;
}());
Title = __decorate([
    decorators_1.Injectable('Title'),
    __param(0, decorators_1.Inject('$document')),
    __metadata("design:paramtypes", [Object])
], Title);
exports.Title = Title;
//# sourceMappingURL=title.js.map

/***/ }),
/* 371 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(106);
var toSubscriber_1 = __webpack_require__(379);
var observable_1 = __webpack_require__(374);
/**
 * A representation of any set of values over any amount of time. This the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */
var Observable = (function () {
    /**
     * @constructor
     * @param {Function} subscribe the function that is  called when the Observable is
     * initially subscribed to. This function is given a Subscriber, to which new values
     * can be `next`ed, or an `error` method can be called to raise an error, or
     * `complete` can be called to notify of a successful completion.
     */
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    /**
     * Creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
     * @method lift
     * @param {Operator} operator the operator defining the operation to take on the observable
     * @return {Observable} a new observable with the Operator applied
     */
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this.source);
        }
        else {
            sink.add(this._trySubscribe(sink));
        }
        if (sink.syncErrorThrowable) {
            sink.syncErrorThrowable = false;
            if (sink.syncErrorThrown) {
                throw sink.syncErrorValue;
            }
        }
        return sink;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.syncErrorThrown = true;
            sink.syncErrorValue = err;
            sink.error(err);
        }
    };
    /**
     * @method forEach
     * @param {Function} next a handler for each value emitted by the observable
     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
     * @return {Promise} a promise that either resolves on observable completion or
     *  rejects with the handled error
     */
    Observable.prototype.forEach = function (next, PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
                PromiseCtor = root_1.root.Rx.config.Promise;
            }
            else if (root_1.root.Promise) {
                PromiseCtor = root_1.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            // Must be declared in a separate statement to avoid a RefernceError when
            // accessing subscription below in the closure due to Temporal Dead Zone.
            var subscription;
            subscription = _this.subscribe(function (value) {
                if (subscription) {
                    // if there is a subscription, then we can surmise
                    // the next handling is asynchronous. Any errors thrown
                    // need to be rejected explicitly and unsubscribe must be
                    // called manually
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscription.unsubscribe();
                    }
                }
                else {
                    // if there is NO subscription, then we're getting a nexted
                    // value synchronously during subscription. We can just call it.
                    // If it errors, Observable's `subscribe` will ensure the
                    // unsubscription logic is called, then synchronously rethrow the error.
                    // After that, Promise will trap the error and send it
                    // down the rejection path.
                    next(value);
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        return this.source.subscribe(subscriber);
    };
    /**
     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
     * @method Symbol.observable
     * @return {Observable} this instance of the observable
     */
    Observable.prototype[observable_1.observable] = function () {
        return this;
    };
    // HACK: Since TypeScript inherits static properties too, we have to
    // fight against TypeScript here so Subject can have a different static create signature
    /**
     * Creates a new cold Observable by calling the Observable constructor
     * @static true
     * @owner Observable
     * @method create
     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
     * @return {Observable} a new cold observable
     */
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
exports.Observable = Observable;
//# sourceMappingURL=Observable.js.map

/***/ }),
/* 372 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(371);
var Subscriber_1 = __webpack_require__(147);
var Subscription_1 = __webpack_require__(104);
var ObjectUnsubscribedError_1 = __webpack_require__(375);
var SubjectSubscription_1 = __webpack_require__(373);
var rxSubscriber_1 = __webpack_require__(105);
/**
 * @class SubjectSubscriber<T>
 */
var SubjectSubscriber = (function (_super) {
    __extends(SubjectSubscriber, _super);
    function SubjectSubscriber(destination) {
        _super.call(this, destination);
        this.destination = destination;
    }
    return SubjectSubscriber;
}(Subscriber_1.Subscriber));
exports.SubjectSubscriber = SubjectSubscriber;
/**
 * @class Subject<T>
 */
var Subject = (function (_super) {
    __extends(Subject, _super);
    function Subject() {
        _super.call(this);
        this.observers = [];
        this.closed = false;
        this.isStopped = false;
        this.hasError = false;
        this.thrownError = null;
    }
    Subject.prototype[rxSubscriber_1.rxSubscriber] = function () {
        return new SubjectSubscriber(this);
    };
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype.next = function (value) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        if (!this.isStopped) {
            var observers = this.observers;
            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
                copy[i].next(value);
            }
        }
    };
    Subject.prototype.error = function (err) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        this.hasError = true;
        this.thrownError = err;
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].error(err);
        }
        this.observers.length = 0;
    };
    Subject.prototype.complete = function () {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].complete();
        }
        this.observers.length = 0;
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = true;
        this.closed = true;
        this.observers = null;
    };
    Subject.prototype._trySubscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else {
            return _super.prototype._trySubscribe.call(this, subscriber);
        }
    };
    Subject.prototype._subscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else if (this.hasError) {
            subscriber.error(this.thrownError);
            return Subscription_1.Subscription.EMPTY;
        }
        else if (this.isStopped) {
            subscriber.complete();
            return Subscription_1.Subscription.EMPTY;
        }
        else {
            this.observers.push(subscriber);
            return new SubjectSubscription_1.SubjectSubscription(this, subscriber);
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new Observable_1.Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(Observable_1.Observable));
exports.Subject = Subject;
/**
 * @class AnonymousSubject<T>
 */
var AnonymousSubject = (function (_super) {
    __extends(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        _super.call(this);
        this.destination = destination;
        this.source = source;
    }
    AnonymousSubject.prototype.next = function (value) {
        var destination = this.destination;
        if (destination && destination.next) {
            destination.next(value);
        }
    };
    AnonymousSubject.prototype.error = function (err) {
        var destination = this.destination;
        if (destination && destination.error) {
            this.destination.error(err);
        }
    };
    AnonymousSubject.prototype.complete = function () {
        var destination = this.destination;
        if (destination && destination.complete) {
            this.destination.complete();
        }
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var source = this.source;
        if (source) {
            return this.source.subscribe(subscriber);
        }
        else {
            return Subscription_1.Subscription.EMPTY;
        }
    };
    return AnonymousSubject;
}(Subject));
exports.AnonymousSubject = AnonymousSubject;
//# sourceMappingURL=Subject.js.map

/***/ }),
/* 373 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscription_1 = __webpack_require__(104);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SubjectSubscription = (function (_super) {
    __extends(SubjectSubscription, _super);
    function SubjectSubscription(subject, subscriber) {
        _super.call(this);
        this.subject = subject;
        this.subscriber = subscriber;
        this.closed = false;
    }
    SubjectSubscription.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.closed = true;
        var subject = this.subject;
        var observers = subject.observers;
        this.subject = null;
        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
            return;
        }
        var subscriberIndex = observers.indexOf(this.subscriber);
        if (subscriberIndex !== -1) {
            observers.splice(subscriberIndex, 1);
        }
    };
    return SubjectSubscription;
}(Subscription_1.Subscription));
exports.SubjectSubscription = SubjectSubscription;
//# sourceMappingURL=SubjectSubscription.js.map

/***/ }),
/* 374 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(106);
function getSymbolObservable(context) {
    var $$observable;
    var Symbol = context.Symbol;
    if (typeof Symbol === 'function') {
        if (Symbol.observable) {
            $$observable = Symbol.observable;
        }
        else {
            $$observable = Symbol('observable');
            Symbol.observable = $$observable;
        }
    }
    else {
        $$observable = '@@observable';
    }
    return $$observable;
}
exports.getSymbolObservable = getSymbolObservable;
exports.observable = getSymbolObservable(root_1.root);
/**
 * @deprecated use observable instead
 */
exports.$$observable = exports.observable;
//# sourceMappingURL=observable.js.map

/***/ }),
/* 375 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when an action is invalid because the object has been
 * unsubscribed.
 *
 * @see {@link Subject}
 * @see {@link BehaviorSubject}
 *
 * @class ObjectUnsubscribedError
 */
var ObjectUnsubscribedError = (function (_super) {
    __extends(ObjectUnsubscribedError, _super);
    function ObjectUnsubscribedError() {
        var err = _super.call(this, 'object unsubscribed');
        this.name = err.name = 'ObjectUnsubscribedError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return ObjectUnsubscribedError;
}(Error));
exports.ObjectUnsubscribedError = ObjectUnsubscribedError;
//# sourceMappingURL=ObjectUnsubscribedError.js.map

/***/ }),
/* 376 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when one or more errors have occurred during the
 * `unsubscribe` of a {@link Subscription}.
 */
var UnsubscriptionError = (function (_super) {
    __extends(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
        _super.call(this);
        this.errors = errors;
        var err = Error.call(this, errors ?
            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
        this.name = err.name = 'UnsubscriptionError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return UnsubscriptionError;
}(Error));
exports.UnsubscriptionError = UnsubscriptionError;
//# sourceMappingURL=UnsubscriptionError.js.map

/***/ }),
/* 377 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
//# sourceMappingURL=isArray.js.map

/***/ }),
/* 378 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isObject(x) {
    return x != null && typeof x === 'object';
}
exports.isObject = isObject;
//# sourceMappingURL=isObject.js.map

/***/ }),
/* 379 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Subscriber_1 = __webpack_require__(147);
var rxSubscriber_1 = __webpack_require__(105);
var Observer_1 = __webpack_require__(146);
function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
            return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber_1.rxSubscriber]) {
            return nextOrObserver[rxSubscriber_1.rxSubscriber]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber_1.Subscriber(Observer_1.empty);
    }
    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
}
exports.toSubscriber = toSubscriber;
//# sourceMappingURL=toSubscriber.js.map

/***/ }),
/* 380 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var errorObject_1 = __webpack_require__(148);
var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        errorObject_1.errorObject.e = e;
        return errorObject_1.errorObject;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
exports.tryCatch = tryCatch;
;
//# sourceMappingURL=tryCatch.js.map

/***/ }),
/* 381 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(136);
var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'app',
        template: "\n        <h1>Hello World</h1>\n    ",
    })
], AppComponent);
exports.AppComponent = AppComponent;


/***/ }),
/* 382 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(151);
var platform_browser_dynamic_1 = __webpack_require__(152);
var app_module_ts_1 = __webpack_require__(153);
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_ts_1.AppModule);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map