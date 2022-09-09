<template>
  <div class="image">
    <el-header class="image-header">
      <div class="btn-box">
        <el-button type="primary" @click="addImageCateFn">
          <el-icon><Plus /></el-icon>
          新增图片分类
        </el-button>
        <el-button type="warning" @click="uploadImageFn">
          <el-icon><Upload /></el-icon>
          上传图片
        </el-button>
      </div>
    </el-header>

    <section class="content">
      <image-aside ref="ImageAsideRef" />
      <image-main ref="ImageMainRef" />
    </section>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

import ImageAside from './compo/image-aside.vue'
import ImageMain from './compo/image-main.vue'
</script>

<script setup lang="ts">
const ImageAsideRef = ref<InstanceType<typeof ImageAside>>()
const addImageCateFn = () => ImageAsideRef.value?.isopen()

const ImageMainRef = ref<InstanceType<typeof ImageMain>>()
const uploadImageFn = () => ImageMainRef.value?.isuploadOpen()
</script>

<style scoped lang="less">
.image {
  background: white !important;
  width: 100% !important;
  border-radius: 5px;
  height: calc(100% - 44px);

  &-header {
    border-bottom: 1px solid #f1f1f1;
    height: auto;
    .btn-box {
      padding-top: 20px;
      padding-bottom: 20px;
    }
  }

  .content {
    display: flex;
    justify-content: space-between;
    height: calc(100% - 73px);
  }
}
</style>
