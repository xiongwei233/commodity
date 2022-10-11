import request from '@/services/request'

/**
 * 获取管理员列表
 * @params limit 每页显示条数
 * @params keyword 管理员账户
 * @returns promise
 */
export const commentReplyAPI = (id: number, data: string) =>
  request.post(`/admin/goods_comment/review/${id}`, { data })
