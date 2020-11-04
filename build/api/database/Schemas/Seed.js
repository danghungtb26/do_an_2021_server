"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Schema,
  SchemaTypes
} = _mongoose.default;
const Seed = new Schema({
  body: SchemaTypes.Number
});
var _default = Seed;
exports.default = _default;