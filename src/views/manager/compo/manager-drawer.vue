<template>
  <global-drawer
    size="40%"
    ref="manager_DrawerRef"
    :title="`${isAddOrEdit ? '修改' : '新增'}管理员`"
    @opened="manager_DrawerOpened"
    @closed="manager_DrawerClosed"
    @submit="managerFn"
  >
    <el-form :model="managerForm" ref="managerFormRef" :rules="managerRules" label-width="100px" :inline="false">
      <animation-lottie ref="addNotice_animationRef"></animation-lottie>

      <el-form-item label="用户名" prop="username">
        <el-input v-model="managerForm.username" show-word-limit placeholder="请输入用户名"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
          v-model="managerForm.password"
          show-word-limit
          placeholder="请输入密码"
          type="password"
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item label="头像">
        <p>我是头像</p>
      </el-form-item>

      <el-form-item label="所属管理员" prop="role_id">
        <el-select v-model="managerForm.role_id" placeholder="请选中所属管理员">
          <el-option v-for="item in managerStore.managerList.roles" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="状态">
        <el-switch v-model="managerForm.status" :active-value="1" :inactive-value="0"> </el-switch>
      </el-form-item>
    </el-form>
  </global-drawer>
</template>

<script lang="ts">
import { reactive, ref } from 'vue'

import GlobalDrawer from '@/components/global-drawer.vue'
import AnimationLottie from '@/components/animation-lottie.vue'
import manager from '@/assets/animation/manager.json'

import { useManagerStore } from '@/stores/modules/manager'

import type { addNotice_Data } from '@/services/module/types/notice.type'
import type { FormInstance, FormRules } from 'element-plus'

import { validatePassword, validateUsername } from '@/utils/form-validate'
import type { manager_List } from '@/services/module/types/manager.type'
</script>

<script setup lang="ts">
const managerStore = useManagerStore()
const emit = defineEmits(['updateManager'])

const manager_DrawerRef = ref<InstanceType<typeof GlobalDrawer>>()
const managerFormRef = ref<FormInstance>()

// 判断添加还是修改 添加是0 修改是1
let isAddOrEdit = ref(0)

// 新增按钮的函数
const addNoticeShow = () => {
  isAddOrEdit.value = 0
  manager_DrawerRef.value?.open()
}

type managerForm_Type = {
  username: string
  password: string
  status: number
  role_id?: number
}

const managerForm = reactive<managerForm_Type>({
  username: '',
  password: '',
  status: 1,
  role_id: undefined
})

const managerRules = reactive<FormRules>({
  username: [{ required: true, validator: validateUsername, trigger: 'blur' }],
  password: [{ required: true, validator: validatePassword, trigger: 'blur' }],
  role_id: [{ required: true, message: '请选择所属管理员', trigger: 'change' }]
})

// 动画的ref
let addNotice_animationRef = ref<InstanceType<typeof AnimationLottie>>()

// 抽屉组件-打开
const manager_DrawerOpened = () => {
  //console.log('组件加载')
  addNotice_animationRef.value?.openTottie(manager, 'manager')
}
// 抽屉组件-关闭
const manager_DrawerClosed = () => {
  //console.log('组件关闭')
  // 动画销毁
  addNotice_animationRef.value?.destroysTottie()
  // 表单重置
  managerFormRef.value?.resetFields()
  // 表单清空
  managerForm.username = ''
  managerForm.status = 1
  managerForm.role_id = undefined
}

/**
 * 修改
 */
// 修改表单的id
const editId = ref(0)
const editNotice = (item: manager_List) => {
  isAddOrEdit.value = 1

  managerForm.username = item.username
  managerForm.status = item.status
  managerForm.role_id = item.role.id
  editId.value = item.id

  manager_DrawerRef.value?.open()
  console.log(item)
}

// 添加/删除弹框的 确认按钮
const managerFn = () => {
  managerFormRef.value?.validate((valid) => {
    if (!valid) return
    console.log('表单校验通过', managerForm)
    managerStore.loading = true
    const editOrAddFn = isAddOrEdit.value
      ? managerStore.fetch_editManagerAPI({ id: editId.value, ...managerForm })
      : managerStore.fetch_addManagerAPI({ ...managerForm })

    editOrAddFn
      .then(() => {
        manager_DrawerRef.value?.close()
        if (!isAddOrEdit.value) managerStore.currentPage = 1
        emit('updateManager')
      })
      .finally(() => (managerStore.loading = false))
  })
}

defineExpose({
  addNoticeShow,
  editNotice
})
</script>

<style scoped lang="less"></style>
