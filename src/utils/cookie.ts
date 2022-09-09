import { useCookies } from '@vueuse/integrations/useCookies'
import type { CookieSetOptions } from 'universal-cookie/cjs/types'

const cookies = useCookies(['locale'])
const TokenKey = 'admin-token'

// 获取 token
export const getToken = () => {
  return cookies.get(TokenKey)
}

// 设置 token
export const setToken = (token: string) => {
  return cookies.set(TokenKey, token)
}

// 清除 token
export const removeToken = () => {
  return cookies.remove(TokenKey)
}
