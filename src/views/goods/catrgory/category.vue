<template>
  <div class="category-list">
    <el-card shadow="never" :body-style="{ padding: '20px', border: 'none' }">
      <template #header>
        <add-refresh @update-table="updateTable">
          <!-- 添加按钮 -->
          <template #add>
            <el-button type="primary" size="default" @click="handleAddData"> 新增 </el-button>
          </template>
        </add-refresh>
      </template>

      <!-- tree树 -->
      <tree
        ref="treeRef"
        @edit-access="handleEditData"
        @increase-access="handleAddData"
        page-name="category"
        :show-title-icon="false"
      >
        <template #treeActions="scope">
          <el-link type="primary" :underline="false" class="mx-5" @click="recommendedFn(scope.row)">
            推荐产品
          </el-link>
        </template>
      </tree>

      <!-- 新增/修改弹窗 -->
      <dialog-custom title="分类" :defaultInfo="defaultInfo" ref="dialogPageRef" @confirm="confirm">
        <el-form ref="ruleFormRef" :model="categoryForm" label-width="80px" status-icon>
          <el-form-item label="分类名称" prop="name" :rules="formValidate.name">
            <el-input v-model="categoryForm.name" placeholder="请输入分类名称" />
          </el-form-item>
        </el-form>
      </dialog-custom>

      <!-- 推荐产品 -->
      <dialog-recommended ref="recommendedRef" />
    </el-card>
  </div>
</template>

<script lang="ts">
import Tree from '@/components/tree.vue'
import addRefresh from '@/components/add-refresh.vue'

// 弹窗
import DialogCustom from '@/components/dialog-custom/src/dialog-custom.vue'
import formValidate from './config/dialog.validate'

import { usePageModal } from '@/hooks/useTable_AddorEdit'
import type { FormInstance } from 'element-plus'

import { useGlobalTreeStore } from '@/stores/modules/globalTree'
import { useRecomendStore } from '@/stores/modules/category'

//推荐产品
import DialogRecommended from './components/dialog-recommended.vue'
</script>

<script setup lang="ts">
const globalTreeStore = useGlobalTreeStore()
const recomendStore = useRecomendStore()

const treeRef = ref<InstanceType<typeof Tree>>()
const recommendedRef = ref<InstanceType<typeof DialogRecommended>>()
const ruleFormRef = ref<FormInstance>()
const updateTable = treeRef.value?.updateTable
// 修改的id
const editId = ref<number>(0)

const categoryForm = ref({
  name: ''
})

const addDialog = () => {
  categoryForm.value.name = ''
}
const editDialog = (item: any) => {
  categoryForm.value.name = item.name
  editId.value = item.id
}

const { dialogPageRef, defaultInfo, handleAddData, handleEditData } = usePageModal(
  addDialog,
  editDialog
)

// 新增/修改弹框确定
const confirm = () => {
  // 判断是修改还是添加
  let isEditOrAdd = dialogPageRef.value?.isEditOrAdd
  ruleFormRef.value?.validate((valid) => {
    if (!valid) return

    if (isEditOrAdd) {
      // 修改
      globalTreeStore.editTreeList_fetch({
        pageName: 'category',
        editDate: { ...categoryForm.value },
        id: editId.value
      })
    } else {
      // 添加
      globalTreeStore.addTreeList_fetch({
        pageName: 'category',
        newDate: { ...categoryForm.value }
      })
    }
    if (dialogPageRef.value) {
      dialogPageRef.value.dialogVisible = false
    }
  })
}

// 推荐产品弹框
const recommendedFn = (row: any) => {
  if (recommendedRef.value) {
    recommendedRef.value.open()
  }
  recomendStore.fetch_getRecomendAPI({ category_id: row.id })
}
</script>

<style scoped lang="less">
.category-list {
  :deep(.el-dialog__body) {
    overflow: auto;
    max-height: 600px;
  }
}
</style>
