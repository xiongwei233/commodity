<template>
  <div class="tag-list" :style="{ left: userStore.sideBar.asideWidth }">
    <el-tabs
      v-model="activeTab"
      type="card"
      class="tag-left"
      @tab-change="changeTab"
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="item in tabsList"
        :key="item.path"
        :label="item.title"
        :closable="item.path !== '/'"
        :name="item.path"
      >
      </el-tab-pane>
    </el-tabs>

    <span class="tag-right">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon>
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="clearOther"> 关闭其他 </el-dropdown-item>
            <el-dropdown-item @click="clearAll"> 全部关闭 </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
  <!-- 上面使用了 fixed 这里要加个高度main的内容顶下去 -->
  <div class="h-11"></div>
</template>

<script lang="ts" setup>
import { useLoginStore } from '@/stores/modules/login'
import { useTabList } from './hooks/useTagList'
const userStore = useLoginStore()

// 抽离的 hooks
const { activeTab, changeTab, removeTab, tabsList, clearOther, clearAll } = useTabList()
</script>

<style scoped lang="less">
.tag-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 64px;
  right: 0;
  height: 54px;
  z-index: 99;
  padding: 0 20px;
  background: #f3f4f6;

  .tag-left {
    @apply flex-1;
    // 设置了这个可以滚动
    min-width: 100px;

    :deep(.el-tabs__header) {
      border: none;
      height: 32px;
      margin: 0;
      .el-tabs__nav-prev,
      .el-tabs__nav-next {
        line-height: 32px;
        height: 32px;
      }
      .is-disabled {
        cursor: not-allowed;
        @apply text-gray-300;
      }
    }
    :deep(.el-tabs__nav) {
      border: none;
      display: flex;
      flex-wrap: nowrap;
    }
    :deep(.el-tabs__item) {
      border: none;
      background: white;
      border-radius: 5px;
      height: 32px;
      line-height: 32px;
      margin-right: 10px;
      padding: 0 10px !important;
      color: #6b7280;
      display: flex;
      align-items: center;
    }
    :deep(.is-active) {
      color: #386cfb;
    }
  }

  .tag-right {
    margin: auto 0;
    padding-left: 10px;
    .el-dropdown {
      width: 32px;
      height: 32px;
      background: white;
      margin-left: auto;

      border-radius: 5px;
      cursor: pointer;

      .el-dropdown-link {
        width: 100%;
        height: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
