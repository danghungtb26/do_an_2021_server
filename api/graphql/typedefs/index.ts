const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
    id: String
  }

  type User {
    id: String!
    name: String
    email: String!
    introduction: String
    avatar: String
    phone: String
    role: String
    status: Int
    product_count: Int
    article_count: Int
    updated_at: String
    created_at: String
    token: String
  }

  type Category {
    id: String!
    name: String!
    product_count: String
    description: String
    status: Int
    create_by: String
    created_at: String
    updated_at: String
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
    category: Category
    react_count: Int
    comment_count: Int
    budget: Int
    high_light: Boolean
    attachment: [String]
    deployment_time: Int
    view_count: Int
    updated_at: String
    created_at: String
  }

  type Contact {
    id: String
    info: String
    from_user: User
    to_user: User
  }

  type ContactList {
    data: [Contact]!
    paging: Page
  }

  type CategoryList {
    data: [Category]!
    paging: Page
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

  type UserList {
    data: [User]!
    paging: Page
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
    attachment: [String]
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

  input Search {
    name: String
    type: String
    value: String
  }

  input QueryProductInput {
    user: String
    limit: Int
    skip: Int
    keyword: String
    sort: [SortProduct]
    category: String
    filter: String
  }

  input QueryUserInput {
    limit: Int
    skip: Int
    sort: [SortProduct]
    search: [Search]
  }

  input AproveInput {
    id: String
    type: String
    category: String
  }

  input HighLightInpit {
    id: String
    high_light: Boolean
  }

  input CategoryInput {
    id: String
    title: String
    description: String
    status: Int
  }

  input ContactInput {
    to_user: String
    product_id: String
    info: String
  }

  type Query {
    get_user_info: User!
    get_product_list(query: QueryProductInput): ProductList
    get_product_new(query: QueryProductInput): ProductList

    get_product_highlight(query: QueryProductInput): ProductList

    get_product_banner(query: QueryProductInput): ProductList

    admin_get_product_list(query: QueryProductInput): ProductList
    get_product_by_id(id: String): Product
    get_user_product_list(query: QueryProductInput): ProductList
    get_category_list: CategoryList

    admin_get_user_list(query: QueryUserInput!): UserList
    admin_get_category_list(query: QueryUserInput!): CategoryList
    admin_get_contact_list(query: QueryUserInput!): ContactList
  }

  type Mutation {
    register(user: RegisterUserInput!): User!
    login(user: LoginUserInput!): User!
    addProduct(product: AddProductInput!): Product
    editProduct(product: AddProductInput!): Product!
    deleteProduct(id: String!): String
    update_view_product(id: String): Product
    upload_file(file: Upload!): File
    comment_product(comment: CommentInput!): Comment
    edit_comment(comment: CommentInput!): Comment
    delete_comment(comment_id: String): Boolean
    send_contact(param: ContactInput): Contact

    #admin

    admin_aprove_product(param: AproveInput!): Product
    admin_active_product(param: AproveInput!): Product
    admin_high_light_product(param: HighLightInpit!): Product

    admin_add_category(param: CategoryInput!): Category
    admin_edit_category(param: CategoryInput!): Category
  }
`

export default typeDefs
