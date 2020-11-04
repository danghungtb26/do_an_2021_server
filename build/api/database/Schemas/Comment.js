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
const Comment = new _mongoose.Schema({
  product: {
    type: _mongoose.SchemaTypes.ObjectId,
    ref: _tableName.default.product
  },
  user: {
    type: _mongoose.SchemaTypes.ObjectId,
    ref: _tableName.default.user
  },
  parent: {
    type: _mongoose.SchemaTypes.ObjectId,
    ref: _tableName.default.comment
  },
  reply_count: {
    type: _mongoose.SchemaTypes.Number,
    default: 0
  },
  react_count: {
    type: _mongoose.SchemaTypes.Number,
    default: 0
  }
}, { ..._utils.config_default_collection
});
Comment.method(method);
var _default = Comment;
exports.default = _default;