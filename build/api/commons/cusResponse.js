"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.res200 = exports.res401 = exports.res422 = void 0;

const res422 = (res, message) => {
  res.status(422);
  res.send({
    message: message || 'Nhập thiếu trường dữ liệu'
  });
};

exports.res422 = res422;

const res401 = res => {
  res.status(401);
  res.send({
    message: 'Không có quyền truy cập'
  });
};

exports.res401 = res401;

const res200 = (res, data, page) => {
  const response = {
    success: true,
    data
  };

  if (page) {
    response.page = page;
  }

  res.status(200);
  res.send(response);
};

exports.res200 = res200;