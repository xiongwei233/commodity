<template>
  <div class="index">
    <dialog-global
      title="订单发货"
      v-model="dialogVis"
      width="30%"
      class="dialog"
      @confirm="confirm"
      show-slot
      @closed="closed"
    >
      <commen-form v-bind="searchConfigCalc" v-model="shipForm" ref="commenFormRef"> </commen-form>
    </dialog-global>
  </div>
</template>

<script lang="ts">
import { useOrderStore } from '@/stores/modules/order'

import CommenForm from '@/common-ui/commen-form/src/commen-form.vue'
import { searchConfig } from './config/ship.config'
</script>

<script setup lang="ts">
const orderStore = useOrderStore()
const dialogVis = ref<boolean>(false)
const commenFormRef = ref<InstanceType<typeof CommenForm>>()
const emits = defineEmits(['update'])
const shipForm: any = ref({})
const orderId = ref<number>()

orderId

const searchConfigCalc = computed(() => {
  const findResult = searchConfig.formOptions.find((x) => x.field === 'express_company')
  if (findResult) {
    findResult.selectOptions = orderStore.excelexport.map((item: any) => {
      return { label: item.name, value: item.name }
    })
  }
  console.log(searchConfig)
  return searchConfig as any
})

const confirm = () => {
  console.log(shipForm.value)
  orderStore.orderShipped_fetch({ ...shipForm.value, id: orderId.value })
  close()
  emits('update')
}

const closed = () => {
  shipForm.value = {}
}

const open = (order_id?: number) => {
  orderId.value = order_id
  dialogVis.value = true
}

const close = () => (dialogVis.value = false)
defineExpose({
  open,
  close
})
</script>

<style scoped lang="less"></style>
