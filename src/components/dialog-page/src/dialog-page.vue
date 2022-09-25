<template>
  <div class="page-modal">
    <el-dialog
      :title="isEditOrAdd ? '修改' : '添加'"
      width="40%"
      v-model="dialogVisible"
      center
      destroy-on-close
      @opened="dialogOpen"
      @closed="dialogClose"
    >
      <!-- 动画 -->
      <animation-lottie ref="animationRef" v-if="showAnimate"></animation-lottie>

      <!-- 表单 -->
      <commen-form v-model="formDate" v-bind="modalConfig">
        <!-- 在page-content中动态插入剩余的插槽，页面单独的插槽 -->
        <template v-for="item in otherPropSlots" :key="item.prop" #[item.slotName]="scope">
          <template v-if="item.slotName">
            <slot :name="item.slotName" :row="scope.row"></slot>
          </template>
        </template>
      </commen-form>
      <slot></slot>
      <template #footer>
        <span>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import CommenForm from '@/common-ui/commen-form'
import { useGlobalStore } from '@/stores/modules/globalTable'

import AnimationLottie from '@/components/animation-lottie.vue'
import manager from '@/assets/animation/manager.json'
</script>

<script setup lang="ts">
const globalStore = useGlobalStore()

const props = withDefaults(
  defineProps<{
    // 表单的配置
    modalConfig: any
    // 编辑的回显数据
    defaultInfo: any
    // 名字
    pageName: string

    // 其他需要加入到dialog的数据，比如外面有个tree 修改的时候要一起发送请求
    otherInfo?: object

    //是否开启动画
    showAnimate?: boolean
    // 动画的内容
    animate?: any
  }>(),
  {
    defaultInfo: () => ({}),
    otherInfo: () => ({}),
    animate: manager,
    showAnimate: true
  }
)
const emits = defineEmits(['dialogOpen', 'dialogClose'])

let dialogVisible = ref(false)
// 装着表单的数据
const formDate = ref<any>({})

// 修改的数据回显
watch(
  () => props.defaultInfo,
  (newValue) => {
    for (const item of props.modalConfig?.formOptions) {
      formDate.value[item.field] = newValue[item.field]
    }
    console.log(newValue)
    console.log(formDate)
  }
)

// 判断是修改还是添加
const isEditOrAdd = computed(() => Object.keys(props.defaultInfo).length)

//// 确定按钮
const handleConfirmClick = () => {
  // 判断修改还是添加
  if (Object.keys(props.defaultInfo).length) {
    // 修改
    globalStore.editTableData_fetch({
      pageName: props.pageName,
      editDate: { ...formDate.value, ...props.otherInfo },
      id: props.defaultInfo.id
    })
  } else {
    // 添加
    globalStore.addTableData_fetch({
      pageName: props.pageName,
      newDate: { ...formDate.value, ...props.otherInfo }
    })
  }
  dialogVisible.value = false
}

// 获取其他的动态插槽名称
const otherPropSlots = props.modalConfig?.formOptions.filter((item: any) => {
  //console.log(item)
  // 固定的插槽
  //if (item.slotName === 'status') return false
  //if (item.slotName === 'status') return false
  return true
})

// 动画的ref
let animationRef = ref<InstanceType<typeof AnimationLottie>>()
// 抽屉组件-打开
const dialogOpen = () => {
  animationRef.value?.openTottie(props.animate, 'animate')
  emits('dialogOpen')
}

// 抽屉组件-关闭
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
