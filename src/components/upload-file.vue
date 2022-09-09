<template>
  <div class="upload-file">
    <el-upload
      ref="uploadRef"
      drag
      :action="uoloadImageUrl"
      multiple
      :data="data"
      :name="name"
      :headers="{
        token
      }"
      :on-success="uploadSuccess"
      :on-error="uploadError"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">拖入图片到这里或者 <em>点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
      </template>
    </el-upload>
  </div>
</template>

<script lang="ts">
import { router } from '@/router'
import { uoloadImageUrl } from '@/services/module/image'
import { useUserStore } from '@/stores/modules/user'

import { getToken, removeToken } from '@/utils/cookie'
import type { UploadFile, UploadFiles, UploadInstance, UploadUserFile } from 'element-plus'
import { ref } from 'vue'
</script>

<script setup lang="ts">
const token = getToken()
const userStore = useUserStore()
const emit = defineEmits(['success'])
const props = withDefaults(
  defineProps<{
    data?: Object
    name?: string
  }>(),
  {
    data: () => ({}),
    name: 'img'
  }
)

const uploadRef = ref<UploadInstance>()

//成功
type uploadSuccessType = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void
const uploadSuccess: uploadSuccessType = (response, uploadFile, uploadFiles) => {
  ElNotification({ title: '图片上传成功', type: 'success', duration: 2000 })
  emit('success', { response, uploadFile, uploadFiles })
  uploadRef.value?.clearFiles()
}

//失败
type uploadErrorType = (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void
const uploadError: uploadErrorType = (error, uploadFile, uploadFiles) => {
  const msg = JSON.parse(error.message).msg || '上传失败'
  ElNotification({ title: msg, type: 'error', duration: 3000 })
  console.log(msg)

  // 如果提示非法token 直接跳转到 login
  const logout = msg.includes('非法token，请先登录！' || '非法token' || '请先登录' || '请求失败')
  if (logout) {
    userStore.token = ''
    removeToken()
    router.push('/login')
  }

  return {
    error,
    uploadFile,
    uploadFiles
  }
}
</script>

<style scoped lang="less"></style>
