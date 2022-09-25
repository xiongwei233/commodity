import request from '@/services/request'
import type { access_main, addAccess_global, addAccess_main } from './types/access.type'

/**
 * 菜单权限列表
 * @returns promise
 */
type getAccess_Type = () => Promise<access_main>
export const getAccessAPI: getAccess_Type = () => request.get('/admin/rule/1')

/**
 * 增加菜单权限
 * @returns promise
 */
export type addAccess_queryType = {
  rule_id?: number | string
  menu: 0 | 1
  name?: string | number
  condition?: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  status?: number
  order?: number
  icon?: string
  frontpath?: string
  [index: string | number]: any
}

type addAccess_Type = ({
  rule_id,
  menu,
  name,
  condition,
  method,
  status,
  order,
  icon,
  frontpath
}: addAccess_queryType) => Promise<addAccess_main>
export const addAccessAPI: addAccess_Type = (data) => request.post('/admin/rule', data)

/**
 * 修改菜单权限
 * @returns promise
 */
type editAccess_Type = ({
  rule_id,
  menu,
  name,
  condition,
  method,
  status,
  order,
  icon,
  frontpath
}: addAccess_queryType) => Promise<addAccess_global>
export const editAccessAPI: editAccess_Type = (data) =>
  request.post(`/admin/rule/${data.rule_id}`, data)

/**
 * 删除菜单权限
 * @returns promise
 */
type deleteAccess_Type = (id: number) => Promise<addAccess_global>
export const deleteAccessAPI: deleteAccess_Type = (id) => request.post(`/admin/rule/${id}/delete`)

/**
 * 修改菜单权限状态
 * @returns promise
 */
type staAccess_Type = ({ id, status }: { id: number; status: number }) => Promise<addAccess_global>
export const statusAccessAPI: staAccess_Type = ({ id, status }) =>
  request.post(`/admin/rule/${id}/update_status`, {
    status
  })
