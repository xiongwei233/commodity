<template>
  <div class="order-list">
    <!-- tabs -->
    <el-tabs v-model="activeTabs" @tab-click="handleClick">
      <template v-for="item in tabsDate" :key="item.type">
        <el-tab-pane :name="item.type" :label="item.name" />
      </template>
    </el-tabs>

    <!-- card -->
    <el-card shadow="never" :body-style="{ padding: '20px' }">
      <!-- 搜索 -->
      <search-page
        :searchFormConfig="searchConfig"
        @reset-btn-click="handleResetClick"
        @query-btn-click="handleQueryClick"
        ref="searchPageRef"
      />

      <!-- 表格 -->
      <table-page
        :tableConfig="orderTableConfig"
        pageName="order"
        ref="pageCountentRef"
        show-batch-delete
        :add-show="false"
        :handle-edit-show="handleShow"
        :handle-delete-show="handleShow"
      >
        <!-- 商品 -->
        <template #goods="scope">
          <div class="goods">
            <header class="header">
              <span class="order">
                订单号:
                <p>{{ scope.row.no }}</p>
              </span>

              <span class="time">
                下单时间:
                <p>{{ scope.row.create_time }}</p>
              </span>
            </header>

            <div class="goods-info">
              <template v-for="item in scope.row.order_items" :key="item.id">
                <!--  -->
                <div class="item">
                  <template v-if="item.goods_item">
                    <el-image :src="item.goods_item?.cover" fit="cover" lazy class="h-10 w-10" />
                    <div class="info">
                      <p class="title">{{ item.goods_item?.title }}</p>
                      <p class="total">价格:￥{{ item.price }} 数量:{{ item.num }}件</p>
                    </div>
                  </template>
                  <p class="remove" v-else>商品已被删除</p>
                </div>
                <!--  -->
              </template>
            </div>
          </div>
        </template>

        <!-- 实付款 -->
        <template #total_price="scope">
          <span>{{ scope.row.total_price }}</span>
        </template>

        <!-- 买家 -->
        <template #user="scope">
          <div class="user">
            <span>{{ scope.row.user.username }}</span>
            <p>(用户id:{{ scope.row.user.id }})</p>
          </div>
        </template>

        <!-- 交易状态 -->
        <template #payStatus="scope">
          <div class="pay">
            <div class="payment">
              <span>付款状态:</span>
              <el-tag size="small" v-if="scope.row.payment_method == 'alipay'">支付宝支付</el-tag>
              <el-tag size="small" v-else-if="scope.row.payment_method == 'wechat'" type="success">
                微信支付
              </el-tag>
              <el-tag size="small" v-else type="info">未支付</el-tag>
            </div>

            <div class="ship_status">
              <span>发货状态:</span>
              <el-tag :type="scope.row.ship_data ? 'success' : 'info'" size="small">
                {{ scope.row.ship_data ? '已发货' : '未发货' }}
              </el-tag>
            </div>

            <div class="refund_status">
              <span>发货状态:</span>
              <el-tag :type="scope.row.ship_status === 'received' ? 'danger' : 'info'" size="small">
                {{ scope.row.ship_status === 'received' ? '已收货' : '未收货' }}
              </el-tag>
            </div>
          </div>
        </template>

        <!-- 操作 -->
        <template #actions="scope">
          <!-- 用row col 尝试缩小换行 -->
          <!--  -->
          <div class="anctions">
            <el-button type="primary" size="small" link @click="detailHandler(scope.row)">
              订单详情
            </el-button>
            <el-button
              type="success"
              size="small"
              link
              v-if="shipState(scope.row)"
              @click="shipOrder(scope.row)"
            >
              订单发货
            </el-button>
            <template v-if="activeTabs === 'refunding'">
              <el-button type="primary" size="small" link>同意退款</el-button>
              <el-button type="danger" size="small" link>拒绝退款</el-button>
            </template>
          </div>
        </template>
      </table-page>
    </el-card>

    <!-- 订单详情弹窗 -->
    <goods-dialog ref="goodsDetailRef" :orderList="detailsDate" @ship-handler="shipHandler" />

    <!-- 物流详情 -->
    <logistics-dialog ref="logisticsRef" :orderDate="orderDate" />

    <!-- 订单发货 -->
    <ship-dialog ref="shipRef" @update="handleClick" />
  </div>
