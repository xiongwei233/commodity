import request from '@/services/request'
import type { user_level_Main } from './types/user.type'

/**
 * 会员等级列表
 * @returns promise
 */
type setRulesType = (page: number) => Promise<user_level_Main>
export const getUser_levelAPI: setRulesType = (page) => request.get(`/admin/user_level/${page}`)
