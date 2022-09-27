import type { IFormItem } from '@/common-ui/commen-form/types/form.type'

import formValidate from './dialog.validate'

const formOptions: IFormItem[] = [
  {
    type: 'input',
    field: 'name',
    label: '等级名称',
    placeholder: '请输入等级名称',
    rules: formValidate.name
  },
  {
    type: 'input',
    field: 'level',
    label: '等级权重',
    placeholder: '请输入等级权重',
    rules: formValidate.level
  },
  {
    type: 'switch',
    field: 'status',
    label: '状态',
    otherOptions: {
      activeValue: 1,
      inactiveValue: 0
    }
  },
  {
    type: 'input',
    field: 'max_price',
    label: '累计消费金额满',
    placeholder: '请输入累计消费金额',
    rules: formValidate.max_price,
    inputAttrs: {
      slotPosition: 'append',
      slotText: '元',
      bottomText: '设置会员等级所需要的累计消费必须大于等于0,单位：元'
    }
  },
  {
    type: 'input',
    field: 'max_times',
    label: '累计消费次数满',
    placeholder: '请输入累计消费次数',
    rules: formValidate.max_times,
    inputAttrs: {
      slotPosition: 'append',
      slotText: '次',
      bottomText: '设置会员等级所需要的购买量必须大于等于0,单位：笔'
    }
  },
  {
    type: 'input',
    field: 'discount',
    label: '折扣率(%)',
    placeholder: '请输入折扣率',
    rules: formValidate.name,
    inputAttrs: {
      slotPosition: 'append',
      slotText: '%',
      bottomText: '折扣率单位为百分比，如输入90，表示该会员等级的用户可以以商品原价的90%购买'
    }
  }
]

export const modalConfig = {
  // 底层tabel的属性和 元素el-table都可以写
  formOptions: formOptions,
  labelWidth: '100px',
  layoutReactive: {
    xl: 24
  }
}
