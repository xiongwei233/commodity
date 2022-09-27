import type { FormRules } from 'element-plus'

const formValidate: FormRules = {
  name: [{ required: true, message: '等级名称不能为空', trigger: 'blur' }],
  level: [{ required: true, message: '等级权重不能为空', trigger: 'blur' }],
  max_price: [{ required: true, message: '累计消费金额不能为空', trigger: 'blur' }],
  max_times: [{ required: true, message: '消费金额不能为空', trigger: 'blur' }],
  discount: [{ required: true, message: '折扣率不能为空', trigger: 'blur' }]
}

export default formValidate
