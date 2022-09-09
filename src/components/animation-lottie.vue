<template>
  <div class="edit-analyze" ref="editAnalyzeRef" :data-name="lotieName"></div>
</template>

<script lang="ts">
// 动画
import { jsonAnimation, destroys } from '@/utils/lotie'
import { ref } from 'vue'
</script>

<script setup lang="ts">
// 动画的DOM
const editAnalyzeRef = ref<HTMLElement | null>(null)

// 动画的name 用来开启和关闭动画
const lotieName = ref<string>('')

// 打开动画
const openTottie = (animation: {}, tottieName: string) => {
  if (editAnalyzeRef.value) {
    lotieName.value = tottieName
    //lotieName.value = editAnalyzeRef?.value?.dataset['name'] ?? ''
    jsonAnimation(editAnalyzeRef.value, animation, lotieName.value)
  }
}
// 销毁动画
const destroysTottie = () => {
  if (lotieName.value) {
    // 销毁指定动画
    destroys(lotieName.value)
  } else {
    //否则销毁全部动画
    destroys()
  }
}

/**
 * @openTottie 打开动画
 * @destroysTottie 销毁动画
 */
defineExpose({
  openTottie,
  destroysTottie
})
</script>

<style scoped lang="less">
.edit-analyze {
  width: 320px;
  height: 320px;
  margin: 0 auto;
  margin-bottom: 0px;
}
</style>
