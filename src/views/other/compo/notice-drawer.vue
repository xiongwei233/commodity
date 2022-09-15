<template>
  <global-drawer
    size="40%"
    ref="notice_DrawerRef"
    :title="`${isAddOrEdit ? '修改' : '添加'}公告信息`"
    @opened="notice_DrawerOpened"
    @closed="notice_DrawerClosed"
    @submit="noticeFn"
  >
    <animation-lottie ref="notice_animationRef" class="!w-96 !h-96"></animation-lottie>
    <!-- 表单 -->
    <common-form
      :inline="false"
      ref="notice_FormRef"
      label-width="80px"
      :options="formOptions"
    ></common-form>
  </global-drawer>
</template>

<script lang="ts">
import GlobalDrawer from '@/components/global-drawer.vue'
import CommonForm from '@/components/common-form/index.vue'

import { useNoticeStore } from '@/stores/modules/notice'
import { ref, reactive } from 'vue'

import info from '@/assets/animation/info.json'
import type AnimationLottie from '@/components/animation-lottie.vue'
import type { addNotice_Data } from '@/services/module/types/notice.type'
import type { FormOptions } from '@/components/common-form/types/types'
</script>

<script setup lang="ts">
const noticeStore = useNoticeStore()
// 判断添加还是修改 添加是0 修改是1
let isAddOrEdit = ref(0)
// 修改表单的id
const editId = ref(0)
const emits = defineEmits(['updateTable'])

const notice_DrawerRef = ref<InstanceType<typeof GlobalDrawer>>()
const notice_FormRef = ref<InstanceType<typeof CommonForm>>()
const loading = ref<boolean>(false)
// 动画的ref
let notice_animationRef = ref<InstanceType<typeof AnimationLottie>>()

// 表单的配置
let formOptions = reactive<FormOptions[]>([
  {
    type: 'input',
    value: '',
    label: '公告标题',
    prop: 'title',
    rules: [{ required: true, message: '公告标题不能为空', trigger: 'blur' }],
    attrs: {
      placeholder: '请输入公告标题',
      maxlength: 50,
      showWordLimit: true
    }
  },
  {
    type: 'input',
    value: '',
    label: '公告内容',
    prop: 'content',
    rules: [{ required: true, message: '公告内容不能为空', trigger: 'blur' }],
    attrs: {
      placeholder: '请输入公告内容',
      inputType: 'textarea',
      maxlength: 300,
      showWordLimit: true,
      rows: 4
    }
  }
])

// 修改弹框
const editNotice = (editItem: addNotice_Data) => {
  // 找到表单 并给他赋值
  formOptions.map((item) => {
    if (item.prop === 'title') item.value = editItem.title
    else if (item.prop === 'content') item.value = editItem.content
  })
  //console.log('修改表单的数据:', formOptions)
  isAddOrEdit.value = 1
  editId.value = editItem.id
  notice_DrawerRef.value?.open()
}
// 添加弹框
const addNotice = () => {
  // 清空表单
  //formOptions.map((item) => (item.value = ''))

  isAddOrEdit.value = 0
  notice_DrawerRef.value?.open()
}

// 抽屉组件-打开
const notice_DrawerOpened = () => {
  //console.log('组件加载')
  notice_animationRef.value?.openTottie(info, 'info')
}

// 抽屉组件-关闭
const notice_DrawerClosed = () => {
  //console.log('组件关闭')
  // 动画销毁
  notice_animationRef.value?.destroysTottie()
  // 表单重置
  notice_FormRef.value?.formRef?.resetFields()

  // 清空数据
  //notice_FormRef.value?.removeModel()
  formOptions.map((item) => (item.value = ''))
}

// 添加/修改弹框的 确认按钮
const noticeFn = () => {
  notice_FormRef.value?.formRef?.validate((valid) => {
    if (!valid) return
    console.log('表单校验通过')

    notice_DrawerRef.value!.loading = true
    loading.value = true

    // 表单绑定的值
    const formDate = notice_FormRef.value?.getFormDate()
    console.log(formDate)

    const editOrAddFn = isAddOrEdit.value
      ? noticeStore.fetch_editNoticeAPI({ id: editId.value, ...formDate })
      : noticeStore.fetch_addNoticeAPI({ ...formDate })

    editOrAddFn
      .then(() => {
        notice_DrawerRef.value?.close()
        // 获取列表重新更新数据
        emits('updateTable', isAddOrEdit.value)
      })
      .finally(() => {
        loading.value = false
        notice_DrawerRef.value!.loading = false
      })
  })
}

defineExpose({
  addNotice,
  editNotice
})
</script>

<style scoped lang="scss"></style>
