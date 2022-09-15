import request from '@/services/request'
import type {
  statistics1_RootObject,
  statistics2_RootObject,
  statistics3_RootObject
} from './types/home.type'

/**
 * 后台首页统计1
 * @returns promise
 */
type getStatistics_1Type = () => Promise<statistics1_RootObject>
export const getStatistics_1API: getStatistics_1Type = () => request.get('/admin/statistics1')
//export const getStatistics_1API: getStatistics_1Type = () =>
//  request({
//    url: 'admin/statistics1',
//    method: 'GET'
//  })

/**
 * 后台首页统计3
 * @returns promise
 */
type getStatistics_3Type = (type: 'month' | 'week' | 'hour') => Promise<statistics3_RootObject>
export const getStatistics_3API: getStatistics_3Type = (type) =>
  request.get(`/admin/statistics3`, {
    params: { type }
  })
//export const getStatistics_3API: getStatistics_3Type = (type) =>
//  request({
//    url: `admin/statistics3`,
//    method: 'GET',
//    params: {
//      type
//    }
//})

/**
 * 后台首页统计2
 * @returns promise
 */
type getStatistics_2Type = () => Promise<statistics2_RootObject>
export const getStatistics_2API: getStatistics_2Type = () => request.get('/admin/statistics2')
//export const getStatistics_2API: getStatistics_2Type = () =>
//  request({
//    url: `/admin/statistics2`,
//    method: 'GET'
//  })
