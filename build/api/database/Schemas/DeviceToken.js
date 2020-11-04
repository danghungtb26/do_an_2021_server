"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _tableName = _interopRequireDefault(require("../tableName"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const method = {
  getId: function get() {
    return this._id;
  },
  getBody: function get() {
    return this.body;
  }
};
const DeviceToken = new _mongoose.Schema({
  body: {
    type: _mongoose.SchemaTypes.String,
    required: true
  },
  user: {
    type: _mongoose.SchemaTypes.ObjectId,
    ref: _tableName.default.user,
    required: true
  }
}, { ..._utils.config_default_collection
});
DeviceToken.method(method);
var _default = DeviceToken;
exports.default = _default;