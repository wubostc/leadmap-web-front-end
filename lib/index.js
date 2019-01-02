(function webpackUniversalModuleDefinition(root, factory) {
	//leadmap libx
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("axios"), require("qs"), require("react"), require("react-router-dom"));
	//leadmap libx
	else if(typeof define === 'function' && define.amd)
		define(["axios", "qs", "react", "react-router-dom"], factory);
	//leadmap libx
	else if(typeof exports === 'object')
		exports["libx"] = factory(require("axios"), require("qs"), require("react"), require("react-router-dom"));
	//leadmap libx
	else
		root["libx"] = factory(root["axios"], root["qs"], root["react"], root["react-router-dom"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__3__, __WEBPACK_EXTERNAL_MODULE__4__, __WEBPACK_EXTERNAL_MODULE__7__, __WEBPACK_EXTERNAL_MODULE__8__) {
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var cookies_1 = __webpack_require__(1);
exports.Cookies = cookies_1.default;
__export(__webpack_require__(2));
__export(__webpack_require__(5));
__export(__webpack_require__(6));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var COOKIES;
(function (COOKIES) {
    COOKIES.__base_cookies = {
        getItem: function (sKey) {
            return (decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" +
                encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") +
                "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null);
        },
        hasItem: function (sKey) {
            return new RegExp("(?:^|;\\s*)" +
                encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") +
                "\\s*\\=").test(document.cookie);
        },
        keys: function () {
            if (!!!document.cookie) {
                return [];
            }
            const aKeys = document.cookie
                .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "")
                .split(/\s*(?:\=[^;]*)?;\s*/);
            for (let nIdx = 0; nIdx < aKeys.length; nIdx++) {
                aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
            }
            return aKeys;
        },
        removeItem: function (sKey, sPath, sDomain) {
            if (!sKey || !this.hasItem(sKey)) {
                return false;
            }
            document.cookie =
                encodeURIComponent(sKey) +
                    "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
                    (sDomain ? "; domain=" + sDomain : "") +
                    (sPath ? "; path=" + sPath : "");
            return true;
        },
        setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
            if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
                return false;
            }
            let sExpires = "";
            if (vEnd) {
                if (vEnd instanceof Number) {
                    sExpires =
                        vEnd === Infinity
                            ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT"
                            : "; max-age=" + vEnd;
                }
                else if (vEnd instanceof String) {
                    sExpires = "; expires=" + vEnd;
                }
                else if (vEnd instanceof Date) {
                    sExpires = "; expires=" + vEnd.toUTCString();
                }
            }
            document.cookie =
                encodeURIComponent(sKey) +
                    "=" +
                    encodeURIComponent(sValue) +
                    sExpires +
                    (sDomain ? "; domain=" + sDomain : "") +
                    (sPath ? "; path=" + sPath : "") +
                    (bSecure ? "; secure" : "");
            return true;
        }
    };
})(COOKIES || (COOKIES = {}));
const cookies = COOKIES.__base_cookies;
exports.default = cookies;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(__webpack_require__(3));
const cookies_1 = __importDefault(__webpack_require__(1));
const qs = __importStar(__webpack_require__(4));
var CT;
(function (CT) {
    CT[CT["URLENCODED"] = 0] = "URLENCODED";
    CT[CT["JSON"] = 1] = "JSON";
})(CT = exports.CT || (exports.CT = {}));
function interceptors_response(res) {
    return res;
}
function interceptors_error(err) {
    return Promise.reject(err);
}
const _config = {
    validateStatus: (status) => {
        return status >= 200 && status < 300;
    },
    withCredentials: true
};
class CAxios {
    constructor(opts) {
        let c = {};
        switch (opts.ct) {
            case 0:
                {
                    c = Object.assign({}, _config, { "headers": { "Content-Type": "application/x-www-form-urlencoded" } });
                    this.instance = axios_1.default.create(c);
                    this.instance.interceptors.request.use(CAxios.request1, interceptors_error);
                    this.instance.interceptors.response.use(interceptors_response, interceptors_error);
                }
                break;
            case 1:
                {
                    c = Object.assign({}, _config, { "headers": { "Content-Type": "application/json" } });
                    this.instance = axios_1.default.create(c);
                    this.instance.interceptors.request.use(CAxios.request, interceptors_error);
                    this.instance.interceptors.response.use(interceptors_response, interceptors_error);
                }
                break;
            default:
                break;
        }
    }
    static request(config) {
        CAxios.set_auth(config);
        return config;
    }
    static request1(config) {
        CAxios.set_auth(config);
        config.data = qs.stringify(config.data, { allowDots: true });
        return config;
    }
    get_inst() {
        return this.instance;
    }
    static set_auth(config) {
        let payload;
        let token;
        try {
            token = /lb_token=([^&]+)/.exec(location.href)[1];
        }
        catch (e) {
            token = cookies_1.default.getItem("lb_token");
        }
        if (token) {
            payload = `lb_token=${token}`;
        }
        else {
            payload = document.cookie;
        }
        config.headers["X-Requested-With"] = payload;
    }
}
exports.CAxios = CAxios;
const axios = new CAxios({ ct: 0 }).get_inst();
exports.axios = axios;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__4__;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function less(l, r) {
    return l < r;
}
function qsort(arr, begin, end, comp = less) {
    if (begin >= end)
        return;
    let i = begin | 0, j = end | 0;
    const base = arr[i];
    while (i < j) {
        while (!comp(arr[j], base) && i < j) {
            j -= 1;
        }
        arr[i] = arr[j];
        while (comp(arr[i], base) && i < j) {
            i += 1;
        }
        arr[j] = arr[i];
    }
    arr[i] = base;
    qsort(arr, begin | 0, i - 1, less);
    qsort(arr, i + 1, end | 0, less);
}
exports.qsort = qsort;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(__webpack_require__(7));
const react_router_dom_1 = __webpack_require__(8);
__webpack_require__(9);
function gen_path(push_path, base_path = "") {
    const __fn = (_path) => {
        if (!/^\//.test(_path)) {
            _path = `${base_path}/${_path}`;
        }
        return _path;
    };
    if (typeof push_path === "string") {
        return __fn(push_path);
    }
    else {
        push_path.forEach((v, i, arr_path) => {
            arr_path[i] = __fn(v);
        });
        return push_path;
    }
}
const BouncingLoader = () => React.createElement("div", { className: "CAsyncRoute-bouncing-loader" },
    React.createElement("div", null),
    React.createElement("div", null),
    React.createElement("div", null));
function get_future(toload, toload_matched, match) {
    if (toload_matched) {
        const future = toload_matched(match);
        if (future instanceof Array) {
            return [React.lazy(future[0]), future[1]];
        }
        else {
            return [React.lazy(future)];
        }
    }
    else {
        if (toload instanceof Array) {
            return [React.lazy(toload[0]), toload[1]];
        }
        else {
            return [React.lazy(toload)];
        }
    }
}
class CAsyncRoute extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            exception: null,
        };
    }
    render() {
        const { exception } = this.state;
        if (exception)
            return React.createElement(React.Fragment, null, exception);
        const { location, match, history, toload, toload_matched, props } = this.props;
        const future = get_future(toload, toload_matched, match);
        const Component = future[0];
        const restProps = Object.assign({}, future[1], props, { location, match, history });
        return (React.createElement(React.Suspense, { fallback: React.createElement(BouncingLoader, null) },
            React.createElement(Component, Object.assign({}, restProps))));
    }
    componentDidCatch(exception) {
        console.error("Failed to load.", exception);
        if (!this.state.exception) {
            this.setState({ exception });
        }
    }
    static redirect_factory(menu, mapping_routes, base_path, key) {
        let redirect_to = mapping_routes[menu.page].path;
        const { with_redirect = {} } = mapping_routes[menu.page];
        if (!with_redirect)
            return null;
        redirect_to = gen_path(redirect_to, base_path);
        const re = /(?=\/:).+/;
        let path_is_incorrect;
        if (typeof redirect_to === "string") {
            path_is_incorrect = re.test(redirect_to);
            if (path_is_incorrect) {
                if (menu.subMenus && menu.subMenus.length) {
                    redirect_to = redirect_to.replace(re, `/${menu.subMenus[0].page}`);
                }
                else {
                    console.info(`The page ${menu.page} dosen't has member property subMenus, but you are using match pattern.`);
                    redirect_to = redirect_to.replace(re, "");
                }
            }
            return React.createElement(react_router_dom_1.Redirect, Object.assign({}, Object.assign({ to: redirect_to }, with_redirect, { key })));
        }
        else {
            throw new Error("redirect_to: " + JSON.stringify(redirect_to));
        }
    }
    static dynamic_renders_routers(subMenus, mapping_routes, { with_switch = {}, with_redirect = {}, base_path = "" } = {}) {
        const routes = [];
        const router_factory = (i, menu, fallback_path) => {
            const lazy_props = Object.assign({}, mapping_routes[menu.page], { path: gen_path(mapping_routes[menu.page].path || fallback_path, base_path) });
            const { location, component, render, children, path, exact, sensitive, strict } = lazy_props;
            const { toload, toload_matched, renderFactory = "render", props } = lazy_props;
            const route_props = { location, component, render, children, path, exact, sensitive, strict };
            const asroute_props = { toload, toload_matched, renderFactory, props };
            if (component || render) {
                console.assert(!toload && !toload_matched && !renderFactory && !props, "CAsyncRoute.dynamic_renders_routers(DRR) loads RC synchornously, properties of CAsyncRoute will be ignored.");
                return React.createElement(react_router_dom_1.Route, Object.assign({ key: i }, route_props));
            }
            else {
                if (asroute_props.renderFactory === "render") {
                    return (React.createElement(react_router_dom_1.Route, Object.assign({ key: i }, route_props, { render: (__route_props) => React.createElement(CAsyncRoute, Object.assign({}, Object.assign({}, asroute_props, __route_props))) })));
                }
                else {
                    console.warn(`renderFactory: "component" is not implementioned!`);
                    return React.createElement(react_router_dom_1.Route, Object.assign({ key: i }, route_props));
                }
            }
        };
        subMenus.forEach((v, i) => {
            if (!mapping_routes[v.page]) {
                console.warn(`The router ${v.page} is not implementioned!`, v);
                if (mapping_routes["*"]) {
                    routes.push(router_factory(i, { page: "*", icon: "", label: "", subMenus: [] }, v.page));
                }
            }
            else {
                routes.push(router_factory(i, v));
            }
        });
        if (with_redirect) {
            const _jsx_redirect = CAsyncRoute.redirect_factory(subMenus[0], mapping_routes, base_path, routes.length);
            if (_jsx_redirect) {
                routes.push(_jsx_redirect);
            }
        }
        if (with_switch) {
            return React.createElement(react_router_dom_1.Switch, Object.assign({}, with_switch), routes);
        }
        return routes;
    }
}
exports.CAsyncRoute = CAsyncRoute;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__7__;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8__;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(10);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"sourceMap":true,"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(12)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(true);
// Module
exports.push([module.i, "@-webkit-keyframes CAsyncRoute-bouncing-loader {\n  to {\n    opacity: 0.1;\n    -webkit-transform: translate3d(0, -10px, 0);\n            transform: translate3d(0, -10px, 0);\n  }\n}\n@keyframes CAsyncRoute-bouncing-loader {\n  to {\n    opacity: 0.1;\n    -webkit-transform: translate3d(0, -10px, 0);\n            transform: translate3d(0, -10px, 0);\n  }\n}\n.CAsyncRoute-bouncing-loader {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: center;\n      justify-content: center;\n}\n.CAsyncRoute-bouncing-loader > div {\n  width: 1rem;\n  max-width: 13px;\n  height: 1rem;\n  max-height: 13px;\n  margin: 1rem 0.1rem;\n  background: #8385aa;\n  border-radius: 50%;\n  -webkit-animation: CAsyncRoute-bouncing-loader 0.6s infinite alternate;\n          animation: CAsyncRoute-bouncing-loader 0.6s infinite alternate;\n}\n.CAsyncRoute-bouncing-loader > div:nth-child(2) {\n  -webkit-animation-delay: 0.2s;\n          animation-delay: 0.2s;\n}\n.CAsyncRoute-bouncing-loader > div:nth-child(3) {\n  -webkit-animation-delay: 0.4s;\n          animation-delay: 0.4s;\n}\n", "",{"version":3,"sources":["index.less"],"names":[],"mappings":"AAAA;EACE;IACE,aAAa;IACb,4CAAoC;YAApC,oCAAoC;GACrC;CACF;AALD;EACE;IACE,aAAa;IACb,4CAAoC;YAApC,oCAAoC;GACrC;CACF;AACD;EACE,qBAAc;EAAd,cAAc;EACd,sBAAwB;MAAxB,wBAAwB;CACzB;AACD;EACE,YAAY;EACZ,gBAAgB;EAChB,aAAa;EACb,iBAAiB;EACjB,oBAAoB;EACpB,oBAAoB;EACpB,mBAAmB;EACnB,uEAA+D;UAA/D,+DAA+D;CAChE;AACD;EACE,8BAAsB;UAAtB,sBAAsB;CACvB;AACD;EACE,8BAAsB;UAAtB,sBAAsB;CACvB","file":"index.less","sourcesContent":["@keyframes CAsyncRoute-bouncing-loader {\n  to {\n    opacity: 0.1;\n    transform: translate3d(0, -10px, 0);\n  }\n}\n.CAsyncRoute-bouncing-loader {\n  display: flex;\n  justify-content: center;\n}\n.CAsyncRoute-bouncing-loader > div {\n  width: 1rem;\n  max-width: 13px;\n  height: 1rem;\n  max-height: 13px;\n  margin: 1rem 0.1rem;\n  background: #8385aa;\n  border-radius: 50%;\n  animation: CAsyncRoute-bouncing-loader 0.6s infinite alternate;\n}\n.CAsyncRoute-bouncing-loader > div:nth-child(2) {\n  animation-delay: 0.2s;\n}\n.CAsyncRoute-bouncing-loader > div:nth-child(3) {\n  animation-delay: 0.4s;\n}\n"],"sourceRoot":""}]);



/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(13);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 13 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map