"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

_mongoose.default.connect(_config.databaseName, options).then(() => {
  console.log('connect successfully');

  require('./Seeds');
}).catch(err => {
  console.log('connect error', err);
});