import type { FormInstance } from 'element-plus'
import type GlobalDrawer from '@/components/global-drawer.vue'
import { NotificationBox } from '@/utils/element-Fun'

import { reactive, ref, computed } from 'vue'

type editAddType = {
  tableForm?: { [index: string | number]: any }
  rules?: Object
  update?: (...arg: any) => Promise<any>
  create?: (...tableForm: any) => Promise<any>
  getData?: (...arg: any) => void
}
/**
 * 表单的 新增，修改
 * @param options
 * @returns formDrawerRef  弹窗的ref
 * @returns formRef 表单的ref
 * @returns tableForm  表单数据
 * @returns editId  修改的表单id
 * @returns drawerTitle   新增/修改标题
 * @returns handleSubmit   提交按钮的函数
 * @returns handleEdit   修改按钮的函数
 * @returns handleCreate 添加按钮的函数
 */
export const useEditAddTable = (options: editAddType = {}) => {
  // 表单部分
  console.log('options', options)
  // 弹窗
  const formDrawerRef = ref<InstanceType<typeof GlobalDrawer> | null>(null)
  const formRef = ref<FormInstance | null>(null)
  // 表单临时存放的数据
  const defaultForm = options?.tableForm

  // 表格新增/修改的表单数据
  const tableForm = reactive<{ [index: string | number]: any }>({})

  const rules = options.rules || {}

  // 当前是修改的id，如果没有就是新增
  const editId = ref(0)
  const drawerTitle = computed(() => (editId.value ? '修改' : '新增'))
  // 提交
  const handleSubmit = () => {
    console.log('表单数据', tableForm, defaultForm)
    formRef.value?.validate((valid) => {
      if (!valid) return
      formDrawerRef.value?.openLoading()
      // 判断是 修改还是新增
      if (options.update && options.create) {
        const fetchAPI: Promise<any> = editId.value
          ? options.update(editId.value, tableForm)
          : options.create(tableForm)
        fetchAPI
          .then((res) => {
            NotificationBox({ title: `${drawerTitle.value} 成功!` })
            // 修改刷新当前页，新增刷新第一页
            if (options.getData) options.getData(editId.value ? false : 1)
            formDrawerRef.value?.close()
          })
          .finally(() => formDrawerRef.value?.closeLoading())
      }
    })
  }

  // 重置表单
  const resetForm = (row?: any) => {
    if (formRef.value) formRef.value.clearValidate()
    // if (formRef.value) formRef.value.resetFields()
    if (row) {
      for (const key in defaultForm) {
        tableForm[key] = row[key]
      }
      //console.log('查看表单的数据', tableForm)
    }
  }

  // 新增
  const handleCreate = () => {
    editId.value = 0
    resetForm(defaultForm)
    formDrawerRef.value?.open()
  }

  // 编辑
  const handleEdit = (row: any) => {
    console.log(row)

    editId.value = row.id
    resetForm(row)
    formDrawerRef.value?.open()
    //console.log('点击修改 表单的数据', row)
    //console.log(editId.value)
  }

  return {
    formDrawerRef,
    formRef,
    tableForm,
    editId,
    drawerTitle,
    handleSubmit,
    resetForm,
    handleCreate,
    handleEdit
  }
}
