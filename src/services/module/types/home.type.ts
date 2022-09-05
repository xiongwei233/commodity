// 后台首页统计1
export interface statistics1_Panel {
  title: string
  value: number
  unit: string
  unitColor: string
  subTitle: string
  subValue: number
  subUnit: string
}

export interface statistics1_Data {
  panels: statistics1_Panel[]
}

export interface statistics1_RootObject {
  msg: string
  data: statistics1_Data
}

// 后台首页统计3
export interface statistics3_Data {
  x: string[]
  y: number[]
}

export interface statistics3_RootObject {
  msg: string
  data: statistics3_Data
}

// 后台首页统计2
export interface statistics2_Good {
  label: string
  value: number
}

export interface statistics2_Order {
  label: string
  value: number
}

export interface statistics2_Data {
  goods: statistics2_Good[]
  order: statistics2_Order[]
}

export interface statistics2_RootObject {
  msg: string
  data: statistics2_Data
}
