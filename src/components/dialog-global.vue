<template>
  <div>
    <el-dialog :title="title" v-model="dialogVis" :width="width" @closed="closed">
      <slot></slot>

      <template #footer v-if="showSlot">
        <span class="dialog-footer">
          <el-button @click="dialogVis = false">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts"></script>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    readonly modelValue: boolean
    title?: string
    width?: string
    showSlot?: boolean
  }>(),
  {
    modelValue: false,
    title: '订单详情',
    width: '50%',
    showSlot: false
  }
)
const emits = defineEmits(['update:modelValue', 'confirm', 'closed'])
const dialogVis = ref<boolean>(false)

watch(
  () => props.modelValue,
  (newVal) => (dialogVis.value = newVal)
)

watch(
  () => dialogVis.value,
  (newVal) => emits('update:modelValue', newVal)
)

const confirm = () => emits('confirm')

const closed = () => emits('closed')
</script>
