"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSort = void 0;

//
const getSort = sort => {
  return sort.reduce((a, b) => {
    return { ...a,
      [b.name]: b.desc ? -1 : 1
    };
  }, {});
};

exports.getSort = getSort;