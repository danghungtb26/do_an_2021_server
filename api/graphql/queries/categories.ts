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
              product_count: await getProductCountOfCategory(e.getId()),
            }
          }),
        }
      })
  },
}

export default CategoryQuery
