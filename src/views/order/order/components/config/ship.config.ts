import type { IFormItem } from '@/common-ui/commen-form/types/form.type'

const formOptions: IFormItem[] = [
  {
    type: 'select',
    field: 'express_company',
    label: '快递公司',
    placeholder: '请选择快递公司',
    style: { width: '100%' },
    selectOptions: []
  },
  {
    type: 'input',
    field: 'express_no',
    label: '快递单号',
    placeholder: '请输入快递单号'
  }
]

export const searchConfig = {
  // 底层tabel的属性和 元素el-table都可以写
  formOptions: formOptions,
  labelWidth: '80px',
  layoutReactive: { xs: 24 }
}
