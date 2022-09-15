<template>
  <global-drawer
    :close-on-click-modal="false"
    title="修改密码"
    @close="drawerClose"
    @open="drawerOpen"
    confirmText="修改密码"
    @submit="submit"
    ref="drawerRef"
  >
    <AnimationLottie ref="editAnalyzeRef"></AnimationLottie>
    <!-- 表单 -->
    <common-form
      :inline="false"
      ref="editFormRef"
      :options="formOptions"
      status-icon
      size="large"
      v-model="editPsswordForm"
      label-width="80px"
    >
    </common-form>
  </global-drawer>
</template>

<script lang="ts">
import { useUserStore } from '@/stores/modules/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { removeToken } from '@/utils/cookie'

// 动画
import analyze from '@/assets/animation/analyze.json'
import { validatePassword, validateRepeatPass } from '@/utils/form-validate'
import { NotificationBox } from '@/utils/element-Fun'

import AnimationLottie from '@/components/animation-lottie.vue'
import GlobalDrawer from '@/components/global-drawer.vue'
import CommonForm from '@/components/common-form/index.vue'

import type { FormOptions } from '@/components/common-form/types/types'
import type { IEditPassword } from '@/types/user'
</script>

<script setup lang="ts">
const userStore = useUserStore()
const router = useRouter()

// 修改密码表单
const editFormRef = ref<InstanceType<typeof CommonForm>>()
// 动画的DOM
const editAnalyzeRef = ref<InstanceType<typeof AnimationLottie>>()
const drawerRef = ref<InstanceType<typeof GlobalDrawer>>()
// password有值，就校验repassword,封装的hook调用
const validRepassword = () => {
  // 重复密码校验的函数
  editFormRef.value?.formRef?.validateField('repassword', () => null)
}

const { validatePass, validateCheckPass } = validateRepeatPass(validRepassword)

let formOptions: FormOptions[] = [
  {
    type: 'input',
    value: '',
    label: '旧密码',
    prop: 'oldpassword',
    rules: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { validator: validatePassword, trigger: 'blur' }
    ],
    attrs: {
      placeholder: '请输入旧密码',
      showWordLimit: true
    }
  },
  {
    type: 'input',
    value: '',
    label: '新密码',
    prop: 'password',
    rules: [{ required: true, validator: validatePass, trigger: 'blur' }],
    attrs: {
      placeholder: '请输入新密码',
      showPassword: true
    }
  },
  {
    type: 'input',
    value: '',
    label: '确认密码',
    prop: 'repassword',
    rules: [{ required: true, validator: validateCheckPass, trigger: 'blur' }],
    attrs: {
      placeholder: '请重新输入密码',
      showPassword: true
    }
  }
]

// 密码
const editPsswordForm = ref<IEditPassword>({
  oldpassword: '',
  password: '',
  repassword: ''
})

// 打开表单
const open = () => {
  drawerRef.value?.open()
}

// 打开 修改密码对话框 执行的内容.
const drawerOpen = () => {
  editAnalyzeRef.value?.openTottie(analyze, 'analyze')
}

// 关闭修改密码对话框
const drawerClose = () => {
  editAnalyzeRef.value?.destroysTottie()
  // 清空表单数据
  editFormRef.value?.formRef?.resetFields()
}

// 修改密码
const submit = () => {
  editFormRef.value?.formRef?.validate(async (valid: boolean) => {
    if (valid) {
      try {
        drawerRef.value?.openLoading()
        await userStore.fetchEditPassAPI(editPsswordForm.value)
        removeToken()
        userStore.token = ''

        router.push({ path: '/login' })
        NotificationBox({ title: `修改密码成功!` })
        drawerRef.value?.closeLoading()
      } catch {
        drawerRef.value?.closeLoading()
      }
    }
  })
}
defineExpose({
  open
})
</script>

<style scoped lang="scss"></style>
