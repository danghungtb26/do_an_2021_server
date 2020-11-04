"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _mongoose = require("mongoose");

var _commons = require("../../commons");

var _constants = require("../../constants");

var _Schemas = require("../../database/Schemas");

var _tableName = _interopRequireDefault(require("../../database/tableName"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserModel = (0, _mongoose.model)(_tableName.default.user, _Schemas.UserSchema);
const mutation = {
  /**
   * func đăng ký cho user
   * @param _
   * @param param1
   */
  register(_, {
    user: {
      email,
      password,
      role = _constants.roles.user
    }
  }) {
    return UserModel.findOne({
      email
    }).then(user => {
      if (user) throw new _apolloServerExpress.ValidationError('This email is not valid!');
      const newUser = new UserModel({
        email,
        password,
        role
      });
      return newUser.generate().then(() => {
        return newUser.save().then(res => {
          const token = (0, _commons.getJwtToken)({
            id: res.getId(),
            email: res.getEmail()
          });
          return { ...res.getJson(),
            token
          };
        });
      });
    });
  },

  /**
   * func login vào hệ thông
   * @param _
   * @param param1
   */
  login(_, {
    user: {
      email,
      password,
      role = _constants.roles.user
    }
  }) {
    return UserModel.findOne({
      email,
      role
    }).then(user => {
      if (!user) throw new _apolloServerExpress.ValidationError('This email is not found!');
      return user.compare(password).then(r => {
        if (r) {
          return { ...user.getJson(),
            token: (0, _commons.getJwtToken)({
              id: user.getId(),
              email: user.getEmail()
            })
          };
        }

        throw new _apolloServerExpress.AuthenticationError('Email or password is wrong!');
      });
    });
  }

};
var _default = mutation;
exports.default = _default;