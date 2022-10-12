export const tabsDate = reactive([
  { type: 'all', name: '全部' },
  { type: 'nopay', name: '待支付' },
  { type: 'noship', name: '待发货' },
  { type: 'shiped', name: '待收货' },
  { type: 'received', name: '已收货' },
  { type: 'finish', name: '已完成' },
  { type: 'closed', name: '已关闭' },
  { type: 'refunding', name: '退款中' }
])
