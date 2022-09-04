import axios, { type AxiosRequestConfig } from 'axios'

import { useUserStore } from '@/stores/modules/user'

// 进度条
import NProgress from 'nprogress' // nprogress插件
import { router } from '@/router'

// 创建axios的实例
const services = axios.create({
  baseURL: '/api',
  timeout: 20 * 1000 // 20秒超时时间(请求20秒无响应，直接判断超时)
})

// 添加请求拦截器
services.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const userStore = useUserStore()

    // 添加token
    if (config.headers && userStore.token) {
      config.headers['token'] = userStore.token
    }

    NProgress.start()

    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
services.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    //console.log('响应拦截器', response.data)
    NProgress.done()
    return response.data
  },
  function (error) {
    const userStore = useUserStore()

    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log(error.response)

    const msg = error.response?.data?.msg || '请求失败'

    if (error.response.state === 401 || 400) {
      ElNotification({
        title: '请求失败',
        message: msg,
        type: 'warning',
        duration: 3000
      })
    }

    if (msg == '非法token，请先登录！') {
      router.push('/login')
    }

    NProgress.done()

    return Promise.reject(error)
  }
)

// 导出的是一个函数，函数里面有传参，传参写了默认值
export default ({
  url,
  method = 'GET',
  params = {},
  data = {},
  headers = {}
}: AxiosRequestConfig) => {
  // 这里调用了axios函数，并把传参设置了进去 ,最后把结果返回给函数
  return services({
    url,
    method,
    params,
    data,
    headers
  })
}
