import { ProductModel } from './Models'

export const getProductCountOfCategory: (
  id: number | string,
  query?: Record<string, any>
) => Promise<number> = async (id, query = {}) => {
  return ProductModel.find({ ...query, category: id }).countDocuments()
}

export const getProductCountOfUser: (
  id: number | string,
  query?: Record<string, any>
) => Promise<number> = async (id, query = {}) => {
  return ProductModel.find({ owner: id, ...query }).countDocuments()
}
