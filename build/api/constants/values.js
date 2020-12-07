"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.category_default = exports.category_status_value = exports.category_status = exports.roles_list = exports.product_status_list = exports.product_action_type = exports.product_status = exports.user_status_list = exports.user_status = exports.roles = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const roles = {
  user: 'user',
  admin: 'admin'
};
exports.roles = roles;
const user_status = {
  normal: 1,
  vip: 2,
  blocked: 3,
  report: 4,
  deleted: 0
};
exports.user_status = user_status;

const user_status_list = _lodash.default.values(user_status);

exports.user_status_list = user_status_list;
const product_status = {
  new: 0,
  pending: 1,
  reject: 2,
  reported: 3,
  blocked: 4,
  deleted: 0
};
exports.product_status = product_status;
const product_action_type = {
  aprove: 'aprove',
  reject: 'reject',
  active: 'active',
  inactive: 'inactive'
};
exports.product_action_type = product_action_type;

const product_status_list = _lodash.default.values(product_status);

exports.product_status_list = product_status_list;
const roles_list = [roles.admin, roles.user];
exports.roles_list = roles_list;
const category_status = [0, 1, 2, 3];
exports.category_status = category_status;
const category_status_value = {
  new: 0,
  pending: 1,
  inactive: 2,
  block: 3
};
exports.category_status_value = category_status_value;
const category_default = ['Khoa học', 'Công nghệ', 'Tri thức', 'Máy tính'];
exports.category_default = category_default;