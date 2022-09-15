export interface TableOptions {
  // 表头
  label?: string
  // 字段名
  prop?: string
  // 列宽度
  width?: string | number
  minWidth?: string | number
  // 字段名
  align?: 'left' | 'center' | 'right'
  // 自定义模板名称
  slot?: string
  //是否代表操作项
  action?: boolean
  //是否是可编辑的单元格
  editable?: boolean
}
