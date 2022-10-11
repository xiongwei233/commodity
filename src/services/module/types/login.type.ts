/**
 * 登录- token
 */
export interface login_Data {
  token: string
}

export interface loginType {
  msg: string
  data: login_Data
}

/**
 * 登录-用户信息
 */
export interface userInfo_Role {
  id: number
  name: string
}

export interface userInfo_Child {
  id: number
  rule_id: number
  status: number
  create_time: string
  update_time: string
  name: string
  desc: string
  frontpath: string
  condition?: any
  menu: number
  order: number
  icon: string
  method: string
  child: any[]
}

export interface userInfo_Menu {
  id: number
  rule_id: number
  status: number
  create_time: string
  update_time: string
  name: string
  desc: string
  frontpath?: any
  condition?: any
  menu: number
  order: number
  icon: string
  method: string
  child: userInfo_Child[]
}

export interface userInfo_Data {
  id: number
  username: string
  avatar: string
  super: number
  role: userInfo_Role
  menus: userInfo_Menu[]
  ruleNames: string[]
}

export interface userInfo_RootObject {
  msg: string
  data: userInfo_Data
}

/**
 * 退出登录
 */
export interface ILogout {
  msg: string
  data: string
}
