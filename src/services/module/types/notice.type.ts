/**
 * 公告列表
 */
export interface getNotice_List {
  id: number
  title: string
  content: string
  order: number
  create_time: string
  update_time: string
}

export interface getNotice_Data {
  list: getNotice_List[]
  totalCount: number
}

export interface getNotice_RootObject {
  msg: string
  data: getNotice_Data
}

/**
 * 增加公告
 */
export interface addNotice_Data {
  title: string
  content: string
  create_time: string
  update_time: string
  id: number
}

export interface addNotice_RootObject {
  msg: string
  data: addNotice_Data
}

/**
 * 删除公告
 */
export interface notice_global {
  msg: string
  data: boolean
}
