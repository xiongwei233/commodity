import type { FormRules } from 'element-plus'
import { reactive } from 'vue'

const rule_id = [{ required: true, message: '上级菜单不能为空', trigger: 'blur' }]
const menu = [{ required: true, trigger: 'blur' }]
const name = [
  { required: true, message: '新增菜单名称不能为空', trigger: 'blur' },
  { min: 2, max: 20, message: '菜单名称长度为2-20个中文/数字/字母组成!', trigger: 'blur' }
]
const condition = [
  { required: true, message: '后端规则', trigger: 'blur' },
  {
    pattern: /^[a-zA-Z0-9]{4,16}$/,
    message: '后端规则长度为4-20个/数字/字母组成!',
    trigger: 'blur'
  }
]
const method = [{ required: true, message: '请求方式不能为空', trigger: 'change' }]
const order = [{ required: true, message: '排序不能为空', trigger: 'change' }]
const icon = [{ required: true, message: '菜单图标不能为空', trigger: 'blur' }]

// 菜单表单的校验
export const menuRules = reactive<FormRules>({
  rule_id,
  menu,
  name,
  condition,
  method,
  icon,
  order
})
