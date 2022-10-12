import {
  commentReplyAPI,
  excelexportAPI,
  expressAPI,
  getShipInfoAPI,
  orderRefundAPI,
  orderShippedAPI,
  type IExcelexport,
  type IRefund,
  type IShipped
} from '@/services'

import { defineStore } from 'pinia'

// 名字的常量
import { Names } from './stores.name'

export const useOrderStore = defineStore(Names.ORDER, {
  state: () => ({
    shipInfo: <any>{},
    excelexport: <any>{}
  }),
  getters: {},
  actions: {
    /**
     * 通用请求
     */
    fetchHooks(API: (arg: any) => Promise<any>, query?: any) {
      return new Promise((resolve, reject) => {
        API(query)
          .then((data: any) => {
            resolve(data)
          })
          .catch((err: any) => {
            reject(err)
          })
      })
    },

    // 回复商品评价
    commentReply_fetch(id: number, data: string) {
      return new Promise((resolve, reject) => {
        commentReplyAPI(id, data)
          .then((data: any) => {
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    // 订单发货
    orderShipped_fetch(datas: IShipped) {
      console.log('订单', datas)
      this.fetchHooks(orderShippedAPI, datas)
    },

    // 拒绝/同意退款
    orderRefund_fetch(datas: IRefund) {
      this.fetchHooks(orderRefundAPI, datas)
    },

    // 导出订单
    excelexport_fetch(datas: IExcelexport) {
      this.fetchHooks(excelexportAPI, datas)
    },

    // 快递公司列表
    express_fetch() {
      return new Promise((resolve, reject) => {
        expressAPI()
          .then((data: any) => {
            this.excelexport = data.data?.list
            console.log(this.excelexport)
            resolve(data)
          })
          .catch((err: any) => {
            reject(err)
          })
      })
    },

    // 查看订单物流信息
    async getShipInfo_fetch(id: number) {
      return new Promise((resolve, reject) => {
        getShipInfoAPI(id)
          .then((data: any) => {
            this.shipInfo = data.data?.result
            resolve(data)
          })
          .catch((err: any) => {
            reject(err)
          })
      })
    }
  }
})
