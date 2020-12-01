import CommentResolvers from './comment'

export { default as UserResolvers } from './users'
export { default as ProductResolvers } from './product'
export { default as UploadResolvers } from './upload'
export { default as CommentResolvers } from './comment'

export const resolver = {
  ...CommentResolvers,
}
