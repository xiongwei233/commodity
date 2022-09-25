<template>
  <el-popconfirm :title="title" confirm-button-text="确定" cancel-button-text="取消">
    <template #reference>
      <slot>
        <el-button
          text
          :type="type"
          size="small"
          :icon="showIcon ? icon : ''"
          class="popconfirm-icon"
        >
          {{ btnText }}
        </el-button>
      </slot>
    </template>
  </el-popconfirm>
</template>

<script setup lang="ts">
import { Edit } from '@element-plus/icons-vue'

withDefaults(
  defineProps<{
    title?: string
    btnText?: string
    type?: 'danger' | 'default' | 'success' | 'warning' | 'info' | 'primary'
    icon?: any
    showIcon?: boolean
  }>(),
  {
    title: '是否要删除该记录？',
    btnText: '删除',
    type: 'danger',
    icon: Edit,
    showIcon: true
  }
)
</script>
