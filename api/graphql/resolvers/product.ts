import { ValidationError } from 'apollo-server-express'
import { checkAdmin, getUser, getUserById, runWithSession } from '../../commons'
import { product_action_type, product_status, roles } from '../../constants'
import { ProductModel, UserModel } from '../../database/Models'
import { categoryType, userType } from '../../database/Schemas'

const addProduct = async (product, auth) => {
  const user = await getUser(auth).then(r => {
    return getUserById(`${r.id}`)
  })
  console.log('🚀 ~ file: product.ts ~ line 15 ~ addProduct ~ user', user)

  if (!user || user.getRole() !== roles.user) throw new ValidationError('User not found!')

  return new Promise(resolve => {
    // chạy cùng session để tạo transection
    const { title, description, keyword, sort_description, budget, deployment_time } = product
    const newProduct = new ProductModel({
      title,
      description,
      keyword,
      budget,
      deployment_time,
      sort_description,

      author: user.getId(),
      owner: user.getId(),
    })

    runWithSession((session, success) => {
      ProductModel.insertMany([newProduct], { session }).then(products => {
        if (products?.length < 1) throw new ValidationError('Đã có lỗi xảy ra!')
        UserModel.findByIdAndUpdate(
          user.getId(),
          {
            $inc: {
              product_count: 1,
            },
          },
          { session, new: true }
        )
          .populate('author')
          .populate('owner')
          .populate('category')
          .then(() => {
            success().then(async () => {
              resolve({
                ...products[0]?.getJson(),
                category: (products[0].getCategory() as categoryType)?.getJson(),
                author: await getUserById(products[0]?.getAuthor() as string),
                owner: await getUserById(products[0]?.getOwner() as string),
              })
            })
          })
      })
    })
  })
}

const mutation = {
  /**
   * func api để thêm sản phẩm vào database
   * @param _
   * @param param1
   */
  addProduct(_, { product }, { auth }) {
    return addProduct(product, auth)
  },

  /**
   * func api để edit sản phẩm vào database theo id
   * @param _
   * @param param1
   */
  editProduct(_, { product }, { auth }) {
    console.log('editProduct -> auth', auth)
    console.log(product)
  },

  /**
   * func xoá sản phẩm
   * @param _
   * @param param1
   */
  deleteProduct(_, { id }, { auth }) {
    console.log('editProduct -> auth', auth)
    console.log(id)
  },

  update_view_product: (_, { id }) => {
    return ProductModel.findByIdAndUpdate(
      id,
      {
        $inc: {
          view_count: 1,
        },
      },
      {
        new: true,
      }
    )
      .populate('author')
      .populate('owner')
      .populate('category')
      .then(r => ({
        ...r?.getJson(),
        category: (r?.getCategory() as categoryType)?.getJson(),
        author: (r?.getAuthor() as userType).getJson(),
        owner: (r?.getOwner() as userType).getJson(),
      }))
  },

  // admin page
  admin_aprove_product: async (_, { param }, { auth }) => {
    const user = await checkAdmin(auth)
    const { id, type, category } = param

    if (type !== product_action_type.aprove && type !== product_action_type.reject)
      throw new ValidationError('error')

    if (type === product_action_type.aprove && !category)
      throw new ValidationError('category not found')

    let newStatus = product_status.new

    if (type === product_action_type.aprove) newStatus = product_status.pending
    if (type === product_action_type.reject) newStatus = product_status.reject
    const newObject = product_action_type.aprove ? { category } : {}
    return ProductModel.findByIdAndUpdate(
      id,
      {
        $set: {
          status: newStatus,
          admin: user?.getId(),
          ...newObject,
        },
      },
      { new: true }
    )
      .populate('author')
      .populate('owner')
      .populate('category')
      .then(r => {
        if (r)
          return {
            ...r?.getJson(),
            category: (r?.getCategory() as categoryType)?.getJson(),
            author: (r?.getAuthor() as userType)?.getJson(),
            owner: (r?.getOwner() as userType)?.getJson(),
          }

        throw new ValidationError('Not found')
      })
  },
  admin_active_product: async (_, { param }, { auth }) => {
    const user = await checkAdmin(auth)
    const { id, type } = param

    if (type !== product_action_type.active && type !== product_action_type.inactive)
      throw new ValidationError('error')

    let newStatus = product_status.new

    if (type === product_action_type.active) newStatus = product_status.pending
    if (type === product_action_type.inactive) newStatus = product_status.blocked
    return ProductModel.findByIdAndUpdate(
      id,
      {
        $set: {
          status: newStatus,
          admin: user?.getId(),
        },
      },
      { new: true }
    )
      .populate('author')
      .populate('owner')
      .populate('category')
      .then(r => {
        if (r)
          return {
            ...r?.getJson(),
            category: (r?.getCategory() as categoryType)?.getJson(),
            author: (r?.getAuthor() as userType)?.getJson(),
            owner: (r?.getOwner() as userType)?.getJson(),
          }

        throw new ValidationError('Not found')
      })
  },
}

export default mutation
