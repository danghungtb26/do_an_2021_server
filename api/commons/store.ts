import mongoose from 'mongoose'
import { ObjectID } from 'bson'
import { grid_file } from '../database'
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
        console.log('🚀 ~ file: store.ts ~ line 20 ~ .on ~ uploadStream', uploadStream)

        resolve({
          filename,
          mimetype,
          encoding: '',
          id: uploadStream.id,
        })
      })
  })
}

export const showFile = async (id, res) => {
  // grid_file.findOne({ name: 'IMG_0234.PNG' }, (err, file) => {
  //   console.log('🚀 ~ file: store.ts ~ line 36 ~ grid_file.findOne ~ err', err)
  //   console.log('🚀 ~ file: store.ts ~ line 36 ~ grid_file.findOne ~ file', file)
  // })
  // const a = grid_file.createReadStream({
  //   filename: id,
  // })
  // a.pipe(res)
  const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: table.attachment,
  })

  // const a = bucket.find()
  // console.log('🚀 ~ file: store.ts ~ line 46 ~ showFile ~ a', a)

  const uploadStream = bucket.openDownloadStream(new ObjectID(id))
  uploadStream.pipe(res)
}

export const aaaa = ''
