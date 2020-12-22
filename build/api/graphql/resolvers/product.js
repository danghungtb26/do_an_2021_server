"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _commons = require("../../commons");

var _constants = require("../../constants");

var _Models = require("../../database/Models");

const addProduct = async (product, auth) => {
  const user = await (0, _commons.getUser)(auth).then(r => {
    return (0, _commons.getUserById)(`${r.id}`);
  });
  if (!user || user.getRole() !== _constants.roles.user) throw new _apolloServerExpress.ValidationError('User not found!');
  return new Promise(resolve => {
    // chạy cùng session để tạo transection
    const {
      title,
      description,
      keyword,
      sort_description,
      budget,
      deployment_time,
      attachment
    } = product;
    const newProduct = new _Models.ProductModel({
      title,
      description,
      keyword,
      budget,
      deployment_time,
      sort_description,
      attachment,
      author: user.getId(),
      owner: user.getId()
    });
    (0, _commons.runWithSession)((session, success) => {
      _Models.ProductModel.insertMany([newProduct], {
        session
      }).then(products => {
        if ((products === null || products === void 0 ? void 0 : products.length) < 1) throw new _apolloServerExpress.ValidationError('Đã có lỗi xảy ra!');

        _Models.UserModel.findByIdAndUpdate(user.getId(), {
          $inc: {
            product_count: 1
          }
        }, {
          session,
          new: true
        }).populate('author').populate('owner').populate('category').then(() => {
          success().then(async () => {
            var _products$, _products$0$getCatego, _products$2, _products$3;

            resolve({ ...((_products$ = products[0]) === null || _products$ === void 0 ? void 0 : _products$.getJson()),
              category: (_products$0$getCatego = products[0].getCategory()) === null || _products$0$getCatego === void 0 ? void 0 : _products$0$getCatego.getJson(),
              author: await (0, _commons.getUserById)((_products$2 = products[0]) === null || _products$2 === void 0 ? void 0 : _products$2.getAuthor()),
              owner: await (0, _commons.getUserById)((_products$3 = products[0]) === null || _products$3 === void 0 ? void 0 : _products$3.getOwner())
            });
          });
        });
      });
    });
  });
};

