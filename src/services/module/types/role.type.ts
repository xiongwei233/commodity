export interface role_type {
  id: number
  status: number
  create_time: string
  update_time: string
  name: string
  desc: string
  rules: role_Rule[]
}

interface role_Rule {
  id: number
  pivot: role_Pivot
}

interface role_Pivot {
  id: number
  role_id: number
  rule_id: number
}

// 配置权限接口
export interface set_rulesType {
  id?: number
  rule_ids?: number[]
}
