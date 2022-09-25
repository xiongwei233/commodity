<template>
  <div class="notice" v-loading="loading">
    <el-card shadow="never">
      <!-- 表格 -->
      <table-page
        :tableConfig="managerTableConfig"
        pageName="manager"
        addBtnName="添加管理员"
        ref="tablePageRef"
        @addListClick="addListClick"
        @editListClick="editListClick"
      >
        <template #search>
          <el-form :model="searchForm" ref="searchRef" class="flex items-center searchFrom">
            <el-form-item label="搜索关键词" prop="search" class="flex-1 !mt-0" required>
              <el-input
                v-model="searchForm.search"
                placeholder="请输入搜索关键词"
                @change="searchFn"
              />
            </el-form-item>

            <el-form-item class="ml-4">
              <el-button type="primary" @click="searchFn">搜索</el-button>
              <el-button @click="resetFn">重置</el-button>
            </el-form-item>
          </el-form>
        </template>

        <!-- 管理员的插槽 manager -->
        <template #title="scope">
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
        <template #role="scope">
          <span>{{ scope.row.role.name }}</span>
        </template>

        <!-- 状态的插槽 status -->
        <!--<template #status="scope">
          <el-switch
            :model-value="scope.row.status"
            :active-value="1"
            :loading="switchLoading"
            :inactive-value="0"
            :disabled="scope.row.super === 1"
            @click="editManagerStatusFn(scope.row.status, scope.row)"
          ></el-switch>
        </template>-->
      </table-page>
    </el-card>

    <!-- 弹框 -->
    <manager-drawer ref="managerDrawerRef" @updateManager="updateTable" />
  </div>
</template>

<script lang="ts">
import { useManagerStore } from '@/stores/modules/manager'
import type { FormInstance } from 'element-plus'
import type { manager_List } from '@/services/module/types/manager.type'

// 表单
import { managerTableConfig } from './config/manager.config'
import TablePage from '@/components/table-page/src/table-page.vue'
import { NotificationBox } from '@/utils/element-Fun'

// 弹框
import ManagerDrawer from './components/manager-drawer.vue'
</script>

<script setup lang="ts">
const managerStore = useManagerStore()
const tablePageRef = ref<InstanceType<typeof TablePage>>()
const managerDrawerRef = ref<InstanceType<typeof ManagerDrawer>>()
const searchRef = ref<FormInstance>()

const loading = ref<boolean>(false)
const switchLoading = ref<boolean>(false)
const searchForm = reactive({ search: '' })

// 搜索
const searchFn = () => {
  searchRef.value?.validate((valid) => {
    if (!valid) return
    updateTable()
  })
}

// 重置
const resetFn = () => {
  searchForm.search = ''
  tablePageRef.value?.getPageDate()
}
// 搜索
const updateTable = () => tablePageRef.value?.getPageDate({ keyword: searchForm.search })

//// 状态
//const editManagerStatusFn = async (val: any, data: manager_List) => {
//  const status = (val = 0 ? 1 : 0)
//  switchLoading.value = true
//  try {
//    await managerStore.fetch_editManagerStatusAPI({ id: data.id, status: status })
//    NotificationBox({ title: `修改状态成功!` })
//    updateTable()
//  } catch (error) {}
//  switchLoading.value = false
//}

// 修改
const addListClick = () => managerDrawerRef.value?.addNoticeShow()
const editListClick = (item: manager_List) => {
  managerDrawerRef.value?.editNotice(item)
}
</script>

<style scoped lang="less">
.notice {
  .el-card {
    border: none;
    :deep(.el-card__header) {
      border: none;
      padding-bottom: 0;
      padding-top: 40px;
    }
    .searchFrom {
      :deep(.el-form-item) {
        margin-bottom: 0;
      }
    }
  }
}
</style>
