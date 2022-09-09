import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'
import { router } from '@/router'
import { ref } from 'vue'
import type { TabPanelName } from 'element-plus'

export const useTabList = () => {
  const route = useRoute()
  const cookies = useCookies()

  // 当前选中的tag
  const activeTab = ref(route.path)

  interface ITabs {
    title: string
    path: string
  }

  const tabsList = ref<ITabs[]>([{ title: '后台首页', path: '/' }])

  const addTab = (tab: ITabs) => {
    // 判断当前点击的tag是否存在，
    // 后面有个-1 表示，没有存在时返回true
    let noTab = tabsList.value.findIndex((t) => t.path === tab.path) === -1
    if (noTab) {
      tabsList.value.push(tab)
    }
    // 本地存储
    cookies.set('tabList', tabsList.value)
  }

  //在当前位置即将更新时触发：https://router.vuejs.org/zh/api/index.html#onbeforerouteupdate
  onBeforeRouteUpdate((to, form) => {
    activeTab.value = to.path
    addTab({
      title: to.meta.title as string,
      path: to.path
    })
  })

  // 切换标签
  const changeTab = (path: TabPanelName) => {
    router.push(path as string)
  }

  // 初始化标签导航-从cooki取数据
  const initTabList = () => {
    let tabs = cookies.get('tabList')
    if (tabs) {
      tabsList.value = tabs
    }
  }
  initTabList()

  //删除tag
  const removeTab = (targetName: TabPanelName) => {
    console.log(targetName)
    // 当前所有tabs
    const allTabs = tabsList.value
    // 当选中的tab
    let activeName = activeTab.value
    // 如果当前选中的tab就是要删除的tab
    if (activeName === targetName) {
      allTabs.forEach((tab, index) => {
        if (tab.path === targetName) {
          // 如果 当前tab后面没有值，就跳到前面
          const nextTab = allTabs[index + 1] || allTabs[index - 1]
          if (nextTab) {
            activeName = nextTab.path
          }
        }
      })
    }
    // 当前选中的就是新的tab
    activeTab.value = activeName
    // 只有不等于当前被关闭的tab才能被留下了,就是只删掉对应tab
    tabsList.value = tabsList.value.filter((tab) => tab.path !== targetName)
    // 储存本地
    cookies.set('tabList', tabsList.value)
  }

  // 下拉选项-删除全部
  const clearAll = () => {
    // 跳回首页
    activeTab.value = '/'
    // 只保留首页
    tabsList.value = [{ title: '后台首页', path: '/' }]
    cookies.set('tabList', tabsList.value)
  }

  // 下拉选项-删除其他
  const clearOther = () => {
    // 过滤只剩下首页 和当前激活的tab
    tabsList.value = tabsList.value.filter((tab) => tab.path === '/' || tab.path === activeTab.value)
    //console.log(tabsList.value)
    cookies.set('tabList', tabsList.value)
  }

  return {
    activeTab,
    changeTab,
    removeTab,
    tabsList,
    clearOther,
    clearAll
  }
}
