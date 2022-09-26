import type { Arrayable } from 'element-plus/es/utils'
import type { CSSProperties } from 'vue'
import type { RuleItem } from './rule'

// 表单的类型
export type RuleType =
  | 'autocomplete'
  | 'cascader'
  | 'cascader-panel'
  | 'checkbox'
  | 'color-picker'
  | 'input'
  | 'password'
  | 'textarea'
  | 'input-number'
  | 'radio-group'
  | 'rate'
  | 'select'
  | 'select-v2'
  | 'slider'
  | 'switch'
  | 'date-picker'
  | 'time-picker'
  | 'time-select'
  | 'transfer'

// 表单的属性
export interface IFormItem {
  type: RuleType
  // 表单项的值
  field?: any
  // 表单的label
  label?: string
  // 表单项的标识
  prop?: string
  // 表单项的验证规则
  rules?: Arrayable<RuleItem>
  placeholder?: string
  isHidden?: boolean

  style?: CSSProperties

  // 插槽
  slotName?: string

  // input的私有属性
  inputAttrs?: {
    maxlength?: number
    showWordLimit?: boolean
    rows?: number
  }
  //select的option的数据
  options?: any[]
  // 其他组件特殊的属性
  otherOptions?: any
}

// 组件接受的参数
export interface IForm {
  options: IFormItem[]
  labelWidth?: string
  formItemStyle?: CSSProperties
  layoutReactive?: { xl?: number; lg?: number; md?: number; sm?: number; xs?: number }
}
