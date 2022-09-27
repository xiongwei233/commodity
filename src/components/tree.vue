<template>
  <div class="tree">
    <el-tree
      :data="treeList"
      :props="{ children: 'child', label: 'name' }"
      node-key="id"
      :default-expanded-keys="defaultExpandedKeys"
      v-loading="globalTreeStore.loading"
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
            <template v-if="showTitleIcon">
              <el-tag class="tag" :type="data.menu ? '' : 'info'" size="small">
                {{ data.menu ? '菜单' : '权限' }}
              </el-tag>
              <el-icon v-if="data.icon">
                <component :is="data.icon"></component>
              </el-icon>
            </template>

            <span>{{ data.name }}</span>
          </div>

          <div class="right" @click.stop v-if="showActions">
            <slot name="treeActions" :row="data"></slot>
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
import { useGlobalTreeStore } from '@/stores/modules/globalTree'

import Popconfirm from '@/components/popconfirm.vue'
import type { ElTree } from 'element-plus'
</script>

<script setup lang="ts">
const globalTreeStore = useGlobalTreeStore()

const treeRef = ref<InstanceType<typeof ElTree>>()

const props = withDefaults(
  defineProps<{
    showActions?: boolean
    showCheckbox?: boolean
    checkStrictly?: boolean
    showTitleIcon?: boolean
    // 名称
    pageName: string
  }>(),
  {
    showActions: true,
    showCheckbox: false,
    checkStrictly: false,
    showTitleIcon: true
  }
)

const emits = defineEmits(['editAccess', 'increaseAccess', 'checkChange'])

// tree默认展开
const defaultExpandedKeys = computed(() => treeList.value?.map((item) => item.id))

// 1.查询用户列表-- 发生网络请求
const updateTable = () => {
  globalTreeStore.gerTreeList_fetch({ pageName: props.pageName })
}
updateTable()

// 2.从pinia获取数据
// 列表数据
const treeList = computed(() => {
  let data: any[] = []
  switch (props.pageName) {
    case 'access':
      data = globalTreeStore.accessTreeList
      break
    case 'category':
      data = globalTreeStore.categoryTreeList
      break
  }
  return data
})

// 删除
const deleteAccess = async (data: access_List) => {
  globalTreeStore.deleteTreeList_fetch({
    pageName: props.pageName,
    id: data.id
  })
}

// 状态
const statusChange = async (val: any, data: access_List) => {
  globalTreeStore.editTableState_fetch({
    id: data.id,
    pageName: props.pageName,
    status: { status: val }
  })
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
      font-size: 12px;
      & > * {
        margin: 0 20px;
      }
      //.el-switch {
      //  margin-right: 10px;
      //}
      //.el-link {
      //  padding: 0 10px;
      //}
      :deep(.el-link__inner) {
        //margin-left: 30px;
        font-size: 12px;
      }
    }
  }
}
</style>
