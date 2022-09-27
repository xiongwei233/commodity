import { loseEfficacyAPI } from '@/services/module/coupon'
import { permissionsAPI } from '@/services/module/role'
import type { set_rulesType } from '@/services/module/types/role.type'
import { defineStore } from 'pinia'

// 名字的常量
import { Names } from './stores.name'

export const useCouponStore = defineStore(Names.COUPON, {
  state: () => ({}),
  getters: {},
  actions: {
    // 优惠券失效
    fetch_loseEfficacyAPI(id: number, data: { status: number }) {
      return new Promise(async (resolve, reject) => {
        await loseEfficacyAPI(id, data)
      })
    }
  }
})
