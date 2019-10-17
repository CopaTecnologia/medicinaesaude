// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"libs/slideshow.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SlideShow =
/*#__PURE__*/
function () {
  function SlideShow(_ref) {
    var parent = _ref.parent,
        children = _ref.children,
        start = _ref.start,
        interval = _ref.interval;

    _classCallCheck(this, SlideShow);

    this.parent = parent instanceof HTMLElement ? parent : document.querySelector(parent);
    this.children = children instanceof NodeList ? children : document.querySelectorAll(children);
    this.interval = interval || 3000;
    this.render(start);
  }

  _createClass(SlideShow, [{
    key: "render",
    value: function render(i) {
      var _this = this;

      i = this.setIndex(i);
      var current = this.children[i];
      var prev = this.children[i - 1] || this.children[this.children.length - 1];
      var next = this.children[i + 1] || this.children[0];
      this.forEach(function (slide) {
        var state = slide === current ? 'current' : slide === prev ? 'prev' : slide === next ? 'next' : 'idle';

        _this.setState(slide, state);
      });
    }
  }, {
    key: "setState",
    value: function setState(slide, state) {
      if (!(slide instanceof HTMLElement)) return console.log("SlideShow.setState: ".concat(slide, " is not an HTMLElement!"), slide);
      ['idle', 'prev', 'current', 'next'].forEach(function (name) {
        if (name === state) slide.classList.add(name);else slide.classList.remove(name);
      });
    }
  }, {
    key: "setIndex",
    value: function setIndex(i) {
      this.index = isNaN(i) || !isFinite(i) ? 0 : i >= this.children.length ? 0 : i < 0 ? this.children.length - 1 : i;
      return this.index;
    }
  }, {
    key: "setAttr",
    value: function setAttr(attr, callbacks) {
      var _this2 = this;

      if (!attr || !callbacks) return;
      var isSet = this.parent && this.parent.hasAttribute(attr);
      if (!isSet) return;
      var options = this.parent.getAttribute(attr).split(' ').filter(function (s) {
        return s.trim();
      }).map(function (s) {
        return s.trim();
      });
      if (callbacks instanceof Function) return callbacks.call(this, options);
      var beforeFn = callbacks['beforeall'];
      if (beforeFn instanceof Function) beforeFn.call(this);
      if (options.length) options.forEach(function (o) {
        var fn = callbacks[o];
        if (!(fn instanceof Function)) console.log("slider[".concat(attr, "]:"), o, _typeof(fn), fn);else fn.call(_this2);
      });
      var afterFn = callbacks['afterall'];
      if (afterFn instanceof Function) afterFn.call(this);
    }
  }, {
    key: "goTo",
    value: function goTo(index) {
      this.render(index);
    }
  }, {
    key: "goPrev",
    value: function goPrev() {
      this.render(this.index - 1);
    }
  }, {
    key: "goNext",
    value: function goNext() {
      this.render(this.index + 1);
    }
  }, {
    key: "play",
    value: function play() {
      var _this3 = this;

      this.timeoutId = setInterval(function () {
        _this3.goNext();
      }, this.interval);
    }
  }, {
    key: "pause",
    value: function pause() {
      if (this.timeoutId) clearInterval(this.timeoutId);
    }
  }, {
    key: "forEach",
    value: function forEach(fn) {
      if (!fn instanceof Function) return;
      Array.prototype.forEach.call(this.children, fn);
    }
  }, {
    key: "isPlaying",
    get: function get() {
      return !!this.timeoutId;
    }
  }]);

  return SlideShow;
}();

exports.default = SlideShow;
},{}],"libs/slidingBoxes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function slidingBoxes(boxes) {
  if (typeof boxes === 'string') boxes = document.querySelectorAll(boxes);
  if (!boxes.length) return;
  window.addEventListener('scroll', setSlidingClasses);
  window.addEventListener('resize', setSlidingClasses);
  window.addEventListener('load', setSlidingClasses);

  function setSlidingClasses() {
    Array.prototype.forEach.call(boxes, function (item) {
      var vBegin = item.offsetTop - window.innerHeight * .8;
      var vEnd = item.offsetTop + item.offsetHeight * .8;

      if (pageYOffset < vBegin) {
        item.classList.add('below-screen');
        item.classList.remove('above-screen');
      } else if (pageYOffset > vEnd) {
        item.classList.remove('below-screen');
        item.classList.add('above-screen');
      } else {
        item.classList.remove('below-screen');
        item.classList.remove('above-screen');
      }

      ;
    });
  }
}

var _default = slidingBoxes;
exports.default = _default;
},{}],"libs/loadGoogleMaps.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function loadGoogleMaps() {
  var mapFrames = document.querySelectorAll('iframe[data-map-src]');
  Array.prototype.forEach.call(mapFrames, renderMap);

  function renderMap(frame) {
    var src = frame.getAttribute('data-map-src');
    var height = frame.getAttribute('data-map-height');
    if (!src) return;
    frame.src = src;
    if (height) frame.height = height;
  }
}

