import type { FormInstance } from 'element-plus'

// 手机号校验
export const validatePhone = (rule: any, value: any, callback: any) => {
  const patter = new RegExp('^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$')
  if (!patter.test(value)) {
    return callback(new Error('请输入正确格式的手机号！'))
  } else {
    callback() // 必须有此项回调，否则验证会一直不通过
  }
}
// 邮箱校验
export const validateEmail = (rule: any, value: any, callback: any) => {
  const mailbox = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*.[a-zA-Z0-9]{2,6}$')
  if (!mailbox.test(value)) {
    return callback(new Error('请输入正确格式的邮箱！'))
  } else {
    callback()
  }
}

// 身份证号校验
export const validateIdCardNo = (rule: any, value: any, callback: any) => {
  const mailbox = new RegExp(
    '^[1-9]d{5}(18|19|([23]d))d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)d{3}[0-9Xx]$)|(^[1-9]d{5}d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)d{2}[0-9Xx]$'
  )
  if (!mailbox.test(value)) {
    return callback(new Error('请输入正确格式的身份证号！'))
  } else {
    callback()
  }
}

/**
 * 下面密码的规则都一样 就用这一个
 */
const passbox = new RegExp('^[a-zA-Z0-9]{4,16}$')

// 密码校验
export const validatePassword = (rule: any, value: any, callback: any) => {
  if (!passbox.test(value)) {
    return callback(new Error('密码必须是4-24个字母或者数字组成！'))
  }
  callback()
}

// 用户名校验
export const validateUsername = (rule: any, value: any, callback: any) => {
  if (!passbox.test(value)) {
    return callback(new Error('用户名必须是4-24个字母或者数字组成！'))
  }
  callback()
}

/**
 * 重复密码校验
 * @param validRepassword {} 校验重复密码框的函数
 * @returns validateRepeatPass() && validateCheckPass()
 */
export const validateRepeatPass = (validRepassword: () => any) => {
  // 报错的新密码和重复密码，用于校验
  let password: string
  let repassword: string
  // 新密码
  const validatePass = (rule: any, value: any, callback: any) => {
    password = value
    //console.log('密码：', value, '传过来的密码：', password)
    if (value === '') {
      callback(new Error('密码不能为空'))
    } else {
      if (password !== '') {
        if (!password) return
        // 这里表示 如果有内容就调用外面的函数 校验重复输入的密码框
        validRepassword()
        //console.log('准备校验repassword')
      }

      if (!passbox.test(value)) {
        return callback(new Error('密码必须是4-24个字母或者数字组成！'))
      }
      callback()
    }
  }

  // 重复密码
  const validateCheckPass = (rule: any, value: any, callback: any) => {
    repassword = value
    //console.log('重复密码：', value, '传过来的密码：', repassword)
    if (value === '') {
      callback(new Error('再次输入密码不能为空'))
    } else if (value !== password) {
      callback(new Error('两次密码不一致，请重新输入'))
    } else {
      callback()
    }
  }

  return {
    validatePass,
    validateCheckPass
  }
}
