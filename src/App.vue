<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { ElConfigProvider } from 'element-plus'
export default {
  name: 'MyApp',
  data() {
    return {
      locale: zhCn // 插件语言改为中文
    }
  }
}
</script>

<script setup lang="ts"></script>

<style scoped lang="less"></style>
