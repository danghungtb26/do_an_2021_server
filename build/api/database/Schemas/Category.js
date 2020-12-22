"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _constants = require("../../constants");

var _tableName = _interopRequireDefault(require("../tableName"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  SchemaTypes,
  Schema
} = _mongoose.default;
const method = {
  getId: function getId() {
    return this._id;
  },
  getName: function getName() {
    return this.name;
  },
  getNumberOfProduct: function get() {
    return this.number_of_product;
  },
  getJson: function getJson() {
    return {
      id: this._id,
      name: this.name,
      description: this.description,
      create_by: this.create_by,
      created_at: this.created_at,
      updated_at: this.created_at,
      status: this.status
    };
  }
};
const Category = new Schema({
  name: {
    type: SchemaTypes.String,
    required: true
  },
  description: SchemaTypes.String,
  number_of_product: SchemaTypes.Number,
  parent_category: {
    type: SchemaTypes.ObjectId,
    ref: _tableName.default.category
  },
  create_by: {
    type: SchemaTypes.ObjectId,
    ref: _tableName.default.user
  },
  status: {
    type: SchemaTypes.Number,
    enum: _constants.category_status,
    default: 0
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  autoIndex: true
});
Category.method(method);
var _default = Category;
exports.default = _default;