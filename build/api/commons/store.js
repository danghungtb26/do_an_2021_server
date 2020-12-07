"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aaaa = exports.storeFile = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _tableName = _interopRequireDefault(require("../database/tableName"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const storeFile = async upload => {
  const {
    filename,
    createReadStream,
    mimetype
  } = await upload.then(result => result);
  const bucket = new _mongoose.default.mongo.GridFSBucket(_mongoose.default.connection.db, {
    bucketName: _tableName.default.attachment
  });
  const uploadStream = bucket.openUploadStream(filename, {
    contentType: mimetype
  });
  return new Promise((resolve, reject) => {
    createReadStream().pipe(uploadStream).on('error', reject).on('finish', () => {
      resolve(uploadStream.id);
    });
  });
};

exports.storeFile = storeFile;
const aaaa = '';
exports.aaaa = aaaa;