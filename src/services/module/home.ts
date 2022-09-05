import request from '@/services/request'
import type { AxiosPromise } from 'axios'
import type { statistics1_Data, statistics3_Data, statistics2_Data } from './types/home.type'

/**
 * 后台首页统计1
 * @returns promise
 */
type getStatistics_1Type = () => AxiosPromise<statistics1_Data>
export const getStatistics_1API: getStatistics_1Type = () =>
  request({
    url: 'admin/statistics1',
    method: 'GET'
  })

/**
 * 后台首页统计3
 * @returns promise
 */
type getStatistics_3Type = (type: 'month' | 'week' | 'hour') => AxiosPromise<statistics3_Data>
export const getStatistics_3API: getStatistics_3Type = (type) =>
  request({
    url: `admin/statistics3`,
    method: 'GET',
    params: {
      type
    }
  })

/**
 * 后台首页统计2
 * @returns promise
 */
type getStatistics_2Type = () => AxiosPromise<statistics2_Data>
export const getStatistics_2API: getStatistics_2Type = () =>
  request({
    url: `/admin/statistics2`,
    method: 'GET'
  })
