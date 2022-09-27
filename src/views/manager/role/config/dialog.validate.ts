import type { FormRules } from 'element-plus'

const formValidate: FormRules = {
  title: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
  content: [{ required: true, message: '角色描述不能为空', trigger: 'blur' }]
}

export default formValidate
