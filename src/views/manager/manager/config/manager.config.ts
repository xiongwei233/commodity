export const managerTableConfig = {
  // 表单的配置
  tableOptions: [
    { prop: 'title', label: '管理员', slotName: 'title' },
    { prop: 'role', label: '所属管理员', align: 'center', slotName: 'role' },
    { prop: 'status', label: '状态', slot: 'status', slotName: 'status' },
    { label: '操作', align: 'center', slotName: 'handler' }
  ],
  pageLayout: 'total, prev, sizes ,pager, next, jumper'
}
