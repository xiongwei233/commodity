<template>
  <div class="level">
    <el-card shadow="never" :body-style="{ padding: '20px' }">
      <!-- 表格 -->
      <table-page
        add-btn-name="新增等级"
        :tableConfig="levelTableConfig"
        pageName="user_level"
        @add-list-click="handleAddData"
        @edit-list-click="handleEditData"
      >
      </table-page>

      <!-- 弹窗 -->
      <dialog-page
        title="会员等级"
        :modalConfig="modalConfig"
        :defaultInfo="defaultInfo"
        :addDefaultInfo="addDefaultInfo"
        pageName="user_level"
        ref="dialogPageRef"
        :show-animate="false"
      >
      </dialog-page>
    </el-card>
  </div>
</template>

<script lang="ts">
// 表格
import TablePage from '@/components/table-page'
import { levelTableConfig } from './config/level.config'

// 弹窗
import DialogPage from '@/components/dialog-page/src/dialog-page.vue'
import { modalConfig } from './config/dialog.config'

import { usePageModal } from '@/hooks/useTable_AddorEdit'
</script>

<script setup lang="ts">
const addDefaultInfo = () => {}

// 调用hooks获取公共的变量和函数----表格的修改/新增表单
const { dialogPageRef, defaultInfo, handleAddData, handleEditData } = usePageModal()
</script>

<style scoped lang="less"></style>
