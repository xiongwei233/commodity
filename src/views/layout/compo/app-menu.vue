<template>
  <div class="menu-box" :style="{ width: userStore.sideBar.asideWidth }">
    <el-menu
      :default-active="$route.path"
      router
      :collapse="userStore.sideBar.isCollapse"
      :collapse-transition="false"
      unique-opened
    >
      <template v-for="menu in userStore.menus" :key="menu.id">
        <el-sub-menu :index="menu.id + ''" v-if="menu.child && menu.child.length > 0">
          <template #title>
            <el-icon>
              <component :is="menu.icon"></component>
            </el-icon>
            <span>{{ menu.name }}</span>
          </template>

          <!-- 二级导航 -->
          <el-menu-item :index="item.frontpath + ''" v-for="item in menu.child">
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </el-sub-menu>

        <!-- 单个 -->
        <el-menu-item :index="menu.frontpath + ''" v-else>
          <el-icon>
            <component :is="menu.icon"></component>
          </el-icon>
          <span>{{ menu.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { useUserStore } from '@/stores/modules/user'
</script>

<script setup lang="ts">
const userStore = useUserStore()
</script>

<style scoped lang="less">
.menu-box {
  transition: all 0.2s;
  top: 64px;
  bottom: 0;
  left: 0;
  @apply !shadow-md fixed  bg-light-50;
  &::-webkit-scrollbar {
    display: none;
  }
  // 防止 宽度和高度不够有进度条
  overflow-y: auto;
  overflow-x: hidden;
  .el-menu {
    //border: none;
    border-width: 0;
  }
}
</style>
