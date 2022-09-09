import request from '@/services/request'
import type {
  addImageCategory_RootObject,
  editImageCategory_RootObject,
  imageCategory_RootObject,
  image_RootObject
} from './types/image.type'

/**
 * 图库列表
 * @params limit 每页显示条数
 * @params page 分页页码
 * @returns promise
 */
export type imageList_queryType = { limit?: number; page?: number }
type getImageType = ({ limit, page }: imageList_queryType) => Promise<image_RootObject>
export const getImageAPI: getImageType = ({ limit = 10, page = 1 }) =>
  request.get(`/admin/image_class/${page}`, {
    params: { limit }
  })

/**
 * 增加图库分类
 * @params name 图库分类名称
 * @params order 排序
 * @returns promise
 */
export type addImage_queryType = { name: string; order: number }
export type addImageCategoryType = ({ name, order }: addImage_queryType) => Promise<addImageCategory_RootObject>
export const addImageCategoryAPI: addImageCategoryType = ({ name, order }) =>
  request.post(`/admin/image_class`, { name, order })

/**
 * 修改图库分类
 * @params name 图库分类名称
 * @params order 排序
 * @returns promise
 */
export type editImage_queryType = { id: number; name: string; order: number }
export type editImageCategoryType = ({ id, name, order }: editImage_queryType) => Promise<editImageCategory_RootObject>
export const editImageCategoryAPI: editImageCategoryType = ({ id, name, order }) =>
  request.post(`/admin/image_class/${id}`, { name, order })

/**
 * 删除图库分类
 * @params id 图库分类ID
 * @returns promise
 */

export type deleteImageCategoryType = (id: number) => Promise<editImageCategory_RootObject>
export const deleteImageCategoryAPI: deleteImageCategoryType = (id) => request.post(`/admin/image_class/${id}/delete`)

/**
 * 指定分类下的图片列表
 * @params id 图库ID
 * @params limit 每页显示条数
 * @params page 分页页码
 * @returns promise
 */
export type getImageCate_queryType = { id: number; limit?: number; page?: number }
type getImageCategoryType = ({ id, limit, page }: getImageCate_queryType) => Promise<imageCategory_RootObject>
export const getImageCategoryAPI: getImageCategoryType = ({ id, limit = 12, page = 1 }) =>
  request.get(`/admin/image_class/${id}/image/${page}`, {
    params: { limit }
  })

/**删除图片
 * @params ids 图片ID组成的一维数组
 * @returns promise
 */
type deleteImageType = (ids: number[]) => Promise<number[]>
export const deleteImageAPI: deleteImageType = (ids) => request.post(`admin/image/delete_all`, { ids })

/**
 * 修改图片名称
 * @params id 图片ID
 * @params name 图片名称
 * @returns promise
 */
export type editImageName_queryType = { id: number; name: string }
type editImageType = ({ id, name }: editImageName_queryType) => Promise<editImageCategory_RootObject>
export const editImageAPI: editImageType = ({ id, name }) => request.post(`admin/image/${id}`, { name })

/**
 * 图片上传
 */
export const uoloadImageUrl = 'api/admin/image/upload'
