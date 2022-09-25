<template>
  <div class="commen-table" v-loading="globalStore.loading">
    <!-- 表单顶部的插槽---添加按钮或者其他 -->
    <div class="header">
      <slot name="header"> </slot>
    </div>

    <!-- 表格 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%; z-index: 0"
      @selection-change="selectionChange"
      v-bind="childrenProps"
    >
      <!-- 多选 -->
      <el-table-column type="selection" width="55" v-if="showSelectColunm" align="center" />

      <!-- index序号 -->
      <el-table-column
        v-if="showIndexColunm"
        type="index"
        label="序号"
        align="center"
        width="60"
      ></el-table-column>

      <!-- item项 -->
      <template v-for="propItem in tableOptions" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <!-- 表单底部的插槽---分页 -->
    <div class="footer flex justify-center mt-4" v-if="showFooter">
      <slot name="footer">
        <!-- 这里的page和curren不是v-model哦 -->
        <el-pagination
          :currentPage="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[5, 10, 20, 30]"
          :total="total"
          :layout="pageLayout"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { useGlobalStore } from '@/stores/modules/globalTable'
</script>

<script setup lang="ts">
type IPage = { currentPage: number; pageSize: number }
const globalStore = useGlobalStore()

const props = withDefaults(
  defineProps<{
    // 表单的数据
    tableData: any
    // 表单item的配置
    tableOptions: any

    // 是否显示index序号
    showIndexColunm?: boolean
    // 是否可以选中--多选单选
    showSelectColunm?: boolean
    // 表单顶部的标题
    title?: string
    // 可展开表单
    childrenProps?: any

    // 分页的总条数
    total?: number
    // 分页的内容: 当前页条数和当前页
    page?: IPage
    // 是否显示分页
    showFooter?: boolean
    // 分页的功能
    pageLayout?: string
  }>(),
  {
    showIndexColunm: false,
    showSelectColunm: false,
    total: 0,
    page: () => ({ currentPage: 0, pageSize: 10 }),
    showFooter: true,
    childrenProps: () => ({}),
    pageLayout: 'total, sizes, prev, pager, next, jumper'
  }
)

const emits = defineEmits(['selection-change', 'update:page'])

// 当选择项发生变化时会触发该事件
const selectionChange = (selection: any) => {
  //console.log('选择项', selection)
  emits('selection-change', selection)
}

// 当前页
const handleSizeChange = (pageSize: number) => {
  console.log('页条数', pageSize)
  emits('update:page', { ...props.page, pageSize })
}

// 当前页条数
const handleCurrentChange = (currentPage: number) => {
  console.log('当前页', currentPage)
  emits('update:page', { ...props.page, currentPage })
}
</script>

<style scoped lang="less">
.header {
  margin-bottom: 20px;
  .title {
    font-size: 18px;
    color: #333;
  }
}
</style>
