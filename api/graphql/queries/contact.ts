import { checkAdmin, getUserById } from '../../commons'
import { CategoryModel, ContactModel } from '../../database/Models'

const contact_query = {
  admin_get_contact_list: async (_, { query: { skip, limit } }, { auth }) => {
    await checkAdmin(auth)
    return ContactModel.find()
      .sort({ created_at: -1 })
      .skip(skip || 0)
      .limit(limit || 10)
      .then(async r => {
        return {
          data: r.map(async e => {
            return {
              ...e.getJson(),
              from_user: await getUserById(e.getFromUser()),
              to_user: await getUserById(e.getToUser()),
            }
          }),
          paging: {
            count: await CategoryModel.find()
              .sort({ created_at: 1 })
              .countDocuments(),
          },
        }
      })
  },
}

export default contact_query
