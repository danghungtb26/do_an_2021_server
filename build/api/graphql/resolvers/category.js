"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _commons = require("../../database/commons");

var _Models = require("../../database/Models");

var _commons2 = require("../../commons");

const mutation = {
  admin_add_category: async (_, {
    param: {
      title,
      description
    }
  }, {
    auth
  }) => {
    const user = await (0, _commons2.checkAdmin)(auth);
    const newCategory = new _Models.CategoryModel({
      name: title,
      description
    });
    return newCategory.save().then(async r => {
      return { ...r.getJson(),
        product_count: await (0, _commons.getProductCountOfCategory)(r.getId())
      };
    });
  },
  admin_edit_category: async (_, {
    param: {
      title,
      description,
      status,
      id
    }
  }, {
    auth
  }) => {
    console.log('🚀 ~ file: category.ts ~ line 16 ~ admin_edit_category: ~ description', description);
    const user = await (0, _commons2.checkAdmin)(auth);
    return _Models.CategoryModel.findByIdAndUpdate(id, {
      $set: {
        name: title,
        description,
        status
      }
    }, {
      new: true
    }).then(async r => {
      return { ...(r === null || r === void 0 ? void 0 : r.getJson()),
        product_count: await (0, _commons.getProductCountOfCategory)(r === null || r === void 0 ? void 0 : r.getId())
      };
    });
  }
};
var _default = mutation;
exports.default = _default;