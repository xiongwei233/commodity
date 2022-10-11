export const commentTableConfig = {
  // 表格的配置
  tableOptions: [
    { prop: 'id', label: 'ID', minWidth: '100' },
    { prop: 'user_level', label: '商品', minWidth: '250', slotName: 'goods_item' },
    { prop: 'user', label: '评价信息', minWidth: '150', slotName: 'user—info' },
    { prop: 'review_time', label: '评价时间', minWidth: '250', slotName: 'create_time' },
    {
      prop: 'status',
      label: '是否显示',
      minWidth: '150',
      slotName: 'status'
    }
  ],
  pageLayout: 'total, prev, pager, next, jumper',
  showExpandColunm: true
}
