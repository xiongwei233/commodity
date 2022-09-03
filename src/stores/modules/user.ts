import { defineStore } from 'pinia'

// 名字的常量
import { Names } from './stores.name'
import { getToken, setToken } from '@/utils/cookie'
import { loginAPI, getInfoAPI, logoutAPI, editPasswordAPI } from '@/services/index'

import type { IloginForm, IEditPassword } from '@/types/user'
import type { userInfo_Data } from '@/services/module/types/user.type'

export const useUserStore = defineStore(Names.USER, {
  state: () => ({
    token: <string>getToken() ?? '',
    userInfo: <userInfo_Data>{}
  }),
  getters: {},
  actions: {
    // 登录
    fetchSubmitAPI(loginRules: IloginForm) {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await loginAPI(loginRules)
          this.token = result.data.token
          setToken(result.data.token)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },

    // 用户信息
    fetchUserInfoAPI() {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await getInfoAPI()
          //console.log(result)
          this.userInfo = result.data
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },

    // 退出登录
    fetchLogoutAPI() {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await logoutAPI()
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },

    // 修改密码
    fetchEditPassAPI(editPsswordForm: IEditPassword) {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await editPasswordAPI(editPsswordForm)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    }
  }
})
