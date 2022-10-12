<template>
  <div class="search-page">
    <!-- 表单 -->
    <commen-form v-bind="searchFormConfig" v-model="formDate">
      <template #footer>
        <el-button :icon="Refresh" @click="handleResetClick">重置</el-button>
        <el-button type="primary" :icon="Search" @click="handleQueryClick">搜索</el-button>
        <el-button type="primary" link>收起</el-button>
      </template>
    </commen-form>
  </div>
</template>

<script lang="ts">
import CommenForm from '@/common-ui/commen-form'
import { Refresh, Search } from '@element-plus/icons-vue'
</script>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    searchFormConfig: any
  }>(),
  {}
)
const emits = defineEmits(['resetBtnClick', 'queryBtnClick'])

// 双向绑定的属性 应该由配置文件的field来决定
const forItems = props.searchFormConfig?.options || []
// 这里装着是原始属性，都是为''的
const formOriginData: any = {}
for (const item of forItems) {
  formOriginData[item.field] = ''
}
// 跟子组件数据双向绑定
const formDate = ref(formOriginData)

// 点击重置
const handleResetClick = () => {
  // 方法1：跟子组件里面的方法一是对应的
  //for (const key in formOriginData) {
  //  formDate.value[key] = formOriginData
  //}

  // 方法2：跟子组件里面的方法一是对应的
  formDate.value = formOriginData
  emits('resetBtnClick')
}

// 点击搜索
const handleQueryClick = () => {
  emits('queryBtnClick', formDate.value)
}

defineExpose({
  formDate
})
</script>

<style scoped lang="less"></style>
