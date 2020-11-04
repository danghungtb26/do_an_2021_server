"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _values = require("./values");

Object.keys(_values).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _values[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _values[key];
    }
  });
});