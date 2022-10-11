<template>
  <div class="comment">
    <el-card shadow="never" :body-style="{ padding: '20px' }">
      <!-- 搜索 -->
      <search-page
        :searchFormConfig="searchConfig"
        @reset-btn-click="handleResetClick"
        @query-btn-click="handleQueryClick"
      />

      <!-- 表格 -->
      <table-page
        :tableConfig="commentTableConfig"
        pageName="goods_comment"
        :show-refresh="false"
        ref="pageCountentRef"
      >
        <!-- 展开 -->
        <template #expand="scope">
          <div class="expand">
            <el-avatar size="large" shape="circle" :src="scope.row.user.avatar" fit="cover" />
            <aside class="header">
              <div class="top">
                <p class="info">
                  <span> {{ scope.row.user.username }}</span>
                  <span class="create_time"> {{ scope.row.user.create_time }}</span>
                </p>
                <p class="pinjia">{{ scope.row.review.data }}</p>
              </div>

              <div class="img-box">
                <template v-for="item in scope.row.review.image" :key="item">
                  <el-image :src="item" fit="cover" lazy class="image" />
                </template>
              </div>

              <div class="comment-box">
                <div v-if="!replyShow" class="comment">
                  <div class="headerss">
                    <h3>客服</h3>
                    <el-button
                      :type="scope.row?.extra[0].isuser ? 'primary' : 'info'"
                      size="small"
                      @click="editReplyHanlder(scope.row)"
                    >
                      {{ scope.row?.extra[0].isuser ? '评论' : '修改' }}
                    </el-button>
                  </div>
                  <div class="item">{{ scope.row?.extra[0].data }}</div>
                </div>

                <div v-else class="reply">
                  <el-input
                    type="textarea"
                    v-model="replyValue"
                    placeholder="请输入回复内容"
                    :rows="2"
                  >
                  </el-input>
                  <el-button
                    type="primary"
                    size="small"
                    class="mt-2"
                    @click="editFeatch(scope.row.id)"
                  >
                    确定
                  </el-button>
                  <el-button type="info" size="small" @click="replyShow = false">取消</el-button>
                </div>
              </div>
            </aside>
          </div>
        </template>

        <template #goods_item="scope">
          <div class="goods_item">
            <el-image
              :src="scope.row.goods_item.cover"
              fit="cover"
              :lazy="true"
              class="h-16 w-16"
            />
            <div class="content">
              <p>{{ scope.row.goods_item.title }}</p>
              <p>价格：￥{{ scope.row.goods_item.rating }}</p>
            </div>
          </div>
        </template>

        <template #user—info="scope">
          <div class="user—info">
            <p>用户: {{ scope.row.user.username }}</p>
            <el-rate
              :model-value="scope.row.rating"
              :score-template="`${scope.row.rating} 分`"
              text-color="#ff9900"
              disabled
              size="small"
              show-score
            />
          </div>
        </template>
      </table-page>
    </el-card>
  </div>
</template>

<script lang="ts">
// 搜索
import { searchConfig } from './config/search.config'
import searchPage from '@/components/search-page'

// 表格
import TablePage from '@/components/table-page'
import { commentTableConfig } from './config/comment.config'

//hooks
import { useTableSearch } from '@/hooks/useTable_Search'

import { useOrderStore } from '@/stores/modules/order'
import { NotificationBox } from '@/utils/element-Fun'
</script>

<script setup lang="ts">
const orderStore = useOrderStore()
// 搜索表单
const { pageCountentRef, handleResetClick, handleQueryClick } = useTableSearch()

const replyShow = ref<boolean>(false)
const replyValue = ref<string>('')

const editReplyHanlder = (row: any) => {
  replyShow.value = true
  replyValue.value = row.extra[0].data
}

const editFeatch = (id: number) => {
  orderStore
    .commentReply_fetch(id, replyValue.value)
    .then(() => {
      NotificationBox({ title: '修改成功' })
      pageCountentRef.value?.getPageDate()
    })
    .finally(() => {
      replyShow.value = false
    })
}
</script>

<style scoped lang="less">
.comment {
  .expand {
    padding-left: 50px;
    padding-top: 10px;
    display: flex;

    .header {
      padding-left: 14px;
      flex: 1;

      .top {
        .info {
          .create_time {
            padding-left: 10px;
            font-size: 12px;
            color: #999;
          }
        }
      }

      .image {
        @apply h-20 w-20 my-2;
      }

      .comment-box {
        @apply w-3/6;

        .comment {
          @apply p-3;
          background-color: #f5f7fa;

          .headerss {
            display: flex;
            justify-content: space-between;
          }

          .item {
            line-height: 2;
          }
        }
      }
    }
  }

  .goods_item {
    display: flex;
    align-items: center;

    .content {
      text-align: start;
      padding-left: 10px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
