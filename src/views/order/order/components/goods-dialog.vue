<template>
  <dialog-global title="订单详情" v-model="dialogVis" width="50%" class="dialog">
    <!-- 订单信息 -->
    <el-card shadow="never" :body-style="{ padding: '20px' }" class="card">
      <template #header>
        <div class="info">订单信息</div>
      </template>

      <ul class="content">
        <li>
          <p>订单号:</p>
          <span>{{ orderList.no }}</span>
        </li>
        <li>
          <p>付款方式:</p>
          <span>{{ orderList.payment_method }}</span>
        </li>
        <li>
          <p>付款单号:</p>
          <span>{{ orderList.payment_no }}</span>
        </li>
        <li>
          <p>付款时间:</p>
          <span>{{ fromatDate(orderList.paid_time) }}</span>
        </li>
        <li>
          <p>创建时间:</p>
          <span>{{ orderList.create_time }}</span>
        </li>
      </ul>
    </el-card>

    <!-- 发货信息 -->
    <el-card
      shadow="never"
      :body-style="{ padding: '20px' }"
      class="card"
      v-if="orderList.ship_data"
    >
      <template #header>
        <div class="info">发货信息</div>
      </template>
      <ul class="content">
        <li>
          <p>物流公司:</p>
          <span>{{ orderList.ship_data?.express_company }}</span>
        </li>
        <li>
          <p>运单号:</p>
          <span>{{ orderList.ship_data?.express_no }}</span>
          <el-button
            type="primary"
            size="small"
            @click="shipHandler"
            link
            class="ml-4"
            :loading="loading"
          >
            查看物流
          </el-button>
        </li>
        <li>
          <p>发货时间:</p>
          <span>{{ fromatDate(orderList.ship_data?.express_time) }}</span>
        </li>
      </ul>
    </el-card>

    <!-- 商品信息 -->
    <el-card shadow="never" :body-style="{ padding: '20px' }" class="card">
      <template #header>
        <div class="info">商品信息</div>
      </template>

      <div class="goods-info">
        <div>
          <template v-for="item in orderList?.order_items">
            <div class="item">
              <el-image :src="item.goods_item?.cover" fit="cover" lazy class="h-14 w-14" />
              <div class="right">
                <span>{{ item.goods_item?.title }}</span>
                <div>
                  <h5 class="font-bold text-red-600">￥{{ item?.price }}</h5>
                  <span class="pl-1 text-xs">x{{ item?.num }}</span>
                </div>
              </div>
            </div>
          </template>
        </div>

        <div class="pt-2">
          成交价:
          <h5 class="font-bold text-red-600">￥{{ orderList?.total_price }}</h5>
        </div>
      </div>
    </el-card>

    <!-- 收货信息 -->
    <el-card shadow="never" :body-style="{ padding: '20px' }" class="card">
      <template #header>
        <div class="info">收货信息</div>
      </template>
      <ul class="content">
        <li>
          <p>收货人:</p>
          <span>{{ orderList.address?.address }}</span>
        </li>
        <li>
          <p>联系方式:</p>
          <span>{{ orderList.address?.address }}</span>
        </li>
        <li>
          <p>收货地址:</p>
          <span>{{ addressCalc(orderList.address) }}</span>
        </li>
        <li>
          <p>邮政编码:</p>
          <span>{{ orderList.address?.zip }}</span>
        </li>
      </ul>
    </el-card>
  </dialog-global>
</template>

<script lang="ts">
import { fromatDate } from '@/utils/formatDate'
import { useOrderStore } from '@/stores/modules/order'
import { NotificationBox } from '@/utils/element-Fun'
</script>

<script setup lang="ts">
const orderStore = useOrderStore()
const props = withDefaults(
  defineProps<{
    orderList?: any
  }>(),
  {
    orderList: () => ({})
  }
)
const emits = defineEmits(['shipHandler'])
const dialogVis = ref<boolean>(false)
const loading = ref<boolean>(false)

// 收货地址
const addressCalc = (address: any) => {
  return address.address + address.city + address.district + address.address
}

const shipHandler = async () => {
  try {
    loading.value = true
    const res: any = await orderStore.getShipInfo_fetch(props.orderList?.id)
    if (res.data?.status === 300) {
      NotificationBox({ title: res.data?.msg || '数据请求失败', type: 'error' })
      return
    }
    emits('shipHandler', props.orderList?.id)
  } finally {
    loading.value = false
  }
}

const open = () => (dialogVis.value = true)
const close = () => (dialogVis.value = false)

defineExpose({
  open,
  close
})
</script>

<style scoped lang="less">
.dialog {
  .card {
    border: 1px solid #e4e7ed !important;
    margin-bottom: 20px;

    .info {
      font-size: 14px;
      font-weight: bold;
    }

    .content {
      color: #666;
      line-height: 2;
      display: flex;
      flex-wrap: wrap;

      li {
        width: 50%;
        padding: 5px 0;
      }

      & span > {
        padding-left: 10px;
      }

      & p > {
        display: inline-block;
        width: 70px;
      }
    }

    .goods-info {
      .item {
        display: flex;
        align-items: center;

        .right {
          padding-left: 10px;
        }
      }

      h5 {
        display: inline-block;
      }
    }
  }
}
</style>
