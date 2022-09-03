//import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const Login = () => import('@/views/login/index.vue')
const Not404 = () => import('@/views/not-Found/404.vue')

const Layout = () => import('@/views/layout/index.vue')
const home = () => import('@/views/home/index.vue')
const category = () => import('@/views/category/index.vue')

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: '',
          name: 'home',
          component: home,
          meta: {
            title: '后台首页-'
          }
        },
        {
          path: '/category/list',
          name: 'category',
          component: category,
          meta: {
            title: '分类-'
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '正在登录哦~'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Not404',
      component: Not404,
      meta: {
        title: '404出错了~'
      }
    }
  ]
})

export default router
//export const initRouter = (app: App) => {
//  app.use(router)
//}
