<template>
  <div class="coupon-list">
    <!-- 表格 -->
    <el-card shadow="never" :body-style="{ padding: '20px' }">
      <table-page
        add-btn-name="新增优惠券"
        :tableConfig="skusTableConfig"
        pageName="coupon"
        :handle-delete-show="handleDeleteShow"
        :handle-edit-show="handleEditShow"
        ret="tablePageRef"
        @add-list-click="handleAddData"
        @edit-list-click="handleEditData"
      >
        <!-- 优惠券 -->
        <template #name="scope">
          <el-tag
            class="namebox"
            :class="scope.row.status ? 'danger' : 'info'"
            :type="formatStatus(scope.row) === '领取中' ? 'danger' : 'info'"
          >
            <h1>{{ scope.row.name }}</h1>
            <p>
              <span>{{ scope.row.start_time }}</span> ~
              <span>{{ scope.row.end_time }}</span>
            </p>
          </el-tag>
        </template>

        <!-- 状态 -->
        <template #couponStates="scope"> {{ formatStatus(scope.row) }} </template>

        <template #type="scope">
          {{ scope.row.type ? `满减￥ ${scope.row.value}` : `折扣 ${scope.row.value} 折` }}
        </template>

        <template #actions="scope">
          <popconfirm
            @confirm="loseEfficacy(scope.row)"
            title="是否要让优惠券失效？"
            v-if="formatStatus(scope.row) === '领取中'"
          >
            <el-tag class="isTag" type="warning" size="small"> 失效 </el-tag>
          </popconfirm>
        </template>
      </table-page>
    </el-card>

    <!-- 弹窗 -->
    <dialog-page
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
      :add-default-info="addDefaultInfo"
      pageName="coupon"
      title="优惠券"
      ref="dialogPageRef"
      :show-animate="false"
      @confirm="confirmFn"
    ></dialog-page>
  </div>
</template>

<script lang="ts">
import { useCouponStore } from '@/stores/modules/coupon'
// 表格
import TablePage from '@/components/table-page'
import { skusTableConfig } from './config/skus.config'
import Popconfirm from '@/components/popconfirm.vue'

import DialogPage from '@/components/dialog-page/src/dialog-page.vue'
import { modalConfig } from './config/dialog.config'

import { usePageModal } from '@/hooks/useTable_AddorEdit'
import { NotificationBox } from '@/utils/element-Fun'
import type { IFormItem } from '@/common-ui/commen-form/types/form.type'
</script>

<script setup lang="ts">
const couponStore = useCouponStore()
const checked = ref(false)
const tablePageRef = ref<InstanceType<typeof TablePage>>()
// 当前状态

// 格式化时间
const formatStatus = (row: any) => {
  // 开始时间戳
  let start_time = new Date(row.start_time).getTime()
  // 当前时间
  let now = new Date().getTime()
  // 结束
  let end_time = new Date(row.end_time).getTime()
  if (start_time >= now) {
    return '未开始'
  } else if (end_time <= now) {
    return '已结束'
  } else if (row.status === 0) {
    return '已失效'
  }
  return '领取中'
}

// 是否显示删除
const handleDeleteShow = (scope: any) => {
  let statusName = formatStatus(scope.row)
  if (statusName === '领取中') {
    return true
  }
}

// 是否显示修改
const handleEditShow = (scope: any) => {
  let statusName = formatStatus(scope.row)
  if (statusName === '已失效' || statusName === '已结束' || statusName === '领取中') {
    return true
  }
}

// 优惠券失效
const loseEfficacy = (row: any) => {
  checked.value = true
  let data = { status: 0 }
  couponStore.fetch_loseEfficacyAPI(row.id, data).then(() => {
    NotificationBox({ message: '优惠券失效成功' })
    tablePageRef.value?.getPageDate()
  })
}

// 点击新增，数据初始化
const addDefaultInfo = ref({})
const addDialog = () => {
  nextTick(() => {
    addDefaultInfo.value = {
      value: 0.0,
      total: 100,
      min_price: 1.0,
      order: 50,
      type: 0
    }
  })
}

// 点击修改，数据初始化
const editDialog = (item: any) => {
  //console.log(item)
  nextTick(() => {
    if (dialogPageRef.value) {
      dialogPageRef.value.formDate.activityTime = [item.start_time, item.end_time]
    }
  })
}

// 调用hooks获取公共的变量和函数----表格的修改/新增表单
const { dialogPageRef, defaultInfo, handleAddData, handleEditData } = usePageModal(
  addDialog,
  editDialog
)

// 类型框 的切换
watch(
  () => dialogPageRef.value?.formDate.type,
  (newVal) => {
    const priceItem = modalConfig.formOptions.find((item) => item.field === 'value')
    //console.log('type改变了', newVal)
    if (newVal === 1) {
      if (priceItem?.inputAttrs?.slotText) {
        priceItem.inputAttrs.slotText = '折'
      }
    } else {
      if (priceItem?.inputAttrs?.slotText) {
        priceItem.inputAttrs.slotText = '元'
      }
    }
  }
)

// 弹窗确定-- 处理提交的数据
const confirmFn = () => {
  if (dialogPageRef.value) {
    let data = dialogPageRef.value.formDate
    data.start_time = new Date(data.activityTime[0]).getTime()
    data.end_time = new Date(data.activityTime[1]).getTime()
  }
}
</script>

<style scoped lang="less">
.coupon-list {
  .namebox {
    @apply w-74 h-16 px-2 py-3;
    text-align: start;
    h1 {
      font-size: 14px;
      padding: 4px 0;
      font-weight: bold;
    }
    p {
      padding: 4px 0;
    }
    .danger {
      border: 1px dashed rgba(254, 205, 211);
    }
    .info {
      border: 1px dashed rgba(229, 231, 235);
    }
  }

  .isTag {
    cursor: pointer;
    &:hover {
      background-color: rgb(239, 180, 111);
      color: white;
    }
  }
}
</style>
