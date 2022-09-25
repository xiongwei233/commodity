import type dialogPage from '@/components/dialog-page'

type CallBackFn = (item?: any) => void

export function usePageModal(addCb?: CallBackFn, editCb?: CallBackFn) {
  const dialogPageRef = ref<InstanceType<typeof dialogPage>>()
  // 修改的表单数据
  const defaultInfo = ref({})

  // 添加
  const handleAddData = () => {
    // 数据清空
    defaultInfo.value = {}
    if (dialogPageRef.value) {
      dialogPageRef.value.dialogVisible = true
    }
    // 执行单独的添加 回调函数
    addCb && addCb()
  }
  // 修改
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    if (dialogPageRef.value) {
      dialogPageRef.value.dialogVisible = true
    }
    // 执行单独的修改 回调函数
    editCb && editCb(item)
  }

  return { dialogPageRef, defaultInfo, handleAddData, handleEditData }
}
