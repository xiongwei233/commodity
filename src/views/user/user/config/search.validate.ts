import type { FormRules } from 'element-plus'

const formValidate: FormRules = {
  keyword: [{ required: true, message: '关键词不能为空', trigger: 'blur' }]
}

export default formValidate
