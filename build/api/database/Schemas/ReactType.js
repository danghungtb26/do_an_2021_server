"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _utils = require("./utils");

const method = {};
const ReactType = new _mongoose.Schema({
  name: {
    type: _mongoose.SchemaTypes.String,
    required: true
  }
}, { ..._utils.config_default_collection
});
ReactType.method(method);
var _default = ReactType;
exports.default = _default;