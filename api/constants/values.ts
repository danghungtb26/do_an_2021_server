import _ from 'lodash'

export const roles = {
  user: 'user',
  admin: 'admin',
}

export const user_status = {
  normal: 1,
  vip: 2,
  blocked: 3,
  report: 4,
  deleted: 0,
}

export const user_status_list = _.values(user_status)

export const product_status = {
  new: 0,
  pending: 1,
  reject: 2,
  reported: 3,
  blocked: 4,
  deleted: 0,
}

export const product_action_type = {
  aprove: 'aprove',
  reject: 'reject',
  active: 'active',
  inactive: 'inactive',
}

export const product_status_list = _.values(product_status)

export const roles_list = [roles.admin, roles.user]

export const category_status = [0, 1, 2, 3]

export const category_status_value = {
  new: 0,
  pending: 1,
  inactive: 2,
  block: 3,
}

export const category_default = ['Khoa học', 'Công nghệ', 'Tri thức', 'Máy tính']
