import mongoose from 'mongoose'
import table from '../database/tableName'

export const storeFile = async upload => {
  const { filename, createReadStream, mimetype } = await upload.then(result => result)

  const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: table.attachment,
  })

  const uploadStream = bucket.openUploadStream(filename, {
    contentType: mimetype,
  })
  return new Promise((resolve, reject) => {
    createReadStream()
      .pipe(uploadStream)
      .on('error', reject)
      .on('finish', () => {
        resolve(uploadStream.id)
      })
  })
}

export const aaaa = ''
