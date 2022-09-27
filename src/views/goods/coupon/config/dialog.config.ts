import type { IFormItem } from '@/common-ui/commen-form/types/form.type'

import formValidate from './dialog.validate'

const formOptions: IFormItem[] = [
  {
    type: 'input',
    field: 'name',
    label: '优惠券名',
    placeholder: '请输入优惠券名称',
    rules: formValidate.name
  },
  {
    type: 'radio-group',
    field: 'type',
    label: '类型',
    radioOptions: [
      { label: 0, value: '满减' },
      { label: 1, value: '折扣' }
    ],
    otherOptions: {
      border: true
    }
  },
  {
    type: 'input',
    field: 'value',
    label: '面值',
    rules: formValidate.value,
    inputAttrs: {
      slotText: '元',
      slotPosition: 'append'
    }
  },
  {
    type: 'input-number',
    field: 'total',
    label: '发行量',
    rules: formValidate.total
  },
  {
    type: 'input',
    field: 'min_price',
    label: '最低使用价格',
    rules: formValidate.min_price,
    inputAttrs: {
      slotText: '元',
      slotPosition: 'append'
    }
  },
  {
    type: 'input-number',
    field: 'order',
    label: '排序'
  },
  {
    type: 'date-picker',
    field: 'activityTime',
    label: '活动时间',
    rules: formValidate.createTime,
    otherOptions: {
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      type: 'datetimerange'
    }
  },
  {
    type: 'textarea',
    field: 'desc',
    label: '描述',
    placeholder: '请输入描述',
    rules: formValidate.desc,
    inputAttrs: {
      maxlength: 300,
      showWordLimit: true,
      rows: 4
    }
  }
]

export const modalConfig = {
  formOptions: formOptions,
  labelWidth: '100px',
  layoutReactive: {
    xl: 24
  }
}
