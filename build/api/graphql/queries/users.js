"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _mongoose = require("mongoose");

var _commons = require("../../commons");

var _Schemas = require("../../database/Schemas");

var _tableName = _interopRequireDefault(require("../../database/tableName"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserModel = (0, _mongoose.model)(_tableName.default.user, _Schemas.UserSchema);
const UserQuery = {
  get_user_info: (_, _a, {
    auth
  }) => {
    return (0, _commons.getUser)(auth).then(({
      id
    }) => {
      return UserModel.findById(id).then(user => {
        if (!user) throw new _apolloServerExpress.ValidationError('User not found!');
        return user.getJson();
      });
    });
  }
};
var _default = UserQuery;
exports.default = _default;