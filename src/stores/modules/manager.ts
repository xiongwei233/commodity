import {
  addManagerAPI,
  deleteManagerAPI,
  editManagerAPI,
  editManagerStatusAPI,
  getManagerAPI,
  type addManager_queryType,
  type editManagerStatus_queryType,
  type editManager_queryType,
  type managerList_queryType
} from '@/services/module/manager'
import type { addMmanager_Type, manager_Data, manager_Type } from '@/services/module/types/manager.type'
import type { addNotice_Data, notice_global } from '@/services/module/types/notice.type'
import { defineStore } from 'pinia'

// 名字的常量
import { Names } from './stores.name'

export const useManagerStore = defineStore(Names.MANAGER, {
  state: () => ({
    managerList: <manager_Data>{},
    loading: <boolean>false,
    currentPage: 1
  }),
  getters: {},
  actions: {
    // 获取管理员列表
    fetch_getManagerAPI({ limit, page, keyword }: managerList_queryType): Promise<manager_Type> {
      return new Promise(async (resolve, reject) => {
        try {
          this.loading = true
          const results = await getManagerAPI({ limit, page, keyword })
          this.managerList = results.data
          this.loading = false
          //console.log(results)
          resolve(results)
        } catch (error) {
          this.loading = false
          reject(error)
        }
      })
    },

    // 修改管理员状态
    fetch_editManagerStatusAPI({ id, status }: editManagerStatus_queryType): Promise<notice_global> {
      return new Promise(async (resolve, reject) => {
        try {
          const results = await editManagerStatusAPI({ id, status })
          resolve(results)
        } catch (error) {
          reject(error)
        }
      })
    },

    // 删除管理员
    fetch_deleteManagerAPI(id: number): Promise<notice_global> {
      return new Promise(async (resolve, reject) => {
        try {
          this.loading = true
          const results = await deleteManagerAPI(id)
          this.loading = false
          resolve(results)
        } catch (error) {
          this.loading = false
          reject(error)
        }
      })
    },

    // 增加管理员
    fetch_editManagerAPI({
      id,
      status,
      password,
      username,
      role_id,
      avatar
    }: editManager_queryType<string, number>): Promise<notice_global> {
      return new Promise(async (resolve, reject) => {
        try {
          this.loading = true
          const results = await editManagerAPI({ id, status, username, password, role_id, avatar })
          this.loading = false
          resolve(results)
        } catch (error) {
          this.loading = false
          reject(error)
        }
      })
    },

    // 增加管理员
    fetch_addManagerAPI({
      status,
      password,
      username,
      role_id,
      avatar
    }: addManager_queryType<string, number>): Promise<addMmanager_Type> {
      return new Promise(async (resolve, reject) => {
        try {
          this.loading = true
          const results = await addManagerAPI({ status, username, password, role_id, avatar })
          this.loading = false
          resolve(results)
        } catch (error) {
          this.loading = false
          reject(error)
        }
      })
    }
  }
})
