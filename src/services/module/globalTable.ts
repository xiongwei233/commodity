import request from '@/services/request'
import type { PageType } from './types/globalTable.type'

// 查询列表
export const getGlobalTableAPI = (pageUrl: string, queryInfo: PageType) => {
  return request.get(`${pageUrl}/${queryInfo.page}`, {
    params: {
      limit: queryInfo.limit,
      keyword: queryInfo.keyword
    }
  })
}

// 删除列表
// url: /users/id
export function deleteGlobalTableAPI(url: string) {
  return request.post(url)
}

// 新建列表
export function addeGlobalTableAPI(url: string, newDate: any) {
  return request.post(url, { ...newDate })
}

// 编辑列表
export function editeGlobalTableAPI(url: string, editDate: any) {
  return request.post(url, { ...editDate })
}

// 修改状态
export function editeGlobalStatusAPI(url: string, editDate: any) {
  return request.post(url, { ...editDate })
}
