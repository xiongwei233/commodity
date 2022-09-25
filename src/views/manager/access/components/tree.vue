<template>
  <div class="tree">
    <el-tree
      :data="data"
      :props="defaultProps"
      node-key="id"
      :default-expanded-keys="defaultExpandedKeys"
      v-loading="loading"
      render-after-expand
      highlight-current
      :check-strictly="checkStrictly"
      :show-checkbox="showCheckbox"
      @check="handleCheckChange"
      ref="treeRef"
    >
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <div class="left">
            <el-tag class="tag" :type="data.menu ? '' : 'info'" size="small">
              {{ data.menu ? '菜单' : '权限' }}
            </el-tag>

            <el-icon v-if="data.icon">
              <component :is="data.icon"></component>
              <!--<component is="edit"></component>-->
            </el-icon>

            <span>{{ data.name }}</span>
          </div>

          <div class="right" @click.stop v-if="showActions">
            <el-switch
              :model-value="data.status"
              :active-value="1"
              :inactive-value="0"
              @change="statusChange($event, data)"
            />

            <el-link type="primary" :underline="false" @click="handleEditClick(data)">
              修改
            </el-link>

            <el-link
              type="primary"
              :underline="false"
              v-if="data.menu"
              @click="handleIncrease(data)"
            >
              增加
            </el-link>
            <popconfirm @confirm="deleteAccess(data)" :show-icon="false"></popconfirm>
          </div>
        </span>
      </template>
    </el-tree>
  </div>
</template>

<script lang="ts">
import type { access_List } from '@/services/module/types/access.type'
import { useAccessStore } from '@/stores/modules/access'

import Popconfirm from '@/components/popconfirm.vue'
import { NotificationBox } from '@/utils/element-Fun'

import type { ElTree } from 'element-plus'
</script>

<script setup lang="ts">
const accessStore = useAccessStore()
const data = computed(() => accessStore.accessLst)
const loading = ref<boolean>(false)
const treeRef = ref<InstanceType<typeof ElTree>>()

const props = withDefaults(
  defineProps<{
    showActions?: boolean
    showCheckbox?: boolean
    checkStrictly?: boolean
  }>(),
  {
    showActions: true,
    showCheckbox: false,
    checkStrictly: false
  }
)

const emits = defineEmits(['editAccess', 'increaseAccess', 'checkChange'])

// tree默认展开
const defaultExpandedKeys = computed(() => data.value.map((item) => item.id))

// 数据刷新
const updateTable = async () => {
  loading.value = true
  await accessStore.fetch_getAccessAPI().finally(() => (loading.value = false))
}

// tree 的 配置
const defaultProps = {
  children: 'child',
  label: 'name'
}

// 删除
const deleteAccess = async (data: access_List) => {
  loading.value = true
  await accessStore.fetch_deleteAccessAPI(data.id).finally(() => (loading.value = false))
  NotificationBox({ title: `删除成功!` })
  updateTable()
}

// 状态
const statusChange = async (val: any, data: access_List) => {
  loading.value = true
  try {
    await accessStore.fetch_statusAccessAPI(data.id, val)
    NotificationBox({ title: `修改状态成功!` })
    updateTable()
  } catch (error) {}
  loading.value = false
}

// 修改
const handleEditClick = (data: access_List) => emits('editAccess', data)
// 增加
const handleIncrease = (data: access_List) => emits('increaseAccess')

// 点击复选框
const handleCheckChange = (checkedNodes: any, checkedKeys: any) => {
  emits('checkChange', { checkedNodes, checkedKeys })
}

defineExpose({
  updateTable,
  treeRef
})
</script>

<style scoped lang="less">
.tree {
  :deep(.el-tree-node__content) {
    padding: 20px 0;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    .left {
      .tag {
        margin: 0 5px;
      }
      .el-icon {
        margin: 0 8px;
        font-size: 18px;
      }
    }
    .right {
      .el-switch {
        margin-right: 10px;
      }
      .el-link {
        padding: 0 10px;
      }
      :deep(.el-link__inner) {
        margin-left: 30px;
      }
    }
  }
}
</style>
