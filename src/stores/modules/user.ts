import { defineStore } from 'pinia'

// 名字的常量
import { Names } from './stores.name'
import { getToken, setToken } from '@/utils/cookie'
import { loginAPI, getInfoAPI, logoutAPI, editPasswordAPI } from '@/services/index'

import type { IloginForm, IEditPassword } from '@/types/user'
import type {
  ILogout,
  loginType,
  userInfo_Data,
  userInfo_Menu,
  userInfo_RootObject
} from '@/services/module/types/user.type'

export const useUserStore = defineStore(Names.USER, {
  state: () => ({
    token: <string>getToken() ?? '',
    userInfo: <userInfo_Data>{},
    // menu的收缩
    sideBar: {
      asideWidth: <string>'250px',
      isCollapse: false
    },
    menus: <userInfo_Menu[]>[],
    ruleNames: <string[]>[]
  }),
  getters: {
    // 监听sideBar.asideWidth的改变，计算是否显示或者隐藏
    asideWidthFn(state) {
      state.sideBar.asideWidth === '250px' ? (state.sideBar.isCollapse = false) : (state.sideBar.isCollapse = true)
    }
  },
  actions: {
    // 登录
    fetchSubmitAPI(loginRules: IloginForm): Promise<loginType> {
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
    fetchUserInfoAPI(): Promise<userInfo_RootObject> {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await getInfoAPI()
          //console.log(result)
          this.userInfo = result.data
          this.menus = result.data.menus
          this.ruleNames = result.data.ruleNames
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },

    // 退出登录
    fetchLogoutAPI(): Promise<ILogout> {
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
