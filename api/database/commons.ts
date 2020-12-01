import { ProductModel } from './Models'

export const esss = ''

export const getProductCountOfCategory: (id: number | string) => Promise<number> = async id => {
  return ProductModel.find({ status: 2, category: id }).countDocuments()
}
