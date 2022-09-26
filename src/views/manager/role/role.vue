<template>
  <div class="role">
    <el-card shadow="never" :body-style="{ padding: '20px' }">
      <!-- 表格 -->
      <table-page
        add-btn-name="新增角色"
        :tableConfig="noticeTableConfig"
        pageName="role"
        @add-list-click="handleAddData"
        @edit-list-click="handleEditData"
        :switchDisabled="switchDisabled"
      >
        <template #actions="scope">
          <el-button text type="primary" size="small" :icon="User" @click="permissions(scope.row)">
            配置权限
          </el-button>
        </template>
      </table-page>
    </el-card>

    <!-- 修改新增弹窗 -->
    <dialog-page
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
      pageName="role"
      ref="dialogPageRef"
    >
    </dialog-page>

    <!-- 配置权限弹窗 -->
    <dialog-custom
      dialog-top="5vh"
      pageName="role"
      :defaultInfo="permissionsDate"
      ref="dialogCustomRef"
      :showAnimate="false"
      title="权限配置"
      @confirm="confirmFn"
    >
      <tree
        ref="treeRef"
        :showActions="false"
        show-checkbox
        @check-change="checkChangeFn"
        check-strictly
      ></tree>
    </dialog-custom>
  </div>
</template>

<script lang="ts">
// 表格
import TablePage from '@/components/table-page'
import { noticeTableConfig } from './config/role.config'

// 修改新增弹窗
import DialogPage from '@/components/dialog-page/src/dialog-page.vue'
import { modalConfig } from './config/dialog.config'

// hooks
import { usePageModal } from '@/hooks/useTable_AddorEdit'

// 配置权限
import { User } from '@element-plus/icons-vue'
import type { role_type, set_rulesType } from '@/services/module/types/role.type'
import DialogCustom from '@/components/dialog-custom/src/dialog-custom.vue'
import Tree from '../access/components/tree.vue'

import { menuMapLeafKeys } from '@/hooks/useMapMenu'
import { useAccessStore } from '@/stores/modules/access'
import { useRoleStore } from '@/stores/modules/role'
import { NotificationBox } from '@/utils/element-Fun'
</script>

<script setup lang="ts">
const accessStore = useAccessStore()
const roleStore = useRoleStore()

const dialogCustomRef = ref<InstanceType<typeof DialogCustom>>()
const permissionsDate = ref<role_type>()
const treeRef = ref<InstanceType<typeof Tree>>()
// tree 的数据，防止在修改权限配置的数据加载慢，没办法回显
accessStore.fetch_getAccessAPI()

// 调用hooks获取公共的变量和函数----表格的修改/新增表单
const { dialogPageRef, defaultInfo, handleAddData, handleEditData } = usePageModal()

// switch 禁用
const switchDisabled = (scope: any) =>
  scope.row.id === 1 || scope.row.id === 2 || scope.row.id === 3

// 配置权限
const permissions = (item: role_type) => {
  permissionsDate.value = item
  if (dialogCustomRef.value) {
    dialogCustomRef.value.dialogVisible = true
  }
  // 数据回显
  const data = menuMapLeafKeys(item.rules)
  nextTick(() => treeRef.value?.treeRef?.setCheckedKeys(data, false))
}

// 点击复选框
const treeDate = ref<set_rulesType>({})
const checkChangeFn = ({ checkedNodes, checkedKeys }: { checkedNodes: any; checkedKeys: any }) => {
  console.log(checkedNodes, checkedKeys)
  treeDate.value = {
    id: permissionsDate.value?.id,
    rule_ids: checkedKeys.checkedKeys
  }
  //treeDate.value
}
// dialog确定
const confirmFn = () => {
  console.log('发起请求', treeDate.value)
  roleStore
    .fetch_permissionsAPI(treeDate.value)
    .then(() => NotificationBox({ title: `添加成功!` }))
    .finally(() => {
      if (dialogCustomRef.value) {
        dialogCustomRef.value.dialogVisible = false
      }
    })
}
</script>

<style scoped lang="less">
.role {
  :deep(.el-tree-node__content) {
    padding: 10px 0;
  }
}
</style>
