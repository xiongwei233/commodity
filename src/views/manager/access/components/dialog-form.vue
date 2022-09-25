<template>
  <div class="access-dialog">
    <!-- 表单 -->
    <el-form :model="menuForm" ref="formRef" :rules="menuRules" label-width="100px">
      <el-form-item label="上级菜单" prop="rule_id">
        <el-cascader
          :options="rules"
          :props="{
            value: 'id',
            label: 'name',
            children: 'child',
            multiple: false,
            emitPath: false,
            checkStrictly: true
          }"
          clearable
          class="w-[calc(100%+1rem)]"
          placeholder="请选择上级菜单"
          v-model="menuForm.rule_id"
        />
      </el-form-item>

      <el-form-item label="菜单/规则">
        <el-radio-group v-model="menuForm.menu">
          <el-radio :label="1" size="large" border>菜单</el-radio>
          <el-radio :label="0" size="large" border>规则</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="menuForm.name" placeholder="请填写菜单名称" />
      </el-form-item>

      <el-form-item label="菜单图标" v-if="menuForm.menu && menuForm.menu === 1" prop="icon">
        <el-icon :size="18" v-if="menuForm.icon" class="mr-2">
          <component :is="menuForm.icon" />
        </el-icon>
        <select-v2 v-model="(menuForm.icon as string)"></select-v2>
      </el-form-item>

      <template v-if="!menuForm.menu && menuForm.menu === 0">
        <el-form-item label="后端规则">
          <el-input v-model="menuForm.condition" placeholder="请填写后端规则" />
        </el-form-item>

        <el-form-item label="请求方式" prop="method">
          <el-select v-model="menuForm.method">
            <el-option
              v-for="item in ['GET', 'POST', 'PUT', 'DELETE']"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </template>

      <el-form-item label="排序" prop="order">
        <el-input-number v-model="menuForm.order" :min="1" :max="1000" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { useAccessStore } from '@/stores/modules/access'

import SelectV2 from '@/components/select-v2.vue'

import { menuRules } from '../config/access-validate'
import type { addAccess_queryType } from '@/services/module/access'
import type { FormInstance } from 'element-plus'
</script>

<script setup lang="ts">
const accessStore = useAccessStore()

const props = withDefaults(
  defineProps<{
    // 编辑的回显数据
    defaultInfo?: any
  }>(),
  {
    defaultInfo: () => ({})
  }
)
const formRef = ref<FormInstance>()

const emits = defineEmits(['update:tableForm', 'submit', 'drawerClosed'])

const rules = computed(() => accessStore.accessRules)

//// 菜单的form值
let menuForm = ref<addAccess_queryType>({
  rule_id: '',
  menu: 0,
  name: '',
  condition: '',
  method: 'GET',
  status: 1,
  order: 50,
  icon: '',
  frontpath: ''
})

console.log(props.defaultInfo)
watch(
  () => props.defaultInfo,
  (newValue) => {
    console.log(newValue)
    for (const item in menuForm.value) {
      menuForm.value[item] = newValue[item]
    }
  },
  {
    immediate: true
  }
)

defineExpose({
  menuForm,
  formRef
})
</script>

<style scoped lang="less"></style>
