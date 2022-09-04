<template>
  <el-container>
    <!-- header -->
    <el-header>
      <app-headers />
    </el-header>

    <el-container>
      <!-- 导航 -->
      <el-aside :width="userStore.sideBar.asideWidth">
        <app-menu />
      </el-aside>
      <!-- 内容 -->
      <el-main>
        <!-- 浏览记录tag -->
        <app-tag-list />
        <router-view v-slot="{ Component }">
          <!-- 动画 -->
          <transition name="fade" mode="out-in">
            <!-- 最多缓存10个页面，多了就把很长时间没更新的页面踢掉 -->
            <keep-alive :max="10">
              <component :is="Component"></component>
            </keep-alive>
          </transition>
          <!-- 动画的标签 -->
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import AppTagList from './compo/app-tagList.vue'
import AppHeaders from './compo/app-headers.vue'
import AppMenu from './compo/app-menu.vue'
import { useUserStore } from '@/stores/modules/user'
</script>

<script setup lang="ts">
const userStore = useUserStore()
</script>

<style scoped lang="less">
.el-header {
  padding: 0;
  height: 64px;
}

.el-aside {
  transition: all 0.2s;
}
.el-main {
  height: 100%;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-leave-from {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}

// 过度中
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter-active {
  transition-delay: 0.3s;
}
</style>
