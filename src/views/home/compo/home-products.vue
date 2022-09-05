<template>
  <div class="home-products">
    <!-- 内容 -->
    <template v-if="homeStore?.statistics_2?.goods?.length > 0">
      <el-card
        shadow="never"
        :body-style="{ padding: '20px' }"
        v-for="(item, index) in data"
        :key="index"
        style="margin-top: 20px"
      >
        <template #header>
          <div class="flex justify-between">
            <span style="line-height: 30px">{{ item.title }}</span>
            <el-tag type="danger" size="small" effect="plain">{{ item.doc }}</el-tag>
          </div>
        </template>
        <!-- card body -->

        <el-row :gutter="20">
          <template v-if="index === 1">
            <el-col :span="6" v-for="item in homeStore.statistics_2.goods" :key="item.value">
              <el-card shadow="hover" :body-style="{ padding: '20px' }" class="card-box">
                <h1 class="title">{{ item.value }}</h1>
                <span>{{ item.label }}</span>
              </el-card>
            </el-col>
          </template>

          <template v-else>
            <el-col :span="6" v-for="item in homeStore.statistics_2.order" :key="item.value">
              <el-card shadow="hover" :body-style="{ padding: '20px' }" class="card-box">
                <h1 class="title">{{ item.value }}</h1>
                <span>{{ item.label }}</span>
              </el-card>
            </el-col>
          </template>
        </el-row>
      </el-card>
    </template>

    <!-- 骨架 -->
    <template v-else>
      <el-skeleton style="width: 100%" animated>
        <template #template>
          <el-card
            shadow="never"
            :body-style="{ padding: '20px' }"
            v-for="(item, index) in data"
            :key="index"
            style="margin-top: 20px"
          >
            <template #header>
              <div class="flex justify-between">
                <span style="line-height: 30px">{{ item.title }}</span>
                <el-tag type="danger" size="small" effect="plain">{{ item.doc }}</el-tag>
              </div>
            </template>
            <!-- card body -->
            <el-row :gutter="20">
              <el-col :span="6" v-for="item in 4" :key="item">
                <el-card shadow="hover" :body-style="{ padding: '20px' }" class="card-box">
                  <el-skeleton-item variant="h1" class="w-5 h-5 mb-3" style="width: 60%" />
                  <el-skeleton-item variant="h3" style="height: 10px" />
                </el-card>
              </el-col>
            </el-row>
          </el-card>
        </template>
      </el-skeleton>
    </template>
  </div>
</template>

<script lang="ts">
import { useHomeStore } from '@/stores/modules/home'
</script>

<script setup lang="ts">
const homeStore = useHomeStore()
homeStore.fetchGetStatistics_2API()

const data = [
  { title: '店铺及商品提示', doc: '店铺及商品提示' },
  { title: '交易提示', doc: '需要立即处理的交易订单 ' }
]
</script>

<style scoped lang="less">
.home-products {
  .el-card {
    border: none;
    font-size: 14px;
  }
  .card-box {
    background-color: #f6f6f6;
    width: 100%;
    text-align: center;
    .title {
      font-size: 20px;
      color: #333;
      height: 30px;
      line-height: 30px;
    }
    span {
      color: #777;
    }
  }
}
</style>
