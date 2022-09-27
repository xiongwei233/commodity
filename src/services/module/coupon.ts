import request from '@/services/request'
import type { set_rulesType } from '@/services/module/types/role.type'

/**
 * 配置角色权限
 * @returns promise
 */

type setRulesType = (id: number, data: { status: number }) => Promise<void>
export const loseEfficacyAPI: setRulesType = (id, data) =>
  request.post(`/admin/coupon/${id}/update_status`, data)
