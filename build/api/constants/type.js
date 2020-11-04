"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.statusTypes = exports.userStatus = exports.userTypeArr = exports.userTypes = void 0;
const userTypes = {
  0: 'admin',
  1: 'supplier',
  2: 'customer'
};
exports.userTypes = userTypes;
const userTypeArr = ['admin', 'supplier', 'customer'];
exports.userTypeArr = userTypeArr;
const userStatus = {
  0: 'inactive',
  1: 'active',
  2: 'blocked'
};
exports.userStatus = userStatus;
const statusTypes = {
  0: 'inactive',
  1: 'active',
  2: 'waiting',
  3: 'reject'
};
exports.statusTypes = statusTypes;