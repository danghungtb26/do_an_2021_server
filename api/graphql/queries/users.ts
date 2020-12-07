import { ValidationError } from 'apollo-server-express'
import { model } from 'mongoose'
import { getProductCountOfUser } from '../../database/commons'
import { roles } from '../../constants'
import { checkAdmin, getSort, getUser } from '../../commons'
import { UserSchema, userType } from '../../database/Schemas'
import { ProductModel } from '../../database/Models'
import table from '../../database/tableName'

const UserModel = model<userType>(table.user, UserSchema)

const UserQuery = {
  get_user_info: (_, _a, { auth }) => {
    return getUser(auth).then(({ id }) => {
      return UserModel.findById(id).then(user => {
        if (!user) throw new ValidationError('User not found!')
        return user.getJson()
      })
    })
  },
  // func chỉ lấy ra danh sách sản phẩm của user
  get_user_product_list: async (
    _,
    { query: { skip, limit, sort, keyword, user: user_query } },
    { auth }
  ) => {
    const user = await getUser(auth)
    const query_object =
      user_query && user_query !== user.id ? { owner: user_query, status: 2 } : { owner: user.id }
    return ProductModel.find({ ...query_object })
      .populate('author')
      .populate('owner')
      .skip(skip || 0)
      .limit(limit || 10)
      .sort(getSort(sort ?? [{ name: 'updated_at', desc: false }]))
      .then(async r => {
        return {
          data: r.map(e => {
            return {
              ...e.getJson(),
              author: (e.getAuthor() as userType).getJson(),
              owner: (e.getOwner() as userType).getJson(),
            }
          }),
          paging: {
            count: await ProductModel.find({ ...query_object }).countDocuments(),
          },
        }
      })
  },

  // admin page
  admin_get_user_list: async (_, { query }, { auth }) => {
    await checkAdmin(auth)
    const { skip, limit } = query
    return UserModel.find({ role: roles.user })
      .skip(skip || 0)
      .limit(limit || 10)
      .then(r => {
        return r.map(e => {
          return {
            data: { ...e.getJson(), product_count: getProductCountOfUser(e.getId()) },
            paging: UserModel.find({ role: roles.user }).countDocuments(),
          }
        })
      })
  },
}

export default UserQuery
