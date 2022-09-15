import { createApp } from 'vue'
import { router } from './router'
import App from './App.vue'
import pinia from '@/stores'

// css
import 'normalize.css'
import '@/assets/styles/index.less'
import 'nprogress/nprogress.css' // 进度条 nprogress 样式
import 'virtual:windi.css'

const app = createApp(App)

// icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 防止浏览器警告
import 'default-passive-events'

/**
 * 注册 全部组件
 */
// import globalComponent from '@/components/index'
// app.use(globalComponent)

// 权限
import './permission'
// 限制权限的按钮
import permission from '@/directives/permission'

app.use(permission)
app.use(pinia)
app.use(router)
app.mount('#app')
