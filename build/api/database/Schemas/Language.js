"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _utils = require("./utils");

const method = {
  getId: function get() {
    return this._id;
  },
  getName: function get() {
    return this.name;
  },
  getKey: function get() {
    return this.keyword;
  }
};
const Language = new _mongoose.Schema({
  name: {
    type: _mongoose.SchemaTypes.String,
    required: true
  },
  keyword: {
    type: _mongoose.SchemaTypes.String,
    required: true
  },
  description: _mongoose.SchemaTypes.String
}, { ..._utils.config_default_collection
});
Language.method(method);
var _default = Language;
exports.default = _default;