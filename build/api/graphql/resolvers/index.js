"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CommentResolvers", {
  enumerable: true,
  get: function () {
    return _comment.default;
  }
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
Object.defineProperty(exports, "UploadResolvers", {
  enumerable: true,
  get: function () {
    return _upload.default;
  }
});
exports.resolver = void 0;

var _comment = _interopRequireDefault(require("./comment"));

var _category = _interopRequireDefault(require("./category"));

var _users = _interopRequireDefault(require("./users"));

var _product = _interopRequireDefault(require("./product"));

var _upload = _interopRequireDefault(require("./upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const resolver = { ..._comment.default,
  ..._category.default
};
exports.resolver = resolver;