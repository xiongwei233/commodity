import type { IFormItem } from '@/common-ui/commen-form/types/form.type'

import formValidate from './dialog.validate'

const formOptions: IFormItem[] = [
  {
    type: 'input',
    field: 'name',
    label: '角色名称',
    placeholder: '请输入角色名称',
    rules: formValidate.title,
    inputAttrs: {
      maxlength: 50,
      showWordLimit: true
    }
  },
  {
    type: 'textarea',
    field: 'desc',
    label: '角色描述',
    placeholder: '请输入角色描述',
    rules: formValidate.content,
    inputAttrs: {
      maxlength: 300,
      showWordLimit: true,
      rows: 4
    }
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
