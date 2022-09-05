<template>
  <div class="home-echarts">
    <el-card shadow="never" :body-style="{ padding: '20px' }">
      <template #header>
        <div class="flex justify-between">
          <span style="line-height: 30px">订单统计</span>
          <div>
            <el-check-tag
              :class="{ disable: loading }"
              class="ml-3 check-tag"
              v-for="(tag, index) in tagList"
              :key="index"
              :checked="type === tag.type"
              @change="onChange(tag)"
            >
              {{ tag.title }}
            </el-check-tag>
          </div>
        </div>
      </template>
      <!-- card body -->
      <Echarts ref="echartsRef" :type="type" @loading-emit="loadingFn" />
    </el-card>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
</script>

<script setup lang="ts">
import Echarts from './echarts.vue'
type tagType = 'month' | 'week' | 'hour'

const type = ref<tagType>('week')
const loading = ref(false)

const tagList = [
  { title: '近1个月', type: 'month' },
  { title: '近1周', type: 'week' },
  { title: '近24小时', type: 'hour' }
]

const echartsRef = ref()

// 切换tag
const onChange = (tag: any) => {
  type.value = tag.type
  echartsRef.value.initChars()
}

const loadingFn = (value: boolean) => {
  loading.value = value
}
</script>

<style scoped lang="less">
.home-echarts {
  margin-top: 20px;
  .el-card {
    border: none;
    font-size: 14px;
  }
  .echarts {
    width: 100%;
    height: 280px;
  }
  .check-tag {
    cursor: pointer;
  }
  // 禁止点击
  .disable {
    pointer-events: none;
    user-select: none;
  }
}
</style>
