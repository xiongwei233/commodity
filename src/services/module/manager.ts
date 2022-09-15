import request from '@/services/request'
import type { addMmanager_Type, manager_Type } from './types/manager.type'
import type { notice_global } from './types/notice.type'

/**
 * 获取管理员列表
 * @params limit 每页显示条数
 * @params keyword 管理员账户
 * @returns promise
 */
export type managerList_queryType = { limit?: number; page?: number; keyword: string }
type getManagerType = ({ limit, page, keyword }: managerList_queryType) => Promise<manager_Type>
export const getManagerAPI: getManagerType = ({ limit = 10, keyword = 1, page }) =>
  request.get(`/admin/manager/${page}`, {
    params: { limit, keyword }
  })

/**
 * 修改管理员状态
 * @params id 管理员ID
 * @params status 是否启用：0禁用 1启用
 * @returns promise
 */
export type editManagerStatus_queryType = { id: number; status: 0 | 1 | number }
type editManagerStatusType = ({ id, status }: editManagerStatus_queryType) => Promise<notice_global>
export const editManagerStatusAPI: editManagerStatusType = ({ id, status }) =>
  request.post(`admin/manager/${id}/update_status`, { status })

/**
 * 删除管理员
 * @params id 管理员ID
 * @returns promise
 */
type adminType = (id: number) => Promise<notice_global>
export const deleteManagerAPI: adminType = (id) => request.post(`/admin/manager/${id}/delete`)

/**
 * 修改管理员
 * @params id 管理员ID
 * @params username 用户名
 * @params status 是否启用：0禁用1启用
 * @params password 密码
 * @params role_id 角色ID
 * @params avatar 头像
 * @returns promise
 */
export type editManager_queryType<T, S> = {
  id: S
  status: S
  username: T
  password: T
  role_id?: S
  avatar?: T
}
type editManagerType = ({
  id,
  status,
  password,
  username,
  role_id,
  avatar
}: editManager_queryType<string, number>) => Promise<notice_global>
export const editManagerAPI: editManagerType = ({
  id,
  status,
  username,
  password,
  role_id,
  avatar
}) => request.post(`/admin/manager/${id}`, { status, username, password, role_id, avatar })

/**
 * 增加管理员
 * @params id 管理员ID
 * @params username 用户名
 * @params status 是否启用：0禁用1启用
 * @params password 密码
 * @params role_id 角色ID
 * @params avatar 头像
 * @returns promise
 */
export type addManager_queryType<T, S> = {
  status: S
  username: T
  password: T
  role_id?: S
  avatar?: T
}
export type addManagerType = ({
  status,
  password,
  username,
  role_id,
  avatar
}: addManager_queryType<string, number>) => Promise<addMmanager_Type>
export const addManagerAPI: addManagerType = ({ status, username, password, role_id, avatar }) =>
  request.post(`/admin/manager`, { status, username, password, role_id, avatar })