const mutation = {
  /**
   * func api để thêm sản phẩm vào database
   * @param _
   * @param param1
   */
  addProduct(_, {
    product
  }, {
    auth
  }) {
    return addProduct(product, auth);
  },

  /**
   * func api để edit sản phẩm vào database theo id
   * @param _
   * @param param1
   */
  editProduct(_, {
    product
  }, {
    auth
  }) {
    console.log('editProduct -> auth', auth);
    console.log(product);
  },

  /**
   * func xoá sản phẩm
   * @param _
   * @param param1
   */
  deleteProduct(_, {
    id
  }, {
    auth
  }) {
    console.log('editProduct -> auth', auth);
    console.log(id);
  },

  update_view_product: (_, {
    id
  }) => {
    console.log('🚀 ~ file: product.ts ~ line 98 ~ id', id);
    return _Models.ProductModel.findByIdAndUpdate(id, {
      $inc: {
        view_count: 1
      }
    }, {
      new: true
    }).populate('author').populate('owner').populate('category').then(r => {
      var _r$getCategory;

      return { ...(r === null || r === void 0 ? void 0 : r.getJson()),
        category: r === null || r === void 0 ? void 0 : (_r$getCategory = r.getCategory()) === null || _r$getCategory === void 0 ? void 0 : _r$getCategory.getJson(),
        author: (r === null || r === void 0 ? void 0 : r.getAuthor()).getJson(),
        owner: (r === null || r === void 0 ? void 0 : r.getOwner()).getJson()
      };
    });
  },
  // admin page
  admin_aprove_product: async (_, {
    param
  }, {
    auth
  }) => {
    const user = await (0, _commons.checkAdmin)(auth);
    const {
      id,
      type,
      category
    } = param;
    if (type !== _constants.product_action_type.aprove && type !== _constants.product_action_type.reject) throw new _apolloServerExpress.ValidationError('error');
    if (type === _constants.product_action_type.aprove && !category) throw new _apolloServerExpress.ValidationError('category not found');
    let newStatus = _constants.product_status.new;
    if (type === _constants.product_action_type.aprove) newStatus = _constants.product_status.pending;
    if (type === _constants.product_action_type.reject) newStatus = _constants.product_status.reject;
    const newObject = _constants.product_action_type.aprove ? {
      category
    } : {};
    return _Models.ProductModel.findByIdAndUpdate(id, {
      $set: {
        status: newStatus,
        admin: user === null || user === void 0 ? void 0 : user.getId(),
        ...newObject
      }
    }, {
      new: true
    }).populate('author').populate('owner').populate('category').then(r => {
      var _r$getCategory2, _r$getAuthor, _r$getOwner;

      if (r) return { ...(r === null || r === void 0 ? void 0 : r.getJson()),
        category: r === null || r === void 0 ? void 0 : (_r$getCategory2 = r.getCategory()) === null || _r$getCategory2 === void 0 ? void 0 : _r$getCategory2.getJson(),
        author: r === null || r === void 0 ? void 0 : (_r$getAuthor = r.getAuthor()) === null || _r$getAuthor === void 0 ? void 0 : _r$getAuthor.getJson(),
        owner: r === null || r === void 0 ? void 0 : (_r$getOwner = r.getOwner()) === null || _r$getOwner === void 0 ? void 0 : _r$getOwner.getJson()
      };
      throw new _apolloServerExpress.ValidationError('Not found');
    });
  },
  admin_active_product: async (_, {
    param
  }, {
    auth
  }) => {
    const user = await (0, _commons.checkAdmin)(auth);
    const {
      id,
      type
    } = param;
    if (type !== _constants.product_action_type.active && type !== _constants.product_action_type.inactive) throw new _apolloServerExpress.ValidationError('error');
    let newStatus = _constants.product_status.new;
    if (type === _constants.product_action_type.active) newStatus = _constants.product_status.pending;
    if (type === _constants.product_action_type.inactive) newStatus = _constants.product_status.blocked;
    return _Models.ProductModel.findByIdAndUpdate(id, {
      $set: {
        status: newStatus,
        admin: user === null || user === void 0 ? void 0 : user.getId()
      }
    }, {
      new: true
    }).populate('author').populate('owner').populate('category').then(r => {
      var _r$getCategory3, _r$getAuthor2, _r$getOwner2;

      if (r) return { ...(r === null || r === void 0 ? void 0 : r.getJson()),
        category: r === null || r === void 0 ? void 0 : (_r$getCategory3 = r.getCategory()) === null || _r$getCategory3 === void 0 ? void 0 : _r$getCategory3.getJson(),
        author: r === null || r === void 0 ? void 0 : (_r$getAuthor2 = r.getAuthor()) === null || _r$getAuthor2 === void 0 ? void 0 : _r$getAuthor2.getJson(),
        owner: r === null || r === void 0 ? void 0 : (_r$getOwner2 = r.getOwner()) === null || _r$getOwner2 === void 0 ? void 0 : _r$getOwner2.getJson()
      };
      throw new _apolloServerExpress.ValidationError('Not found');
    });
  },
  admin_high_light_product: async (_, {
    param
  }, {
    auth
  }) => {
    const user = await (0, _commons.checkAdmin)(auth);
    const {
      id,
      high_light
    } = param;
    return _Models.ProductModel.findByIdAndUpdate(id, {
      $set: {
        high_light,
        admin: user === null || user === void 0 ? void 0 : user.getId()
      }
    }, {
      new: true
    }).populate('author').populate('owner').populate('category').then(r => {
      var _r$getCategory4, _r$getAuthor3, _r$getOwner3;

      if (r) return { ...(r === null || r === void 0 ? void 0 : r.getJson()),
        category: r === null || r === void 0 ? void 0 : (_r$getCategory4 = r.getCategory()) === null || _r$getCategory4 === void 0 ? void 0 : _r$getCategory4.getJson(),
        author: r === null || r === void 0 ? void 0 : (_r$getAuthor3 = r.getAuthor()) === null || _r$getAuthor3 === void 0 ? void 0 : _r$getAuthor3.getJson(),
        owner: r === null || r === void 0 ? void 0 : (_r$getOwner3 = r.getOwner()) === null || _r$getOwner3 === void 0 ? void 0 : _r$getOwner3.getJson()
      };
      throw new _apolloServerExpress.ValidationError('Not found');
    });
  }
};
var _default = mutation;
exports.default = _default;