"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _tableName = _interopRequireDefault(require("../tableName"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const method = {};
const React = new _mongoose.Schema({
  product: {
    type: _mongoose.SchemaTypes.ObjectId,
    ref: _tableName.default.product
  },
  comment: {
    type: _mongoose.SchemaTypes.ObjectId,
    ref: _tableName.default.comment
  },
  user: {
    type: _mongoose.SchemaTypes.ObjectId,
    ref: _tableName.default.user
  },
  react_type: {
    type: _mongoose.SchemaTypes.ObjectId,
    ref: _tableName.default.reactType
  }
}, { ..._utils.config_default_collection
});
React.method(method);
var _default = React;
exports.default = _default;