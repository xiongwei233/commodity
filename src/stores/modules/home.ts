import { defineStore } from 'pinia'

import { getStatistics_1API, getStatistics_3API, getStatistics_2API } from '@/services'

// 名字的常量
import { Names } from './stores.name'
import type {
  statistics1_Panel,
  statistics3_Data,
  statistics2_Data,
  statistics1_RootObject,
  statistics3_RootObject,
  statistics2_RootObject
} from '@/services/module/types/home.type'

export const useHomeStore = defineStore(Names.HOME, {
  state: () => ({
    // 后台首页统计1
    statistics_1: <statistics1_Panel[]>[],
    statistics_3: <statistics3_Data>{},
    statistics_2: <statistics2_Data>{}
  }),
  getters: {},
  actions: {
    // 后台首页统计1
    fetchGetStatistics_1API(): Promise<statistics1_RootObject> {
      return new Promise(async (resolve, reject) => {
        try {
          const results = await getStatistics_1API()
          this.statistics_1 = results.data.panels
          //console.log(results)
          resolve(results)
        } catch (error) {
          reject(error)
        }
      })
    },

    // 后台首页统计3
    fetchGetStatistics_3API(type: 'month' | 'week' | 'hour'): Promise<statistics3_RootObject> {
      return new Promise(async (resolve, reject) => {
        try {
          const results = await getStatistics_3API(type)
          this.statistics_3 = results.data
          //console.log(results.data)
          resolve(results)
        } catch (error) {
          reject(error)
        }
      })
    },

    // 后台首页统计2
    fetchGetStatistics_2API(): Promise<statistics2_RootObject> {
      return new Promise(async (resolve, reject) => {
        try {
          const results = await getStatistics_2API()
          this.statistics_2 = results.data
          //console.log(results.data)
          resolve(results)
        } catch (error) {
          reject(error)
        }
      })
    }
  }
})
