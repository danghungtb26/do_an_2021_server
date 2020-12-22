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
  getJson: function get() {
    return {
      id: this._id,
      info: this.info
    };
  },
  getFromUser: function get() {
    return this.from_user;
  },
  getToUser: function get() {
    return this.to_user;
  },
  getProduct: function get() {
    return this.product;
  },
  getId: function get() {
    return this._id;
  }
};
const Contact = new _mongoose.Schema({
  from_user: {
    type: _mongoose.SchemaTypes.ObjectId,
    ref: _tableName.default.user
  },
  to_user: {
    type: _mongoose.SchemaTypes.ObjectId,
    ref: _tableName.default.user
  },
  info: _mongoose.SchemaTypes.String,
  product: {
    type: _mongoose.SchemaTypes.ObjectId,
    ref: _tableName.default.product
  }
}, { ..._utils.config_default_collection
});
Contact.method(method);
var _default = Contact;
exports.default = _default;