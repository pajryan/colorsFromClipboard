/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("fs-jetpack");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {"name":"development","description":"Add here any environment specific stuff you like."}

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylesheets_main_css__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylesheets_main_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylesheets_main_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_context_menu_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_external_links_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_electron__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_fs_jetpack__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_fs_jetpack___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_fs_jetpack__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_env__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_env___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_env__);
 // Small helpers you might want to keep


 // ----------------------------------------------------------------------------
// Everything below is just to show you how it works. You can delete all of it.
// ----------------------------------------------------------------------------




const app = __WEBPACK_IMPORTED_MODULE_3_electron__["remote"].app;
const appDir = __WEBPACK_IMPORTED_MODULE_4_fs_jetpack___default.a.cwd(app.getAppPath()); // const RGBaster = require('rgbaster');
// Holy crap! This is browser window with HTML and stuff, but I can read
// files from disk like it's node.js! Welcome to Electron world :)

const manifest = appDir.read("package.json", "json");

const pasteImage = __webpack_require__(17);

const extractColors = __webpack_require__(20);

const _ = __webpack_require__(21);

const rgb2hex = __webpack_require__(22);

const {
  clipboard
} = __webpack_require__(0); // Listen for all image paste events on a page


pasteImage.on('paste-image', function (source) {
  //clear existing
  let tgt = document.getElementById("img");
  tgt.innerHTML = ""; // console.log("returned:", source)

  var pastedImage = new Image();
  pastedImage.id = "pastedImage";

  pastedImage.onload = function () {
    // Have the image loaded, get colors
    getImageColors(); // self.emit('paste-image', pastedImage);
  };

  pastedImage.src = source;
  tgt.appendChild(pastedImage);
});

function getImageColors() {
  var img = document.getElementById('pastedImage');
  extractColors.colors(img, {
    success: function (payload) {
      let cc = [];

      for (let itm in payload.colors) {
        cc.push({
          rgb: itm,
          count: payload.colors[itm]
        });
      }

      cc = cc.filter(o => o.count > 0);
      cc = _.orderBy(cc, ["count"], ['desc']);
      buildcolorUI(cc);
    }
  });
}

function buildcolorUI(cc) {
  var ch = document.getElementById("colorInfo");
  document.getElementById("clipText").style.display = "block";
  cc.forEach((c, i) => {
    var dv = document.createElement("div");
    dv.className = "keyWrap";
    var kb = document.createElement("div");
    kb.className = "keyBox";
    kb.style.background = "rgb(" + c.rgb + ")";
    dv.appendChild(kb);
    var rgbStr = "rgb(" + c.rgb + ")";
    var spn = document.createElement("span");
    var spnH = document.createElement("span");
    spnH.className = "hex";
    var spnR = document.createElement("span");
    spnR.className = "rgb";
    spnH.innerHTML = rgb2hex(rgbStr).hex;
    spnR.innerHTML = "rgb(" + c.rgb + ")";
    spn.appendChild(spnH);
    spn.appendChild(spnR);
    spn.className = "keyText";
    dv.appendChild(spn);
    spnH.addEventListener('click', e => {
      clipboard.writeText(e.target.innerHTML);
    });
    spnR.addEventListener('click', e => {
      clipboard.writeText(e.target.innerHTML);
    });
    ch.appendChild(dv);
  });
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(11);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(13)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./main.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./main.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)(false);
// imports


// module
exports.push([module.i, "html,\nbody {\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 30px;\n}\n\nbody {\n  font-family: sans-serif;\n  color: #525252;\n}\n\na {\n  text-decoration: none;\n  color: #cb3837;\n}\n\n#colorInfo {\n  height: 200px;\n  overflow: auto;\n  display: flex;\n  flex-direction: column;\n  flex-wrap: wrap;\n}\n\n  .keyWrap{\n    padding:4px;\n  }\n\n    .keyBox{\n      width: 20px;\n      height: 20px;\n      float:left;\n      border: 1px solid #ccc;\n    }\n\n\n\n    .keyText{\n      font-size: 0.8em;\n      padding-left:8px;\n      font-family: 'Courier New', Courier, monospace;\n    }\n\n    .keyText .hex{\n\n    }\n\n    .keyText .rgb{\n      color:#666;\n      padding-left: 10px;\n      padding-right: 10px;\n    }\n\n#img{\n  padding-top:30px;\n  border-top: 1px solid #333;\n  text-align: center;\n}    ", ""]);

// exports


/***/ }),
/* 12 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
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
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 13 */
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

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(14);

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
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
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

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
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

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

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
/* 14 */
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
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
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


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_electron__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_electron__);
// This gives you default context menu (cut, copy, paste)
// in all input fields and textareas across your app.

