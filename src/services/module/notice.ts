import request from '@/services/request'
import type { addNotice_RootObject, getNotice_RootObject, notice_global } from './types/notice.type'

/**
 * 公告列表
 * @params page 分页页码
 * @returns promise
 */
type getNoticeType = (page?: number) => Promise<getNotice_RootObject>
export const getNoticeAPI: getNoticeType = (page = 1) => request.get(`/admin/notice/${page}`)

/**
 * 增加公告
 * @params title 公告标题
 * @params content 公告内容
 * @returns promise
 */
export type addNotice_queryType = { title: string; content: string }
type addNoticeType = ({ title, content }: addNotice_queryType) => Promise<addNotice_RootObject>
export const addNoticeAPI: addNoticeType = ({ title, content }) => request.post(`/admin/notice`, { title, content })

/**
 * 修改公告
 * @params id 公告ID
 * @params title 公告标题
 * @params content 公告内容
 * @returns promise
 */
export type editNotice_queryType = { id: number; title: string; content: string }
type editNoticeType = ({ id, title, content }: editNotice_queryType) => Promise<notice_global>
export const editNoticeAPI: editNoticeType = ({ id, title, content }) =>
  request.post(`/admin/notice/${id}`, { title, content })

/**
 * 删除公告
 * @params id 公告ID
 * @returns promise
 */

type deleteNoticeType = (id: number) => Promise<notice_global>
export const deleteNoticeAPI: deleteNoticeType = (id) => request.post(`admin/notice/${id}/delete`)
