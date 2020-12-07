import { ValidationError } from 'apollo-server-express'
import { product_status } from '../../constants'
import { checkAdmin } from '../../commons'
import { getProductCountOfCategory } from '../../database/commons'
import { CategoryModel } from '../../database/Models'

const CategoryQuery = {
  get_category_list: async () => {
    return CategoryModel.find({ status: 1 })
      .sort({ name: 1 })
      .then(async r => {
        return {
          data: r.map(async e => {
            return {
              id: e.getId(),
              name: e.getName(),
              product_count: await getProductCountOfCategory(e.getId(), {
                status: product_status.pending,
              }),
            }
          }),
        }
      })
  },
  admin_get_category_list: async (_, { query }, { auth }) => {
    await checkAdmin(auth)
    const { skip, limit } = query
    return CategoryModel.find()
      .sort({ name: 1 })
      .skip(skip || 0)
      .limit(limit || 10)
      .then(async r => {
        return {
          data: r.map(async e => {
            return {
              ...e.getJson(),
              product_count: await getProductCountOfCategory(e.getId()),
            }
          }),
          paging: {
            count: await CategoryModel.find()
              .sort({ name: 1 })
              .countDocuments(),
          },
        }
      })
  },
}

export default CategoryQuery
