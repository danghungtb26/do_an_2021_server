"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _moment = _interopRequireDefault(require("moment"));

var _constants = require("../../constants");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Schema,
  SchemaTypes
} = _mongoose.default;
const method = {
  getJson: function getJson() {
    return {
      id: this._id,
      name: this.name,
      introduction: this.introduction,
      email: this.email,
      phone: this.phone,
      role: this.role,
      created_at: (0, _moment.default)(this.created_at).format(),
      updated_at: (0, _moment.default)(this.updated_at).format()
    };
  },
  getId: function getId() {
    return this._id;
  },
  getName: function getName() {
    return this.name;
  },
  getRole: function getRole() {
    return this.role;
  },
  isAdmin: function isAdmin() {
    return true;
  },
  getEmail: function getEmail() {
    return this.email;
  },
  getPhone: function getPhone() {
    return this.phone;
  },

  /**
   *
   * @param password
   * @param callback
   * func compare xem user đã đăng nhập đúng hay chưa
   * có 2 cách trả về là callback: (error và success)
   */
  compare: function compare(password, callback) {
    return new Promise((resolve, reject) => {
      _bcryptjs.default.compare(password, this.password, (err, isMatch) => {
        if (typeof callback === 'function') callback(err, isMatch);

        if (err) {
          reject(err);
        }

        resolve(isMatch);
      });
    });
  },

  /**
   *
   * @param callback
   * func này sử dụng salt để generate ra hash_password lưu vào trong database
   */
  generate: function generate(callback) {
    return new Promise((resolve, reject) => {
      _bcryptjs.default.genSalt(10, (err, salt) => {
        if (err) {
          if (typeof callback === 'function') callback(err, null);
          reject(err);
        }

        _bcryptjs.default.hash(this.password, salt, (err2, hash) => {
          if (typeof callback === 'function') callback(err2, hash);

          if (err2) {
            reject(err2);
          }

          this.password = hash;
          resolve(hash);
        });
      });
    });
  }
};
const User = new Schema({
  name: {
    type: SchemaTypes.String,
    default: `User-${Date.now().toString()}`
  },
  email: {
    type: SchemaTypes.String,
    required: true
  },
  avatar: {
    type: SchemaTypes.String
  },
  password: {
    type: SchemaTypes.String,
    required: true
  },
  phone: {
    type: SchemaTypes.String,
    default: null
  },
  introduction: {
    type: SchemaTypes.String,
    default: null
  },
  product_count: {
    type: SchemaTypes.Number,
    default: 0
  },
  role: {
    type: SchemaTypes.String,
    enum: _constants.roles_list
  },
  status: {
    type: SchemaTypes.Number,
    enum: _constants.user_status_list,
    default: 0
  },
  device_token: {
    type: SchemaTypes.Array
  }
}, { ..._utils.config_default_collection
});
User.method(method);
var _default = User;
exports.default = _default;