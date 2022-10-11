import { commentReplyAPI } from '@/services'
import { defineStore } from 'pinia'

// 名字的常量
import { Names } from './stores.name'

export const useOrderStore = defineStore(Names.ORDER, {
  state: () => ({}),
  getters: {},
  actions: {
    // id: number, data: string
    commentReply_fetch(id: number, data: string) {
      return new Promise((resolve, reject) => {
        commentReplyAPI(id, data)
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
