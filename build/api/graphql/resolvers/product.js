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
      sort_description
    } = product;
    const newProduct = new _Models.ProductModel({
      title,
      description,
      keyword,
      sort_description,
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
        }).then(() => {
          success().then(async () => {
            var _products$, _products$2, _products$3;

            resolve({ ...((_products$ = products[0]) === null || _products$ === void 0 ? void 0 : _products$.getJson()),
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
    return _Models.ProductModel.findByIdAndUpdate(id, {
      $inc: {
        view_count: 1
      }
    }, {
      new: true
    }).populate('author').populate('owner').then(r => ({ ...r.getJson(),
      author: r.getAuthor().getJson(),
      owner: r.getOwner().getJson()
    }));
  }
};
var _default = mutation;
exports.default = _default;