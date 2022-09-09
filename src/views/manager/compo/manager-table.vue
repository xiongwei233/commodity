<template>
  <!-- tab -->
  <el-table :data="managerStore.managerList.list" stripe border lazy class="manager">
    <el-table-column label="管理员">
      <template #default="{ row }">
        <div class="flex justify-start items-center">
          <el-avatar :size="40" :src="row.avatar">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
          </el-avatar>
          <div class="ml-3">
            <p>{{ row.username }}</p>
            <p class="text-xs">Id：{{ row.id }}</p>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="role.name" label="所属管理员" align="center" />

    <el-table-column prop="create_time" label="状态" align="center">
      <template #default="{ row }">
        <el-switch
          :model-value="row.status"
          :active-value="1"
          :loading="switchLoading"
          :inactive-value="0"
          :disabled="row.super === 1"
          @change="editManagerStatusFn(row, row.status)"
        ></el-switch>
      </template>
    </el-table-column>

    <el-table-column prop="address" label="操作" align="center">
      <template #default="{ row }">
        <small v-if="row.super === 1">暂无操作</small>
        <template v-else>
          <el-button link type="primary" size="small" @click="editNotice(row)">修改</el-button>
          <el-popconfirm
            title="是否要删除该管理员？"
            confirm-button-text="确定"
            cancel-button-text="取消"
            @confirm="deleteNotice(row)"
          >
            <template #reference>
              <el-button link type="primary" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { useManagerStore } from '@/stores/modules/manager'

import type { manager_List } from '@/services/module/types/manager.type'

import { ref } from 'vue'
import { NotificationBox } from '@/utils/element-Fun'
</script>

<script setup lang="ts">
const managerStore = useManagerStore()
const emit = defineEmits(['updateManager', 'editManagerEmit'])
const switchLoading = ref<boolean>(false)

// 管理员状态
const editManagerStatusFn = (row: manager_List, rowStatus: number) => {
  switchLoading.value = true
  managerStore
    .fetch_editManagerStatusAPI({ id: row.id, status: rowStatus ? 0 : 1 })
    .then(() => {
      emit('updateManager')
      NotificationBox({ title: `修改成功!` })
    })
    .finally(() => (switchLoading.value = false))
}

// 删除
const deleteNotice = (item: manager_List) => {
  managerStore.fetch_deleteManagerAPI(item.id).then(() => {
    emit('updateManager')
    NotificationBox({ title: `删除成功!` })
  })
}

// 修改
const editNotice = (item: manager_List) => {
  emit('editManagerEmit', item)
}
</script>

<style scoped lang="less"></style>