const Menu = __WEBPACK_IMPORTED_MODULE_0_electron__["remote"].Menu;
const MenuItem = __WEBPACK_IMPORTED_MODULE_0_electron__["remote"].MenuItem;

const isAnyTextSelected = () => {
  return window.getSelection().toString() !== "";
};

const cut = new MenuItem({
  label: "Cut",
  click: () => {
    document.execCommand("cut");
  }
});
const copy = new MenuItem({
  label: "Copy",
  click: () => {
    document.execCommand("copy");
  }
});
const paste = new MenuItem({
  label: "Paste",
  click: () => {
    document.execCommand("paste");
  }
});
const normalMenu = new Menu();
normalMenu.append(copy);
const textEditingMenu = new Menu();
textEditingMenu.append(cut);
textEditingMenu.append(copy);
textEditingMenu.append(paste);
document.addEventListener("contextmenu", event => {
  switch (event.target.nodeName) {
    case "TEXTAREA":
    case "INPUT":
      event.preventDefault();
      textEditingMenu.popup(__WEBPACK_IMPORTED_MODULE_0_electron__["remote"].getCurrentWindow());
      break;

    default:
      if (isAnyTextSelected()) {
        event.preventDefault();
        normalMenu.popup(__WEBPACK_IMPORTED_MODULE_0_electron__["remote"].getCurrentWindow());
      }

  }
}, false);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_electron__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_electron__);
// Convenient way for opening links in external browser, not in the app.
// Useful especially if you have a lot of links to deal with.
//
// Usage:
//
// Every link with class ".js-external-link" will be opened in external browser.
// <a class="js-external-link" href="http://google.com">google</a>
//
// The same behaviour for many links can be achieved by adding
// this class to any parent tag of an anchor tag.
// <p class="js-external-link">
//    <a href="http://google.com">google</a>
//    <a href="http://bing.com">bing</a>
// </p>


const supportExternalLinks = event => {
  let href;
  let isExternal = false;

  const checkDomElement = element => {
    if (element.nodeName === "A") {
      href = element.getAttribute("href");
    }

    if (element.classList.contains("js-external-link")) {
      isExternal = true;
    }

    if (href && isExternal) {
      __WEBPACK_IMPORTED_MODULE_0_electron__["shell"].openExternal(href);
      event.preventDefault();
    } else if (element.parentElement) {
      checkDomElement(element.parentElement);
    }
  };

  checkDomElement(event.target);
};

document.addEventListener("click", supportExternalLinks, false);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //PR pulled from: https://github.com/redgeoff/paste-image
// This code is heavily based on Joel Basada's great work at
// http://joelb.me/blog/2011/code-snippet-accessing-clipboard-images-with-javascript/

var inherits = __webpack_require__(18),
    events = __webpack_require__(19);

var PasteImage = function () {
  this._initialized = false;

  this._wrapEmitterFns();
};

inherits(PasteImage, events.EventEmitter); // We want to wrap emitter functions so that we can ensure that we have initialized the document
// listeners before listening to any paste events

PasteImage.prototype._wrapEmitterFns = function () {
  var self = this,
      fns = ['on', 'once'];
  fns.forEach(function (fn) {
    PasteImage.prototype[fn] = function () {
      if (!self._initialized) {
        self._init();
      }

      return events.EventEmitter.prototype[fn].apply(self, arguments);
    };
  });
};

PasteImage.prototype._clipboardSupported = function () {
  return window.Clipboard;
};

PasteImage.prototype._pasteCatcherFocus = function () {
  this._pasteCatcher.focus();
};

PasteImage.prototype._listenForClick = function () {
  var self = this; // Make sure it is always in focus. We ignore code coverage for this area as there does not appear
  // to be an easy cross-browser way of triggering a click event on the document
  //

  /* istanbul ignore next */

  document.addEventListener('click', function () {
    self._pasteCatcherFocus();
  });
};

PasteImage.prototype._createPasteCatcherIfNeeded = function () {
  // We start by checking if the browser supports the Clipboard object. If not, we need to create a
  // contenteditable element that catches all pasted data
  if (!this._clipboardSupported()) {
    this._pasteCatcher = document.createElement('div'); // Firefox allows images to be pasted into contenteditable elements

    this._pasteCatcher.setAttribute('contenteditable', ''); // We can hide the element and append it to the body,


    this._pasteCatcher.style.opacity = 0; // Use absolute positioning so that the paste catcher doesn't take up extra space. Note: we
    // cannot set style.display='none' as this will disable the functionality.

    this._pasteCatcher.style.position = 'absolute';
    document.body.appendChild(this._pasteCatcher);

    this._pasteCatcher.focus();

    this._listenForClick();
  }
};

PasteImage.prototype._listenForPaste = function () {
  var self = this; // Add the paste event listener. We ignore code coverage for this area as there does not appear to
  // be a cross-browser way of triggering a pase event
  //

  /* istanbul ignore next */

  window.addEventListener('paste', function (e) {
    self._pasteHandler(e);
  });
};

