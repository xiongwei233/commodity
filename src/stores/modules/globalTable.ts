import {
  addeGlobalTableAPI,
  batchDeleteGlobalTableAPI,
  deleteGlobalTableAPI,
  editeGlobalStatusAPI,
  editeGlobalTableAPI,
  getGlobalTableAPI
} from '@/services/module/globalTable'
import type {
  addQueryType,
  batchDeleteQueryType,
  DeleteQueryType,
  editQueryType,
  GetQueryType,
  statusQueryType
} from '@/services/module/types/globalTable.type'
import type { getNotice_List } from '@/services/module/types/notice.type'

import { defineStore } from 'pinia'
import { Names } from './stores.name'

// 把接口写再这里，然后下面传过来通过[xxx.xx]来取
//看 42集 还剩下1小时9分钟那里
//const pageUrlMap = {
//  users: '/users/abc',
//  role: '/role/abc',
//  ccc: '/ccc/abc'
//}

export const useGlobalStore = defineStore(Names.GLOBAL_TABLE, {
  state: () => ({
    // notice
    noticeList: <getNotice_List[]>[],
    noticeCount: <number>0,
    loading: <boolean>false,

    // 管理员管理
    // manager
    managerList: <any[]>[],
    managerCount: <number>0,
    // role
    roleList: <any[]>[],
    roleCount: <number>0,

    // 商品管理
    // goods
    skusList: <any[]>[],
    skusCount: <number>0,
    // coupon
    couponList: <any[]>[],
    couponCount: <number>0,

    // 用户管理
    // user
    userList: <any[]>[],
    userCount: <number>0,
    // level
    levelList: <any[]>[],
    levelCount: <number>0
  }),
  getters: {},
  actions: {
    // 查询用户列表
    async getTableList_fetch(data: GetQueryType) {
      // 1.获取pageUrl
      const pageName = data.pageName
      let pageUrl = ''
      switch (pageName) {
        case 'notice':
          pageUrl = '/admin/notice/'
          break

        case 'manager':
          pageUrl = '/admin/manager'
          break
        case 'role':
          pageUrl = '/admin/role'
          break

        case 'skus':
          pageUrl = '/admin/skus'
          break
        case 'coupon':
          pageUrl = '/admin/coupon'
          break

        case 'user_level':
          pageUrl = '/admin/user_level'
          break
        case 'user':
          pageUrl = '/admin/user'
          break
      }

      // 2.发送请求
      this.loading = true
      const pageResult = await getGlobalTableAPI(pageUrl, data.queryInfo).finally(
        () => (this.loading = false)
      )

      // 3.将数据存储到state中
      switch (pageName) {
        case 'notice':
          this.noticeList = pageResult.data.list
          this.noticeCount = pageResult.data.totalCount
          break

        case 'manager':
          this.managerList = pageResult.data.list
          this.managerCount = pageResult.data.totalCount
          break
        case 'role':
          this.roleList = pageResult.data.list
          this.roleCount = pageResult.data.totalCount
          break

        case 'skus':
          this.skusList = pageResult.data.list
          this.skusCount = pageResult.data.totalCount
          break
        case 'coupon':
          this.couponList = pageResult.data.list
          this.couponCount = pageResult.data.totalCount
          break

        case 'user_level':
          this.levelList = pageResult.data.list
          this.levelCount = pageResult.data.totalCount
          break
        case 'user':
          this.userList = pageResult.data.list
          this.userCount = pageResult.data.totalCount
          break
      }
      //console.log(pageResult)
    },

    // 删除列表
    async deleteTableDate_fetch(data: DeleteQueryType) {
      // 1.获取pageName和id
      // pageName=> /users
      // id => users/id
      const { pageName, id } = data
      const pageUrl = `admin/${pageName}/${id}/delete`

      // 2. 调用删除数据的请求
      this.loading = true
      try {
        await deleteGlobalTableAPI(pageUrl)
      } catch (error) {
      } finally {
        this.loading = false
      }

      // 3.重新请求最新的数据
      this.getTableList_fetch({
        pageName,
        // 可以把 页面的这些数据共享到pinia 到时候可以拿到实时的
        queryInfo: { page: 1, limit: 10 }
      })
    },

    // 添加列表
    async addTableData_fetch(data: addQueryType) {
      // 1.获取pageName和添加数据
      const { pageName, newDate } = data
      let pageUrl = `/admin/${pageName}`

      // 2. 调用新建数据的请求
      this.loading = true
      try {
        await addeGlobalTableAPI(pageUrl, newDate)
      } catch (error) {
      } finally {
        this.loading = false
      }

      // 3.重新请求最新的数据
      this.getTableList_fetch({
        pageName,
        // 可以把 页面的这些数据共享到pinia 到时候可以拿到实时的
        queryInfo: { page: 1, limit: 10 }
      })
    },

    // 编辑列表
    async editTableData_fetch(data: editQueryType) {
      // 1.获取pageName和编辑数据
      const { pageName, editDate, id } = data
      const pageUrl = `/admin/${pageName}/${id}`

      // 2. 调用新建数据的请求
      this.loading = true

      try {
        await editeGlobalTableAPI(pageUrl, editDate)
      } catch (error) {
      } finally {
        this.loading = false
      }

      // 3.重新请求最新的数据
      this.getTableList_fetch({
        pageName,
        // 可以把 页面的这些数据共享到pinia 到时候可以拿到实时的
        queryInfo: { page: 1, limit: 10 }
      })
    },

    // 修改状态
    async editTableStatus_fetch(data: statusQueryType) {
      // 1.获取pageName和编辑数据
      const { pageName, status, id } = data
      const pageUrl = `/admin/${pageName}/${id}/update_status`

      // 2. 调用新建数据的请求
      this.loading = true
      try {
        await editeGlobalStatusAPI(pageUrl, status)
      } catch (error) {
      } finally {
        this.loading = false
      }

      // 3.重新请求最新的数据
      this.getTableList_fetch({
        pageName,
        // 可以把 页面的这些数据共享到pinia 到时候可以拿到实时的
        queryInfo: { page: 1, limit: 10 }
      })
    },

    // 批量删除列表
    async batchDelete_fetch(data: batchDeleteQueryType) {
      // 1.获取pageName和id
      // pageName=> /users
      // id => users/id
      const { pageName, ids } = data
      const pageUrl = `/admin/${pageName}/delete_all`

      // 2. 调用删除数据的请求
      this.loading = true
      try {
        await batchDeleteGlobalTableAPI(pageUrl, { ids })
      } catch (error) {
      } finally {
        this.loading = false
      }

      // 3.重新请求最新的数据
      this.getTableList_fetch({
        pageName,
        // 可以把 页面的这些数据共享到pinia 到时候可以拿到实时的
        queryInfo: { page: 1, limit: 10 }
      })
    }
  }
})
