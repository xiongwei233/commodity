<template>
  <el-table :data="tableData" v-bind="$attrs" v-loading="loading">
    <template v-for="(item, index) in tableOptions" :key="index">
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :min-width="item.minWidth"
        :align="item.align"
      >
        <template #default="scope">
          <template v-if="scope.$index + scope.column.id === currentEdit">
            <div class="editInput">
              <el-input v-model="scope.row[item.prop!]"></el-input>

              <div class="content" @click.stop="clickEditCell">
                <slot name="editCell" :scope="scope" v-if="$slots.editCell"></slot>
                <div class="icons" v-else>
                  <el-icon-select class="select" @click.stop="select(scope)"></el-icon-select>
                  <el-icon-close class="close" @click.stop="close(scope)"></el-icon-close>
                </div>
              </div>
            </div>
          </template>

          <template v-else>
            <!-- 把插槽数据分发出去 -->
            <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
            <span v-else class="ellipsis-2">{{ scope.row[item.prop!] }}</span>
            <component
              :is="`el-icon-${editIcon}`"
              class="edit"
              v-if="item.editable"
              @click.stop="clickEdit(scope)"
            />
          </template>
        </template>
      </el-table-column>
    </template>

    <!-- 操作 -->
    <el-table-column
      :label="actionOptions?.label"
      :width="actionOptions?.width"
      :align="actionOptions?.align"
    >
      <template #default="scope">
        <!-- 把插槽数据分发出去 -->
        <slot name="actions" :scope="scope"></slot>
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页 -->
  <div v-if="pagination" class="pagination" :style="{ justifyContent: paginationAlignFlex }">
    <el-pagination
      v-bind="$attrs.paginationOptions"
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="pageSizes"
      :disabled="loading"
    />
  </div>
  <!--{{ $attrs }}-->
</template>

<script lang="ts">
import { computed, ref, watch } from 'vue'
import type { TableOptions } from './types/types'

import { cloneDeep } from 'lodash'
</script>

<script setup lang="ts">
let props = withDefaults(
  defineProps<{
    // 表格配置
    options: TableOptions[]
    // 表格数据
    data: any[]
    // 可编辑单元格显示的图标
    editIcon?: string

    /**
     * 分页
     */
    // 当前在第几页
    currentPage?: number
    // 每页展示多少条数据
    pageSizes?: number[]
    // 当前一页多少条
    pageSize?: number
    total?: number
    //是否显示分页
    pagination?: boolean
    // 分页的排列方式
    paginationAlign?: 'left' | 'right' | 'center'
    loading: boolean
  }>(),
  {
    editIcon: 'edit',
    loading: false,

    currentPage: 1,
    pageSize: 10,
    // @ts-ignore
    pageSizes: [10, 20, 30, 40],
    pagination: false,
    paginationAlign: 'center',
    data: () => []
  }
)
const emits = defineEmits(['comfirm', 'cancel', 'sizeChange', 'currentChange'])

// 过滤掉 操作项
let tableOptions = computed(() => props.options.filter((item) => !item.action))

// 找出操作项的配置
let actionOptions = computed(() => props.options.find((item) => item.action))

// 点击编辑图标
// 当前点击的单元格
const currentEdit = ref<string>('')
const clickEdit = (scope: any) => {
  // 唯一的标识
  currentEdit.value = scope.$index + scope.column.id
  //console.log(scope)
  //console.log(currentEdit)
}

// 点击修改后的 √
const select = (scope: any) => {
  emits('comfirm', scope)
}
// 点击修改后的 ×
const close = (scope: any) => {
  emits('cancel', scope)
}
// 关闭编辑的输入框
const clickEditCell = () => {
  currentEdit.value = ''
}

// 拷贝一份表格的数据
let tableData = ref<any[]>(cloneDeep(props.data))

// 监听父组件传递过来的数据
watch(
  () => props.data,
  (val) => {
    //console.log('表单的新值:', props.data)
    tableData.value = cloneDeep(val)
    tableData.value.map((item) => {
      // 代表当前是否是可编辑的状态
      item.rowEdit = false
    })
  }
)

/**
 * 分页
 */
// 条数改变
const handleSizeChange = (val: number) => {
  //console.log(val)
  emits('sizeChange', val)
}

// 页数改变
const handleCurrentChange = (val: number) => {
  //console.log(val)
  emits('currentChange', val)
}

// 分页的布局
let paginationAlignFlex = computed(() => {
  if (props.paginationAlign === 'left') return 'flex-start'
  else if (props.paginationAlign === 'center') return 'center'
  else return 'flex-end'
})
</script>

<style scoped lang="less">
.edit {
  width: 1.2em;
  height: 1.2em;
  cursor: pointer;
  position: relative;
  top: 3px;
  left: 8px;
  &:hover {
    color: #3893fd;
  }
}
.editInput {
  display: flex;
  align-items: center;

  .icons {
    margin-left: 10px;
    width: auto;
    position: relative;
    top: 2px;
    .select {
      color: #209020;
    }
    .close {
      color: red;
    }
  }
  svg {
    cursor: pointer;
    width: 1.2em;
    height: 1.2em;
    padding: 4px 5px;
    &:hover {
      background-color: #3894fd2c;
    }
  }
  .content {
    display: flex;
    margin-left: 20px;
  }
}

.pagination {
  margin-top: 30px;
  display: flex;
}
</style>
