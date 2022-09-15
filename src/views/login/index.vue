<template>
  <div class="login">
    <h1 class="login-title">{{ APP_TITLE }}</h1>
    <el-row>
      <el-col :span="16">
        <img src="@/assets/images/login/login_background_left.png" class="login-img" />
      </el-col>

      <el-col :span="8">
        <div class="right-container">
          <div class="content">
            <div class="title">
              <logo-icon class="logo-icon"></logo-icon>
              <h1>{{ APP_TITLE }}</h1>
            </div>

            <!-- 表单 -->
            <common-form
              :inline="false"
              ref="loginRef"
              :options="formOptions"
              status-icon
              size="large"
              v-model="formValue"
            >
              <template #action>
                <el-button
                  type="primary"
                  size="large"
                  class="btn-login"
                  :loading="loading"
                  @click="submit"
                >
                  登录
                </el-button>
              </template>
            </common-form>
            <!--  -->
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import LogoIcon from '@/assets/icons/login/logo-icon.vue'
import UserIcon from '@/assets/icons/login/login-user.vue'
import PasswordIcon from '@/assets/icons/login/login-password.vue'
import commonForm from '@/components/common-form/index.vue'

import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

import type { IloginForm } from '@/types/user'
import { useUserStore } from '@/stores/modules/user'
import { validatePassword, validateUsername } from '@/utils/form-validate'
import { NotificationBox } from '@/utils/element-Fun'
import type { FormOptions } from '@/components/common-form/types/types'
</script>

<script setup lang="ts">
const router = useRouter()
const userStore = useUserStore()

const loginRef = ref<InstanceType<typeof commonForm>>()
const APP_TITLE = import.meta.env.VITE_APP_TITLE

// 表单的配置
let formOptions: FormOptions[] = [
  {
    type: 'input',
    value: 'admin',
    label: '',
    prop: 'username',
    rules: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { validator: validateUsername, trigger: 'blur' }
    ],
    attrs: {
      placeholder: '请输入用户名',
      showWordLimit: true,
      prefixicon: UserIcon
    }
  },
  {
    type: 'input',
    value: 'admin',
    label: '',
    prop: 'password',
    rules: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { validator: validatePassword, trigger: 'blur' }
    ],
    attrs: {
      placeholder: '请输入密码',
      showPassword: true,
      prefixicon: PasswordIcon
    }
  }
]
const loading = ref<boolean>(false)

const formValue = ref<IloginForm>({
  username: '',
  password: ''
})

// 登录
const submit = () => {
  loginRef.value?.formRef?.validate(async (valid) => {
    if (valid) {
      loading.value = true
      await userStore.fetchSubmitAPI(formValue.value)
      await userStore.fetchUserInfoAPI()
      NotificationBox({ title: `登录成功!` })
      loading.value = false
      router.push('/')
    }
  })
}

// 回车登录
const onKeyUp = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    console.log(formValue.value)
    submit()
    console.log('按下了回车')
  }
}

// 添加键盘监听
onMounted(() => {
  document.addEventListener('keyup', onKeyUp)
})

// 移出键盘监听
onMounted(() => {
  document.addEventListener('keyup', onKeyUp)
})
</script>

<style scoped lang="less">
.login {
  @apply h-full w-full;
  background: #fff;
  .login-title {
    position: fixed;
    top: 56px;
    left: 0;
    right: 0;
    z-index: 2;
    display: flex;
    justify-content: center;
    font-size: 58px;
    font-weight: bold;
    background-image: linear-gradient(to top, #4481eb 0%, #04befe 100%);
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
  }
  .el-row {
    @apply h-full;
    .login-img {
      @apply object-cover h-full;
      background-size: cover;
    }

    .right-container {
      display: flex;
      height: 100%;
      align-items: center;
      background: url('@/assets/images/login/login_background_right.png') no-repeat right bottom !important;
      background: #fff;
      .content {
        width: 420px;
        background: #eef2ff;
        border-radius: 5px;
        text-align: center;
        padding: 30px 60px;
        .title {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 30px;
          justify-content: center;
          h1 {
            font-size: 24px;
            font-weight: bold;
            background-image: linear-gradient(to top, #4481eb 0%, #04befe 100%);
            color: transparent;
            display: inline-block;
            -webkit-background-clip: text;
            background-clip: text;
          }
          .logo-icon {
            width: 100px;
            height: 100px;
          }
        }
        .btn-login {
          @apply w-full !mt-[20px];
          background-image: linear-gradient(to top, #4481eb 0%, #04befe 100%);
          font-size: 16px;
        }
      }
    }
  }
}

@media screen and(max-width: 1260px) {
  .login {
    .content {
      padding: 30px 30px !important;
    }
  }
}
</style>
