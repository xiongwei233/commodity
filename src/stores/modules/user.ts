import type { user_level_List } from '@/services/module/types/user.type'
import { getUser_levelAPI } from '@/services/module/user'
import { defineStore } from 'pinia'

// 名字的常量
import { Names } from './stores.name'

export const useUserStore = defineStore(Names.USER, {
  state: () => ({
    user_levelList: <user_level_List[]>[]
  }),
  getters: {},
  actions: {
    // 会员等级列表
    fetch_user_level() {
      return new Promise((resolve, reject) => {
        getUser_levelAPI(1)
          .then((res) => {
            resolve(res)
            this.user_levelList = res.data.list
          })
          .catch((err) => reject(err))
      })
    }
  }
})
