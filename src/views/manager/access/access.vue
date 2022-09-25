<template>
  <div class="access-list">
    <el-card shadow="never" :body-style="{ padding: '20px', border: 'none' }" v-loading="loading">
      <template #header>
        <add-refresh @updateTable="updateTable">
          <!-- 添加按钮 -->
          <template #add>
            <el-button type="primary" size="default" :icon="UserFilled" @click="handleAddData">
              新增
            </el-button>
          </template>
        </add-refresh>
      </template>

      <!-- tree树 -->
      <tree ref="treeRef" @edit-access="handleEditData" @increase-access="handleAddData"></tree>
    </el-card>

    <!-- 弹窗 -->
    <dialog-custom
      ref="dialogPageRef"
      pageName="access"
      title="权限管理"
      :showAnimate="false"
      :defaultInfo="defaultInfo"
      @confirm="confirmFn"
    >
      <dialog-form :defaultInfo="defaultInfo" ref="dialogFormRef"></dialog-form>
    </dialog-custom>
  </div>
</template>

<script lang="ts">
import { useAccessStore } from '@/stores/modules/access'
import { UserFilled } from '@element-plus/icons-vue'

// tree
import Tree from './components/tree.vue'

// 弹窗
import DialogCustom from '@/components/dialog-custom'
import DialogForm from './components/dialog-form.vue'

// hooks
import { usePageModal } from '@/hooks/useTable_AddorEdit'
import { NotificationBox } from '@/utils/element-Fun'
</script>

<script setup lang="ts">
const accessStore = useAccessStore()

const loading = ref<boolean>(false)

const treeRef = ref<InstanceType<typeof Tree>>()
const dialogFormRef = ref<InstanceType<typeof DialogForm>>()
// 获取tree数据
treeRef.value?.updateTable()

// 刷新
const updateTable = () => treeRef.value?.updateTable()

// 点击新增，数据初始化
const addDialog = () => {
  nextTick(() => {
    if (dialogFormRef.value) {
      dialogFormRef.value.menuForm = {
        rule_id: '',
        menu: 0,
        name: '',
        condition: '',
        method: 'GET',
        status: 1,
        order: 50,
        icon: '',
        frontpath: ''
      }
    }
  })
}

// 点击确定
const confirmFn = () => {
  //form数据
  let data = dialogFormRef.value?.menuForm
  // 判断是修改还是添加
  let isEditOrAdd = dialogPageRef.value?.isEditOrAdd
  console.log({ ...data })

  dialogFormRef.value?.formRef?.validate(async (valid) => {
    if (!valid) return
    loading.value = true
    if (isEditOrAdd) {
      // 修改
      accessStore
        .fetch_editccessAPI({ ...data })
        .then(() => NotificationBox({ title: '修改成功', type: 'success' }))
        .finally(() => {
          loading.value = false
          dialogPageRef.value!.dialogVisible = false
          treeRef.value?.updateTable()
        })
    } else {
      // 添加
      await accessStore
        .fetch_addAccessAPI({ ...data })
        .then(() => NotificationBox({ title: '添加成功', type: 'success' }))
        .finally(() => {
          loading.value = false
          dialogPageRef.value!.dialogVisible = false
          treeRef.value?.updateTable()
        })
    }
  })
}

const { dialogPageRef, defaultInfo, handleAddData, handleEditData } = usePageModal(addDialog)
</script>

<style scoped lang="less">
.access-list {
  :deep(.el-card__header) {
    border-bottom: none !important;
  }
  :deep(.popconfirm-icon) {
    font-size: 14px;
    padding-left: 20px;
  }
}
</style>
