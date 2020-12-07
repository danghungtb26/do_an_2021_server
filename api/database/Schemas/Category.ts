import mongoose, { Document } from 'mongoose'
import { category_status } from '../../constants'
import table from '../tableName'

const { SchemaTypes, Schema } = mongoose

const method = {
  getId: function getId(): number | string {
    return this._id
  },
  getName: function getName(): string {
    return this.name
  },
  getNumberOfProduct: function get(): number {
    return this.number_of_product
  },
  getJson: function getJson(): {
    id: string
    name: string
    description: string
    create_by: string
    status: number
    created_at: string
    updated_at: string
  } {
    return {
      id: this._id,
      name: this.name,
      description: this.description,
      create_by: this.create_by,
      created_at: this.created_at,
      updated_at: this.created_at,
      status: this.status,
    }
  },
}

const Category = new Schema<typeof method>(
  {
    name: {
      type: SchemaTypes.String,
      required: true,
    },
    description: SchemaTypes.String,
    number_of_product: SchemaTypes.Number,
    parent_category: {
      type: SchemaTypes.ObjectId,
      ref: table.category,
    },
    create_by: {
      type: SchemaTypes.ObjectId,
      ref: table.user,
    },
    status: {
      type: SchemaTypes.Number,
      enum: category_status,
      default: 0,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    autoIndex: true,
  }
)

Category.method(method)

export type categoryType = Document & typeof method

export default Category
