import { model } from 'mongoose'
import {
  ProductSchema,
  productType,
  UserSchema,
  userType,
  CategorySchema,
  categoryType,
  CommentSchema,
  commentType,
} from '../Schemas'
import table from '../tableName'

export const ProductModel = model<productType>(table.product, ProductSchema)
export const UserModel = model<userType>(table.user, UserSchema)
export const CategoryModel = model<categoryType>(table.category, CategorySchema)
export const CommentModel = model<commentType>(table.comment, CommentSchema)
