<template>
  <div ref="echartsRef" class="echarts"></div>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as echarts from 'echarts'
import { useResizeObserver } from '@vueuse/core'
import { useHomeStore } from '@/stores/modules/home'
</script>

<script setup lang="ts">
const echartsRef = ref<HTMLElement | null>(null)
const homeStore = useHomeStore()

const loading = ref(false)

const props = withDefaults(
  defineProps<{
    type: 'month' | 'week' | 'hour'
  }>(),
  {
    type: 'month'
  }
)

const emit = defineEmits(['loadingEmit'])

// echarts
onMounted(() => {
  initChars()
})
var myChart: echarts.ECharts
// 地图
const initChars = () => {
  type EChartsOption = echarts.EChartsOption
  myChart = echarts.init(echartsRef.value as HTMLElement)
  var option: EChartsOption = {
    xAxis: {
      type: 'category',
      data: homeStore.statistics_3.x
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: homeStore.statistics_3.y,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  }
  // loading
  loading.value = true
  myChart.showLoading()
  // 加载数据
  homeStore
    .fetchGetStatistics_3API(props.type)
    .then((res: any) => {
      loading.value = false
      // @ts-ignore
      option.xAxis.data = res.data.x
      // @ts-ignore
      option.series[0].data = res.data.y
      myChart.setOption(option)
    })
    .finally(() => {
      // 关闭loading
      myChart.hideLoading()
    })
}

onBeforeUnmount(() => {
  myChart.dispose()
  console.log('销毁了myChart')
})

// echarts响应式布局
useResizeObserver(echartsRef, () => myChart.resize())
watch(
  () => loading.value,
  (newValue) => {
    emit('loadingEmit', newValue)
  },
  { immediate: true }
)

defineExpose({
  initChars
})
</script>

<style scoped lang="less"></style>
