<template>
  <div class="commen-form">
    <div class="commen-header">
      <slot name="header"></slot>
    </div>

    <el-form ref="FormRef" :label-width="labelWidth" status-icon :model="modelValue">
      <el-row :gutter="20">
        <template v-for="item in formOptions" :key="item.label">
          <el-col v-bind="layoutReactive">
            <el-form-item
              :label="item.label"
              :style="formItemStyle"
              :rules="item.rules"
              :prop="item.field"
              v-if="!item.isHidden"
            >
              <!-- input -->
              <template
                v-if="item.type === 'input' || item.type === 'password' || item.type === 'textarea'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  :type="item.type === 'input' ? 'text' : item.type"
                  :show-password="item.type === 'password'"
                  :style="item.style"
                  :model-value="modelValue[item.field]"
                  v-bind="item.inputAttrs"
                  @update:model-value="handleValueChange($event, item.field)"
                />
              </template>

              <!-- select 选择器 -->
              <template v-else-if="item.type === 'select'">
                <el-select
                  :style="item.style"
                  :model-value="modelValue[item.field]"
                  @update:model-value="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-bind="item.otherOptions"
                    v-for="options in item.options"
                    :key="options.value"
                    :label="options.label"
                    :value="options.value"
                  >
                  </el-option>
                </el-select>
              </template>

              <!-- date-picker 日期选择器 -->
              <template v-else-if="item.type === 'date-picker'">
                <el-date-picker
                  placeholder="选择日期时间"
                  v-bind="item.otherOptions"
                  :style="item.style"
                  :model-value="modelValue[item.field]"
                  @update:model-value="handleValueChange($event, item.field)"
                />
              </template>

              <!-- 其他 -->
              <template v-else>
                <component
                  :placeholder="item.placeholder"
                  :is="`el-${item.type}`"
                  :model-value="modelValue[item.field]"
                  :label="item.label"
                  :style="item.style"
                  v-bind="item.otherOptions"
                  @update:model-value="handleValueChange($event, item.field)"
                ></component>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <!-- 底部插槽 -->
    <div class="commen-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import 'element-plus/dist/index.css'
import { ElSwitch, ElInputNumber, type FormInstance } from 'element-plus'
export default {
  components: {
    ElSwitch,
    ElInputNumber
  }
}
</script>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { IFormItem } from '../types/form.type'

const props = withDefaults(
  defineProps<{
    formOptions: IFormItem[]
    labelWidth?: string
    // from item 的样式
    formItemStyle?: CSSProperties
    // 响应式
    layoutReactive?: {}
    // 绑定绑定值
    modelValue: any
  }>(),
  {
    labelWidth: '80px',
    formItemStyle: () => ({}),
    layoutReactive: () => ({ xl: 6, lg: 8, md: 12, sm: 12, xs: 24 })
  }
)
const emits = defineEmits(['update:modelValue'])

const FormRef = ref<FormInstance>()

// 方法1：上面的HTML配套需要使用v-model绑定的数据是formDate
//看视频 40级-还剩2h18分
// 表单绑定的值,浅拷贝,有问题就改深拷贝
//const formDate = ref({ ...props.modelValue })
// 值改变双向绑定给父组件
//watch(formDate, (newVal) => emits('update:modelValue', newVal), { deep: true })

// 方法2： 上面HTML不用双向绑定，使用 model-value 绑定props里面的modelValue的值
const handleValueChange = (value: string, field: any) => {
  // value 是输入的值，field是表单名，{ [field]: value } 把两个拼在一起
  emits('update:modelValue', { ...props.modelValue, [field]: value })
}

defineExpose({
  FormRef
})
</script>

<style scoped lang="less">
.commen-footer {
  display: flex;
  justify-content: end;
}
</style>
