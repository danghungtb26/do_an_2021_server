"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _commons = require("../../commons");

var _Models = require("../../database/Models");

const contact_query = {
  admin_get_contact_list: async (_, {
    query: {
      skip,
      limit
    }
  }, {
    auth
  }) => {
    await (0, _commons.checkAdmin)(auth);
    return _Models.ContactModel.find().sort({
      created_at: -1
    }).skip(skip || 0).limit(limit || 10).then(async r => {
      return {
        data: r.map(async e => {
          return { ...e.getJson(),
            from_user: await (0, _commons.getUserById)(e.getFromUser()),
            to_user: await (0, _commons.getUserById)(e.getToUser())
          };
        }),
        paging: {
          count: await _Models.CategoryModel.find().sort({
            created_at: 1
          }).countDocuments()
        }
      };
    });
  }
};
var _default = contact_query;
exports.default = _default;