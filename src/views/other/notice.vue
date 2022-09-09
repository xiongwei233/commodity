<template>
  <div class="notice" v-loading="loading">
    <el-card shadow="never">
      <template #header>
        <div class="flex justify-between items-center">
          <el-button type="primary" size="default" @click="addNoticeShow">
            <el-icon style="margin-right: 5px"><CirclePlus /></el-icon>
            新增
          </el-button>
          <span @click="listFnAPI" style="cursor: pointer">
            <el-icon><Refresh /></el-icon>
          </span>
        </div>
      </template>

      <!-- tab -->
      <el-table :data="noticeStore?.noticeList?.list" stripe border lazy>
        <el-table-column prop="title" label="公告标题" />
        <el-table-column prop="content" label="公告内容" min-width="200px" />
        <el-table-column prop="create_time" label="发布时间" />
        <el-table-column prop="address" label="操作">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="editNotice(row)">修改</el-button>
            <el-popconfirm
              title="是否要删除该公告信息？"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="deleteNotice(row)"
            >
              <template #reference>
                <el-button link type="primary" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <footer class="mt-5 flex items-center justify-center">
        <!-- 分页 -->
        <el-pagination
          hide-on-single-page
          :current-page="currentPage"
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :page-count="calcPage"
        />
      </footer>
    </el-card>

    <global-drawer
      size="40%"
      ref="addNotice_DrawerRef"
      :title="`${isAddOrEdit ? '修改' : '添加'}公告信息`"
      @opened="addNotice_DrawerOpened"
      @closed="addNotice_DrawerClosed"
      @submit="addNoticeFn"
    >
      <el-form
        :model="addNoticeForm"
        ref="addNotice_FormRef"
        :rules="addNoticeRules"
        label-width="80px"
        :inline="false"
      >
        <animation-lottie ref="addNotice_animationRef" class="!w-96 !h-96"></animation-lottie>
        <el-form-item label="公告标题" prop="title">
          <el-input
            v-model="addNoticeForm.title"
            maxlength="50"
            show-word-limit
            placeholder="请输入公告标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="公告内容" prop="content">
          <el-input
            type="textarea"
            v-model="addNoticeForm.content"
            :rows="4"
            placeholder="请输入公告内容"
            show-word-limit
            maxlength="300"
          ></el-input>
        </el-form-item>
      </el-form>
    </global-drawer>
  </div>
</template>

<script lang="ts">
import { useNoticeStore } from '@/stores/modules/notice'

import GlobalDrawer from '@/components/global-drawer.vue'
import AnimationLottie from '@/components/animation-lottie.vue'

import type { addNotice_Data } from '@/services/module/types/notice.type'
import { editOrAddFunction } from './compo/hooks/useNotice'
</script>

<script setup lang="ts">
const noticeStore = useNoticeStore()

/**
 * 新增/修改/分页
 */
const {
  listFnAPI,

  currentPage,
  calcPage,
  handleCurrentChange,

  addNoticeShow,
  addNoticeRules,
  addNoticeForm,

  addNotice_DrawerRef,
  addNotice_FormRef,
  addNotice_animationRef,

  addNotice_DrawerOpened,
  addNotice_DrawerClosed,

  loading,
  editNotice,
  isAddOrEdit,
  addNoticeFn
} = editOrAddFunction()

/**
 * 删除
 */
const deleteNotice = (item: addNotice_Data) => {
  //console.log(item)
  loading.value = true
  noticeStore
    .fetch_deleteNoticeAPI(item.id)
    .then(() => {
      listFnAPI()
      ElNotification({ title: `删除成功`, type: 'success', duration: 2000 })
    })
    .finally(() => (loading.value = false))
}
</script>

<style scoped lang="less">
.notice {
  .el-card {
    border: none;
    :deep(.el-card__header) {
      border: none;
      padding-bottom: 0;
    }
  }
}
</style>
