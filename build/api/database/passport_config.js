"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _passportJwt = require("passport-jwt");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = require("./config");

var _tableName = _interopRequireDefault(require("./tableName"));

var _Schemas = require("./Schemas");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserModel = _mongoose.default.model(_tableName.default.user, _Schemas.UserSchema);

const options = {
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: _config.secretkey
};

const setup = passport => {
  passport.use(new _passportJwt.Strategy(options, (payload, callback) => {
    UserModel.findOne({
      _id: payload.id
    }).then(r => {
      if (typeof callback === 'function') callback(null, r);
    }).catch(e => {
      if (typeof callback === 'function') callback(e);
    });
  }));
};

var _default = setup;
exports.default = _default;