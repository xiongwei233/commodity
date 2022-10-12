// 查询
export type GetQueryType = {
  id?: number
  pageName: string
  queryInfo: PageType
}
export type PageType = {
  limit: number
  page: number
  keyword?: string | number
  user_level_id?: string | number
  tab?: 'tab' | 'nopay' | 'noship' | 'shiped' | 'received' | 'finish' | 'closed' | 'refunding'
}

// 删除
export type DeleteQueryType = {
  pageName: string
  id: number
}

// 添加
export type addQueryType = {
  pageName: string
  newDate: any
}

// 修改
export type editQueryType = {
  id: string | number
  pageName: string
  editDate: any
}

// 修改状态
export type statusQueryType = {
  id: string | number
  pageName: string
  status: {
    status: 0 | 1 | number
  }
}

// 批量删除
export type batchDeleteQueryType = {
  pageName: string
  ids: number[]
}
