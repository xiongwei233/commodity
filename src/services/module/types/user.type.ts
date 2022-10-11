export interface user_level_List {
  id: number
  name: string
  level: number
  status: number
  discount: number
  max_price: number
  max_times: number
}

export interface user_level_Data {
  list: user_level_List[]
  totalCount: number
}

export interface user_level_Main {
  msg: string
  data: user_level_Data
}
