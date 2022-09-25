<template>
  <el-container class="app">
    <!-- header -->
    <el-header class="global-headers">
      <app-headers />
    </el-header>

    <el-container>
      <!-- 导航 -->
      <el-aside :width="userStore.sideBar.asideWidth" class="global-aside">
        <app-menu />
      </el-aside>
      <!-- 内容 -->
      <el-main class="global-main">
        <!-- 浏览记录tag -->
        <app-tag-list />
        <router-view v-slot="{ Component, route }">
          <!-- 动画 -->
          <transition name="fade" mode="out-in">
            <!-- 最多缓存10个页面，多了就把很长时间没更新的页面踢掉 -->
            <keep-alive :max="10">
              <component :is="Component" :key="route.name"></component>
            </keep-alive>
          </transition>
          <!-- 动画的标签 -->
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import AppTagList from './components/app-tagList.vue'
import AppHeaders from './components/app-headers.vue'
import AppMenu from './components/app-menu.vue'

import { useUserStore } from '@/stores/modules/user'
</script>

<script setup lang="ts">
const userStore = useUserStore()
</script>

<style scoped lang="less">
.app {
  height: 100%;
  .global-headers {
    padding: 0;
    height: 64px;
  }

  .global-aside {
    transition: all 0.2s;
  }
  .global-main {
    height: 100%;
    background: #f3f4f6;
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
}
</style>
