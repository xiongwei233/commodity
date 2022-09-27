export const skusTableConfig = {
  // 表单的配置
  tableOptions: [
    { prop: 'name', label: '优惠券名称', minWidth: '300', slotName: 'name' },
    { prop: 'status', label: '状态', minWidth: '100', slotName: 'couponStates' },
    { prop: 'type', label: '优惠', minWidth: '100', slotName: 'type' },
    { prop: 'total', label: '发放数量', minWidth: '100' },
    { prop: 'used', label: '已使用', minWidth: '100' },
    { label: '操作', minWidth: '200', slotName: 'handler' }
  ],
  showIndexColunm: true,
  pageLayout: 'total, prev, pager, next, jumper'
}
