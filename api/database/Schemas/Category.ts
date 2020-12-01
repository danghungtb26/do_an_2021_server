import mongoose, { Document } from 'mongoose'
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
      enum: [0, 1, 2, 3],
      default: 1,
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
