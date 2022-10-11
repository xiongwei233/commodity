import type PageContent from '@/components/search-page'
import { toRaw } from 'vue'

/**
 *  搜索/重置
 * @returns
 */
export function useTableSearch() {
  const pageCountentRef = ref<InstanceType<typeof PageContent>>()

  // 重置
  const handleResetClick = () => pageCountentRef.value?.getPageDate()
  // 搜索
  const handleQueryClick = (queryInfo: any) => {
    console.log('点击了搜索', toRaw(queryInfo))
    pageCountentRef.value?.getPageDate(toRaw(queryInfo))
  }

  //return [pageCountentRef, handleResetClick, handleQueryClick]
  return { pageCountentRef, handleResetClick, handleQueryClick }
}
