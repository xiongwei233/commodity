/**
 * 权限的处理
 */
import { useLoginStore } from '@/stores/modules/login'
import { addAsyncRoutes, router } from '@/router'
import { getToken } from './utils/cookie'
import { NotificationBox } from './utils/element-Fun'

// 全局前置守卫
let hasGetInfo = false
router.beforeEach(async (to, from, next) => {
  const userStore = useLoginStore()

  const Token = getToken()

  // 没有登录, 强制跳转回登录页
  if (!Token && to.path != '/login') {
    // 出错看看这里改为 !=
    NotificationBox({ title: '请先登录', type: 'error' })
    return next({ path: '/login' })
  }

  // 防止重复登录
  if (Token && to.path == '/login') {
    // 出错看看这里改为 ==
    NotificationBox({ title: '请勿重复登录', type: 'error' })

    // from.path 是来的页面，表示从哪里过来
    // 已登录就重来来回哪里去
    return next({ path: from.path ?? '/' })
  }

  // 因为 用户信息是跟随 loginAPI 一起请求的，所以在home页面刷新不会有新的用户信息请求
  // 这就导致了 在home也 一刷新用户信息数据就没有了
  // 解决: 如果已登录，自动获取用户信息，并存储到store当做，这样就一刷新就自动获取用户信息
  let hasNewRoutes = false
  if (Token && !hasGetInfo) {
    const { data }: any = await userStore.fetchUserInfoAPI()
    // 动态添加路由
    //console.log(data.menus)
    hasNewRoutes = addAsyncRoutes(data.menus)

    hasGetInfo = true
  }

  // 设置页面标题
  let title = (to.meta.title ? to.meta.title + '-' : '') + import.meta.env.VITE_APP_TITLE
  document.title = title

  // 解决手动导航: https://router.vuejs.org/zh/guide/advanced/dynamic-routing.html#%E6%B7%BB%E5%8A%A0%E8%B7%AF%E7%94%B1
  // 如果有新的路由就跳转到指定路由
  hasNewRoutes ? next(to.fullPath) : next()
})
