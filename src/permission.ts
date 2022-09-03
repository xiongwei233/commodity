/**
 * 权限的处理
 */
import { useUserStore } from '@/stores/modules/user'
import router from '@/router'
import { getToken } from './utils/cookie'

// 全局前置守卫

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  const Token = getToken()

  // 没有登录, 强制跳转回登录页
  if (!Token && to.path != '/login') {
    // 出错看看这里改为 !=
    ElNotification({ title: '请先登录', type: 'error', duration: 3000 })
    return next({ path: '/login' })
  }

  // 防止重复登录
  if (Token && to.path == '/login') {
    // 出错看看这里改为 ==
    ElNotification({ title: '请勿重复登录', type: 'error', duration: 3000 })
    // from.path 是来的页面，表示从哪里过来
    // 已登录就重来来回哪里去
    return next({ path: from.path ?? '/' })
  }

  // 因为 用户信息是跟随 loginAPI 一起请求的，所以在home页面刷新不会有新的用户信息请求
  // 这就导致了 在home也 一刷新用户信息数据就没有了
  // 解决: 如果已登录，自动获取用户信息，并存储到store当做，这样就一刷新就自动获取用户信息
  if (Token) {
    await userStore.fetchUserInfoAPI()
  }

  // 设置页面标题
  let title = (to.meta.title ?? '') + import.meta.env.VITE_APP_TITLE
  document.title = title

  next()
})
