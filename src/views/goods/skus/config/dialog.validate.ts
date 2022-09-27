import type { FormRules } from 'element-plus'

const formValidate: FormRules = {
  name: [{ required: true, message: '规格名称不能为空', trigger: 'blur' }],
  dynamicTags: [{ required: true, message: '规格值不能为空', trigger: 'blur' }]
}

export default formValidate
