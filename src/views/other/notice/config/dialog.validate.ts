import type { FormRules } from 'element-plus'

const formValidate: FormRules = {
  title: [{ required: true, message: '公告标题不能为空', trigger: 'blur' }],
  content: [{ required: true, message: '公告内容不能为空', trigger: 'blur' }]
}

export default formValidate