var _default = loadGoogleMaps;
exports.default = _default;
},{}],"libs/bindGoogleAnalyticsEvents.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function bindGoogleAnalyticsEvents() {
  window.gtag = window.gtag || console.log;
  if (!window.gtag || !(window.gtag instanceof Function)) return;
  var shareButtons = document.querySelectorAll('[data-ga-event]');
  Array.prototype.forEach.call(shareButtons, function (btn) {
    var eventType = btn.getAttribute('data-ga-event');
    btn.addEventListener(eventType, function () {
      window.gtag('event', eventType, {
        event_category: this.getAttribute('data-ga-category') || 'Sem categoria',
        event_label: this.getAttribute('data-ga-label') || this.title,
        value: this.getAttribute('data-ga-value') || ''
      });
    });
  });
}

var _default = bindGoogleAnalyticsEvents;
exports.default = _default;
},{}],"libs/util.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestAnimFrame = void 0;

var requestAnimFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
}();

exports.requestAnimFrame = requestAnimFrame;
},{}],"libs/parallax.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = require("../libs/util");

function parallax(container, contents) {
  if (typeof container === 'string') container = document.querySelector(container);
  if (!container) return;
  var maxScrollOffset = container.offsetTop + container.offsetHeight;
  contents = contents.filter(function (content) {
    if (typeof content.element === 'string') content.element = container.querySelector(content.element);
    if (!content.element || !content.amount) return false;
    return true;
  });
  if (!contents.length) return;
  window.addEventListener('gesturechange', handleScroll, {
    passive: true
  });
  window.addEventListener('touchmove', handleScroll, {
    passive: true
  });
  window.addEventListener('scroll', handleScroll);

  function handleScroll() {
    if (scrollY > maxScrollOffset) return false;
    (0, _util.requestAnimFrame)(function () {
      contents.forEach(function (c) {
        c.element.style.webkitTransform = "translateY(".concat(scrollY * c.amount, "px)");
        c.element.style.transform = "translateY(".concat(scrollY * c.amount, "px)");
      });
    });
  }
}

var _default = parallax;
exports.default = _default;
},{"../libs/util":"libs/util.js"}],"main.js":[function(require,module,exports) {
"use strict";

var _slideshow = _interopRequireDefault(require("./libs/slideshow"));

var _slidingBoxes = _interopRequireDefault(require("./libs/slidingBoxes"));

var _loadGoogleMaps = _interopRequireDefault(require("./libs/loadGoogleMaps"));

var _bindGoogleAnalyticsEvents = _interopRequireDefault(require("./libs/bindGoogleAnalyticsEvents"));

var _parallax = _interopRequireDefault(require("./libs/parallax"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.body.addEventListener('touchstart', function () {});
var sliderAttributes = {
  'data-autoplay': {
    'beforeall': function beforeall() {
      var _this = this;

      this.play();
      this.parent.addEventListener('mouseover', function () {
        return _this.pause();
      });
      this.parent.addEventListener('mouseout', function () {
        return _this.play();
      });
    },
    'wait-img-load': function waitImgLoad() {
      var _this2 = this;

      var image = this.children[0].querySelector('.slide-image');
      if (!image || !image.style.backgroundImage) return;
      var src = image.style.backgroundImage.match(/\((.*?)\)/)[1].replace(/('|")/g, '');
      if (!src) return;
      var img = new Image();

      img.onload = function () {
        return _this2.play();
      };

      img.onerror = function () {
        return _this2.play();
      };

      this.pause();
      img.src = src;
    }
  }
};
Array.prototype.map.call(document.querySelectorAll('.slideshow'), function (parent) {
  var slideshow = new _slideshow.default({
    parent: parent,
    children: parent.getAttribute('data-children') || '.slide',
    start: parent.getAttribute('data-start') || 0,
    interval: parent.getAttribute('data-interval') || 3000
  });

  for (var key in sliderAttributes) {
    var value = sliderAttributes[key];
    slideshow.setAttr(key, value);
  }

  return slideshow;
});
(0, _slidingBoxes.default)('.sliding-box');
(0, _loadGoogleMaps.default)();
(0, _parallax.default)('.parallax-container', [{
  element: '.parallax-content',
  amount: .5
}, {
  element: document.querySelector('.site-header'),
  amount: .75
}]);
(0, _bindGoogleAnalyticsEvents.default)();
},{"./libs/slideshow":"libs/slideshow.js","./libs/slidingBoxes":"libs/slidingBoxes.js","./libs/loadGoogleMaps":"libs/loadGoogleMaps.js","./libs/bindGoogleAnalyticsEvents":"libs/bindGoogleAnalyticsEvents.js","./libs/parallax":"libs/parallax.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56602" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=main.js.map