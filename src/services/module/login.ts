import request from '@/services/request'
import type { IloginForm, IEditPassword } from '@/types/user'
import type { ILogout, loginType, userInfo_RootObject } from '@/services/module/types/login.type'

/**
 * 登录
 * @param username {string} 用户名
 * @param password {string} 密码
 * @returns promise
 */
type loginAPIType = ({ username, password }: IloginForm) => Promise<loginType>
export const loginAPI: loginAPIType = ({ username, password }) =>
  request.post('/admin/login', { username, password })
//export const loginAPI: loginAPIType = ({ username, password }) =>
//  request({
//    url: 'admin/login',
//    method: 'POST',
//    data: {
//      username,
//      password
//    }
//  })

/**
 * 用户信息
 * @returns promise
 */
type getInfoAPIType = () => Promise<userInfo_RootObject>
export const getInfoAPI: getInfoAPIType = () => request.post('/admin/getinfo')
//export const getInfoAPI: getInfoAPIType = () =>
//  request({
//    url: '/admin/getinfo',
//    method: 'POST'
//})

/**
 * 退出登录  类型有问题
 * @returns promise
 */
type logoutType = () => Promise<ILogout>
export const logoutAPI: logoutType = () => request.post('/admin/logout')
//export const logoutAPI: logoutType = () =>
//  request({
//    url: '/admin/logout',
//    method: 'POST'
//  })

/**
 * 修改密码
 * @returns promise
 */
type passwordType = ({ oldpassword, password, repassword }: IEditPassword) => Promise<any>
export const editPasswordAPI: passwordType = ({ oldpassword, password, repassword }) =>
  request.post('/admin/updatepassword', { oldpassword, password, repassword })
//export const editPasswordAPI: passwordType = ({ oldpassword, password, repassword }) =>
//  request({
//    url: '/admin/updatepassword',
//    method: 'POST',
//    data: {
//      oldpassword,
//      password,
//      repassword
//    }
//  })
