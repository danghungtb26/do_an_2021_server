import { Document, Schema, SchemaTypes } from 'mongoose'
import moment from 'moment'
import table from '../tableName'
import { config_default_collection } from './utils'

const method = {
  getId: function getId(): string | number {
    return this._id
  },
  getjson: function getJson(): {
    id: string
    content: string
    parent: string
    product: string
    reply_count: number
    created_at: string
    updated_at: string
  } {
    return {
      id: this._id,
      content: this.content,
      parent: this.parent,
      product: this.product,
      reply_count: this.reply_count,
      created_at: moment(this.created_at).format(),
      updated_at: moment(this.updated_at).format(),
    }
  },
  getUser: function getUser(): string {
    return this.user
  },
}

const Comment = new Schema<typeof method>(
  {
    product: {
      type: SchemaTypes.ObjectId,
      ref: table.product,
    },
    content: SchemaTypes.String,
    user: {
      type: SchemaTypes.ObjectId,
      ref: table.user,
    },
    parent: {
      type: SchemaTypes.ObjectId,
      ref: table.comment,
    },
    reply_count: {
      type: SchemaTypes.Number,
      default: 0,
    },
    react_count: {
      type: SchemaTypes.Number,
      default: 0,
    },
  },
  {
    ...config_default_collection,
  }
)

Comment.method(method)

export type commentType = Document & typeof method

export default Comment