PasteImage.prototype._init = function () {
  this._createPasteCatcherIfNeeded();

  this._listenForPaste();

  this._initialized = true;
};

PasteImage.prototype._checkInputOnNextTick = function () {
  var self = this; // This is a cheap trick to make sure we read the data AFTER it has been inserted.

  setTimeout(function () {
    self._checkInput();
  }, 1);
};

PasteImage.prototype._pasteHandler = function (e) {
  // Starting to paste image
  this.emit('pasting-image', e); // We need to check if event.clipboardData is supported (Chrome)

  if (e.clipboardData && e.clipboardData.items) {
    // Get the items from the clipboard
    var items = e.clipboardData.items; // Loop through all items, looking for any kind of image

    for (var i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        // We need to represent the image as a file
        var blob = items[i].getAsFile(); // Use a URL or webkitURL (whichever is available to the browser) to create a temporary URL
        // to the object

        var URLObj = this._getURLObj();

        var source = URLObj.createObjectURL(blob); // The URL can then be used as the source of an image

        this._createImage(source);
      } else {
        document.getElementById("img").innerHTML = "you didn't paste an image... looks like it was <b>" + items[i].type + "</b>";
      }
    } // If we can't handle clipboard data directly (Firefox), we need to read what was pasted from
    // the contenteditable element

  } else {
    this._checkInputOnNextTick();
  }
};

PasteImage.prototype._getURLObj = function () {
  return window.URL || window.webkitURL;
}; // Parse the input in the paste catcher element


PasteImage.prototype._checkInput = function () {
  // Store the pasted content in a variable
  var child = this._pasteCatcher.childNodes[0]; // Clear the inner html to make sure we're always getting the latest inserted content

  this._pasteCatcher.innerHTML = '';

  if (child) {
    // If the user pastes an image, the src attribute will represent the image as a base64 encoded
    // string.
    if (child.tagName === 'IMG') {
      this._createImage(child.src);
    }
  }
}; // Creates a new image from a given source


PasteImage.prototype._createImage = function (source) {
  var self = this; //PR - want to return the blob

  self.emit('paste-image', source); //PR below returns an image
  // var pastedImage = new Image();
  // pastedImage.onload = function () {
  //   // You now have the image!
  //   self.emit('paste-image', pastedImage);
  // };
  // pastedImage.src = source;
};

module.exports = new PasteImage();

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("inherits");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Helper functions.

var getContext = function (imgObj) {
  let cv = document.createElement("canvas");
  cv.width = imgObj.width;
  cv.height = imgObj.height; // document.body.appendChild(cv)

  return cv.getContext('2d');
};

var getImageData = function (img, loaded) {
  var imgObj = new Image();
  var imgSrc = img.src || img; // Can't set cross origin to be anonymous for data url's
  // https://github.com/mrdoob/three.js/issues/1305

  if (imgSrc.substring(0, 5) !== 'data:') imgObj.crossOrigin = "Anonymous";

  imgObj.onload = function () {
    var context = getContext(imgObj);
    context.drawImage(imgObj, 0, 0);
    var imageData = context.getImageData(0, 0, imgObj.width, imgObj.height);
    loaded && loaded(imageData.data);
  };

  imgObj.src = imgSrc;
};

var makeRGB = function (name) {
  return ['rgb(', name, ')'].join('');
};

var mapPalette = function (palette) {
  return palette.map(function (c) {
    return makeRGB(c.name);
  });
}; // RGBaster Object
// ---------------
//


var BLOCKSIZE = 5;

var RGBaster = function () {};

RGBaster.prototype.colors = function (img, opts) {
  opts = opts || {};
  var exclude = opts.exclude || []; // for example, to exclude white and black:  [ '0,0,0', '255,255,255' ]

  getImageData(img, function (data) {
    var length = data.length,
        //( img.width * img.height ) || data.length,
    colors = {},
        rgb = [],
        rgbString = ""; // Loop over all pixels, in BLOCKSIZE iterations.

    var i = 0;

    while (i < length) {
      rgb[0] = data[i];
      rgb[1] = data[i + 1];
      rgb[2] = data[i + 2];
      rgbString = rgb.join(","); // skip undefined data

      if (rgb.indexOf(undefined) !== -1) {
        // Increment!
        i += BLOCKSIZE * 4;
        continue;
      } // Keep track of counts.


      if (rgbString in colors) {
        colors[rgbString] = colors[rgbString] + 1;
      } else {
        colors[rgbString] = 1;
      } // Increment!


      i += BLOCKSIZE * 4;
    }

    if (opts.success) {
      opts.success({
        colors: colors
      });
    }
  });
};

module.exports = new RGBaster();

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("rgb2hex");

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map