import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import pinia from '@/stores'

// css
import 'normalize.css'
import '@/assets/styles/index.less'
import 'nprogress/nprogress.css' // 进度条 nprogress 样式
import 'virtual:windi.css'

// 权限
import './permission'
const app = createApp(App)

// 初始化router的另外写法
//initRouter(app)

// icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 防止浏览器警告
import 'default-passive-events'

// 限制权限的按钮
import permission from '@/directives/permission'
app.use(permission)

app.use(pinia)
app.use(router)
app.mount('#app')
