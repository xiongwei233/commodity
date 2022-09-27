import request from '@/services/request'
import type { getGoods_Main } from './types/goods.type'
import type { getDateRo, globalDateRo } from './types/recommended.type'

/**
 * 分类关联产品列表
 * @returns promise
 */
export type getGoodsQueryType = {
  tab: 'all' | 'checking' | 'saling' | 'off' | 'min_stock' | 'delete'
  title: string
  category_id: number
  limit: number
}

type category_itemType = (data: getGoodsQueryType) => Promise<getGoods_Main>
export const getCategoryGoodsAPI: category_itemType = (data) =>
  request.get(`/admin/app_category_item/list`, {
    params: {
      ...data
    }
  })
