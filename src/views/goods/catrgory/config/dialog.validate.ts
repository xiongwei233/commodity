import type { FormRules } from 'element-plus'

const formValidate: FormRules = {
  name: [{ required: true, message: '分类名称不能为空', trigger: 'blur' }]
}

export default formValidate
