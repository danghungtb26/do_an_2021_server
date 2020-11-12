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
    if (typeof id === 'undefined') {
      throw new _apolloServerExpress.ValidationError('Id not found!');
    }

    return _Models.ProductModel.findById(id).populate('author').populate('owner').then(r => {
      var _r$getAuthor, _r$getOwner;

      return { ...(r === null || r === void 0 ? void 0 : r.getJson()),
        author: r === null || r === void 0 ? void 0 : (_r$getAuthor = r.getAuthor()) === null || _r$getAuthor === void 0 ? void 0 : _r$getAuthor.getJson(),
        owner: r === null || r === void 0 ? void 0 : (_r$getOwner = r.getOwner()) === null || _r$getOwner === void 0 ? void 0 : _r$getOwner.getJson()
      };
    });
  }
};
var _default = ProductQuery;
exports.default = _default;