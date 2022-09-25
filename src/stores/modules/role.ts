import { permissionsAPI } from '@/services/module/role'
import type { set_rulesType } from '@/services/module/types/role.type'
import { defineStore } from 'pinia'

// 名字的常量
import { Names } from './stores.name'

export const useRoleStore = defineStore(Names.ROLE, {
  state: () => ({}),
  getters: {},
  actions: {
    // 配置角色权限
    fetch_permissionsAPI(rules: set_rulesType) {
      return new Promise((resolve, reject) => {
        permissionsAPI(rules)
          .then((data: any) => {
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
})
