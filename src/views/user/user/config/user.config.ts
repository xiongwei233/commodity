export const userTableConfig = {
  // 表格的配置
  tableOptions: [
    { prop: 'username', label: '会员', minWidth: '150', slotName: 'username' },
    { prop: 'user_level', label: '会员等级', minWidth: '150', slotName: 'user_level' },
    { prop: 'create_time', label: '登录注册', minWidth: '250', slotName: 'create_time' },
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
