import { ValidationError } from 'apollo-server-express'
import { roles } from '../../constants'
import { CommentModel, ProductModel } from '../../database/Models'
import { getUser, getUserById, runWithSession } from '../../commons'

const mutation = {
  comment_product: async (_, { comment }, { auth }) => {
    const user = await getUser(auth).then(r => {
      return getUserById(`${r.id}`)
    })

    if (!user || user.getRole() !== roles.user) throw new ValidationError('User not found!')

    return new Promise(resolve => {
      const { content, product_id, comment_id } = comment

      const newObject = {
        content,
        product: product_id,
        user: user.getId(),
      }

      if (comment_id) {
        newObject.parent = comment_id
      }

      const newComment = new CommentModel(newObject)

      runWithSession((session, success) => {
        CommentModel.insertMany([newComment], { session }).then(comments => {
          if (comments?.length < 1) throw new ValidationError('Đã có lỗi xảy ra!')

          Promise.all([
            ProductModel.findByIdAndUpdate(
              product_id,
              {
                $inc: {
                  comment_count: 1,
                },
              },
              {
                session,
                new: true,
              }
            ).then(() => {
              if (comment_id)
                CommentModel.findByIdAndUpdate(
                  comment_id,
                  {
                    $inc: {
                      reply_count: 1,
                    },
                  },
                  {
                    session,
                    new: true,
                  }
                )
            }),
          ]).then(() => {
            success().then(() => {
              resolve({
                ...comments[0]?.getjson(),
                user: getUserById(comments[0]?.getUser()),
              })
            })
          })
        })
      })
    })
  },
  edit_comment: async (_, { comment: { content, comment_id } }, { auth }) => {
    const user = await getUser(auth).then(r => {
      return getUserById(`${r.id}`)
    })

    if (!user || user.getRole() !== roles.user) throw new ValidationError('User not found!')

    if (!comment_id) throw new ValidationError('Comment not found!')

    const comment = await CommentModel.findById(comment_id)

    if (comment?.getUser() !== user.getId())
      if (!comment_id) throw new ValidationError('Comment not found!')

    return CommentModel.findByIdAndUpdate(
      comment_id,
      {
        $set: {
          content,
        },
      },
      {
        new: true,
      }
    ).then(r => {
      return {
        ...r?.getjson(),
        user: getUserById(r?.getUser() || ''),
      }
    })
  },
  delete_comment: async (_, { comment_id }, { auth }) => {
    const user = await getUser(auth).then(r => {
      return getUserById(`${r.id}`)
    })

    if (!user || user.getRole() !== roles.user) throw new ValidationError('User not found!')

    if (!comment_id) throw new ValidationError('Comment not found!')

    const comment = await CommentModel.findById(comment_id)

    if (comment?.getUser() !== user.getId())
      if (!comment_id) throw new ValidationError('Comment not found!')

    CommentModel.findByIdAndDelete(comment_id)
    return true
  },
}

export default mutation
