<template>
  <div class="image-aside" v-loading="loading">
    <div class="aside-box">
      <template v-for="item in imageStore?.list?.list" :key="item.id">
        <div class="aside-item" :class="{ active: item.id === activeIndex }" @click.stop="clickCategory(item)">
          <span> {{ item.name }}</span>
          <section>
            <el-icon class="icon" @click.stop="editCategory(item)"><Edit /></el-icon>
            <el-popconfirm
              title="是否要删除该分类？"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="confirmDelete(item)"
            >
              <template #reference>
                <el-icon><Close /></el-icon>
              </template>
            </el-popconfirm>
          </section>
        </div>
      </template>
    </div>

    <!-- 分页 -->
    <footer>
      <el-pagination
        :current-page="currentPage"
        background
        layout="prev, pager, next"
        hide-on-single-page
        @current-change="handleCurrentChange"
        :page-count="calcPage"
        :disabled="loading"
        small
      />
    </footer>

    <!-- 新增/修改分类 -->
    <global-drawer
      ref="addCategory_ref"
      :title="drawerTitle + '图片分类'"
      size="40%"
      @close="addCategory_close"
      @open="addCategory_open"
      @submit="addCategory_submitFn"
    >
      <animation-lottie ref="addCategory_animationRef" style="margin-bottom: 20px" />

      <el-form
        ref="addCategory_formRef"
        :model="addCategory_form"
        :rules="addCategory_rules"
        size="large"
        label-width="80px"
      >
        <el-form-item prop="name" label="相册名称">
          <el-input type="text" v-model="addCategory_form.name" placeholder="请输入相册名称" />
        </el-form-item>

        <el-form-item label="排序" prop="order">
          <el-input-number v-model="addCategory_form.order" :min="1" :max="1000" />
        </el-form-item>
      </el-form>
    </global-drawer>

    <!-- 删除分类 -->
  </div>
</template>

<script lang="ts">
import { useImageStore } from '@/stores/modules/image'

import GlobalDrawer from '@/components/global-drawer.vue'
import AnimationLottie from '@/components/animation-lottie.vue'

// hook
import { cateAndpages, operateCategory } from '@/views/other/compo/hooks/useImageAside'
import type { image_List } from '@/services/module/types/image.type'
</script>

<script setup lang="ts">
const imageStore = useImageStore()

const emit = defineEmits(['change'])

/**
 * 分页和分类
 */
const { activeIndex, clickCategory, loading, currentPage, handleCurrentChange, calcPage } = cateAndpages(emit)

/**
 * 新增/修改分类
 */
const {
  isopen,
  drawerTitle,
  // 添加
  addCategory_ref,
  addCategory_form,
  addCategory_formRef,
  addCategory_rules,
  addCategory_animationRef,
  addCategory_close,
  addCategory_open,
  addCategory_submitFn,

  //修改
  editCategory
} = operateCategory()

/**
 *  删除分类
 */
const confirmDelete = async (itme: image_List) => {
  await imageStore.fetch_deleteImageCategoryAPI(itme.id)
  await imageStore.fetch_getImageAPI({ page: imageStore.catePage })
}

// 把打开新增分类数据的盒子暴露出去
defineExpose({
  isopen
})
</script>

<style scoped>
::-webkit-scrollbar {
  width: 4px;
  height: 6px;
}
::-webkit-scrollbar-corner {
  display: block;
}
::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.2);
}

::-webkit-scrollbar-thumb,
::-webkit-scrollbar-track {
  border-right-color: transparent;
  border-left-color: transparent;
}
</style>

<style scoped lang="less">
.image-aside {
  width: 220px;
  border-right: 1px solid #f1f1f1;
  height: 100%;
  position: relative;

  .aside-box {
    overflow: auto;
    position: absolute;
    height: 100%;
    top: 0;
    right: 0;
    left: 0;
    .aside-item {
      width: 100%;
      height: 48px;
      border-bottom: 1px solid #f1f1f1;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      cursor: pointer;

      &:hover {
        background-color: #40a0ff1a;
      }
      span {
        line-height: 48px;
        max-width: 100px;
        @apply truncate;
        color: #6b7280;
      }
      section {
        color: #409eff;
        .el-icon {
          cursor: pointer;
          width: 30px;
          height: 30px;
          &:hover {
            color: #386cfb;
          }
        }
        .icon {
          margin-right: 8px;
        }
      }
    }

    .active {
      background-color: #40a0ff1a;
    }
  }
  footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
