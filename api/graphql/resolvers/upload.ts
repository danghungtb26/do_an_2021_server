import { ContactModel } from '../../database/Models'
import { getUser, getUserById, storeFile } from '../../commons'

const mutation = {
  upload_file: async (_, { file }) => {
    const fileId = await storeFile(file).then(r => r)
    return fileId
  },
  send_contact: async (_, { param: { to_user, info, product_id } }, { auth }) => {
    const user = await getUser(auth)
    const data = { info }

    if (to_user) {
      data.to_user = to_user
    }

    if (user.id) {
      data.from_user = user.id
    }

    if (product_id) {
      data.product = product_id
    }

    console.log('🚀 ~ file: upload.ts ~ line 14 ~ send_contact: ~ user', data)

    const newData = new ContactModel(data)
    return newData.save().then(async r => {
      console.log('🚀 ~ file: upload.ts ~ line 25 ~ returnnewData.save ~ r', r)
      return {
        ...r.getJson(),
        from_user: await getUserById(r.getFromUser()),
        to_user: await getUserById(r.getToUser()),
      }
    })
  },
}

export default mutation
