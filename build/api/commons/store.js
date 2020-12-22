"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aaaa = exports.showFile = exports.storeFile = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bson = require("bson");

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
      console.log('🚀 ~ file: store.ts ~ line 20 ~ .on ~ uploadStream', uploadStream);
      resolve({
        filename,
        mimetype,
        encoding: '',
        id: uploadStream.id
      });
    });
  });
};

exports.storeFile = storeFile;

const showFile = async (id, res) => {
  // grid_file.findOne({ name: 'IMG_0234.PNG' }, (err, file) => {
  //   console.log('🚀 ~ file: store.ts ~ line 36 ~ grid_file.findOne ~ err', err)
  //   console.log('🚀 ~ file: store.ts ~ line 36 ~ grid_file.findOne ~ file', file)
  // })
  // const a = grid_file.createReadStream({
  //   filename: id,
  // })
  // a.pipe(res)
  const bucket = new _mongoose.default.mongo.GridFSBucket(_mongoose.default.connection.db, {
    bucketName: _tableName.default.attachment
  }); // const a = bucket.find()
  // console.log('🚀 ~ file: store.ts ~ line 46 ~ showFile ~ a', a)

  const uploadStream = bucket.openDownloadStream(new _bson.ObjectID(id));
  uploadStream.pipe(res);
};

exports.showFile = showFile;
const aaaa = '';
exports.aaaa = aaaa;