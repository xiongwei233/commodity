import type { userInfo_Menu } from '@/services/module/types/login.type'
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const Login = () => import('@/views/login/index.vue')
const Not404 = () => import('@/views/not-Found/404.vue')

const Layout = () => import('@/views/layout/index.vue')

// 动态路由，用于匹配菜单动态添加路由
import { asyncRoutes } from './dynamicRouter'

// 默认路由，所有用户共享
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    component: Layout
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '正在登录哦'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Not404',
    component: Not404
  }
]

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

// 动态添加路由
export const addAsyncRoutes = (menus: userInfo_Menu[]) => {
  // 是否有新的路由
  let hasNewRoutes = false
  // 递归调用
  const findAndAddRoutesByMenus = (arr: userInfo_Menu[]) => {
    arr.forEach((e) => {
      // item = 当前自己注册的路由 在后台传过来的路由中 是否存在
      let item = asyncRoutes.find((o) => o.path == e.frontpath)

      // hasRoute 确认是否存在指定名称的路由。 这里是取反表示没有注册过！
      if (item && !router.hasRoute(item.path)) {
        // 添加的是子级路由，Layout是父级,这里传参是 路由的 name:Layout
        router.addRoute('Layout', item)
        hasNewRoutes = true
      }

      // 这里是递归，遍历子菜单
      if (e.child && e.child.length > 0) {
        findAndAddRoutesByMenus(e.child)
      }
    })
  }
  findAndAddRoutesByMenus(menus)
  // 拿到的数据是 当前有的权限并且注册了的路由，没有注册的不显示，
  // 比如有20个权限，只注册了5个页面，那么就打印5个页面
  //console.log(router.getRoutes())
  //console.log('是否有新路由', hasNewRoutes)
  return hasNewRoutes
  // 返回出去
}
