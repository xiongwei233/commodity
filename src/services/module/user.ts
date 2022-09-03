import request from '@/services/request'
import type { AxiosPromise } from 'axios'
import type { IloginForm, IEditPassword } from '@/types/user'
import type { ILogout, userInfo_Data } from '@/services/module/types/user.type'

/**
 * 登录
 * @param username {string} 用户名
 * @param password {string} 密码
 * @returns promise
 */
type loginAPIType = ({ username, password }: IloginForm) => AxiosPromise<any>
export const loginAPI: loginAPIType = ({ username, password }) =>
  request({
    url: 'admin/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })

/**
 * 用户信息
 * @returns promise
 */
type getInfoAPIType = () => AxiosPromise<userInfo_Data>
export const getInfoAPI: getInfoAPIType = () =>
  request({
    url: '/admin/getinfo',
    method: 'POST'
  })

/**
 * 退出登录  类型有问题
 * @returns promise
 */
type logoutType = () => AxiosPromise<ILogout>
export const logoutAPI: logoutType = () =>
  request({
    url: '/admin/logout',
    method: 'POST'
  })

/**
 * 修改密码
 * @returns promise
 */
type passwordType = ({ oldpassword, password, repassword }: IEditPassword) => AxiosPromise
export const editPasswordAPI: passwordType = ({ oldpassword, password, repassword }) =>
  request({
    url: '/admin/updatepassword',
    method: 'POST',
    data: {
      oldpassword,
      password,
      repassword
    }
  })
