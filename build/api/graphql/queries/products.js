"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _moment = _interopRequireDefault(require("moment"));

var _constants = require("../../constants");

var _commons = require("../../commons");

var _Models = require("../../database/Models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ProductQuery = {
  get_product_list: async (_, {
    query: {
      skip,
      limit,
      sort,
      keyword,
      category,
      filter
    }
  }, {
    auth
  }) => {
    console.log('🚀 ~ file: products.ts ~ line 14 ~ category', category);
    const real_category = category || (await _Models.CategoryModel.findOne({
      status: 1
    }).sort({
      name: 1
    }).then(r => {
      return r === null || r === void 0 ? void 0 : r.getId();
    }));
    const f = { ...(0, _commons.getFilter)(filter || ''),
      status: _constants.product_status.pending,
      category: real_category
    };
    return _Models.ProductModel.find(f).populate('author').populate('owner').populate('category').skip(skip || 0).limit(limit || 10).sort((0, _commons.getSort)(sort !== null && sort !== void 0 ? sort : [])).then(async r => {
      return {
        data: r.map(e => {
          var _e$getCategory;

          return { ...e.getJson(),
            category: (_e$getCategory = e.getCategory()) === null || _e$getCategory === void 0 ? void 0 : _e$getCategory.getJson(),
            author: e.getAuthor().getJson(),
            owner: e.getOwner().getJson()
          };
        }),
        paging: {
          count: await _Models.ProductModel.find(f).countDocuments()
        }
      };
    });
  },
  get_product_new: async (_, {
    query: {
      skip,
      limit,
      sort
    }
  }, {
    auth
  }) => {
    return _Models.ProductModel.find({
      status: _constants.product_status.pending
    }).populate('author').populate('owner').populate('category').skip(skip || 0).limit(limit || 10).sort({
      created_at: -1
    }).then(async r => {
      return {
        data: r.map(e => {
          var _e$getCategory2;

          return { ...e.getJson(),
            category: (_e$getCategory2 = e.getCategory()) === null || _e$getCategory2 === void 0 ? void 0 : _e$getCategory2.getJson(),
            author: e.getAuthor().getJson(),
            owner: e.getOwner().getJson()
          };
        }),
        paging: {
          count: await _Models.ProductModel.find({
            status: _constants.product_status.pending
          }).countDocuments()
        }
      };
    });
  },
  get_product_highlight: async (_, {
    query: {
      skip,
      limit,
      sort
    }
  }, {
    auth
  }) => {
    return _Models.ProductModel.find({
      status: _constants.product_status.pending,
      created_at: {
        $gte: (0, _moment.default)().subtract(30, 'd').toDate()
      }
    }).populate('author').populate('owner').populate('category').skip(skip || 0).limit(limit || 10).sort({
      view_count: -1
    }).then(async r => {
      return {
        data: r.map(e => {
          var _e$getCategory3;

          return { ...e.getJson(),
            category: (_e$getCategory3 = e.getCategory()) === null || _e$getCategory3 === void 0 ? void 0 : _e$getCategory3.getJson(),
            author: e.getAuthor().getJson(),
            owner: e.getOwner().getJson()
          };
        }),
        paging: {
          count: await _Models.ProductModel.find({
            status: _constants.product_status.pending
          }).countDocuments()
        }
      };
    });
  },
  get_product_banner: async (_, {
    query: {
      skip,
      limit,
      sort
    }
  }, {
    auth
  }) => {
    return _Models.ProductModel.find({
      status: _constants.product_status.pending,
      high_light: true
    }).populate('author').populate('owner').populate('category').skip(skip || 0).limit(limit || 10).sort({
      updated_at: 1
    }).then(async r => {
      return {
        data: r.map(e => {
          var _e$getCategory4;

          return { ...e.getJson(),
            category: (_e$getCategory4 = e.getCategory()) === null || _e$getCategory4 === void 0 ? void 0 : _e$getCategory4.getJson(),
            author: e.getAuthor().getJson(),
            owner: e.getOwner().getJson()
          };
        }),
        paging: {
          count: await _Models.ProductModel.find({
            status: _constants.product_status.pending
          }).countDocuments()
        }
      };
    });
  },
  admin_get_product_list: async (_, {
    query: {
      skip,
      limit,
      sort,
      keyword
    }
  }, {
    auth
  }) => {
    var _await$getUser$id;

    const user = await (0, _commons.getUserById)((_await$getUser$id = (await (0, _commons.getUser)(auth)).id) === null || _await$getUser$id === void 0 ? void 0 : _await$getUser$id.toString());
    if (!user || user.getRole() !== _constants.roles.admin) throw new _apolloServerExpress.ValidationError('Not authen');
    return _Models.ProductModel.find().populate('author').populate('owner').populate('category').skip(skip || 0).limit(limit || 10).sort((0, _commons.getSort)(sort !== null && sort !== void 0 ? sort : [])).then(async r => {
      return {
        data: r.map(e => {
          var _e$getCategory5;

          return { ...e.getJson(),
            category: (_e$getCategory5 = e.getCategory()) === null || _e$getCategory5 === void 0 ? void 0 : _e$getCategory5.getJson(),
            author: e.getAuthor().getJson(),
            owner: e.getOwner().getJson()
          };
        }),
        paging: {
          count: await _Models.ProductModel.countDocuments()
        }
      };
    });
  },
  get_product_by_id: (_, {
    id
  }, {
    auth
  }) => {
    if (typeof id === 'undefined') {
      throw new _apolloServerExpress.ValidationError('Id not found!');
    }

    return _Models.ProductModel.findById(id).populate('author').populate('owner').populate('category').then(r => {
      if (r) {
        var _r$getCategory, _r$getAuthor, _r$getOwner;

        return { ...(r === null || r === void 0 ? void 0 : r.getJson()),
          category: r === null || r === void 0 ? void 0 : (_r$getCategory = r.getCategory()) === null || _r$getCategory === void 0 ? void 0 : _r$getCategory.getJson(),
          author: r === null || r === void 0 ? void 0 : (_r$getAuthor = r.getAuthor()) === null || _r$getAuthor === void 0 ? void 0 : _r$getAuthor.getJson(),
          owner: r === null || r === void 0 ? void 0 : (_r$getOwner = r.getOwner()) === null || _r$getOwner === void 0 ? void 0 : _r$getOwner.getJson()
        };
      }

      throw new _apolloServerExpress.ValidationError('not found');
    });
  }
};
var _default = ProductQuery;
exports.default = _default;