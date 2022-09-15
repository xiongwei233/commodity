/**
 * 对全部的组件进行引入
 */
import type { App } from 'vue'
import Table from './table/index'

// 所有的组件
const componentsDate = [Table]

export default {
  install(app: App) {
    componentsDate.map((item) => {
      app.use(item)
      // 这里的item 就是拿到每一个组件的index.ts方法里面的 install这个函数
    })
  }
}
