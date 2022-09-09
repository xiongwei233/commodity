<template>
  <el-row :gutter="20" class="content-box">
    <template v-if="homeStore?.statistics_1?.length !== 0">
      <el-col :span="6" v-for="item in homeStore?.statistics_1" class="content" :key="item.subValue">
        <el-card class="section !border-none" shadow="hover" :body-style="{ padding: 0 }">
          <el-card class="section !border-none" shadow="never">
            <div class="header">
              <span>{{ item.title }}</span>
              <el-tag :type="item.unitColor" size="small" effect="plain">{{ item.unit }}</el-tag>
            </div>
          </el-card>

          <el-divider />

          <el-card class="section !border-none" shadow="never">
            <section class="value">
              <div class="h1-box">
                <h1><AnimateNumber :value="item.value" /></h1>
              </div>
              <el-divider />
              <footer class="footer">
                <span>{{ item.subTitle }}</span>
                <span>{{ item.subValue }}</span>
              </footer>
            </section>
          </el-card>
        </el-card>
      </el-col>
    </template>

    <!-- 骨架  -->
    <template v-else>
      <el-col :span="6" v-for="i in 4" :key="i" class="content">
        <el-skeleton style="width: 100%" animated>
          <template #template>
            <el-card class="section !border-none" shadow="hover" :body-style="{ padding: 0 }">
              <el-card class="section !border-none" shadow="never">
                <div class="header flex justify-between py-1">
                  <el-skeleton-item variant="text" style="width: 60%" />
                  <el-skeleton-item variant="text" style="width: 30%" />
                </div>
              </el-card>

              <el-divider />

              <el-card class="section !border-none" shadow="never">
                <section class="value mx-1">
                  <div class="h1-box">
                    <el-skeleton-item variant="h1" style="width: 50%" class="mb-5 mt-2" />
                  </div>
                  <el-divider />
                  <footer class="footer flex justify-between mt-5">
                    <el-skeleton-item variant="text" style="width: 50%" />
                    <el-skeleton-item variant="text" style="width: 20%" />
                  </footer>
                </section>
              </el-card>
            </el-card>
          </template>
        </el-skeleton>
      </el-col>
    </template>
  </el-row>
</template>

<script lang="ts">
import AnimateNumber from '@/components/animate-number.vue'
import { useHomeStore } from '@/stores/modules/home'
</script>

<script setup lang="ts">
const homeStore = useHomeStore()

if (homeStore.fetchGetStatistics_1API) {
  homeStore.fetchGetStatistics_1API()
}
</script>

<style scoped lang="less">
.content-box {
  .content {
    @apply flex-1 h-max;
    .section {
      background: #fff;
      font-size: 14px;
      color: #333;
      border-radius: 5px;
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .value {
        .h1-box {
          h1 {
            font-size: 32px;
            font-weight: bold;
            color: #777;
            padding-bottom: 20px;
          }
        }
        .footer {
          padding-top: 18px;
          color: #888;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
    .el-divider {
      margin: 0;
      border-color: #f1f1f1;
    }
    .el-skeleton__item {
      background-color: rgb(230, 230, 230) !important;
    }
  }
}
</style>
