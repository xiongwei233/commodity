<template>
  <div class="notice">
    <el-card shadow="never">
      <template #header>
        <div class="flex justify-between items-center">
          <el-button type="primary" size="default" @click="addNoticeShow">
            <el-icon style="margin-right: 5px"><CirclePlus /></el-icon>
            新增
          </el-button>
          <span @click="listFnAPI" style="cursor: pointer">
            <el-icon><Refresh /></el-icon>
          </span>
        </div>
      </template>

      <!-- 表格 -->
      <common-table
        :data="data"
        stripe
        border
        lazy
        :options="tableOptions"
        :currentPage="currentPage"
        :total="total"
        @currentChange="currentChange"
        :paginationOptions="paginationOptions"
        pagination
        :loading="loading"
      >
        <!-- 操作项 -->
        <template #actions="{ scope }">
          <el-button link type="primary" size="small" @click="editNoticeShow(scope.row)">
            修改
          </el-button>
          <el-popconfirm
            title="是否要删除该公告信息？"
            confirm-button-text="确定"
            cancel-button-text="取消"
            @confirm="deleteNotice(scope.row)"
          >
            <template #reference>
              <el-button link type="primary" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </common-table>
      <!--  -->
    </el-card>

    <!-- 弹窗 -->
    <notice-drawer ref="noticeDrawerRef" @update-table="updateTableFn"></notice-drawer>
  </div>
</template>

<script lang="ts">
import { useNoticeStore } from '@/stores/modules/notice'
import { NotificationBox } from '@/utils/element-Fun'

import CommonTable from '@/components/common-table/index.vue'
import NoticeDrawer from './compo/notice-drawer.vue'

import type { addNotice_Data } from '@/services/module/types/notice.type'
import type { TableOptions } from '@/components/common-table/types/types'
import { computed, ref } from 'vue'
</script>

<script setup lang="ts">
const noticeStore = useNoticeStore()
// ?? 0 解决刚进页面 total值为undefined , pagination分页报警告 ⚠️
const total = computed(() => noticeStore?.noticeList.totalCount ?? 0)
const data = computed(() => noticeStore?.noticeList?.list)

const currentPage = ref<number>(1)
const loading = ref<boolean>()
const noticeDrawerRef = ref<InstanceType<typeof NoticeDrawer>>()

const listFnAPI = () => {
  loading.value = true
  noticeStore.fetch_getNoticeAPI(currentPage.value).finally(() => (loading.value = false))
}
listFnAPI()

// 表单的配置
const tableOptions: TableOptions[] = [
  { label: '公告标题', prop: 'title' },
  { label: '公告内容', prop: 'content', minWidth: '150px' },
  { label: '发布时间', prop: 'create_time' },
  { label: '操作', prop: 'address', action: true }
]

// 分页的配置
let paginationOptions = {
  background: true,
  // hideOnSinglePage: true,
  layout: 'total, prev, pager, next, jumper'
}

// 页数改变
const currentChange = (val: number) => {
  //console.log(`当前第${val}页`)
  currentPage.value = val
  listFnAPI()
}

// 删除
const deleteNotice = (item: addNotice_Data) => {
  //console.log(item)
  loading.value = true
  noticeStore
    .fetch_deleteNoticeAPI(item.id)
    .then(() => {
      listFnAPI()
      NotificationBox({ title: `删除成功!` })
    })
    .finally(() => (loading.value = false))
}

// 新增
const addNoticeShow = () => {
  noticeDrawerRef.value?.addNotice()
}
// 修改
const editNoticeShow = (row: addNotice_Data) => {
  noticeDrawerRef.value?.editNotice(row)
}

// 子组件传来的 修改/新增数据之后更新表单
const updateTableFn = async (editOrAdd: number) => {
  // 判断添加还是修改 添加是0 修改是1
  if (editOrAdd) {
    //添加表单数据之后返回第一页
    currentPage.value = 1
    await listFnAPI()
  } else {
    await listFnAPI()
  }
}
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
