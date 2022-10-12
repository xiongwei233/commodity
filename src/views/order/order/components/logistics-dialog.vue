<template>
  <dialog-global title="物流详情" v-model="dialogVis" width="50%" class="dialog">
    <div class="headers">
      <el-image :src="shipInfo.logo" fit="cover" lazy class="h-14 w-14" />
      <div class="title">
        <p>物流公司: {{ shipInfo.typename }}</p>
        <p>物流单号: {{ shipInfo.number }}</p>
      </div>
    </div>

    <!-- 订单信息 -->
    <el-steps direction="vertical" space="50px">
      <template v-for="item in shipInfo?.list" :key="item.id">
        <el-step :title="item.time" :description="item.status" />
      </template>
    </el-steps>
  </dialog-global>
</template>

<script lang="ts">
import { useOrderStore } from '@/stores/modules/order'
</script>

<script setup lang="ts">
const orderStore = useOrderStore()
const dialogVis = ref<boolean>(false)
const shipInfo = computed(() => orderStore.shipInfo)

const open = () => (dialogVis.value = true)
const close = () => (dialogVis.value = false)
defineExpose({
  open,
  close
})
</script>

<style scoped lang="less">
.dialog {
  :deep(.el-step__title) {
    font-size: 12px;
    color: #999;
  }
  :deep(.el-step__description) {
    padding-bottom: 10px;
  }

  .headers {
    border-bottom: 1px solid #e9ecf0;
    margin-bottom: 14px;
    padding-bottom: 20px;
    display: flex;
    align-items: center;

    .el-image {
      border: 1px solid #e9ecf0;
      border-radius: 4px;
    }

    .title {
      font-size: 12px;
      padding-left: 14px;
      line-height: 2;
    }
  }
}
</style>
