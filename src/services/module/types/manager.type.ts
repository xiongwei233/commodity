/**
 * 管理员列表
 */
export interface manager_Role {
  id: number
  name: string
}

export interface manager_List {
  id: number
  status: number
  create_time: string
  update_time: string
  username: string
  avatar: string
  role_id: number
  super: number
  role: manager_Role
}

export interface manager_Data {
  list: manager_List[]
  totalCount: number
  roles: manager_Role[]
}

export interface manager_Type {
  msg: string
  data: manager_Data
}

/**
 * 增加管理员
 */
export interface addMmanager_Data {
  username: string
  role_id: string
  status: string
  avatar: string
  super: number
  create_time: string
  update_time: string
  id: string
}

export interface addMmanager_Type {
  msg: string
  data: addMmanager_Data
}
