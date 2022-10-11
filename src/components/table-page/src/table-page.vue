<template>
  <div class="table-table">
    <!--填写固定插槽 到最底下配置-->
    <commen-table
      :table-data="dataList"
      v-bind="tableConfig"
      :total="dataCount"
      v-model:page="pageInfo"
      @selection-change="selectionChange"
    >
      <!-- headers中的插槽 -->
      <template #header>
        <add-refresh @updateTable="getPageDate">
          <template #add>
            <el-button type="primary" size="default" @click="handleAddClick">
              <el-icon class="mr-1" :size="16"><CirclePlus /></el-icon>
              {{ addBtnName }}
            </el-button>
          </template>
          <template #form>
            <!-- 批量删除 -->
            <popconfirm
              @confirm="batchDeleteFn"
              title="是否要删除批量删除选中？"
              v-if="showBatchDelete"
            >
              <el-button type="danger" size="default" :icon="Delete"> 批量删除 </el-button>
            </popconfirm>

            <slot name="search"> </slot>
          </template>
        </add-refresh>
      </template>

      <!-- switch状态的插槽 status -->
      <template #status="scope">
        <el-switch
          :model-value="scope.row.status"
          :active-value="1"
          :loading="switchLoading"
          :inactive-value="0"
          :disabled="scope.row.super === 1 || switchDisabled(scope)"
          @click="edtiStatus(scope.row.status, scope.row)"
        ></el-switch>
      </template>

      <!--<template #couponStates="scope">
        {{ scope }}
      </template>-->

      <!-- 操作 -->
      <template #handler="scope">
        <div>
          <slot name="actions" :row="scope.row"></slot>
          <el-button
            text
            type="primary"
            size="small"
            @click="handleEidtClick(scope.row)"
            :icon="Edit"
            v-if="!handleEditShow(scope)"
          >
            修改
          </el-button>

          <popconfirm
            @confirm="handleDelete(scope.row)"
            title="是否要删除该公告信息？"
            :show-icon="showIcon"
            :icon="icon"
            v-if="!handleDeleteShow(scope)"
          ></popconfirm>
        </div>
      </template>

      <!-- 在page-content中动态插入剩余的插槽，页面单独的插槽 -->
      <template v-for="item in otherPropSlots" :key="item.prop" #[item.slotName]="scope">
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </commen-table>
  </div>
</template>

<script lang="ts">
import CommenTable from '@/common-ui/commen-table/src/commen-table.vue'
import AddRefresh from '@/components/add-refresh.vue'

import { useGlobalStore } from '@/stores/modules/globalTable'

import { Edit, Delete } from '@element-plus/icons-vue'
import Popconfirm from '@/components/popconfirm.vue'
</script>

<script setup lang="ts">
const globalStore = useGlobalStore()

const props = withDefaults(
  defineProps<{
    // 表格的配置
    tableConfig: any
    // 搜索的配置
    searchConfig?: any
    // 名字
    pageName: string
    // 添加表单按钮的名称
    addBtnName?: string
    // 批量删除
    showBatchDelete?: boolean

    icon?: any
    showIcon?: boolean
    switchDisabled?: Function
    handleEditShow?: Function
    handleDeleteShow?: Function
  }>(),
  {
    addBtnName: '新增公告',
    showIcon: true,
    switchDisabled: () => false,
    handleEditShow: () => false,
    handleDeleteShow: () => false,
    showBatchDelete: false
  }
)
const switchLoading = ref<boolean>(false)

const emits = defineEmits(['addListClick', 'editListClick', 'selectionChange'])

// 1.双向绑定的 分页内容 currentPage必须是0
const pageInfo = ref({ currentPage: 1, pageSize: 10 })
watch(pageInfo, () => getPageDate())

// 2.查询用户列表-- 发生网络请求
const getPageDate = (queryInfos: any = {}) => {
  globalStore.getTableList_fetch({
    pageName: props.pageName,
    queryInfo: {
      page: pageInfo.value.currentPage,
      limit: pageInfo.value.pageSize,
      ...queryInfos
    }
  })
}
getPageDate()

// 3.从pinia获取数据
// 列表数据
const dataList = computed(() => {
  let data: any[] = []
  switch (props.pageName) {
    case 'notice':
      data = globalStore.noticeList
      break

    case 'manager':
      data = globalStore.managerList
      break
    case 'role':
      data = globalStore.roleList
      break

    case 'skus':
      data = globalStore.skusList
      break
    case 'coupon':
      data = globalStore.couponList
      break

    case 'user_level':
      data = globalStore.levelList
      break
    case 'user':
      data = globalStore.userList
      break
  }
  //console.log(data)
  return data
})

// 列表的total
const dataCount = computed(() => {
  let count: number = 0
  switch (props.pageName) {
    case 'notice':
      count = globalStore.noticeCount
      break

    case 'manager':
      count = globalStore.managerCount
      break
    case 'role':
      count = globalStore.roleCount
      break

    case 'skus':
      count = globalStore.skusCount
      break
    case 'coupon':
      count = globalStore.couponCount
      break

    case 'user_level':
      count = globalStore.levelCount
      break
    case 'user':
      count = globalStore.userCount
      break
  }
  return count
})

// 4. 获取其他的动态插槽名称
const otherPropSlots = props.tableConfig?.tableOptions.filter((item: any) => {
  //console.log(item)
  // 固定的插槽
  if (item.slotName === 'handler') return false
  if (item.slotName === 'status') return false
  //if (item.slotName === 'couponStates') return false
  //if (item.slotName === 'handler') return false
  return true
})

// 5. 删除/编辑/添加
const handleDelete = (item: any) => {
  globalStore.deleteTableDate_fetch({
    pageName: props.pageName,
    id: item.id
  })
}

// 6. 修改状态
const edtiStatus = (val: any, data: any) => {
  console.log(val, data)
  const status = val === 0 ? 1 : 0
  globalStore.editTableStatus_fetch({ id: data.id, pageName: props.pageName, status: { status } })
}

// 7.批量删除
const selectionCheck = ref([])
// 多选框改变
const selectionChange = (selection: any) => {
  selectionCheck.value = selection.map((item: any) => item.id)
}
// 点击批量删除
const batchDeleteFn = () => {
  console.log('BatchDeleteFn', selectionCheck.value)
  globalStore.batchDelete_fetch({
    pageName: props.pageName,
    ids: selectionCheck.value
  })
}

defineExpose({
  getPageDate
})

// 添加
const handleAddClick = () => emits('addListClick')
// 编辑
const handleEidtClick = (item: any) => emits('editListClick', item)
</script>

<style scoped lang="less"></style>
