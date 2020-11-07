"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = require("api/constants");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _tableName = _interopRequireDefault(require("../tableName"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Schema,
  SchemaTypes
} = _mongoose.default;
const method = {
  getJson: function getJson() {
    return {
      id: this.id,
      title: this.title,
      keyword: this.keyword,
      sort_description: this.sort_description,
      description: this.description,
      react_count: this.react_count,
      comment_count: this.comment_count,
      status: this.status
    };
  }
};
const ArticleSchema = new Schema({
  title: {
    type: SchemaTypes.String,
    required: true
  },
  sort_description: {
    type: SchemaTypes.String,
    default: ''
  },
  description: {
    type: SchemaTypes.String,
    required: true
  },
  keyword: {
    type: SchemaTypes.String
  },
  react_count: {
    type: SchemaTypes.Number,
    default: 0
  },
  comment_count: {
    type: SchemaTypes.Number,
    default: 0
  },
  author: {
    type: SchemaTypes.ObjectId,
    ref: _tableName.default.user
  },
  status: {
    type: SchemaTypes.String,
    enum: _constants.user_status_list,
    default: 2
  }
});
ArticleSchema.method(method);
var _default = ArticleSchema;
exports.default = _default;