import type { IFormItem } from '@/common-ui/commen-form/types/form.type'

import formValidate from './dialog.validate'

const formOptions: IFormItem[] = [
  {
    type: 'input',
    field: 'username',
    label: '用户名',
    placeholder: '请输入用户名',
    rules: formValidate.username
  },
  {
    type: 'password',
    field: 'password',
    label: '密码',
    placeholder: '请输入密码',
    rules: formValidate.password,
    inputAttrs: {
      showPassword: true
    }
  },
  {
    type: 'input',
    field: 'nickname',
    label: '昵称',
    placeholder: '请输入昵称',
    rules: formValidate.nickname
  },
  {
    type: 'select',
    field: 'user_level_id',
    label: '会员等级',
    placeholder: '请选择会员等级',
    rules: formValidate.user_level_id,
    selectOptions: [],
    style: {
      width: '100%'
    }
  },

  {
    type: 'input',
    field: 'phone',
    label: '手机',
    placeholder: '请输入手机',
    rules: formValidate.phone
  },
  {
    type: 'input',
    field: 'email',
    label: '邮箱',
    placeholder: '请输入邮箱',
    rules: formValidate.email
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
  // 底层tabel的属性和 元素el-table都可以写
  formOptions: formOptions,
  labelWidth: '100px',
  layoutReactive: {
    xl: 24
  }
}
