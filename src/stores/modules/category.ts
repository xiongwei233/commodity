import {
  associatedCategoryAPI,
  deleteCategoryGoodsAPI,
  getCategoryGoodsAPI,
  type associatedType
} from '@/services/module/category'
import type { getDate } from '@/services/module/types/recommended.type'
import { defineStore } from 'pinia'

// 名字的常量
import { Names } from './stores.name'

export const useRecomendStore = defineStore(Names.RECOMMENDED, {
  state: () => ({
    loading: <boolean>false,
    CategoryGood: <getDate[]>[]
  }),
  getters: {},
  actions: {
    // 分类关联产品列表
    fetch_getRecomendAPI(data: { category_id: number }) {
      this.loading = true
      getCategoryGoodsAPI(data)
        .then((res) => (this.CategoryGood = res.data))
        .finally(() => (this.loading = false))
    },

    // 分类关联产品列表
    fetch_deleteRecomendAPI(id: number) {
      return new Promise((resolve, reject) => {
        this.loading = true
        deleteCategoryGoodsAPI(id)
          .then((res) => resolve(res))
          .catch((err) => reject(err))
          .finally(() => (this.loading = false))
      })
    },

    // 关联产品
    fetch_associatedRecomendAPI(data: associatedType) {
      this.loading = true
      associatedCategoryAPI(data).finally(() => (this.loading = false))
    }
  }
})
