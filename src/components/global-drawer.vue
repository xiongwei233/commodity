<template>
  <el-drawer v-model="isDrawer" title="修改密码" :direction="direction">
    <div class="body">
      <div class="content">
        <slot>主要内容</slot>
      </div>
      <div class="asctions">
        <el-button type="primary" @click="submit" :loading="loading"> {{ confirmText }} </el-button>
        <el-button @click="close"> 取消 </el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { ref } from 'vue'
</script>

<script setup lang="ts">
// 按钮文字
const props = withDefaults(
  defineProps<{
    confirmText?: string
  }>(),
  {
    confirmText: '提交'
  }
)

// 显示方向
const direction = ref<string>('rtl')
// 显示/隐藏
const isDrawer = ref<boolean>(false)
// 打开
const open = () => (isDrawer.value = true)
// 关闭
const close = () => (isDrawer.value = false)

// 确定按钮-发送事件
const emit = defineEmits(['submit'])
const submit = () => emit('submit')

// 按钮loading
const loading = ref<boolean>(false)

// 开关loading
const openLoading = () => (loading.value = true)
const closeLoading = () => (loading.value = false)

defineExpose({
  open,
  close,
  openLoading,
  closeLoading,
  loading
})
</script>

<style scoped lang="less">
.body {
  height: 100%;
  width: 100%;
  display: flex;
  @apply flex-col;
  .content {
    height: 100%;
    bottom: 50px;
    overflow-y: auto;
  }
  .asctions {
    margin-bottom: auto;
    height: 50px;
    display: flex;
    align-items: center;
  }
}
</style>
