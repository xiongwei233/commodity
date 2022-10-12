<template>
  <div class="add-refresh">
    <el-row :gutter="20" align="middle">
      <!-- 按钮 -->
      <el-col :span="22">
        <el-row>
          <el-col :lg="3" :md="4" :sm="5" :xs="5" v-if="showSlotAdd">
            <slot name="add"></slot>
          </el-col>
          <el-col :lg="12" :md="20" :sm="19" :xs="19">
            <slot name="form"></slot>
          </el-col>
        </el-row>
      </el-col>

      <!-- 关键词 -->
      <el-col :span="2" class="!flex justify-end">
        <el-tooltip content="刷新" placement="bottom">
          <span @click="updateTable()" style="cursor: pointer">
            <el-icon><Refresh /></el-icon>
          </span>
        </el-tooltip>
        <!-- 可以添加多个按钮 -->
        <slot name="other"></slot>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts"></script>

<script setup lang="ts">
withDefaults(
  defineProps<{
    showSlotAdd?: boolean
  }>(),
  {
    showSlotAdd: true
  }
)

const emits = defineEmits(['updateTable'])
const updateTable = () => emits('updateTable')
</script>

<style scoped lang="less">
.el-icon {
  font-size: 20px;
  &:hover {
    color: #386cfb;
  }
}
</style>
