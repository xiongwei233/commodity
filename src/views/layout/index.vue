<template>
  <el-container>
    <!-- header -->
    <el-header>
      <app-headers />
    </el-header>

    <el-container>
      <!-- 导航 -->
      <el-aside>
        <keep-alive>
          <app-menu />
        </keep-alive>
      </el-aside>

      <!-- 内容 -->
      <el-main>
        <!-- 浏览记录tag -->
        <app-tag-list />
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts"></script>

<script setup lang="ts">
import AppTagList from './compo/app-tagList.vue'
import AppHeaders from './compo/app-headers.vue'
import AppMenu from './compo/app-menu.vue'
</script>

<style scoped lang="less">
.el-header {
  padding: 0;
}
</style>
