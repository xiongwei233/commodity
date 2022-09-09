<template>
  <div class="image-main" v-loading="imageStore.cateListLoading">
    <el-row :gutter="20">
      <el-col v-for="item in imageStore.categroyList.list" :span="6">
        <el-card shadow="hover" :body-style="{ padding: '0px' }" class="mb-5">
          <template #header>
            <div class="img-box">
              <el-image :src="item.url" fit="cover" lazy :preview-src-list="[item.url]" />
              <span class="title">{{ item.name }}</span>
            </div>
          </template>
          <!-- card body -->
          <div class="img-btn">
            <el-link type="primary" :underline="false" @click="renameFn(item)">重命名</el-link>
            <el-popconfirm
              title="是否要删除该图片？"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="imagesDelete(item)"
            >
              <template #reference>
                <el-link type="primary" :underline="false">删除</el-link>
              </template>
            </el-popconfirm>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <footer v-if="imageStore.categroyList?.list">
      <el-pagination
        :current-page="currentPage"
        background
        layout="prev, pager, next"
        hide-on-single-page
        @current-change="handleCurrentChange"
        :page-count="calcPage"
      />
    </footer>
  </div>

  <global-drawer
    ref="uploadDrawer"
    title="图片上传"
    :footer-show="false"
    @close="uploadImage_close"
    @open="uploadImage_open"
  >
    <animation-lottie ref="animation_updateRef"></animation-lottie>
    <upload-file @success="uploadSuccessFn" />
  </global-drawer>
</template>

<script lang="ts">
import { ref, computed } from 'vue'

import { useImageStore } from '@/stores/modules/image'
import { showPrompt } from '@/utils/element-Fun'

import GlobalDrawer from '@/components/global-drawer.vue'
import UploadFile from '@/components/upload-file.vue'
import AnimationLottie from '@/components/animation-lottie.vue'
import data from '@/assets/animation/data.json'

import type { imageCategory_List } from '@/services/module/types/image.type'
import type { UploadFile as UploadFileType, UploadFiles } from 'element-plus'
</script>

<script lang="ts" setup>
const imageStore = useImageStore()

// 当前在第几页
const currentPage = ref<number>(1)

// 当前共几页
const calcPage = computed(() => Math.ceil(imageStore?.categroyList.totalCount / 10))

// 拿数据的请求,方便直接用
const imageAPIFn = () => {
  return imageStore.fetch_getImageCategoryAPI({ id: imageStore.categroyId, page: currentPage.value })
}

// 点击 分页
const handleCurrentChange = async (val?: number) => {
  if (typeof val === 'number') {
    currentPage.value = val
    imageStore.cateListLoading = true
    await imageAPIFn()
    imageStore.cateListLoading = false
  }
}

// 重命名
const renameFn = (item: imageCategory_List) => {
  console.log(item)
  showPrompt('重命名', item.name)
    .then(async ({ value }: { value: string }) => {
      //console.log(value)
      imageStore.cateListLoading = true
      await imageStore
        .fetch_editImageType({ id: item.id, name: value })
        .then(async () => await imageAPIFn())
        .finally(() => (imageStore.cateListLoading = false))
    })
    .catch((err: any) => err)
}

// 删除
const imagesDelete = (item: imageCategory_List) => {
  console.log(item)
  imageStore.cateListLoading = true
  imageStore
    .fetch_deleteImageAPI([item.id])
    .then(async () => await imageAPIFn())
    .finally(() => (imageStore.cateListLoading = false))
}

// 上传图片
const uploadDrawer = ref<InstanceType<typeof GlobalDrawer>>()
const animation_updateRef = ref<InstanceType<typeof AnimationLottie>>()
const isuploadOpen = () => {
  uploadDrawer.value?.open()
}

// 抽屉组件-打开
const uploadImage_open = () => {
  //console.log('组件加载')
  animation_updateRef.value?.openTottie(data, 'data')
}
// 抽屉组件-关闭
const uploadImage_close = () => {
  // 动画销毁
  animation_updateRef.value?.destroysTottie()
}
// 上传成功
type uploadSuccessFnType = { response: any; uploadFile: UploadFileType; uploadFiles: UploadFiles }
const uploadSuccessFn = ({ response, uploadFile, uploadFiles }: uploadSuccessFnType) => {
  uploadDrawer.value?.close()
  imageAPIFn()
}

defineExpose({
  isuploadOpen
})
</script>

<style scoped lang="less">
.image-main {
  flex: 1;
  width: 100%;
  padding: 20px;
  footer {
    display: flex;
    justify-content: center;
  }
  .img-box {
    width: 100%;
    height: 150px;
    position: relative;
    .el-image {
      width: 100%;
      height: 100%;
    }
    .title {
      z-index: 99;
      position: absolute;
      bottom: -1px;
      right: 0px;
      left: 0px;
      font-size: 14px;
      background: rgba(0, 0, 0, 0.5);
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #fff;
      @apply truncate px-2;
    }
  }
  .img-btn {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-link {
      height: 26px;
      padding: 0 10px;
      line-height: 40px;
      &:hover {
        background-color: #f5f7fa;
        color: #288df1;
      }
    }
  }
  :deep(.el-card__header) {
    padding: 0;
  }
}
</style>
