"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _commons = require("../../commons");

var _Models = require("../../database/Models");

const ProductQuery = {
  get_product_list: async (_, {
    query: {
      skip,
      limit,
      sort,
      keyword
    }
  }, {
    auth
  }) => {
    console.log('keyword', keyword);
    console.log('keyword', auth);
    return _Models.ProductModel.find().populate('author').populate('owner').skip(skip || 0).limit(limit || 10).sort((0, _commons.getSort)(sort !== null && sort !== void 0 ? sort : [])).then(async r => {
      return {
        data: r.map(e => {
          return { ...e.getJson(),
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
    console.log('auth', auth);

    if (typeof id === 'undefined') {
      throw new _apolloServerExpress.ValidationError('Id not found!');
    }

    return _Models.ProductModel.findById(id).populate('author').populate('owner').then(r => ({ ...r.getJson(),
      author: r.getAuthor().getJson(),
      owner: r.getOwner().getJson()
    }));
  }
};
var _default = ProductQuery;
exports.default = _default;