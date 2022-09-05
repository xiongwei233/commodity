<template>
  <div class="home">
    <home-headers />
    <home-tag v-permission="['getStatistics1,GET']" />

    <!-- 底部内容 -->
    <el-row :gutter="20" class="footer-box">
      <el-col :span="12" v-permission="['getStatistics3,GET']">
        <home-echarts />
      </el-col>
      <el-col :span="12" v-permission="['getStatistics2,GET']">
        <home-products />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts"></script>

<script setup lang="ts">
import HomeHeaders from './compo/home-headers.vue'
import HomeTag from './compo/home-tag.vue'
import HomeEcharts from './compo/home-echarts.vue'
import HomeProducts from './compo/home-products.vue'
</script>

<style scoped lang="less"></style>
