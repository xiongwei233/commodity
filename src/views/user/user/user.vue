<template>
  <div class="user-list">
    <el-card shadow="never" :body-style="{ padding: '20px' }">
      <!-- 搜索 -->
      <search-page
        :searchFormConfig="searchPageCalc"
        @reset-btn-click="handleResetClick"
        @query-btn-click="handleQueryClick"
      />

      <!-- 表格 -->
      <table-page
        add-btn-name="新增等级"
        :tableConfig="userTableConfig"
        ref="pageCountentRef"
        pageName="user"
        @add-list-click="handleAddData"
        @edit-list-click="handleEditData"
      >
        <!-- 会员 -->
        <template #username="scope">
          <div class="username">
            <el-avatar size="default" fit="cover" :src="scope.row?.avatar">
              <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
            </el-avatar>
            <div class="title">
              <p>{{ scope.row.username }}</p>
              <small>ID: {{ scope.row?.id }}</small>
            </div>
          </div>
        </template>

        <!-- 会员等级 -->
        <template #user_level="scope">
          {{ scope.row.user_level?.name }}
        </template>

        <!-- 注册时间 -->
        <template #create_time="scope"> 注册时间: {{ scope.row.create_time }} </template>
      </table-page>

      <!-- 弹窗 -->
      <dialog-page
        title="会员等级"
        :modalConfig="modalConfigCalc"
        :defaultInfo="defaultInfo"
        pageName="user"
        ref="dialogPageRef"
        :show-animate="false"
        :otherInfo="otherInfo"
        @dialog-close="dialogClosehandler"
      >
        <!--  -->
        <el-form-item label-width="100px" label="头像">
          <choose-images v-model="avaterUrl"></choose-images>
        </el-form-item>
      </dialog-page>
    </el-card>
  </div>
</template>

<script lang="ts">
// 搜索
import { searchConfig } from './config/search.config'
import searchPage from '@/components/search-page'

// 表格
import TablePage from '@/components/table-page'
import { userTableConfig } from './config/user.config'

// 弹窗
import DialogPage from '@/components/dialog-page/src/dialog-page.vue'
import { modalConfig } from './config/dialog.config'
import ChooseImages from '@/components/choose-images.vue'

import { useUserStore } from '@/stores/modules/user'
import type { user_level_List } from '@/services/module/types/user.type'

//hooks
import { useTableSearch } from '@/hooks/useTable_Search'
import { usePageModal } from '@/hooks/useTable_AddorEdit'
</script>

<script setup lang="ts">
const userStore = useUserStore()
// 弹框的会员等级数据
userStore.fetch_user_level()
const avaterUrl = ref<string>('')
const otherInfo = computed(() => ({ avater: avaterUrl.value }))

// 弹框的会员等级
const modalConfigCalc = computed(() => {
  const Membership = modalConfig.formOptions.find((item) => item.field === 'user_level_id')
  if (Membership) {
    Membership.selectOptions = userStore.user_levelList.map((item: user_level_List) => {
      return { label: item.name, value: item.id }
    })
  }
  return modalConfig
})

// 搜索的会员等级
const searchPageCalc = computed(() => {
  const Membership = searchConfig.formOptions.find((item) => item.field === 'user_level_id')
  if (Membership) {
    Membership.selectOptions = userStore.user_levelList.map((item: user_level_List) => {
      return { label: item.name, value: item.id }
    })
  }
  return searchConfig
})

// 调用hooks获取公共的变量和函数----表格的修改/新增表单
const { dialogPageRef, defaultInfo, handleAddData, handleEditData } = usePageModal()

const dialogClosehandler = () => (avaterUrl.value = '')

// 搜索表单
const { pageCountentRef, handleResetClick, handleQueryClick } = useTableSearch()
</script>

<style scoped lang="less">
.username {
  @apply flex;
  .title {
    text-align: start;
    padding-left: 10px;
  }
}
</style>
