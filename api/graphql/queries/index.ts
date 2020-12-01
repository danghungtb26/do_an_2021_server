import UserQueries from './users'
import ProductQueries from './products'
import CategoryQueries from './categories'

export { default as UserQueries } from './users'
export { default as ProductQueries } from './products'

const queries = {
  ...UserQueries,
  ...ProductQueries,
  ...CategoryQueries,
}

export default queries
