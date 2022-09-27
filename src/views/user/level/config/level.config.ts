export const levelTableConfig = {
  // 表单的配置
  tableOptions: [
    { prop: 'name', label: '会员等级', minWidth: '150' },
    { prop: 'discount', label: '折扣率(%)', minWidth: '100' },
    { prop: 'level', label: '等级序号', minWidth: '100' },
    { prop: 'max_price', label: '累计消费金额', minWidth: '100' },
    { prop: 'max_times', label: '累计消费次数', minWidth: '100' },
    {
      prop: 'status',
      label: '状态',
      minWidth: '150',
      slotName: 'status'
    },
    { label: '操作', minWidth: '200', slotName: 'handler' }
  ],
  pageLayout: 'total, prev, pager, next, jumper'
}
