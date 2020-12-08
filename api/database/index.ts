import mongoose from 'mongoose'

import { databaseName } from './config'

const Grid = require('gridfs-stream')

mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false)
const options = {
  // db: {
  //   native_parser: true,
  // },
  // server: {
  //   poolSize: 5,
  // },
  autoCreate: true,
  autoIndex: true,
  // user: 'admin',
  // pass: '15150408',
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

let grid_file: any

mongoose
  .connect(databaseName, options)
  .then(() => {
    console.log('connect successfully')
    grid_file = new Grid(mongoose.connection.db, mongoose.mongo)
    // console.log('🚀 ~ file: index.ts ~ line 31 ~ .then ~ grid_file', grid_file)
    require('./Seeds')
  })
  .catch(err => {
    console.log('connect error', err)
  })

export { grid_file }
