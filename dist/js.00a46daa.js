// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
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

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
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
  return newRequire;
})({"js/index.js":[function(require,module,exports) {
// DOM Elements with sound
var all_sounds = document.querySelectorAll('audio');

for (var i = 0; i < all_sounds.length; i++) {
  all_sounds[i].addEventListener('canplaythrough', loadedSounds, false);
  all_sounds[i].load(); // Force reload in case some audio files already loaded to avoid stuck loading screen
}

var loaded = 0;
var percent = 0;

function loadedSounds(e) {
  loaded++; // Increment loaded counter to check if all sounds can be played

  percent = Math.floor(100 * loaded / all_sounds.length); // Calculate percentage

  document.querySelector('.load_status').innerText = "".concat(percent, "%"); // Set textual percentage to load status

  document.querySelector('.load_fill').style.width = "".concat(percent, "%"); // console.log(percent);

  if (loaded == all_sounds.length) {
    // alert('Loaded!');
    for (var _i = 0; _i < all_sounds.length; _i++) {
      all_sounds[_i].removeEventListener('canplaythrough', loadedSounds);
    }

    setTimeout(fadeOutLoader, 1000);
  }
}

function fadeOutLoader() {
  var fadeTarget = document.getElementById('load_screen');
  fadeTarget.style.opacity = 0;
  setTimeout(function () {
    // Remove node
    document.querySelector('body').removeChild(fadeTarget);
  }, 2000);
} // DOM Elements for clock control


var hours = document.querySelector('.hours');
var minutes = document.querySelector('.minutes');
var seconds = document.querySelector('.seconds');
var separator = document.querySelector('.separator'); // DOM Elements that control play/stop sounds

var play_btn = document.querySelectorAll('.play'); // Adding listeners to every play/stop button

for (var i = 0; i < play_btn.length; i++) {
  play_btn[i].addEventListener('click', playSound, false);
} // DOM elements that controll sound volume


var volume_control = document.querySelectorAll('.volume_bar'); // Adding listeners to every volume control slider

for (var i = 0; i < volume_control.length; i++) {
  volume_control[i].addEventListener('input', volumeSound, false);
  volume_control[i].style.opacity = 0;
} // DOM element that mutes and unmutes the page


var mute_btn = document.querySelector('.mute_btn a');
var is_muted = false;
mute_btn.addEventListener('click', muteDocument, false); // DOM element that resets the sounds

var reset_btn = document.querySelector('.reset_btn a');
reset_btn.addEventListener('click', resetSounds, false); // Controlling stoping and playing the sound

function playSound(e) {
  if (is_muted) {
    muteDocument();
  }

  var targetElement = e.target || e.srcElement;
  var selectedSound = targetElement.parentElement.parentElement.querySelector('audio');
  var volumeControler = targetElement.parentElement.parentElement.querySelector('.volume_bar');
  var soundImage = targetElement.parentElement.parentElement.querySelector('img');

  if (selectedSound.paused) {
    volumeControler.style.opacity = 1;
    selectedSound.loop = true;

    if (volumeControler.value === 0) {
      volumeControler.value = 0.1;
    }

    selectedSound.volume = volumeControler.value;
    selectedSound.play();
    soundImage.classList.add('playing');
  } else {
    volumeControler.style.opacity = 0;
    selectedSound.pause();
    selectedSound.currentTime = 0;
    volumeControler.value = 0;
    soundImage.classList.remove('playing');
  }

  console.log(event.target.type);
  console.log(selectedSound);
} // Controlling volume of the sounds


function volumeSound(e) {
  if (is_muted) {
    muteDocument();
  }

  var targetElement = e.target || e.srcElement;
  var vol = targetElement.value;
  var selectedSound = targetElement.parentElement.querySelector('audio');
  selectedSound.volume = vol;
}

function clock() {
  var now = new Date();
  var twelveHrTime = (now.getHours() + 11) % 12 + 1;
  hours.innerText = twelveHrTime < 10 ? "0".concat(twelveHrTime) : twelveHrTime;
  minutes.innerText = now.getMinutes() < 10 ? "0".concat(now.getMinutes()) : now.getMinutes();
}

clock();
var interval = setInterval(clock, 1000);
var playing_sounds = [];

function muteDocument() {
  if (!is_muted) {
    playing_sounds.length = 0;
    is_muted = true;
    document.querySelector('.unmuted').style.display = 'none';
    document.querySelector('.muted').style.display = 'inline';
    var all_audio = document.querySelectorAll('audio');

    for (var _i2 = 0; _i2 < all_audio.length; _i2++) {
      if (!all_audio[_i2].paused) {
        playing_sounds.push([all_audio[_i2], all_audio[_i2].volume]);
      }
    }

    playing_sounds.forEach(function (sound) {
      sound[0].volume = 0;
    });
  } else {
    is_muted = false;
    document.querySelector('.unmuted').style.display = 'inline';
    document.querySelector('.muted').style.display = 'none';
    playing_sounds.forEach(function (sound) {
      sound[0].volume = sound[1];
    });
  }
}

function resetSounds() {
  var all_audio = document.querySelectorAll('audio');

  for (var i = 0; i < all_audio.length; i++) {
    all_audio[i].pause();
    all_audio[i].currentTime = 0;
    all_audio[i].value = 0;
  }

  var all_play_btns = document.querySelectorAll('.start_btn img');

  for (var i = 0; i < all_play_btns.length; i++) {
    all_play_btns[i].classList.remove('playing');
  }

  var all_volume_control = document.querySelectorAll('.volume_bar');

  for (var i = 0; i < all_volume_control.length; i++) {
    all_volume_control[i].value = 0;
    all_volume_control[i].style.opacity = 0;
  }
}
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54921" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
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

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

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

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.map