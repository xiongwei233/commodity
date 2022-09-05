<template>
  {{ animateValue.numValue.toFixed(2) }}
</template>

<script setup lang="ts">
// 动画库

import gsap from 'gsap'

import { reactive, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    value: number
  }>(),
  {
    value: 0
  }
)

const animateValue = reactive({ numValue: 0 })

function AinimateToValue() {
  gsap.to(animateValue, {
    duration: 0.5,
    numValue: props.value
  })
}
AinimateToValue()

watch(
  () => props.value,
  () => AinimateToValue()
)
</script>

<style scoped lang="less"></style>
