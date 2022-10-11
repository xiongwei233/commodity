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
            <el-dropdown-item @click="headersDrawerRef?.open()">修改密码</el-dropdown-item>
            <el-dropdown-item @click="logoutHook">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <!-- 修改密码对话框 -->
    <headers-drawer ref="headersDrawerRef"></headers-drawer>
  </div>
</template>

<script lang="ts">
import { useFullscreen } from '@vueuse/core'
import { removeToken } from '@/utils/cookie'
import { useLoginStore } from '@/stores/modules/login'

import LogoIconWhite from '@/assets/icons/login/logo-icon-white.vue'
import HeadersDrawer from './headers-drawer.vue'
import { NotificationBox } from '@/utils/element-Fun'
</script>

<script setup lang="ts">
const APP_TITLE = import.meta.env.VITE_APP_TITLE
const userStore = useLoginStore()
const router = useRouter()

// 修改密码对话框
const headersDrawerRef = ref<InstanceType<typeof HeadersDrawer>>()

//sidebar 的收缩
const isSide = () => {
  userStore.sideBar.asideWidth = userStore.sideBar.asideWidth === '250px' ? '64px' : '250px'
}

// 全屏
const { isFullscreen, toggle } = useFullscreen()
// 刷新页面
const handleRefresh = () => location.reload()

// 退出登录
const logoutHook = async () => {
  // 退出登录
  const confirm = await ElMessageBox.confirm('是否要退出登录?', '退出登录', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).catch((err: string) => err)
  // 点击取消阻止退出登录
  if (confirm === 'cancel') return

  // 点击确定 执行下面
  //console.log('退出登录')
  const result: any = await userStore.fetchLogoutAPI()
  removeToken()
  router.push({ path: '/login' })
  userStore.token = ''
  NotificationBox({ title: result.data || '退出登录成功' })
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
