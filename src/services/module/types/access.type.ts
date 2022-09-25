// 菜单权限列表
export interface access_Child {
  id: number
  rule_id: number
  status: number
  create_time: string
  update_time: string
  name: string
  desc: string
  frontpath: string
  condition: string
  menu: number
  order: number
  icon: string
  method: string
  child: any[]
}

export interface access_List {
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
  child: access_List[]
}

export interface access_Rule {
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
  child: access_Child[]
}

export interface access_Data {
  list: access_List[]
  totalCount: number
  rules: access_Rule[]
}

export interface access_main {
  msg: string
  data: access_Data
}

// 增加菜单权限
export interface addAccess_Data {
  rule_id: string
  menu: string
  name: string
  condition: string
  method: string
  status: string
  order: string
  icon: string
  frontpath: string
  create_time: string
  update_time: string
  id: string
}

export interface addAccess_main {
  msg: string
  data: addAccess_Data
}

export interface addAccess_global {
  msg: string
  data: boolean
}
