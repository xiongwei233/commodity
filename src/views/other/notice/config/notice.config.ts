export const noticeTableConfig = {
  // 表单的配置
  tableOptions: [
    { prop: 'title', label: '公告标题', minWidth: '150' },
    { prop: 'content', label: '公告内容', minWidth: '250' },
    { prop: 'create_time', label: '发布时间', minWidth: '200' },
    { label: '操作', minWidth: '200', slotName: 'handler' }
  ],
  showIndexColunm: true,
  pageLayout: 'total, prev, pager, next, jumper'
}
