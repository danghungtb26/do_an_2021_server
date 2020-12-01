import { storeFile } from '../../commons'

const mutation = {
  upload_file: async (_, { file }) => {
    const fileId = await storeFile(file).then(r => r)
    return fileId
  },
}

export default mutation
