import { defineStore } from 'pinia'

import {
  addImageCategoryAPI,
  deleteImageAPI,
  deleteImageCategoryAPI,
  editImageAPI,
  editImageCategoryAPI,
  getImageAPI,
  getImageCategoryAPI,
  type addImage_queryType,
  type editImageName_queryType,
  type editImage_queryType,
  type getImageCate_queryType,
  type imageList_queryType
} from '@/services'

// 名字的常量
import { Names } from './stores.name'
import type {
  addImageCategory_RootObject,
  editImageCategory_RootObject,
  imageCategory_Data,
  imageCategory_List,
  imageCategory_RootObject,
  image_Data,
  image_RootObject
} from '@/services/module/types/image.type'

export const useImageStore = defineStore(Names.IMAGE, {
  state: () => ({
    list: <image_Data>{},
    // 分类:当前的页码
    catePage: <number>1,
    // 当前分类id
    categroyId: <number>0,
    // 当前分类的数据
    categroyList: <imageCategory_Data>{},
    // 新分类数据
    newResults: <imageCategory_List[]>[],
    cateListLoading: false
  }),
  getters: {},
  actions: {
    // 图库列表
    fetch_getImageAPI({ limit, page }: imageList_queryType): Promise<image_RootObject> {
      return new Promise(async (resolve, reject) => {
        try {
          const results = await getImageAPI({ limit, page })

          this.list = results.data
          resolve(results)
        } catch (error) {
          reject(error)
        }
      })
    },

    // 增加图库分类
    fetch_addImageCategoryAPI({ name, order }: addImage_queryType): Promise<addImageCategory_RootObject> {
      return new Promise(async (resolve, reject) => {
        try {
          const results = await addImageCategoryAPI({ name, order })
          resolve(results)
        } catch (error) {
          reject(error)
        }
      })
    },

    // 修改图库分类
    fetch_editImageCategoryAPI({ id, name, order }: editImage_queryType): Promise<editImageCategory_RootObject> {
      return new Promise(async (resolve, reject) => {
        try {
          const results = await editImageCategoryAPI({ id, name, order })
          resolve(results)
        } catch (error) {
          reject(error)
        }
      })
    },

    // 删除图库分类
    fetch_deleteImageCategoryAPI(id: number): Promise<editImageCategory_RootObject> {
      return new Promise(async (resolve, reject) => {
        try {
          const results = await deleteImageCategoryAPI(id)
          resolve(results)
        } catch (error) {
          reject(error)
        }
      })
    },

    // 指定分类下的图片列表
    fetch_getImageCategoryAPI({ id, limit, page }: getImageCate_queryType): Promise<imageCategory_RootObject> {
      return new Promise(async (resolve, reject) => {
        try {
          const results = await getImageCategoryAPI({ id, limit, page })
          let newResults = results.data.list.map((o) => {
            o.checked = false
            return o
          })
          this.newResults = newResults
          this.categroyList = results.data
          resolve(results)
        } catch (error) {
          reject(error)
        }
      })
    },

    // 删除图片
    fetch_deleteImageAPI(ids: number[]): Promise<number[]> {
      return new Promise(async (resolve, reject) => {
        try {
          const results = await deleteImageAPI(ids)
          resolve(results)
        } catch (error) {
          reject(error)
        }
      })
    },

    // 修改图片名称
    fetch_editImageType({ id, name }: editImageName_queryType): Promise<editImageCategory_RootObject> {
      return new Promise(async (resolve, reject) => {
        try {
          const results = await editImageAPI({ id, name })
          resolve(results)
        } catch (error) {
          reject(error)
        }
      })
    }
  }
})
