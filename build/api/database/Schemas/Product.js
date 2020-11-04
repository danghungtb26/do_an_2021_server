"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _moment = _interopRequireDefault(require("moment"));

var _constants = require("../../constants");

var _tableName = _interopRequireDefault(require("../tableName"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const method = {
  getJson: function getJson() {
    return {
      id: this._id,
      title: this.title,
      keyword: this.keyword,
      sort_description: this.sort_description,
      description: this.description,
      react_count: this.react_count,
      comment_count: this.comment_count,
      view_count: this.view_count,
      status: this.status,
      created_at: (0, _moment.default)(this.created_at).format(),
      updated_at: (0, _moment.default)(this.updated_at).format()
    };
  },
  getAuthor: function getAuthor() {
    return this.author;
  },
  getOwner: function getOwner() {
    return this.owner;
  }
};
const Product = new _mongoose.Schema({
  title: {
    type: _mongoose.SchemaTypes.String,
    required: true
  },
  keyword: {
    type: _mongoose.SchemaTypes.String
  },
  sort_description: {
    type: _mongoose.SchemaTypes.String
  },
  description: {
    type: _mongoose.SchemaTypes.String
  },
  author: {
    type: _mongoose.SchemaTypes.ObjectId,
    ref: _tableName.default.user
  },
  owner: {
    type: _mongoose.SchemaTypes.ObjectId,
    ref: _tableName.default.user
  },
  category: {
    type: _mongoose.SchemaTypes.ObjectId,
    ref: _tableName.default.category
  },
  status: {
    type: _mongoose.SchemaTypes.Number,
    enum: _constants.product_status_list,
    default: 2
  },
  react_count: {
    type: _mongoose.SchemaTypes.Number,
    default: 0,
    min: 0
  },
  comment_count: {
    type: _mongoose.SchemaTypes.Number,
    default: 0,
    min: 0
  },
  article_count: {
    type: _mongoose.SchemaTypes.Number,
    default: 0,
    min: 0
  },
  attachment: {
    type: _mongoose.SchemaTypes.Array
  },
  banner: {
    type: _mongoose.SchemaTypes.ObjectId,
    ref: _tableName.default.attachment
  },
  admin: {
    type: _mongoose.SchemaTypes.ObjectId,
    ref: _tableName.default.user
  },
  view_count: {
    type: _mongoose.SchemaTypes.Number,
    default: 0,
    min: 0
  }
}, { ..._utils.config_default_collection
});
Product.method(method);
var _default = Product;
exports.default = _default;