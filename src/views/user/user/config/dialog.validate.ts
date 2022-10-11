import type { FormRules } from 'element-plus'

const formValidate: FormRules = {
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
  nickname: [{ required: true, message: '昵称不能为空', trigger: 'blur' }],
  phone: [{ required: true, message: '手机不能为空', trigger: 'blur' }],
  email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }],
  user_level_id: [{ required: true, message: '会员等级不能为空', trigger: 'change' }]
}

export default formValidate
