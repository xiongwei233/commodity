<template>
  <global-drawer
    size="40%"
    ref="manager_DrawerRef"
    :title="`${isAddOrEdit ? '修改' : '新增'}管理员`"
    @drawerClose="manager_DrawerClosed"
    @submit="managerFn"
    :animate="manager"
  >
    <el-form
      :model="managerForm"
      ref="managerFormRef"
      :rules="managerRules"
      label-width="100px"
      :inline="false"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="managerForm.username"
          show-word-limit
          placeholder="请输入用户名"
        ></el-input>
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
        <choose-images v-model="managerForm.avatar" />
      </el-form-item>

      <el-form-item label="所属管理员" prop="role_id">
        <el-select v-model="managerForm.role_id" placeholder="请选中所属管理员">
          <el-option
            v-for="item in managerStore.managerList.roles"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
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
import { useManagerStore } from '@/stores/modules/manager'

import GlobalDrawer from '@/components/global-drawer.vue'
import ChooseImages from '@/components/choose-images.vue'

import manager from '@/assets/animation/manager.json'

import { validatePassword, validateUsername } from '@/utils/form-validate'

import type { FormInstance, FormRules } from 'element-plus'
import type { manager_List } from '@/services/module/types/manager.type'
import type { addManager_queryType } from '@/services/module/manager'
</script>

<script setup lang="ts">
const managerStore = useManagerStore()
managerStore.fetch_getManagerAPI({ limit: 10, page: 1 })
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

const managerForm = reactive<addManager_queryType<string, number>>({
  username: '',
  password: '',
  status: 1,
  role_id: undefined,
  avatar: ''
})

const managerRules = reactive<FormRules>({
  username: [{ required: true, validator: validateUsername, trigger: 'blur' }],
  password: [{ required: true, validator: validatePassword, trigger: 'blur' }],
  role_id: [{ required: true, message: '请选择所属管理员', trigger: 'change' }]
})

// 抽屉组件-关闭
const manager_DrawerClosed = () => {
  // 表单重置
  managerFormRef.value?.resetFields()
  // 表单清空
  managerForm.username = ''
  managerForm.status = 1
  managerForm.role_id = undefined
  managerForm.avatar = ''
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
  managerForm.avatar = item.avatar

  console.log('绑定的', managerForm)
  editId.value = item.id

  manager_DrawerRef.value?.open()
  console.log(item)
}

// 添加/删除弹框的 确认按钮
const managerFn = () => {
  managerFormRef.value?.validate((valid) => {
    if (!valid) return
    console.log('表单校验通过', managerForm)
    const editOrAddFn = isAddOrEdit.value
      ? managerStore.fetch_editManagerAPI({ id: editId.value, ...managerForm })
      : managerStore.fetch_addManagerAPI({ ...managerForm })

    editOrAddFn.then(() => {
      manager_DrawerRef.value?.close()
      emit('updateManager')
    })
  })
}

defineExpose({
  addNoticeShow,
  editNotice
})
</script>

<style scoped lang="less"></style>
