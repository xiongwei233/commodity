<template>
  <div class="page-modal">
    <el-dialog
      :title="isEditOrAdd ? `修改${title}` : `添加${title}`"
      :width="width"
      :top="dialogTop"
      v-model="dialogVisible"
      center
      destroy-on-close
      @opened="dialogOpen"
      @closed="dialogClose"
    >
      <!-- 动画 -->
      <animation-lottie ref="animationRef" v-if="showAnimate"></animation-lottie>
      <slot></slot>
      <template #footer>
        <span>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">{{ confirmBtnText }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import AnimationLottie from '@/components/animation-lottie.vue'
import manager from '@/assets/animation/manager.json'
</script>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    // 名字
    title?: string
    dialogTop?: string
    width?: string
    confirmBtnText?: string

    // 判断修改还是添加
    defaultInfo?: object
    //是否开启动画
    showAnimate?: boolean
    // 动画的内容
    animate?: any
  }>(),
  {
    defaultInfo: () => ({}),
    animate: manager,
    showAnimate: true,
    title: '',
    width: '40%',
    confirmBtnText: '确定'
  }
)
const emits = defineEmits(['dialogOpen', 'dialogClose', 'confirm'])

let dialogVisible = ref(false)

// 判断是修改还是添加
const isEditOrAdd = computed(() => Object.keys(props.defaultInfo).length)

//// 确定按钮
const handleConfirmClick = () => emits('confirm')

// 动画的ref
let animationRef = ref<InstanceType<typeof AnimationLottie>>()
// 组件-打开
const dialogOpen = () => {
  animationRef.value?.openTottie(props.animate, 'animate')
  emits('dialogOpen')
}

// 组件-关闭
const dialogClose = () => {
  // 动画销毁
  animationRef.value?.destroysTottie()
  emits('dialogClose')
}

defineExpose({
  dialogVisible,
  isEditOrAdd
})
</script>

<style scoped lang="less"></style>
