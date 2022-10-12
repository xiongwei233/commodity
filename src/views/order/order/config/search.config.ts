import type { IFormItem } from '@/common-ui/commen-form/types/form.type'

const formOptions: IFormItem[] = [
  {
    type: 'input',
    field: 'no',
    label: '订单编号',
    placeholder: '请输入订单编号'
  },
  {
    type: 'input',
    field: 'name',
    label: '收货人',
    placeholder: '请输入收货人'
  },
  {
    type: 'input',
    field: 'name',
    label: '手机号',
    placeholder: '请输入手机号'
  },
  {
    type: 'date-picker',
    field: 'starttime',
    label: '开始时间',
    style: { width: '100%' },
    placeholder: '请选择开始时间',
    otherOptions: {
      type: 'date',
      valueFormat: 'YYYY-MM-DD'
    }
  },
  {
    type: 'date-picker',
    field: ' endtime ',
    label: '结束时间',
    style: { width: '100%' },
    placeholder: '请选择结束时间',
    otherOptions: {
      type: 'date',
      valueFormat: 'YYYY-MM-DD'
    }
  }
]

export const searchConfig = {
  // 底层tabel的属性和 元素el-table都可以写
  formOptions: formOptions,
  labelWidth: '80px'
}
