"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.converPath = exports.revertPath = void 0;

// dường dân ảnh khi trả về cho client
const revertPath = path => {
  return path.replace('../storage/', '/');
}; // lấy ra đúng đường dẫn lưu ảnh


exports.revertPath = revertPath;

const converPath = path => {
  return `../storage${path}`;
};

exports.converPath = converPath;