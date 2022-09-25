<template>
  <el-form
    ref="formRef"
    v-if="model"
    v-bind="$attrs"
    :model="model"
    :rules="rules"
    :validate-on-rule-change="false"
  >
    <!-- 需要插入的内容 -->
    <slot name="header"></slot>
    <template v-for="(item, index) in options" :key="index">
      <!-- 只有一级标签 -->
      <el-form-item
        :label="item.label"
        :prop="item.prop"
        v-if="!item.children || !item.children?.length"
      >
        <!-- input输入框-->
        <component
          :is="`el-${item.type}`"
          :type="item?.attrs?.inputType"
          v-bind="item.attrs"
          v-model="model[item.prop!]"
          :prefix-icon="item.attrs?.prefixicon"
          :suffix-icon="item.attrs?.suffixIcon"
        >
        </component>
        <!--
        <component v-else :is="`el-${item.type}`" v-bind="item.attrs" v-model="model[item.prop!]">
        </component>-->
      </el-form-item>

      <!-- 嵌套标签 -->
      <el-form-item
        :label="item.label"
        :prop="item.prop"
        v-if="item.children && item.children.length"
      >
        <component :is="`el-${item.type}`" v-bind="item.attrs" v-model="model[item.prop!]">
          <!-- 二级嵌套 -->
          <component
            v-for="(child, i) in item.children"
            :key="i"
            :is="`el-${item.childrenType}`"
            :label="child.label"
            :value="child.value"
          ></component>
        </component>
      </el-form-item>
    </template>

    <slot name="footer"></slot>

    <!-- 自定义插槽  可以用来放button-->
    <el-form-item>
      <!-- 作用域插槽  把formRef返回给使用者 / 把表单数据返回给使用者-->
      <slot name="action" :form="formRef" :model="model"></slot>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { ref, onMounted, watch } from 'vue'
import 'element-plus/dist/index.css'
import {
  ElAutocomplete,
  ElCascader,
  ElCascaderPanel,
  ElCheckbox,
  ElCheckboxGroup,
  ElCheckboxButton,
  ElColorPicker,
  ElDatePicker,
  ElInput,
  ElInputNumber,
  ElRadioGroup,
  ElRadio,
  ElRadioButton,
  ElRate,
  ElSelect,
  ElOption,
  ElSelectV2,
  ElSlider,
  ElSwitch,
  ElTimePicker,
  ElTimeSelect,
  ElTransfer,
  type FormInstance
} from 'element-plus'
import { cloneDeep } from 'lodash'
import type { FormOptions } from './types/types'

export default {
  components: {
    ElAutocomplete,
    ElCascader,
    ElCascaderPanel,
    ElCheckbox,
    ElCheckboxGroup,
    ElCheckboxButton,
    ElColorPicker,
    ElDatePicker,
    ElInput,
    ElInputNumber,
    ElRadioGroup,
    ElRadio,
    ElRadioButton,
    ElRate,
    ElSelect,
    ElOption,
    ElSelectV2,
    ElSlider,
    ElSwitch,
    ElTimePicker,
    ElTimeSelect,
    ElTransfer
  }
}
</script>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    // 表单的配置
    options: FormOptions[]
    modelValue: Object
  }>(),
  {
    modelValue: () => ({})
  }
)
// 返回表单数据
const emits = defineEmits(['update:modelValue'])

// 装着所有表单的 v-model绑定的值
const model = ref<any>(null)
// 装着所有表单的 校验规则
const rules = ref<any>(null)
// 表单的类型
const formRef = ref<FormInstance | null>(null)

// 初始表单
let initForm = () => {
  // 只有 有options配置才渲染
  if (props.options && props.options.length) {
    // 用来拷贝暂存的
    let m: any = {}
    let r: any = {}
    // 让各个表单数据不受影响 - 需要深拷贝
    props.options.map((item: FormOptions) => {
      m[item.prop!] = item.value
      r[item.prop!] = item.rules
      model.value = cloneDeep(m)
      rules.value = cloneDeep(r)
      // 打印
      //console.log(model.value)
      //console.log(rules.value)
    })
  }
}

onMounted(() => initForm())

// 监听父组件传递进来的options的变化, 防止后台更新了输入框的数据,这里不更新
watch(
  () => props.options,
  () => {
    initForm()
    //console.log('表单数据更新了', props.options)
  },
  { deep: true }
)

// 删掉表单绑定的value
const removeModel = () => {
  if (model.value) {
    for (let key in model.value) {
      model.value[key] = ''
    }
    console.log(model.value)
  }
}

// 返回表单数据
watch(
  () => model.value,
  (val) => {
    //console.log('当前表单的输入内容', val)
    emits('update:modelValue', val)
  },
  { deep: true }
)

/**
 * 表单验证/重置
 */
let resetFields = () => {
  return formRef.value?.resetFields
}

// 表单验证
let validate = () => {
  // validate没有括号
  return formRef.value?.validate
}
// 获取表单数据
let getFormDate = () => model.value

defineExpose({
  resetFields,
  validate,
  getFormDate,
  formRef,
  removeModel
})
</script>
