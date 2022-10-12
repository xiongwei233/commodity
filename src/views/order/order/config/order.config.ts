export const orderTableConfig = {
  // 表格的配置
  tableOptions: [
    { prop: 'goods', label: '商品', minWidth: '350', slotName: 'goods' },
    { prop: 'total_price', label: '实付款', minWidth: '150', slotName: 'total_price' },
    { prop: 'user', label: '买家', minWidth: '150', slotName: 'user' },
    { prop: 'status', label: '交易状态', minWidth: '200', slotName: 'payStatus' },
    { label: '操作', minWidth: '200', slotName: 'handler' }
  ],
  pageLayout: 'total, prev, pager, next, jumper',
  showSelectColunm: true
}
