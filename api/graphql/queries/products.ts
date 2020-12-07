import { ValidationError } from 'apollo-server-express'
import { product_status, roles } from '../../constants'
import { getSort, getUser, getUserById } from '../../commons'
import { CategoryModel, ProductModel } from '../../database/Models'
import { categoryType, userType } from '../../database/Schemas'

const ProductQuery = {
  get_product_list: async (_, { query: { skip, limit, sort, keyword, category } }, { auth }) => {
    const real_category =
      category ||
      (await CategoryModel.findOne({ status: 1 })
        .sort({ name: 1 })
        .then(r => {
          return r?.getId()
        }))

    return ProductModel.find({
      status: product_status.pending,
      category: real_category,
    })
      .populate('author')
      .populate('owner')
      .populate('category')
      .skip(skip || 0)
      .limit(limit || 10)
      .sort(getSort(sort ?? []))
      .then(async r => {
        return {
          data: r.map(e => {
            return {
              ...e.getJson(),
              category: (e.getCategory() as categoryType)?.getJson(),
              author: (e.getAuthor() as userType).getJson(),
              owner: (e.getOwner() as userType).getJson(),
            }
          }),
          paging: {
            count: await ProductModel.find({
              status: product_status.pending,
              category: real_category,
            }).countDocuments(),
          },
        }
      })
  },

  admin_get_product_list: async (_, { query: { skip, limit, sort, keyword } }, { auth }) => {
    const user = await getUserById((await getUser(auth)).id?.toString())

    if (!user || user.getRole() !== roles.admin) throw new ValidationError('Not authen')

    return ProductModel.find()
      .populate('author')
      .populate('owner')
      .populate('category')
      .skip(skip || 0)
      .limit(limit || 10)
      .sort(getSort(sort ?? []))
      .then(async r => {
        return {
          data: r.map(e => {
            return {
              ...e.getJson(),
              category: (e.getCategory() as categoryType)?.getJson(),
              author: (e.getAuthor() as userType).getJson(),
              owner: (e.getOwner() as userType).getJson(),
            }
          }),
          paging: {
            count: await ProductModel.countDocuments(),
          },
        }
      })
  },

  get_product_by_id: (_, { id }, { auth }) => {
    if (typeof id === 'undefined') {
      throw new ValidationError('Id not found!')
    }

    return ProductModel.findById(id)
      .populate('author')
      .populate('owner')
      .populate('category')
      .then(r => {
        if (r) {
          return {
            ...r?.getJson(),
            category: (r?.getCategory() as categoryType)?.getJson(),
            author: (r?.getAuthor() as userType)?.getJson(),
            owner: (r?.getOwner() as userType)?.getJson(),
          }
        }
        throw new ValidationError('not found')
      })
  },
}

export default ProductQuery
