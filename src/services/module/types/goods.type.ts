/**
 * 商品列表
 */
export interface getGoods_Sku_value {
  oprice: number
  pprice: number
  cprice: number
  weight: number
  volume: number
}

export interface getGoods_Category {
  id: number
  name: string
  status: number
  create_time: string
  update_time: string
  category_id: number
  order: number
}

export interface getGoods_Goods_banner {
  id: number
  goods_id: number
  url: string
  create_time: string
  update_time: string
}

export interface getGoods_Goods_skus_card {
  id: number
  goods_id: number
  name: string
  type: number
  order: number
  goods_skus_card_value: any[]
}

export interface getGoods_List {
  id: number
  title: string
  category_id: number
  cover: string
  rating: number
  sale_count: number
  review_count: number
  min_price: string
  min_oprice: string
  desc?: any
  unit: string
  stock: number
  min_stock: number
  ischeck: number
  status: number
  stock_display: number
  express_id: number
  sku_type: number
  sku_value: getGoods_Sku_value
  content: string
  discount: number
  create_time: string
  update_time: string
  delete_time?: any
  order: number
  category: getGoods_Category
  goods_banner: getGoods_Goods_banner[]
  goods_attrs: any[]
  goods_skus: any[]
  goods_skus_card: getGoods_Goods_skus_card[]
}

export interface getGoods_Cate {
  id: number
  name: string
  status: number
  create_time: string
  update_time: string
  category_id: number
  order: number
  level: number
}

export interface getGoods_Data {
  list: getGoods_List[]
  totalCount: number
  cates: getGoods_Cate[]
}

export interface getGoods_Main {
  msg: string
  data: getGoods_Data
}
