<template>
  <div class="skus-list">
    <el-card shadow="never" :body-style="{ padding: '20px' }">
      <!-- 表格 -->
      <table-page
        add-btn-name="新增角色"
        :tableConfig="skusTableConfig"
        pageName="skus"
        @add-list-click="handleAddData"
        @edit-list-click="handleEditData"
        show-batch-delete
      >
      </table-page>

      <!-- 修改新增弹窗 -->
      <dialog-page
        :modalConfig="modalConfig"
        :defaultInfo="defaultInfo"
        :addDefaultInfo="addDefaultInfo"
        pageName="skus"
        ref="dialogPageRef"
        :otherInfo="{ default: dynamicTags.toString() }"
      >
        <template #default>
          <div>
            <el-form-item
              class="skusTags ml-3"
              label="规格值"
              :rules="formValidate.dynamicTags"
              :show-message="useCaseChange"
              prop="dynamicTags"
            >
              <new-tag v-model="dynamicTags"></new-tag>
            </el-form-item>
          </div>
        </template>
      </dialog-page>
    </el-card>
  </div>
</template>

<script lang="ts">
// 表格
import TablePage from '@/components/table-page'
import { skusTableConfig } from './config/skus.config'

// 弹窗
import DialogPage from '@/components/dialog-page/src/dialog-page.vue'
import { modalConfig } from './config/dialog.config'
import NewTag from '@/components/new-tag.vue'

import formValidate from './config/dialog.validate'

import { usePageModal } from '@/hooks/useTable_AddorEdit'
</script>

<script setup lang="ts">
// tag的值
const dynamicTags = ref<string[]>([])

// 点击新增，数据初始化
const addDefaultInfo = ref({})
const addDialog = () => {
  dynamicTags.value = []
  nextTick(() => {
    addDefaultInfo.value = { order: 100, status: 1 }
  })
}

// 点击修改，tag数据初始化
const editDialog = (item: any) => {
  dynamicTags.value = item.default.split(',')
}

// 调用hooks获取公共的变量和函数----表格的修改/新增表单
const { dialogPageRef, defaultInfo, handleAddData, handleEditData } = usePageModal(
  addDialog,
  editDialog
)

const useCaseChange = computed(() => {
  if (dynamicTags.value.length > 0) {
    return false
  } else {
    return true
  }
})
</script>

<style scoped lang="less"></style>
