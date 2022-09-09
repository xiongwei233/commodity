import {
  addNoticeAPI,
  deleteNoticeAPI,
  editNoticeAPI,
  getNoticeAPI,
  type addNotice_queryType,
  type editNotice_queryType
} from '@/services'

import type {
  addNotice_RootObject,
  getNotice_Data,
  getNotice_RootObject,
  notice_global
} from '@/services/module/types/notice.type'

import { defineStore } from 'pinia'

// 名字的常量
import { Names } from './stores.name'

export const useNoticeStore = defineStore(Names.NOTICE, {
  state: () => ({
    noticeList: <getNotice_Data>{}
  }),
  getters: {},
  actions: {
    // 公告列表
    fetch_getNoticeAPI(page?: number): Promise<getNotice_RootObject> {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await getNoticeAPI(page)
          this.noticeList = result.data
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },

    // 增加公告
    fetch_addNoticeAPI({ title, content }: addNotice_queryType): Promise<addNotice_RootObject> {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await addNoticeAPI({ title, content })
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },

    // 修改公告
    fetch_editNoticeAPI({ id, title, content }: editNotice_queryType): Promise<notice_global> {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await editNoticeAPI({ id, title, content })
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },

    // 删除公告
    fetch_deleteNoticeAPI(id: number): Promise<notice_global> {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await deleteNoticeAPI(id)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    }
  }
})
