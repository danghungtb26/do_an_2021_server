import { Document, Schema, SchemaTypes } from 'mongoose'
import table from '../tableName'
import { config_default_collection } from './utils'

const method = {
  getJson: function get() {
    return {
      id: this._id,
      info: this.info,
    }
  },

  getFromUser: function get() {
    return this.from_user
  },

  getToUser: function get() {
    return this.to_user
  },

  getProduct: function get() {
    return this.product
  },

  getId: function get(): string | number {
    return this._id
  },
}

const Contact = new Schema<typeof method>(
  {
    from_user: {
      type: SchemaTypes.ObjectId,
      ref: table.user,
    },
    to_user: {
      type: SchemaTypes.ObjectId,
      ref: table.user,
    },
    info: SchemaTypes.String,
    product: {
      type: SchemaTypes.ObjectId,
      ref: table.product,
    },
  },
  {
    ...config_default_collection,
  }
)

Contact.method(method)

export type contactTypes = Document & typeof method

export default Contact
