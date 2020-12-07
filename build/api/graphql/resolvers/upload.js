"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _commons = require("../../commons");

const mutation = {
  upload_file: async (_, {
    file
  }) => {
    const fileId = await (0, _commons.storeFile)(file).then(r => r);
    return fileId;
  }
};
var _default = mutation;
exports.default = _default;