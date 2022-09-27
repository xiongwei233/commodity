/**
 * 分类关联产品列表
 */
export interface getDate {
  id: number
  name: string
  cover: string
  category_id: number
  goods_id: number
  order: number
  create_time: string
  update_time: string
}

export interface getDateRo {
  msg: string
  data: getDate[]
}

export interface globalDateRo {
  msg: string
  data: boolean
}
