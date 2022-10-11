import type { App, DirectiveBinding } from 'vue'
import { useLoginStore } from '@/stores/modules/login'

/**
 * 针对按钮的权限
 */
const hasPermission = (binding: DirectiveBinding<any>, el: Element) => {
  const userStore = useLoginStore()
  // 使用的时候不传递数组 就报错
  if (!Array.isArray(binding.value)) {
    throw new Error(`配置需要权限，例如v-permission="['getStatistics3,GET']"`)
  }

  // 值不是等于-1表示找到了返回true ,没有找到为false
  const hasAuth = binding.value.findIndex((v) => userStore.ruleNames.includes(v)) != -1
  // 如果当前节点存在或者 hasAuth为false(表示没有找到当前角色的 这个权限)
  if (el && !hasAuth) {
    // 删掉父级元素 当前的子级，
    el.parentNode?.removeChild(el)
  }
  return hasAuth
}

export default {
  install(app: App) {
    app.directive('permission', {
      mounted(el, binding) {
        hasPermission(binding, el)
      }
    })
  }
}
