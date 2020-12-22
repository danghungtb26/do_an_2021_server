"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _mongoose = require("mongoose");

var _commons = require("../../database/commons");

var _constants = require("../../constants");

var _commons2 = require("../../commons");

var _Schemas = require("../../database/Schemas");

var _Models = require("../../database/Models");

var _tableName = _interopRequireDefault(require("../../database/tableName"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserModel = (0, _mongoose.model)(_tableName.default.user, _Schemas.UserSchema);
const UserQuery = {
  get_user_info: (_, _a, {
    auth
  }) => {
    return (0, _commons2.getUser)(auth).then(({
      id
    }) => {
      return UserModel.findById(id).then(user => {
        if (!user) throw new _apolloServerExpress.ValidationError('User not found!');
        return user.getJson();
      });
    });
  },
  // func chỉ lấy ra danh sách sản phẩm của user
  get_user_product_list: async (_, {
    query: {
      skip,
      limit,
      sort,
      keyword,
      user: user_query
    }
  }, {
    auth
  }) => {
    const user = await (0, _commons2.getUser)(auth);
    const query_object = user_query && user_query !== user.id ? {
      owner: user_query,
      status: 2
    } : {
      owner: user.id
    };
    return _Models.ProductModel.find({ ...query_object
    }).populate('author').populate('owner').populate('category').skip(skip || 0).limit(limit || 10).sort((0, _commons2.getSort)(sort !== null && sort !== void 0 ? sort : [{
      name: 'updated_at',
      desc: true
    }])).then(async r => {
      return {
        data: r.map(e => {
          var _e$getCategory;

          return { ...e.getJson(),
            category: e === null || e === void 0 ? void 0 : (_e$getCategory = e.getCategory()) === null || _e$getCategory === void 0 ? void 0 : _e$getCategory.getJson(),
            author: e.getAuthor().getJson(),
            owner: e.getOwner().getJson()
          };
        }),
        paging: {
          count: await _Models.ProductModel.find({ ...query_object
          }).countDocuments()
        }
      };
    });
  },
  // admin page
  admin_get_user_list: async (_, {
    query
  }, {
    auth
  }) => {
    await (0, _commons2.checkAdmin)(auth);
    const {
      skip,
      limit
    } = query;
    return UserModel.find({
      role: _constants.roles.user
    }).skip(skip || 0).limit(limit || 10).then(r => {
      return r.map(e => {
        return {
          data: { ...e.getJson(),
            product_count: (0, _commons.getProductCountOfUser)(e.getId())
          },
          paging: UserModel.find({
            role: _constants.roles.user
          }).countDocuments()
        };
      });
    });
  }
};
var _default = UserQuery;
exports.default = _default;