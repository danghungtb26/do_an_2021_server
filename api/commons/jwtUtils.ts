import { AuthenticationError, ValidationError } from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import { secretkey } from '../database/config'
import { UserModel } from '../database/Models'
import { userType } from '../database/Schemas'

/**
 * func nay dùng để sinh ra authen_token cho user khi đăng ký hoặc đăng nhập
 * expire 1y
 * @param param0 {
 *  id: string | number
 *  email: string
 * }
 */
export const getJwtToken: (param: { id: string | number; email: string }) => string = ({
  id,
  email,
}) =>
  jwt.sign({ id, email }, secretkey, {
    expiresIn: '365d',
  })

/**
 * func này dựa vào authen cung cấp để lấy ra id của user đăng nhập
 * @param auth: string
 */
export const getUser: (auth: string) => Promise<{ id: string | number }> = auth => {
  return new Promise(resolve => {
    if (!auth) resolve({ id: null })

    const token = auth.split('Bearer ')[1]

    if (!token) resolve({ id: null })

    jwt.verify(token, secretkey, (err, decoded) => {
      // if (err)
      resolve({ id: decoded?.id })
    })
  })
}

/**
 * func tim user theo id
 */
export const getUserById: (id: string) => Promise<userType | null> = id => {
  return UserModel.findById(id).then(r => r)
}

export const checkAdmin: (auth: string) => Promise<userType | null> = async authen => {
  const user = await getUserById((await getUser(authen)).id.toString())
  if (!user || user.getRole() !== 'admin') throw new ValidationError('Not authen')

  return user
}

export const getFilter: (f: string) => Promise<Record<string, any>> = async f => {
  try {
    return JSON.parse(f)
  } catch (error) {
    return {}
  }
}
