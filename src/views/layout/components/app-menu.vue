<template>
  <div class="menu-box" :style="{ width: userStore.sideBar.asideWidth }">
    <el-menu
      :default-active="defaultActive"
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
import { useLoginStore } from '@/stores/modules/login'
import { ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
</script>

<script setup lang="ts">
const userStore = useLoginStore()
const route = useRoute()

// 解决tag标签和menu导航不联动
// 如果直接在导航栏上面的 default-active写 $route.path 就没有这个问题
const defaultActive = ref(route.path)

// 也可以使用
// const defaultActive = computed(() => route.path)

// 监听路由的变化
onBeforeRouteUpdate((to, form) => {
  defaultActive.value = to.path
})
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
