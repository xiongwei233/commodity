// 登录
export interface IloginForm {
  username: string
  password: string
}

// 修改密码
export interface IEditPassword {
  oldpassword: string
  password: string
  repassword: string
}
