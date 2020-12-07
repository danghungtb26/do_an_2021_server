"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "UserQueries", {
  enumerable: true,
  get: function () {
    return _users.default;
  }
});
Object.defineProperty(exports, "ProductQueries", {
  enumerable: true,
  get: function () {
    return _products.default;
  }
});
exports.default = void 0;

var _users = _interopRequireDefault(require("./users"));

var _products = _interopRequireDefault(require("./products"));

var _categories = _interopRequireDefault(require("./categories"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const queries = { ..._users.default,
  ..._products.default,
  ..._categories.default
};
var _default = queries;
exports.default = _default;