"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const multer = require('multer');

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    const date = new Date();
    const path = `../storage/images/${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;

    if (!_fs.default.existsSync('../storage')) {
      _fs.default.mkdir('../storage', null, er1 => {
        if (er1) {
          callback(null, path);
        } else if (!_fs.default.existsSync('../storage/images')) {
          _fs.default.mkdir('../storage/images', null, er2 => {
            if (er2) {
              callback(null, path);
            } else if (!_fs.default.existsSync(path)) _fs.default.mkdir(path, null, er3 => {
              if (er3) {
                callback(null, path);
              } else {
                callback(null, path);
              }
            });
          });
        }
      });
    } else if (!_fs.default.existsSync('../storage/images')) {
      _fs.default.mkdir('../storage/images', null, er2 => {
        if (er2) {
          callback(null, path);
        } else if (!_fs.default.existsSync(path)) _fs.default.mkdir(path, null, er3 => {
          if (er3) {
            callback(null, path);
          } else {
            callback(null, path);
          }
        });
      });
    } else if (!_fs.default.existsSync(path)) {
      _fs.default.mkdir(path, null, er3 => {
        if (er3) {
          callback(null, path);
        } else {
          callback(null, path);
        }
      });
    } else callback(null, path);
  },

  filename(req, file, callback) {
    callback(null, `${`${file.fieldname}`.replace(/\[\]/, '')}_${new Date().getTime()}_${file.originalname}`);
  }

});
const upload = multer({
  storage: Storage
});
var _default = upload;
exports.default = _default;