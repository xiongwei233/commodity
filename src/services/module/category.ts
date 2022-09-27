import request from '@/services/request'
import type { getDateRo, globalDateRo } from './types/recommended.type'

/**
 * 分类关联产品列表
 * @returns promise
 */
type category_itemType = (data: { category_id: number }) => Promise<getDateRo>
export const getCategoryGoodsAPI: category_itemType = (data) =>
  request.get(`/admin/app_category_item/list`, {
    params: {
      ...data
    }
  })

/**
 * 删除关联产品
 * @returns promise
 */
type deleteCategory_itemType = (id: number) => Promise<globalDateRo>
export const deleteCategoryGoodsAPI: deleteCategory_itemType = (id) =>
  request.post(`/admin/app_category_item/${id}/delete`)

/**
 * 关联产品
 * @returns promise
 */
export type associatedType = {
  category_id: number
  goods_ids: any[]
}
type associatedCategory_itemType = (data: associatedType) => Promise<globalDateRo>
export const associatedCategoryAPI: associatedCategory_itemType = (data) =>
  request.post(`/admin/app_category_item`, data)
