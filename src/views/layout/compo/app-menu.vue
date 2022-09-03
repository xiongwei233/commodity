<template>
  <el-menu :default-active="$route.path" class="el-menu-vertical" router>
    <template v-for="menu in menuList">
      <el-sub-menu :index="menu.frontpath + ''" v-if="menu.chid && menu.chid.length > 0">
        <template #title>
          <el-icon>
            <component :is="menu.icon"></component>
          </el-icon>
          <span>{{ menu.name }}</span>
        </template>

        <!-- 二级导航 -->
        <el-menu-item :index="item.frontpath + ''" v-for="item in menu.chid">
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
</template>

<script lang="ts">
import { useUserStore } from '@/stores/modules/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
</script>

<script setup lang="ts">
const menuList = [
  {
    name: '后台面板',
    icon: 'help',
    frontpath: null,
    chid: [
      {
        name: '主控台',
        frontpath: '/',
        icon: 'home-filled'
      }
    ]
  },
  {
    name: '商品管理',
    desc: 'shop_goods_list',
    icon: 'shopping-bag',
    chid: [
      {
        name: '分类管理',
        frontpath: '/category/list',
        icon: 'menu'
      }
    ]
  }
]
const router = useRouter()
const useStore = useUserStore()
</script>

<style scoped lang="less">
.el-menu-vertical {
  border: none;
  width: 250px;
  top: 64px;
  @apply !shadow fixed;
}
</style>
