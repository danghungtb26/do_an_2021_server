"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testpage = exports.convertPage = void 0;

// formatpage khi trả vê cho client có dạng list
const convertPage = (current, total, next, limit) => {
  return {
    current,
    limit,
    total,
    next
  };
};

exports.convertPage = convertPage;

const testpage = () => {};

exports.testpage = testpage;