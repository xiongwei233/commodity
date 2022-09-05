const home = () => import('@/views/home/index.vue')
// 商品管理
const goods = () => import('@/views/goods/goods.vue')
const category = () => import('@/views/goods/category.vue')
const coupon = () => import('@/views/goods/coupon.vue')

// 用户管理
const user = () => import('@/views/user/user.vue')

// 订单管理
const order = () => import('@/views/order/order.vue')

//管理员管理
const manager = () => import('@/views/manager/manager.vue')

//系统设置
const base = () => import('@/views/setting/base.vue')

// 分销模块
//其他模块
const image = () => import('@/views/other/image.vue')
const notice = () => import('@/views/other/notice.vue')

// 动态路由，用于匹配菜单动态添加路由
export const asyncRoutes = [
  // name为啥要跟路径一样，因为 动态添加的路由 使用了 hasRoute() 来检查是否有路由
  {
    path: '/',
    name: '/',
    component: home,
    meta: {
      title: '后台首页'
    }
  },
  // 商品管理
  {
    path: '/category/list',
    name: '/category/list',
    component: category,
    meta: {
      title: '分类管理'
    }
  },
  {
    path: '/goods/list',
    name: '/goods/list',
    component: goods,
    meta: {
      title: '商品管理'
    }
  },
  {
    path: '/coupon/list',
    name: '/coupon/list',
    component: coupon,
    meta: {
      title: '优惠券管理'
    }
  },

  // 用户管理
  {
    path: '/user/list',
    name: '/user/list',
    component: user,
    meta: {
      title: '用户管理'
    }
  },

  // 订单管理
  {
    path: '/order/list',
    name: '/order/list',
    component: order,
    meta: {
      title: '订单管理'
    }
  },

  //管理员管理
  {
    path: '/manager/list',
    name: '/manager/list',
    component: manager,
    meta: {
      title: '管理员管理'
    }
  },

  //系统设置
  {
    path: '/setting/base',
    name: '/setting/base',
    component: base,
    meta: {
      title: '基础设置'
    }
  },

  //其他模块
  {
    path: '/image/list',
    name: '/image/list',
    component: image,
    meta: {
      title: '图库管理'
    }
  },
  {
    path: '/notice/list',
    name: '/notice/list',
    component: notice,
    meta: {
      title: '公告管理'
    }
  }
]