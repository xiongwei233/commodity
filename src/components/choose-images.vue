<template>
  <div class="choose-images">
    <!-- 上传头像框 -->
    <div class="images-box">
      <div class="image" v-if="modelValue" @click="dialogVisibale = true">
        <el-image :src="modelValue" fit="cover" lazy style="width: 100%; height: 100%"></el-image>
      </div>

      <div class="image" @click="dialogVisibale = true" v-else>
        <p class="icon">
          <el-icon><Plus /></el-icon>
        </p>
      </div>
    </div>

    <!-- 选择图片框 -->
    <el-dialog title="图片选择" v-model="dialogVisibale" width="80%" top="4vh">
      <el-container class="bg-white rounded" style="height: 70vh">
        <el-container class="border-1">
          <image-aside ref="ImageAsideRef" />
          <image-main isChoose ref="ImageMainRef" @choose="chooseFn" />
        </el-container>
      </el-container>

      <template #footer>
        <span>
          <el-button @click="dialogVisibale = false">取消</el-button>
          <el-button type="primary" @click="submitImage">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

import ImageAside from '@/views/other/compo/image-aside.vue'
import ImageMain from '@/views/other/compo/image-main.vue'

import type { imageCategory_List } from '@/services/module/types/image.type'
</script>

<script setup lang="ts">
const dialogVisibale = ref(false)

defineProps<{
  modelValue?: string
}>()

const emit = defineEmits(['update:modelValue'])

const checkImage = ref<string[]>([])

const chooseFn = (item: imageCategory_List[]) => {
  checkImage.value[0] = item[0]?.url
  console.log('选中的图片', checkImage.value)
}

const submitImage = () => {
  if (checkImage.value.length) {
    emit('update:modelValue', checkImage.value[0])
  }
  dialogVisibale.value = false
}
</script>

<style scoped lang="less">
.choose-images {
  .images-box {
    height: 100px;
    width: 100%;
    display: flex;
    flex-direction: row;
    .image {
      width: 100px;
      height: 100%;
      border: 1px dashed #e7e7e7;
      border-radius: 5px;
      cursor: pointer;
      margin-right: 20px;
      &:hover {
        border: 1px dashed #409eff;
      }
      .icon {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 26px;
        color: #b1afaf;
      }
    }
  }

  .el-dialog {
    height: 85% !important;
    position: relative;
    top: 0;
  }
}
</style>
