<template>
  <el-select-v2
    v-model="modelValue"
    filterable
    :options="iconsDate"
    placeholder="请选择图标"
    style="width: 280px"
    clearable
    :remote-method="remoteMethod"
    @change="handleChange"
  >
    <template #default="scope">
      <div class="flex items-center justify-between">
        <el-icon :size="18"> <component :is="scope.item.value" /> </el-icon>
        <span class="text-xs">{{ scope.item.value }}</span>
      </div>
    </template>
  </el-select-v2>
</template>

<script lang="ts">
import { strsplit } from '@/hooks/useTool'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { ref } from 'vue'
</script>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string
}>()
const emits = defineEmits(['update:modelValue'])

let iconsDate = Object.keys(ElementPlusIconsVue).map((item) => {
  return { value: strsplit(item), label: strsplit(item) }
})
// 请求方式

interface ListItem {
  value: string
  label: string
}
const options = ref<ListItem[]>([])

const remoteMethod = (query: string) => {
  if (query !== '') {
    setTimeout(() => {
      options.value = iconsDate.filter((item) => {
        return item.label.toLowerCase().includes(query.toLowerCase())
      })
    }, 100)
  } else {
    options.value = []
  }
}

const handleChange = (icon: string) => emits('update:modelValue', icon)
</script>

<style scoped lang="less"></style>
