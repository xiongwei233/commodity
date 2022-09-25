<template>
  <div class="notice">
    <el-card shadow="never">
      <!-- 表格 -->
      <table-page
        :tableConfig="noticeTableConfig"
        pageName="notice"
        @add-list-click="handleAddData"
        @edit-list-click="handleEditData"
      ></table-page>
    </el-card>

    <!-- 弹窗 -->
    <dialog-page
      ref="dialogPageRef"
      pageName="notice"
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
    ></dialog-page>
  </div>
</template>

<script lang="ts">
// 表格
import TablePage from '@/components/table-page'
import { noticeTableConfig } from './config/notice.config'

// 弹窗
import DialogPage from '@/components/dialog-page/src/dialog-page.vue'
import { modalConfig } from './config/dialog.config'

// hooks
import { usePageModal } from '@/hooks/useTable_AddorEdit'
</script>

<script setup lang="ts">
// 调用hooks获取公共的变量和函数----表格的修改/新增表单
const { dialogPageRef, defaultInfo, handleAddData, handleEditData } = usePageModal()
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
