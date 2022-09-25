import type { IFormItem } from '@/common-ui/commen-form/types/form.type'

import { menuRules } from './access-validate'
const formOptions: IFormItem[] = [
  {
    type: 'input',
    field: 'rule_id',
    label: '上级菜单',
    placeholder: '请选择上级菜单',
    rules: menuRules.rule_id
    //style: {
    //  width: '100%'
    //},
    //otherOptions: {
    //  clearable: true,
    //  props: {
    //    value: 'id',
    //    label: 'name',
    //    children: 'child',
    //    multiple: false,
    //    emitPath: false,
    //    checkStrictly: true
    //  }
    //}
  },
  {
    type: 'input',
    field: 'title',
    label: '菜单/规则',
    rules: menuRules.menu
  },
  {
    type: 'input',
    field: 'name',
    label: '菜单名称',
    placeholder: '请填写菜单名称',
    rules: menuRules.name
  },
  {
    type: 'input',
    field: 'name',
    label: '菜单名称',
    placeholder: '请填写菜单名称',
    rules: menuRules.name
  },
  {
    type: 'input',
    field: 'name',
    label: '菜单名称',
    placeholder: '请填写菜单名称',
    rules: menuRules.name
  }
]

export const modalConfig = {
  formOptions: formOptions,
  layoutReactive: {
    xl: 24
  }
}
