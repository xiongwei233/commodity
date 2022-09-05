<template>
  <div class="home-tag">
    <el-row :gutter="20">
      <el-col :span="3" v-for="tag in iconNavs" :key="tag.path">
        <el-card shadow="hover" :body-style="{ border: 0 }">
          <router-link :to="tag.path" class="flex justify-center items-center flex-col">
            <el-icon :size="16" :class="tag.color">
              <component :is="tag.icon"></component>
            </el-icon>
            <span class="title">{{ tag.title }}</span>
          </router-link>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts"></script>

<script setup lang="ts">
const iconNavs = [
  {
    icon: 'user',
    color: '!text-light-blue-500',
    title: '用户',
    path: '/user/list'
  },
  {
    icon: 'shopping-cart',
    color: '!text-violet-500',
    title: '商品',
    path: '/goods/list'
  },
  {
    icon: 'tickets',
    color: '!text-fuchsia-500',
    title: '订单',
    path: '/order/list'
  },
  {
    icon: 'chat-dot-square',
    color: '!text-teal-500',
    title: '评价',
    path: '/comment/list'
  },
  {
    icon: 'picture',
    color: '!text-rose-500',
    title: '图库',
    path: '/image/list'
  },
  {
    icon: 'bell',
    color: '!text-green-500',
    title: '公告',
    path: '/notice/list'
  },
  {
    icon: 'set-up',
    color: '!text-grey-500',
    title: '配置',
    path: '/setting/base'
  },
  {
    icon: 'files',
    color: '!text-yellow-500',
    title: '优惠券',
    path: '/coupon/list'
  }
]
</script>

<style scoped lang="less">
.home-tag {
  margin-top: 20px;
  .el-card {
    border: none !important;
    .title {
      font-size: 14px;
      padding-top: 10px;
      text-align: center;
    }
  }
}
</style>
