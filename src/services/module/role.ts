import request from '@/services/request'
import type { set_rulesType } from '@/services/module/types/role.type'

/**
 * 配置角色权限
 * @returns promise
 */
type setRulesType = (rule: set_rulesType) => Promise<void>
export const permissionsAPI: setRulesType = (rule) =>
  request.post(`/admin/role/set_rules`, { ...rule })
