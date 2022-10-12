import type PageContent from '@/components/table-page'
import { toRaw } from 'vue'
type CallBackFn = (item?: any) => void

/**
 *  搜索/重置
 * @returns
 */
export function useTableSearch(searchCb?: CallBackFn, resetCb?: CallBackFn) {
  const pageCountentRef = ref<InstanceType<typeof PageContent>>()

  // 重置
  const handleResetClick = () => {
    // 执行单独的重置 回调函数
    resetCb && resetCb()
    pageCountentRef.value?.getPageDate()
  }

  // 搜索
  const handleQueryClick = (queryInfo: any) => {
    // 执行单独的搜索 回调函数
    searchCb && searchCb()
    console.log('点击了搜索', toRaw(queryInfo))
    pageCountentRef.value?.getPageDate(toRaw(queryInfo))
  }

  //return [pageCountentRef, handleResetClick, handleQueryClick]
  return { pageCountentRef, handleResetClick, handleQueryClick }
}
