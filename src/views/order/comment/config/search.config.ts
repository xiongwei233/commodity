import type { IFormItem } from '@/common-ui/commen-form/types/form.type'

const formOptions: IFormItem[] = [
  {
    type: 'input',
    field: 'keyword',
    label: '关键词',
    placeholder: '请输入要搜索的商品'
  }
]

export const searchConfig = {
  // 底层tabel的属性和 元素el-table都可以写
  formOptions: formOptions,
  labelWidth: '80px'
}
