import request from '@/services/request'

/**
 * 回复商品评价
 */
export const commentReplyAPI = (id: number, data: string) => {
  return request.post(`/admin/goods_comment/review/${id}`, { data })
}

/**
 * 订单发货
 */
export type IShipped = {
  id: number
  express_company: string
  express_no: string
}
export const orderShippedAPI = ({ id, express_company, express_no }: IShipped) => {
  return request.post(`admin/order/${id}/ship`, {
    express_company,
    express_no: Number(express_no)
  })
}

/**
 * 拒绝/同意退款
 */
export type IRefund = {
  id: number
  agree: 0 | 1
  disagree_reason?: string
}
export const orderRefundAPI = ({ id, agree, disagree_reason }: IRefund) => {
  return request.post(`admin/order/${id}/handle_refund`, {
    agree,
    disagree_reason
  })
}

/**
 * 导出订单
 */
export type IExcelexport = {
  tab: 'all' | 'nopay' | 'noship' | 'shiped' | 'received' | 'finish' | 'closed' | 'refunding'
  starttime: string
  endtime: string
}
export const excelexportAPI = ({ tab, starttime, endtime }: IExcelexport) => {
  return request.post(`/admin/order/excelexport`, {
    tab,
    starttime,
    endtime
  })
}

/**
 * 快递公司列表
 */
export const expressAPI = () => {
  return request.get(`/admin/express_company/1`)
}

/**
 * 查看订单物流信息
 */
export const getShipInfoAPI = (id: number) => {
  return request.get(`admin/order/${id}/get_ship_info`)
}
