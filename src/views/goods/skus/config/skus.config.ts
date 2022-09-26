export const skusTableConfig = {
  // 表单的配置
  tableOptions: [
    { prop: 'name', label: '规格名称', minWidth: '150' },
    { prop: 'default', label: '规格值', minWidth: '250' },
    { prop: 'order', label: '排序', minWidth: '100' },
    {
      prop: 'status',
      label: '状态',
      minWidth: '250',
      slotName: 'status'
    },
    { label: '操作', minWidth: '200', slotName: 'handler' }
  ],
  showIndexColunm: true,
  showSelectColunm: true,
  pageLayout: 'total, prev, pager, next, jumper'
}
