export const noticeTableConfig = {
  // 表单的配置
  tableOptions: [
    { prop: 'name', label: '角色名称', minWidth: '150' },
    { prop: 'desc', label: '角色描述', minWidth: '250' },

    {
      prop: 'status',
      label: '状态',
      minWidth: '250',
      slotName: 'status'
    },

    { label: '操作', minWidth: '200', slotName: 'handler' }
  ],
  showIndexColunm: true,
  pageLayout: 'total, prev, pager, next, jumper'
}
