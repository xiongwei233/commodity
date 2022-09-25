import {
  addAccessAPI,
  deleteAccessAPI,
  editAccessAPI,
  getAccessAPI,
  statusAccessAPI,
  type addAccess_queryType
} from '@/services/module/access'
import type {
  access_List,
  access_main,
  access_Rule,
  addAccess_global,
  addAccess_main
} from '@/services/module/types/access.type'
import { defineStore } from 'pinia'

// 名字的常量
import { Names } from './stores.name'

export const useAccessStore = defineStore(Names.ACCESS, {
  state: () => ({
    accessLst: <access_List[]>[],
    totalCount: <number>0,
    accessRules: <access_Rule[]>[]
  }),
  getters: {},
  actions: {
    // 菜单权限列表
    fetch_getAccessAPI(): Promise<access_main> {
      return new Promise(async (resolve, reject) => {
        try {
          const results = await getAccessAPI()
          this.accessLst = results.data.list
          this.totalCount = results.data.totalCount
          this.accessRules = results.data.rules
          //console.log(results)
          resolve(results)
        } catch (error) {
          reject(error)
        }
      })
    },

    // 增加菜单权限
    fetch_addAccessAPI({
      rule_id,
      menu,
      name,
      condition,
      method,
      status,
      order,
      icon,
      frontpath
    }: any): Promise<addAccess_main> {
      return new Promise(async (resolve, reject) => {
        try {
          const results = await addAccessAPI({
            rule_id,
            menu,
            name,
            condition,
            method,
            status,
            order,
            icon,
            frontpath
          })
          resolve(results)
        } catch (error) {
          reject(error)
        }
      })
    },

    // 修改菜单权限
    fetch_editccessAPI({
      rule_id,
      menu,
      name,
      condition,
      method,
      status,
      order,
      icon,
      frontpath
    }: any): Promise<addAccess_global> {
      return new Promise(async (resolve, reject) => {
        try {
          const results = await editAccessAPI({
            rule_id,
            menu,
            name,
            condition,
            method,
            status,
            order,
            icon,
            frontpath
          })
          resolve(results)
        } catch (error) {
          reject(error)
        }
      })
    },

    // 删除菜单权限
    fetch_deleteAccessAPI(id: number): Promise<addAccess_global> {
      return new Promise(async (resolve, reject) => {
        try {
          const results = await deleteAccessAPI(id)
          resolve(results)
        } catch (error) {
          reject(error)
        }
      })
    },

    // 修改状态菜单权限
    fetch_statusAccessAPI(id: number, status: number): Promise<addAccess_global> {
      return new Promise(async (resolve, reject) => {
        try {
          const results = await statusAccessAPI({ id, status })
          resolve(results)
        } catch (error) {
          reject(error)
        }
      })
    }
  }
})
