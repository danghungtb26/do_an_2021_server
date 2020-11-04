"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "UserResolvers", {
  enumerable: true,
  get: function () {
    return _users.default;
  }
});
Object.defineProperty(exports, "ProductResolvers", {
  enumerable: true,
  get: function () {
    return _product.default;
  }
});

var _users = _interopRequireDefault(require("./users"));

var _product = _interopRequireDefault(require("./product"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }