"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.grid_file = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Grid = require('gridfs-stream');

_mongoose.default.Promise = global.Promise;

_mongoose.default.set('useFindAndModify', false);

const options = {
  // db: {
  //   native_parser: true,
  // },
  // server: {
  //   poolSize: 5,
  // },
  autoCreate: true,
  autoIndex: true,
  // user: 'admin',
  // pass: '15150408',
  useNewUrlParser: true,
  useUnifiedTopology: true
};
let grid_file;
exports.grid_file = grid_file;

_mongoose.default.connect(_config.databaseName, options).then(() => {
  console.log('connect successfully');
  exports.grid_file = grid_file = new Grid(_mongoose.default.connection.db, _mongoose.default.mongo); // console.log('🚀 ~ file: index.ts ~ line 31 ~ .then ~ grid_file', grid_file)

  require('./Seeds');
}).catch(err => {
  console.log('connect error', err);
});