import { user_status_list } from 'api/constants'
import mongoose, { Document } from 'mongoose'
import table from '../tableName'

const { Schema, SchemaTypes } = mongoose

interface IArticle {
  id: string
  title: string
  keyword: string
  sort_description: string
  description: string
  react_count: number
  comment_count: number
  status: number
  author?: string
}

const method = {
  getJson: function getJson(): IArticle {
    return {
      id: this.id,
      title: this.title,
      keyword: this.keyword,
      sort_description: this.sort_description,
      description: this.description,
      react_count: this.react_count,
      comment_count: this.comment_count,
      status: this.status,
    }
  },
}

const ArticleSchema = new Schema<typeof method>({
  title: {
    type: SchemaTypes.String,
    required: true,
  },
  sort_description: {
    type: SchemaTypes.String,
    default: '',
  },
  description: {
    type: SchemaTypes.String,
    required: true,
  },
  keyword: {
    type: SchemaTypes.String,
  },
  react_count: {
    type: SchemaTypes.Number,
    default: 0,
  },
  comment_count: {
    type: SchemaTypes.Number,
    default: 0,
  },
  author: {
    type: SchemaTypes.ObjectId,
    ref: table.user,
  },
  status: {
    type: SchemaTypes.String,
    enum: user_status_list,
    default: 2,
  },
})

ArticleSchema.method(method)

export type ArticleTypes = Document & IArticle & typeof method

export default ArticleSchema
