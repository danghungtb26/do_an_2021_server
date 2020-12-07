"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommentModel = exports.CategoryModel = exports.UserModel = exports.ProductModel = void 0;

var _mongoose = require("mongoose");

var _Schemas = require("../Schemas");

var _tableName = _interopRequireDefault(require("../tableName"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ProductModel = (0, _mongoose.model)(_tableName.default.product, _Schemas.ProductSchema);
exports.ProductModel = ProductModel;
const UserModel = (0, _mongoose.model)(_tableName.default.user, _Schemas.UserSchema);
exports.UserModel = UserModel;
const CategoryModel = (0, _mongoose.model)(_tableName.default.category, _Schemas.CategorySchema);
exports.CategoryModel = CategoryModel;
const CommentModel = (0, _mongoose.model)(_tableName.default.comment, _Schemas.CommentSchema);
exports.CommentModel = CommentModel;