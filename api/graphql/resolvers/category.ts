import { getProductCountOfCategory } from '../../database/commons'
import { CategoryModel } from '../../database/Models'
import { checkAdmin } from '../../commons'

const mutation = {
  admin_add_category: async (_, { param: { title, description } }, { auth }) => {
    const user = await checkAdmin(auth)

    const newCategory = new CategoryModel({ name: title, description })
    return newCategory.save().then(async r => {
      return { ...r.getJson(), product_count: await getProductCountOfCategory(r.getId()) }
    })
  },

  admin_edit_category: async (_, { param: { title, description, status, id } }, { auth }) => {
    console.log(
      '🚀 ~ file: category.ts ~ line 16 ~ admin_edit_category: ~ description',
      description
    )
    const user = await checkAdmin(auth)

    return CategoryModel.findByIdAndUpdate(
      id,
      {
        $set: { name: title, description, status },
      },
      { new: true }
    ).then(async r => {
      return { ...r?.getJson(), product_count: await getProductCountOfCategory(r?.getId()) }
    })
  },
}

export default mutation
