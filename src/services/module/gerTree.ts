import request from '@/services/request'

// 查询列表
export const gerTreeListAPI = (pageUrl: string) => {
  return request.get(pageUrl)
}

// 删除列表
// url: /users/id
export function deleteTreeListAPI(url: string) {
  return request.post(url)
}

// 新建列表
export function addeTreeListAPI(url: string, newDate: any) {
  return request.post(url, { ...newDate })
}

// 编辑列表
export function editeTreeListAPI(url: string, editDate: any) {
  return request.post(url, { ...editDate })
}

// 修改状态
export function editeStatusTreeListAPI(url: string, editDate: any) {
  return request.post(url, { ...editDate })
}
