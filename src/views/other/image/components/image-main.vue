<template>
  <el-main class="image-main" v-loading="imageStore.cateListLoading">
    <div class="top p-3">
      <el-row :gutter="10">
        <el-col v-for="item in imageStore.newResults" :lg="6" :md="12">
          <el-card shadow="hover" :body-style="{ padding: '0px' }" class="relative mb-5">
            <template #header>
              <div class="img-box">
                <el-image :src="item.url" fit="cover" lazy :preview-src-list="[item.url]" />
                <span class="title">{{ item.name }}</span>
              </div>
            </template>
            <!-- card body -->

            <div class="img-btn">
              <el-checkbox
                v-if="isChoose"
                v-model="item.checked"
                @change="handleCheckboxChange(item)"
              />

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
    </div>

    <footer class="bottom">
      <el-pagination
        :current-page="currentPage"
        background
        layout="prev, pager, next"
        hide-on-single-page
        @current-change="handleCurrentChange"
        :page-count="calcPage"
      />
    </footer>

    <global-drawer ref="uploadDrawer" title="图片上传" :footer-show="false" :animate="data">
      <upload-file @success="uploadSuccessFn" />
    </global-drawer>
  </el-main>
</template>

<script lang="ts">
import { ref, computed } from 'vue'

import { useImageStore } from '@/stores/modules/image'
import { NotificationBox, showPrompt } from '@/utils/element-Fun'

import GlobalDrawer from '@/components/global-drawer.vue'
import UploadFile from '@/components/upload-file.vue'
import data from '@/assets/animation/data.json'

import type { imageCategory_List } from '@/services/module/types/image.type'
import type { UploadFile as UploadFileType, UploadFiles } from 'element-plus'
</script>

<script lang="ts" setup>
const imageStore = useImageStore()

const porps = withDefaults(
  defineProps<{
    isChoose?: boolean
  }>(),
  {
    isChoose: false
  }
)
const emit = defineEmits(['choose'])

// 当前在第几页
const currentPage = ref<number>(1)

// 当前共几页
const calcPage = computed(() => Math.ceil(imageStore?.categroyList.totalCount / 10))

// 拿数据的请求,方便直接用
const imageAPIFn = () => {
  return imageStore.fetch_getImageCategoryAPI({
    id: imageStore.categroyId,
    page: currentPage.value
  })
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
const isuploadOpen = () => {
  uploadDrawer.value?.open()
}

// 上传成功
type uploadSuccessFnType = { response: any; uploadFile: UploadFileType; uploadFiles: UploadFiles }
const uploadSuccessFn = ({ response, uploadFile, uploadFiles }: uploadSuccessFnType) => {
  uploadDrawer.value?.close()
  imageAPIFn()
}

// 是否有选中的,
const checkedImage = computed(() => imageStore.newResults.filter((o) => o.checked))
// 主要是判断当前是否选中一张图
const handleCheckboxChange = (item: imageCategory_List) => {
  if (item.checked && checkedImage.value.length > 1) {
    item.checked = false
    return NotificationBox({ title: '最多只能选一张', type: 'error' })
  }
  emit('choose', checkedImage.value)
}

defineExpose({
  isuploadOpen
})
</script>

<style scoped lang="less">
.image-main {
  position: relative;
}
.image-main .top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}
.image-main .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex items-center justify-center;
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
</style>
