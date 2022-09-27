import type { FormRules } from 'element-plus'

const formValidate: FormRules = {
  name: [{ required: true, message: '优惠券名称不能为空', trigger: 'blur' }],
  value: [{ required: true, message: '面值不能为空', trigger: 'blur' }],
  total: [{ required: true, message: '发行量不能为空', trigger: 'blur' }],
  min_price: [{ required: true, message: '最低使用价格不能为空', trigger: 'blur' }],
  createTime: [{ required: true, message: '活动时间不能为空', trigger: 'blur' }],
  desc: [{ required: true, message: '描述不能为空', trigger: 'blur' }]
}

export default formValidate
