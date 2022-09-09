<template>
  <div class="app-headers">
    <div class="left">
      <div class="logo" @click="$router.push('/')">
        <logo-icon-white class="logo-icon"></logo-icon-white>
        <h1>{{ APP_TITLE }}</h1>
      </div>

      <div class="cions">
        <el-icon @click="isSide">
          <Fold v-if="!userStore.sideBar.isCollapse" />
          <Expand v-else />
        </el-icon>
        <el-tooltip content="刷新" placement="bottom">
          <el-icon @click="handleRefresh"><Refresh /></el-icon>
        </el-tooltip>
      </div>
    </div>

    <div class="right">
      <!-- 全屏 -->
      <el-tooltip :content="!isFullscreen ? '全屏' : '取消全屏'" placement="bottom">
        <el-icon class="FullScreen" @click="toggle">
          <!-- 对图标进行判断 -->
          <FullScreen v-if="!isFullscreen" />
          <Aim v-else />
        </el-icon>
      </el-tooltip>

      <el-avatar :size="30" :src="userStore.userInfo.avatar" />
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userStore.userInfo.username }}
          <el-icon> <arrow-down /> </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="drawerRef.open()">修改密码</el-dropdown-item>
            <el-dropdown-item @click="logoutHook">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <!-- 修改密码 -->
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
      <el-form
        ref="editFormRef"
        :model="editPsswordForm"
        :rules="editPsswordRules"
        status-icon
        size="large"
        label-width="80px"
      >
        <el-form-item prop="oldpassword" label="旧密码">
          <el-input type="password" v-model="editPsswordForm.oldpassword" placeholder="请输入旧密码" show-password />
        </el-form-item>

        <el-form-item prop="password" label="新密码">
          <el-input type="password" v-model="editPsswordForm.password" placeholder="请输入新密码" show-password />
        </el-form-item>

        <el-form-item prop="repassword" label="确认密码">
          <el-input type="password" v-model="editPsswordForm.repassword" placeholder="请重新输入密码" show-password />
        </el-form-item>
      </el-form>
    </global-drawer>
  </div>
</template>

<script lang="ts">
import { useUserStore } from '@/stores/modules/user'
import { ref, reactive } from 'vue'

// icon 和 element类型/自己类型
import LogoIconWhite from '@/assets/icons/login/logo-icon-white.vue'
import type { FormRules, FormInstance } from 'element-plus'
import type { IEditPassword } from '@/types/user'

// 动画
import { useFullscreen } from '@vueuse/core'
import analyze from '@/assets/animation/analyze.json'

// 抽离成hook了
import { logoutHook, submitHook } from './hooks/useHeaders'
import { validatePassword, validateRepeatPass } from '@/utils/form-validate'

import AnimationLottie from '@/components/animation-lottie.vue'
import GlobalDrawer from '@/components/global-drawer.vue'
</script>

<script setup lang="ts">
const APP_TITLE = import.meta.env.VITE_APP_TITLE
const userStore = useUserStore()

//sidebar 的显示隐藏
const isSide = () => {
  userStore.sideBar.asideWidth = userStore.sideBar.asideWidth === '250px' ? '64px' : '250px'
}

// 全屏
const { isFullscreen, toggle } = useFullscreen()
// 刷新页面
const handleRefresh = () => location.reload()

// 修改密码对话框
const drawerRef = ref<any>(null)
// 修改密码表单
const editFormRef = ref<FormInstance | null>(null)

// 动画的DOM
const editAnalyzeRef = ref<InstanceType<typeof AnimationLottie>>()
// 打开 修改密码对话框 执行的内容.
const drawerOpen = () => {
  editAnalyzeRef.value?.openTottie(analyze, 'analyze')
}
// 关闭修改密码对话框
const drawerClose = () => {
  editAnalyzeRef.value?.destroysTottie()
  // 清空表单数据
  editFormRef.value?.resetFields()
}

// 密码
const editPsswordForm = reactive<IEditPassword>({
  oldpassword: '',
  password: '',
  repassword: ''
})
// password有值，就校验repassword,封装的hook调用
const validRepassword = () => {
  editFormRef?.value?.validateField('repassword', () => null)
}
// 重复密码校验的函数
const { validatePass, validateCheckPass } = validateRepeatPass(validRepassword)
// 表单校验规则
const editPsswordRules = reactive<FormRules>({
  oldpassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { validator: validatePassword, trigger: 'blur' }
  ],
  password: [{ required: true, validator: validatePass, trigger: 'blur' }],
  repassword: [{ required: true, validator: validateCheckPass, trigger: 'blur' }]
})

// 修改密码
const submit = () => {
  submitHook({ editFormRef, drawerRef, editPsswordForm })
}
</script>

<style scoped lang="less">
.app-headers {
  height: 64px;
  background: #386cfb;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  z-index: 999;
  .left {
    display: flex;
    justify-content: center;
    align-items: center;
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 250px;
      cursor: pointer;

      h1 {
        font-size: 22px;
      }
      .icon {
        width: 60px;
        height: 60px;
      }
    }
    .cions {
      .el-icon {
        height: 64px;
        width: 42px;
        cursor: pointer;
        &:hover {
          background: #3361df;
        }
      }
    }
  }
  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .FullScreen {
      cursor: pointer;
      height: 64px;
      width: 42px;
      &:hover {
        background: #3361df;
      }
    }
    .el-avatar {
      margin-left: 10px;
    }
    .el-dropdown {
      padding: 0 20px 0 10px;
      cursor: pointer;
      .el-dropdown-link {
        color: white;
      }
    }
  }
  .el-drawer {
    .el-drawer__body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .edit-analyze {
        width: 320px;
        height: 320px;
        margin: 0 auto;
        margin-bottom: 0px;
      }
    }
  }
}
</style>
