import type { IFormItem } from '@/common-ui/commen-form/types/form.type'

import formValidate from './dialog.validate'

const formOptions: IFormItem[] = [
  {
    type: 'input',
    field: 'keyword',
    label: '关键词',
    placeholder: '请输入手机号/邮箱/用户昵称',
    rules: formValidate.keyword
  },
  {
    type: 'select',
    field: 'user_level_id',
    label: '会员等级',
    placeholder: '请输入会员等级',
    selectOptions: []
  }
]

export const searchConfig = {
  // 底层tabel的属性和 元素el-table都可以写
  formOptions: formOptions,
  labelWidth: '80px'
}
