// 图库列表
export interface image_List {
  id: number
  name: string
  order: number
  images_count: number
}

export interface image_Data {
  list: image_List[]
  totalCount: number
}

export interface image_RootObject {
  msg: string
  data: image_Data
}

// 指定分类下的图片列表
export interface imageCategory_List {
  id: number
  url: string
  name: string
  path: string
  create_time: string
  update_time: string
  image_class_id: number
}

export interface imageCategory_Data {
  list: imageCategory_List[]
  totalCount: number
}

export interface imageCategory_RootObject {
  msg: string
  data: imageCategory_Data
}

// 增加图库分类
export interface addImageCategory_Data {
  name: string
  order: string
  id: string
}
export interface addImageCategory_RootObject {
  msg: string
  data: addImageCategory_Data
}

// 修改/删除图库分类
export interface editImageCategory_RootObject {
  msg: string
  data: boolean
}