</template>

<script lang="ts">
// 搜索
import { searchConfig } from './config/search.config'
import searchPage from '@/components/search-page'

// 表格
import TablePage from '@/components/table-page'
import { orderTableConfig } from './config/order.config'

//hooks
import { useTableSearch } from '@/hooks/useTable_Search'
import { tabsDate } from './data/tabsData'
import { useOrderStore } from '@/stores/modules/order'

import type { TabsPaneContext } from 'element-plus'

// 弹窗
import GoodsDialog from './components/goods-dialog.vue'
import LogisticsDialog from './components/logistics-dialog.vue'
import ShipDialog from './components/ship-dialog.vue'
</script>

<script setup lang="ts">
// 订单类型：all全部，nopay待支付，noship待发货，shiped待收货，received已收货，finish已完成，closed已关闭，refunding 退款中
const activeTabs = ref('all')
const orderStore = useOrderStore()

const searchPageRef = ref<InstanceType<typeof searchPage>>()
const goodsDetailRef = ref<InstanceType<typeof GoodsDialog>>()
const logisticsRef = ref<InstanceType<typeof LogisticsDialog>>()
const shipRef = ref<InstanceType<typeof ShipDialog>>()

//订单弹窗数据
const detailsDate = ref<any>({})
//物流弹窗数据
const orderDate = ref<any>({})

// 点击搜索之前做的事 =>携带订单类型
const searchCanbank = () => {
  let data = searchPageRef.value?.formDate
  data.all = activeTabs.value
}

// 点击重置之前做的事 =>携带订单类型
const resetCanbank = () => {
  let data = searchPageRef.value?.formDate
  data.all = activeTabs.value
}

// 搜索表单
const { pageCountentRef, handleResetClick, handleQueryClick } = useTableSearch(
  searchCanbank,
  resetCanbank
)

// 切换tabs
const handleClick = (tab: TabsPaneContext) => {
  activeTabs.value = tab?.props?.name as string
  pageCountentRef.value?.getPageDate({ tab: activeTabs.value })
}

// 不显示修改按钮， 不显示删除按钮
const handleShow = () => true

// 订单发货按钮的显示
const shipState = (row: any) => {
  const oderType = activeTabs.value === 'all' || activeTabs.value === 'noship'
  const isBoolean = !row.ship_data && row.payment_method && oderType
  return isBoolean
}

// 订单 弹窗的数据
const detailHandler = (row: any) => {
  goodsDetailRef.value?.open()
  detailsDate.value = row
}

// 物流弹窗的数据
const shipHandler = async () => {
  logisticsRef.value?.open()
}

//发货
const shipOrder = async (row: any) => {
  await orderStore.express_fetch()
  shipRef.value?.open(row.id)
}
</script>

<style scoped lang="less">
.goods {
  text-align: start;

  .header {
    display: flex;
    .order {
      padding-right: 16px;
    }
    p {
      font-size: 12px;
    }
  }

  .goods-info {
    .item {
      padding-top: 5px;
      display: flex;
      align-items: center;

      .info {
        padding-left: 8px;
        .title {
          color: #386cfb;
        }

        .total {
          font-size: 12px;
          color: #999;
        }
      }

      .remove {
        color: red;
      }
    }
  }
}

.user {
  p {
    color: #999;
    font-size: 12px;
  }
}

.pay {
  text-align: start;
  & div {
    padding: 2px;
    .el-tag {
      padding-left: 2px;
    }
  }
}
</style>
