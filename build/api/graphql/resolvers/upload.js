"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Models = require("../../database/Models");

var _commons = require("../../commons");

const mutation = {
  upload_file: async (_, {
    file
  }) => {
    const fileId = await (0, _commons.storeFile)(file).then(r => r);
    return fileId;
  },
  send_contact: async (_, {
    param: {
      to_user,
      info,
      product_id
    }
  }, {
    auth
  }) => {
    const user = await (0, _commons.getUser)(auth);
    const data = {
      info
    };

    if (to_user) {
      data.to_user = to_user;
    }

    if (user.id) {
      data.from_user = user.id;
    }

    if (product_id) {
      data.product = product_id;
    }

    console.log('🚀 ~ file: upload.ts ~ line 14 ~ send_contact: ~ user', data);
    const newData = new _Models.ContactModel(data);
    return newData.save().then(async r => {
      console.log('🚀 ~ file: upload.ts ~ line 25 ~ returnnewData.save ~ r', r);
      return { ...r.getJson(),
        from_user: await (0, _commons.getUserById)(r.getFromUser()),
        to_user: await (0, _commons.getUserById)(r.getToUser())
      };
    });
  }
};
var _default = mutation;
exports.default = _default;