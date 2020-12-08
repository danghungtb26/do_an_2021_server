import { ValidationError } from 'apollo-server-express'
import moment from 'moment'
import { product_status, roles } from '../../constants'
import { getFilter, getSort, getUser, getUserById } from '../../commons'
import { CategoryModel, ProductModel } from '../../database/Models'
import { categoryType, userType } from '../../database/Schemas'

const ProductQuery = {
  get_product_list: async (
    _,
    { query: { skip, limit, sort, keyword, category, filter } },
    { auth }
  ) => {
    console.log('🚀 ~ file: products.ts ~ line 14 ~ category', category);
    const real_category =
      category ||
      (await CategoryModel.findOne({ status: 1 })
        .sort({ name: 1 })
        .then(r => {
          return r?.getId()
        }))
    const f = {
      ...getFilter(filter || ''),
      status: product_status.pending,
      category: real_category,
    }

    return ProductModel.find(f)
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
            count: await ProductModel.find(f).countDocuments(),
          },
        }
      })
  },

  get_product_new: async (_, { query: { skip, limit, sort } }, { auth }) => {
    return ProductModel.find({
      status: product_status.pending,
    })
      .populate('author')
      .populate('owner')
      .populate('category')
      .skip(skip || 0)
      .limit(limit || 10)
      .sort({ created_at: -1 })
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
            }).countDocuments(),
          },
        }
      })
  },

  get_product_highlight: async (_, { query: { skip, limit, sort } }, { auth }) => {
    return ProductModel.find({
      status: product_status.pending,
      created_at: {
        $gte: moment()
          .subtract(30, 'd')
          .toDate(),
      },
    })
      .populate('author')
      .populate('owner')
      .populate('category')
      .skip(skip || 0)
      .limit(limit || 10)
      .sort({ view_count: -1 })
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
            }).countDocuments(),
          },
        }
      })
  },

  get_product_banner: async (_, { query: { skip, limit, sort } }, { auth }) => {
    return ProductModel.find({
      status: product_status.pending,
      high_light: true,
    })
      .populate('author')
      .populate('owner')
      .populate('category')
      .skip(skip || 0)
      .limit(limit || 10)
      .sort({ updated_at: 1 })
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
