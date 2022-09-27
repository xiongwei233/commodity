import {
  addeTreeListAPI,
  deleteTreeListAPI,
  editeStatusTreeListAPI,
  editeTreeListAPI,
  gerTreeListAPI
} from '@/services/module/gerTree'
import type {
  addQueryType,
  DeleteQueryType,
  editQueryType,
  statusQueryType
} from '@/services/module/types/globalTable.type'
import { defineStore } from 'pinia'
import { NotificationBox } from '@/utils/element-Fun'

// 名字的常量
import { Names } from './stores.name'

export const useGlobalTreeStore = defineStore(Names.GLOBAL_TREE, {
  state: () => ({
    accessTreeList: <any[]>[],
    categoryTreeList: <any[]>[],
    loading: <boolean>false
  }),
  getters: {},
  actions: {
    // 获取数据
    gerTreeList_fetch(data: { pageName: string }) {
      // 1.获取pageUrl
      const pageName = data.pageName
      let pageUrl = ''
      switch (pageName) {
        case 'access':
          pageUrl = '/admin/rule/1'
          break
        case 'category':
          pageUrl = '/admin/category'
          break
      }

      // 2.发送请求
      this.loading = true
      gerTreeListAPI(pageUrl)
        .then((pageResult: any) => {
          // 3.将数据存储到state中
          switch (pageName) {
            case 'access':
              this.accessTreeList = pageResult.data.list
              break
            case 'category':
              this.categoryTreeList = pageResult.data
              break
          }
        })
        .finally(() => (this.loading = false))
    },

    // 删除列表
    deleteTreeList_fetch(data: DeleteQueryType) {
      // 1.获取pageName和id
      // pageName=> /users
      // id => users/id
      const { pageName, id } = data
      const pageUrl = `admin/${pageName}/${id}/delete`

      // 2. 调用删除数据的请求
      this.loading = true

      deleteTreeListAPI(pageUrl)
        .then(() =>
          // 3.重新请求最新的数据
          this.gerTreeList_fetch({ pageName })
        )
        .finally(() => (this.loading = false))
    },

    // 添加列表
    addTreeList_fetch(data: addQueryType) {
      // 1.获取pageName和添加数据
      const { pageName, newDate } = data
      const pageUrl = `/admin/${pageName}`

      this.loading = true
      addeTreeListAPI(pageUrl, newDate)
        .then(() => {
          // 3.重新请求最新的数据
          this.gerTreeList_fetch({ pageName }), NotificationBox({ title: `删除成功!` })
        })
        .finally(() => (this.loading = false))
    },

    // 编辑列表
    editTreeList_fetch(data: editQueryType) {
      // 1.获取pageName和编辑数据
      const { pageName, editDate, id } = data
      const pageUrl = `/admin/${pageName}/${id}`

      this.loading = true
      editeTreeListAPI(pageUrl, editDate)
        .then(() =>
          // 3.重新请求最新的数据
          this.gerTreeList_fetch({ pageName })
        )
        .finally(() => (this.loading = false))
    },

    // 修改状态
    editTableState_fetch(data: statusQueryType) {
      // 1.获取pageName和编辑数据
      const { pageName, status, id } = data
      const pageUrl = `/admin/${pageName}/${id}/update_status`

      this.loading = true
      editeStatusTreeListAPI(pageUrl, status)
        .then(() => {
          // 3.重新请求最新的数据
          this.gerTreeList_fetch({ pageName }), NotificationBox({ title: `修改状态成功!` })
        })
        .finally(() => (this.loading = false))
    }
  }
})
