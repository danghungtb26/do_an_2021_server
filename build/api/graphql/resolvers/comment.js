"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _constants = require("../../constants");

var _Models = require("../../database/Models");

var _commons = require("../../commons");

const mutation = {
  comment_product: async (_, {
    comment
  }, {
    auth
  }) => {
    const user = await (0, _commons.getUser)(auth).then(r => {
      return (0, _commons.getUserById)(`${r.id}`);
    });
    if (!user || user.getRole() !== _constants.roles.user) throw new _apolloServerExpress.ValidationError('User not found!');
    return new Promise(resolve => {
      const {
        content,
        product_id,
        comment_id
      } = comment;
      const newObject = {
        content,
        product: product_id,
        user: user.getId()
      };

      if (comment_id) {
        newObject.parent = comment_id;
      }

      const newComment = new _Models.CommentModel(newObject);
      (0, _commons.runWithSession)((session, success) => {
        _Models.CommentModel.insertMany([newComment], {
          session
        }).then(comments => {
          if ((comments === null || comments === void 0 ? void 0 : comments.length) < 1) throw new _apolloServerExpress.ValidationError('Đã có lỗi xảy ra!');
          Promise.all([_Models.ProductModel.findByIdAndUpdate(product_id, {
            $inc: {
              comment_count: 1
            }
          }, {
            session,
            new: true
          }).then(() => {
            if (comment_id) _Models.CommentModel.findByIdAndUpdate(comment_id, {
              $inc: {
                reply_count: 1
              }
            }, {
              session,
              new: true
            });
          })]).then(() => {
            success().then(() => {
              var _comments$, _comments$2;

              resolve({ ...((_comments$ = comments[0]) === null || _comments$ === void 0 ? void 0 : _comments$.getjson()),
                user: (0, _commons.getUserById)((_comments$2 = comments[0]) === null || _comments$2 === void 0 ? void 0 : _comments$2.getUser())
              });
            });
          });
        });
      });
    });
  },
  edit_comment: async (_, {
    comment: {
      content,
      comment_id
    }
  }, {
    auth
  }) => {
    const user = await (0, _commons.getUser)(auth).then(r => {
      return (0, _commons.getUserById)(`${r.id}`);
    });
    if (!user || user.getRole() !== _constants.roles.user) throw new _apolloServerExpress.ValidationError('User not found!');
    if (!comment_id) throw new _apolloServerExpress.ValidationError('Comment not found!');
    const comment = await _Models.CommentModel.findById(comment_id);
    if ((comment === null || comment === void 0 ? void 0 : comment.getUser()) !== user.getId()) if (!comment_id) throw new _apolloServerExpress.ValidationError('Comment not found!');
    return _Models.CommentModel.findByIdAndUpdate(comment_id, {
      $set: {
        content
      }
    }, {
      new: true
    }).then(r => {
      return { ...(r === null || r === void 0 ? void 0 : r.getjson()),
        user: (0, _commons.getUserById)((r === null || r === void 0 ? void 0 : r.getUser()) || '')
      };
    });
  },
  delete_comment: async (_, {
    comment_id
  }, {
    auth
  }) => {
    const user = await (0, _commons.getUser)(auth).then(r => {
      return (0, _commons.getUserById)(`${r.id}`);
    });
    if (!user || user.getRole() !== _constants.roles.user) throw new _apolloServerExpress.ValidationError('User not found!');
    if (!comment_id) throw new _apolloServerExpress.ValidationError('Comment not found!');
    const comment = await _Models.CommentModel.findById(comment_id);
    if ((comment === null || comment === void 0 ? void 0 : comment.getUser()) !== user.getId()) if (!comment_id) throw new _apolloServerExpress.ValidationError('Comment not found!');

    _Models.CommentModel.findByIdAndDelete(comment_id);

    return true;
  }
};
var _default = mutation;
exports.default = _default;