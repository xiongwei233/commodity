/**
 * 可配置的表单
 */
import type { Component, CSSProperties } from 'vue'
import type { RuleItem } from './rule'

// 表单每一项的配置选项
export interface FormOptions {
  // 表单项显示的元素
  type?:
    | 'autocomplete'
    | 'cascader'
    | 'cascader-panel'
    | 'checkbox'
    | 'color-picker'
    | 'date-picker'
    | 'input'
    | 'input-number'
    | 'radio-group'
    | 'rate'
    | 'select'
    | 'select-v2'
    | 'slider'
    | 'switch'
    | 'time-picker'
    | 'time-select'
    | 'transfer'
    | 'upload'

  // 表单项的值
  value?: any
  // 表单的label
  label?: string
  // 表单项的标识
  prop?: string
  // 表单项的验证规则
  rules?: RuleItem[]

  // 表单特有的属性,暂时为any
  attrs?: {
    // 表单项的占位符
    inputType?: ' text' | 'textarea'
    placeholder?: string
    clearable?: boolean
    disabled?: boolean
    showPassword?: boolean
    // css的类型
    style?: CSSProperties
    maxlength?: string | number
    showWordLimit?: boolean
    rows?: number
    prefixicon?: string | Component
    suffixIcon?: string | Component
  }

  // cascader 表单的配置
  cascaderOptions?: {}
  radioOptions?: {
    border: boolean
  }

  // 表单项的子元素
  children?: FormOptions[]
  childrenType?: 'checkbox-group' | 'checkbox-button' | 'radio' | 'radio-button' | 'option'
}
