<template>
  <!-- 表格 -->
  <common-table
    :data="data"
    stripe
    border
    lazy
    class="manager"
    :options="tableOptions"
    :currentPage="currentPage"
    :pageSize="pageSize"
    :total="total"
    :paginationOptions="paginationOptions"
    pagination
    :loading="loading"
    @currentChange="currentChange"
    @sizeChange="sizeChange"
    :pageSizes="[5, 10, 20, 30]"
  >
    <!-- 管理员的插槽 manager -->
    <template #manager="{ scope }">
      <div class="flex justify-start items-center">
        <el-avatar :size="40" :src="scope.row.avatar">
          <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
        </el-avatar>
        <div class="ml-3">
          <p>{{ scope.row.username }}</p>
          <p class="text-xs">Id：{{ scope.row.id }}</p>
        </div>
      </div>
    </template>

    <!-- 所属管理员的插槽 belong -->
    <template #belong="{ scope }">
      <span>{{ scope.row.role.name }}</span>
    </template>

    <!-- 状态的插槽 status -->
    <template #status="{ scope }">
      <el-switch
        :model-value="scope.row.status"
        :active-value="1"
        :loading="switchLoading"
        :inactive-value="0"
        :disabled="scope.row.super === 1"
        @click="editManagerStatusFn(scope.row, scope.row.status)"
      ></el-switch>
    </template>

    <!-- 操作的插槽 action -->
    <template #actions="{ scope }">
      <small v-if="scope.row.super === 1">暂无操作</small>
      <template v-else>
        <el-button link type="primary" size="small" @click="editNotice(scope.row)">修改</el-button>
        <el-popconfirm
          title="是否要删除该管理员？"
          confirm-button-text="确定"
          cancel-button-text="取消"
          @confirm="deleteNotice(scope.row)"
        >
          <template #reference>
            <el-button link type="primary" size="small">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </template>
  </common-table>
</template>

<script lang="ts">
import { useManagerStore } from '@/stores/modules/manager'
import { ref, computed } from 'vue'

import CommonTable from '@/components/common-table/index.vue'
import { NotificationBox } from '@/utils/element-Fun'

import type { manager_List } from '@/services/module/types/manager.type'
import type { TableOptions } from '@/components/common-table/types/types'
</script>

<script setup lang="ts">
const managerStore = useManagerStore()
const emits = defineEmits([
  'updateManager',
  'editManagerEmit',
  'update:currentPage',
  'update:pageSize'
])
const switchLoading = ref<boolean>(false)

const props = withDefaults(
  defineProps<{
    currentPage?: number
    pageSize?: number
    loading?: boolean
  }>(),
  {
    currentPage: 1,
    pageSize: 10,
    loading: false
  }
)

// 表单数据
const data = computed(() => managerStore?.managerList?.list)
const total = computed(() => managerStore?.managerList.totalCount ?? 0)

// 表单的配置
const tableOptions: TableOptions[] = [
  { label: '管理员', prop: 'title', slot: 'manager' },
  { label: '所属管理员', prop: 'role', align: 'center', slot: 'belong' },
  { label: '状态', prop: 'create_time', slot: 'status', align: 'center' },
  { label: '操作', prop: 'address', action: true, align: 'center' }
]

// 分页的配置
let paginationOptions = {
  background: true,
  hideOnSinglePage: true,
  layout: 'total, prev, sizes, pager, next, jumper'
}

// 页数改变
const currentChange = (val: number) => {
  //console.log(`当前第${val}页`)
  emits('update:currentPage', val)
  // 更新表单
  emits('updateManager')
}

// 条数改变
const sizeChange = (val: number) => {
  // console.log(val)
  emits('update:pageSize', val)
  emits('updateManager')
}

// 管理员状态
const editManagerStatusFn = (row: manager_List, rowStatus: number) => {
  //console.log(row, rowStatus)
  switchLoading.value = true
  managerStore
    .fetch_editManagerStatusAPI({ id: row.id, status: rowStatus ? 0 : 1 })
    .then(() => {
      emits('updateManager')
      NotificationBox({ title: `修改成功!` })
    })
    .finally(() => (switchLoading.value = false))
}

// 删除
const deleteNotice = (item: manager_List) => {
  managerStore.fetch_deleteManagerAPI(item.id).then(() => {
    emits('updateManager')
    NotificationBox({ title: `删除成功!` })
  })
}

// 修改
const editNotice = (item: manager_List) => {
  //console.log(item)
  emits('editManagerEmit', item)
}
</script>
