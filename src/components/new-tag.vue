<template>
  <div class="new-tag">
    <el-tag
      v-for="tag in dynamicTags"
      :key="tag"
      class="mx-1"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag }}
    </el-tag>
    <el-input
      v-if="inputVisible"
      ref="InputRef"
      v-model="inputValue"
      class="!w-20"
      size="small"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
      + New Tag
    </el-button>
  </div>
</template>

<script lang="ts">
import type { ElInput } from 'element-plus'
</script>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string[]
}>()
const emits = defineEmits(['update:modelValue'])

// tag标签
const inputValue = ref('')
// tag的值
const dynamicTags = ref<string[]>(props.modelValue)
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()

watch(
  () => props.modelValue,
  (val) => {
    dynamicTags.value = val
  }
)
// tag标签的关闭
const handleClose = (tag: string) => {
  // 防止输入的重复，重复输入的直接替换掉
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}
// 点击 new tag
const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}
// tag的input 失去焦点或者按下enter
const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
watch(
  () => dynamicTags.value,
  (val) => {
    emits('update:modelValue', val)
  }
)
</script>

<style scoped lang="less"></style>
