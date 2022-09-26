import type { IFormItem } from '@/common-ui/commen-form/types/form.type'

import formValidate from './dialog.validate'

const formOptions: IFormItem[] = [
  {
    type: 'input',
    field: 'name',
    label: '规格名称',
    placeholder: '请输入规格名称',
    rules: formValidate.name
  },
  {
    type: 'input-number',
    field: 'order',
    label: '排序'
  },
  {
    type: 'switch',
    field: 'status',
    label: '状态',
    otherOptions: {
      activeValue: 1,
      inactiveValue: 0
    }
  }
]

export const modalConfig = {
  formOptions: formOptions,
  layoutReactive: {
    xl: 24
  }
}
