import type { FormRules } from 'element-plus'

const formValidate: FormRules = {
  name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
  desc: [{ required: true, message: '角色描述不能为空', trigger: 'blur' }]
}

export default formValidate
