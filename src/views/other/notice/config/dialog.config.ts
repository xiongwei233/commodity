import type { IFormItem } from '@/common-ui/commen-form/types/form.type'

import formValidate from './dialog.validate'

const formOptions: IFormItem[] = [
  {
    type: 'input',
    field: 'title',
    label: '公告标题',
    placeholder: '请输入公告标题',
    rules: formValidate.title,
    inputAttrs: {
      maxlength: 50,
      showWordLimit: true
    }
  },
  {
    type: 'textarea',
    field: 'content',
    label: '公告内容',
    placeholder: '请输入公告内容',
    rules: formValidate.content,
    inputAttrs: {
      maxlength: 300,
      showWordLimit: true,
      rows: 4
    }
  }
]

export const modalConfig = {
  formOptions: formOptions,
  layoutReactive: {
    xl: 24
  }
}
