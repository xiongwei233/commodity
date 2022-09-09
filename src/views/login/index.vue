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

            <el-form ref="loginRef" :model="loginForm" :rules="loginRules" status-icon size="large">
              <el-form-item prop="username">
                <el-input v-model="loginForm.username" placeholder="请输入用户名" :prefix-icon="UserIcon" />
              </el-form-item>

              <el-form-item prop="password">
                <el-input
                  type="password"
                  v-model="loginForm.password"
                  placeholder="请输入密码"
                  :prefix-icon="PasswordIcon"
                  show-password
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="large" class="btn-login" @click="submit" :loading="loading">
                  登录
                </el-button>
              </el-form-item>
            </el-form>
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

import { useRouter } from 'vue-router'
import { reactive, ref, onMounted } from 'vue'

//import { User } from '@element-plus/icons-vue'
import type { FormRules, FormInstance } from 'element-plus'
import type { IloginForm } from '@/types/user'
import { useUserStore } from '@/stores/modules/user'
import { validatePassword, validateUsername } from '@/utils/form-validate'
</script>

<script setup lang="ts">
const router = useRouter()
const userStore = useUserStore()

const loginRef = ref<FormInstance>()
const APP_TITLE = import.meta.env.VITE_APP_TITLE

const loginForm = reactive<IloginForm>({
  username: 'admin',
  password: 'admin'
})

const loginRules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { validator: validateUsername, trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { validator: validatePassword, trigger: 'blur' }
  ]
})

const loading = ref<boolean>(false)

// 登录
const submit = () => {
  loginRef.value?.validate(async (valid) => {
    if (valid) {
      loading.value = true
      await userStore.fetchSubmitAPI(loginForm)
      await userStore.fetchUserInfoAPI()
      ElNotification({ title: '登录成功', type: 'success' })
      loading.value = false
      router.push('/')
    }
  })
}

// 回车登录
const onKeyUp = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    // 登录按钮
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
