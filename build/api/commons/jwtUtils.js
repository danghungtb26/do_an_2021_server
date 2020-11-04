"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserById = exports.getUser = exports.getJwtToken = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = require("../database/config");

var _Models = require("../database/Models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * func nay dùng để sinh ra authen_token cho user khi đăng ký hoặc đăng nhập
 * expire 1y
 * @param param0 {
 *  id: string | number
 *  email: string
 * }
 */
const getJwtToken = ({
  id,
  email
}) => _jsonwebtoken.default.sign({
  id,
  email
}, _config.secretkey, {
  expiresIn: '365d'
});
/**
 * func này dựa vào authen cung cấp để lấy ra id của user đăng nhập
 * @param auth: string
 */


exports.getJwtToken = getJwtToken;

const getUser = auth => {
  return new Promise(resolve => {
    if (!auth) resolve({
      id: null
    });
    const token = auth.split('Bearer ')[1];
    if (!token) resolve({
      id: null
    });

    _jsonwebtoken.default.verify(token, _config.secretkey, (err, decoded) => {
      if (err) throw new _apolloServerExpress.AuthenticationError('invalid token!');
      resolve({
        id: decoded.id
      });
    });
  });
};
/**
 * func tim user theo id
 */


exports.getUser = getUser;

const getUserById = id => {
  return _Models.UserModel.findById(id).then(r => r);
};

exports.getUserById = getUserById;