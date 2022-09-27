<template>
  <div class="dialog-recommended">
    <!-- 添加推荐产品 -->
    <dialog-custom
      title="推荐产品"
      @confirm="recommendedConfirm"
      :show-animate="false"
      confirmBtnText="关联"
      ref="dialogRecommendedRef"
    >
      <el-table :data="recomendStore.CategoryGood" v-loading="recomendStore.loading" border>
        <el-table-column prop="id" label="ID" min-width="60" align="center" />
        <el-table-column prop="cover" label="规格值" min-width="100" align="center">
          <template #default="scope">
            <el-image
              :src="scope.row.cover"
              fit="cover"
              :lazy="true"
              style="width: 60px; height: 60px"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" min-width="100" align="center" />
        <el-table-column label="操作" min-width="100" align="center">
          <template #default="scope">
            <popconfirm title="是否要删除该推荐商品" @confirm="deleteRecommended(scope.row)">
              <el-link type="primary" :underline="false"> 删除 </el-link>
            </popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </dialog-custom>

    <!-- 商品选择 -->
    <dialog-custom
      title="推荐产品"
      width="60%"
      @confirm="productConfirm"
      :show-animate="false"
      confirmBtnText="关联"
      ref="productsRef"
    >
    </dialog-custom>
  </div>
</template>

<script lang="ts">
import { useRecomendStore } from '@/stores/modules/category'
import type { getDate } from '@/services/module/types/recommended.type'
import DialogCustom from '@/components/dialog-custom/src/dialog-custom.vue'
</script>

<script setup lang="ts">
const recomendStore = useRecomendStore()
// 添加推荐产品
const dialogRecommendedRef = ref<InstanceType<typeof DialogCustom>>()
// 商品选择
const productsRef = ref<InstanceType<typeof DialogCustom>>()

const emits = defineEmits(['updateTable'])

const recommendedConfirm = () => (productsRef.value!.dialogVisible = true)

// 删除
const deleteRecommended = (item: getDate) => {
  recomendStore.fetch_deleteRecomendAPI(item.id).then(() => {
    // 手动删除被删掉的数据，就不刷新数据了
    const index = recomendStore.CategoryGood.findIndex((itemCate) => item.id === itemCate.id)
    recomendStore.CategoryGood.splice(index, 1)
  })
}

const open = () => (dialogRecommendedRef.value!.dialogVisible = true)
const close = () => (dialogRecommendedRef.value!.dialogVisible = false)
defineExpose({
  open,
  close
})

/**
 * 第二个弹窗
 */
const productConfirm = () => {}
</script>

<style scoped lang="less"></style>
