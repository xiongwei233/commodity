<template>
  <div class="notice" v-loading="managerStore.loading">
    <el-card shadow="never">
      <template #header>
        <el-row :gutter="20" align="middle">
          <!-- 按钮 -->
          <el-col :span="2">
            <el-button type="success" size="default" @click="addShowNotice">
              <el-icon style="margin-right: 5px"><CirclePlus /></el-icon>
              新增
            </el-button>
          </el-col>

          <!-- 关键词 -->
          <el-col :span="10">
            <el-form :model="searchForm" ref="searchRef" :rules="searchRules" class="flex items-center searchFrom">
              <el-form-item label="搜索关键词" prop="search" class="flex-1 !mt-0">
                <el-input v-model="searchForm.search" placeholder="请输入搜索关键词" @change="searchFn" />
              </el-form-item>

              <el-form-item class="ml-4">
                <el-button type="primary" @click="searchFn">搜索</el-button>
                <el-button @click="resetFn">重置</el-button>
              </el-form-item>
            </el-form>
          </el-col>

          <el-col :span="12" :push="1">
            <el-tooltip content="刷新" placement="bottom">
              <span @click="mannagerFn" style="cursor: pointer">
                <el-icon><Refresh /></el-icon>
              </span>
            </el-tooltip>
          </el-col>
        </el-row>
      </template>

      <manager-table @updateManager="mannagerFn" @editManagerEmit="editManagerEmitFn" />

      <!-- 分页 -->
      <footer class="mt-5 flex items-center justify-center">
        <el-pagination
          hide-on-single-page
          :current-page="managerStore.currentPage"
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :page-count="calcPage"
        />
      </footer>
    </el-card>

    <!-- 弹框 -->
    <manager-drawer ref="managerDrawerRef" @updateManager="mannagerFn" />
  </div>
</template>

<script lang="ts">
import ManagerDrawer from './compo/manager-drawer.vue'
import ManagerTable from './compo/manager-table.vue'
import { computed, onMounted, reactive, ref } from 'vue'

import { useManagerStore } from '@/stores/modules/manager'
import type { FormInstance, FormRules } from 'element-plus'
import type { addNotice_Data } from '@/services/module/types/notice.type'
import type { manager_List } from '@/services/module/types/manager.type'
</script>

<script setup lang="ts">
const managerStore = useManagerStore()

const calcPage = computed(() => Math.ceil(managerStore.managerList.totalCount / 10))

const managerDrawerRef = ref<InstanceType<typeof ManagerDrawer>>()

const searchRef = ref<FormInstance>()
const searchForm = reactive({
  search: ''
})

// 搜索
const searchFn = () => {
  searchRef.value?.validate((valid) => {
    if (!valid) return
    mannagerFn()
  })
}
// 重置
const resetFn = () => {
  searchForm.search = ''
  console.log('重置')
  mannagerFn()
}

// 表格数据请求
const mannagerFn = () => {
  managerStore.fetch_getManagerAPI({ page: managerStore.currentPage, keyword: searchForm.search })
}
onMounted(() => mannagerFn())

// 搜索
const searchRules = reactive<FormRules>({
  search: [{ required: true, message: '搜索内容不能为空', trigger: 'blur' }]
})

/**
 * 分页
 */
const handleCurrentChange = (val: number) => {
  managerStore.currentPage = val
  mannagerFn()
}

// 打开弹窗
const addShowNotice = () => {
  managerDrawerRef.value?.addNoticeShow()
}

// 修改传过来的事件
const editManagerEmitFn = (item: manager_List) => {
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
