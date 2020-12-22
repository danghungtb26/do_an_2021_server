"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = require("../../constants");

var _commons = require("../../commons");

var _commons2 = require("../../database/commons");

var _Models = require("../../database/Models");

const CategoryQuery = {
  get_category_list: async () => {
    return _Models.CategoryModel.find({
      status: 1
    }).sort({
      name: 1
    }).then(async r => {
      return {
        data: r.map(async e => {
          return {
            id: e.getId(),
            name: e.getName(),
            product_count: await (0, _commons2.getProductCountOfCategory)(e.getId(), {
              status: _constants.product_status.pending
            })
          };
        })
      };
    });
  },
  admin_get_category_list: async (_, {
    query
  }, {
    auth
  }) => {
    await (0, _commons.checkAdmin)(auth);
    const {
      skip,
      limit
    } = query;
    return _Models.CategoryModel.find().sort({
      created_at: -1
    }).skip(skip || 0).limit(limit || 10).then(async r => {
      return {
        data: r.map(async e => {
          return { ...e.getJson(),
            product_count: await (0, _commons2.getProductCountOfCategory)(e.getId())
          };
        }),
        paging: {
          count: await _Models.CategoryModel.find().sort({
            name: 1
          }).countDocuments()
        }
      };
    });
  }
};
var _default = CategoryQuery;
exports.default = _default;