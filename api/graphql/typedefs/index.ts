const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type User {
    id: String!
    name: String
    email: String!
    introduction: String
    avatar: String
    phone: String
    role: String
    product_count: Int
    article_count: Int
    updated_at: String
    created_at: String
    token: String!
  }

  type Product {
    id: String!
    title: String!
    keyword: String
    sort_description: String
    description: String!
    status: Int!
    owner: User
    author: User
    react_count: Int
    comment_count: Int
    budget: Int
    deployment_time: Int
    view_count: Int
    updated_at: String
    created_at: String
  }

  type Category {
    id: String!
    name: String!
    product_count: String
    description: String
    created_at: String
    updated_at: String
  }

  type CategoryList {
    data: [Category]!
  }

  type Page {
    count: Int
    current_page: Int
    total_page: Int
  }

  type ProductList {
    data: [Product]!
    paging: Page!
  }

  type Comment {
    id: String!
    content: String
    product: String
    parent: String
    user: User
  }

  input RegisterUserInput {
    email: String!
    password: String!
    confirm_password: String!
    role: String
  }

  input LoginUserInput {
    email: String!
    password: String!
    role: String
  }

  input AddProductInput {
    id: String
    title: String
    keyword: String
    sort_description: String
    description: String
    budget: String
    deployment_time: String
  }

  input CommentInput {
    content: String!
    product_id: String
    comment_id: String
  }

  input SortProduct {
    name: String
    desc: Boolean
  }

  input QueryProductInput {
    user: String
    limit: Int
    skip: Int
    keyword: String
    sort: [SortProduct]
  }

  type Query {
    get_user_info: User!
    get_product_list(query: QueryProductInput): ProductList
    get_product_by_id(id: String): Product
    get_user_product_list(query: QueryProductInput): ProductList
    get_category_list: CategoryList
  }

  type Mutation {
    register(user: RegisterUserInput!): User!
    login(user: LoginUserInput!): User!
    addProduct(product: AddProductInput!): Product
    editProduct(product: AddProductInput!): Product!
    deleteProduct(id: String!): String
    update_view_product(id: String): Product
    upload_file(file: Upload!): String
    comment_product(comment: CommentInput!): Comment
    edit_comment(comment: CommentInput!): Comment
    delete_comment(comment_id: String): Boolean
  }
`

export default typeDefs
