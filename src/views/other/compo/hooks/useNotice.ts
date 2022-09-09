import { useNoticeStore } from '@/stores/modules/notice'
import { ref, computed, reactive } from 'vue'

import info from '@/assets/animation/info.json'

import type { FormInstance, FormRules } from 'element-plus'
import type { addNotice_queryType } from '@/services'
import type AnimationLottie from '@/components/animation-lottie.vue'
import type { addNotice_Data } from '@/services/module/types/notice.type'
import type GlobalDrawer from '@/components/global-drawer.vue'

export const editOrAddFunction = () => {
  const noticeStore = useNoticeStore()

  /**
   * 分页
   */
  const currentPage = ref<number>(1)
  const loading = ref<boolean>(false)
  // 表格数据请求
  const listFnAPI = () => {
    loading.value = true
    noticeStore.fetch_getNoticeAPI(currentPage.value).finally(() => (loading.value = false))
  }
  listFnAPI()

  const calcPage = computed(() => Math.ceil(noticeStore.noticeList.totalCount / 10))
  const handleCurrentChange = (val: number) => {
    currentPage.value = val
    listFnAPI()
  }

  /**
   * 新增
   */
  const addNoticeShow = () => {
    isAddOrEdit.value = 0
    addNotice_DrawerRef.value?.open()
  }
  const addNotice_DrawerRef = ref<InstanceType<typeof GlobalDrawer>>()
  const addNotice_FormRef = ref<FormInstance>()
  const addNoticeForm = reactive<addNotice_queryType>({
    title: '',
    content: ''
  })
  const addNoticeRules = reactive<FormRules>({
    title: [{ required: true, message: '公告标题不能为空', trigger: 'blur' }],
    content: [{ required: true, message: '公告内容不能为空', trigger: 'blur' }]
  })
  // 动画的ref
  let addNotice_animationRef = ref<InstanceType<typeof AnimationLottie>>()

  // 抽屉组件-打开
  const addNotice_DrawerOpened = () => {
    //console.log('组件加载')
    addNotice_animationRef.value?.openTottie(info, 'info')
  }
  // 抽屉组件-关闭
  const addNotice_DrawerClosed = () => {
    //console.log('组件关闭')
    // 动画销毁
    addNotice_animationRef.value?.destroysTottie()
    // 表单重置
    addNotice_FormRef.value?.resetFields()
    // 表单清空
    addNoticeForm.title = ''
    addNoticeForm.content = ''
  }

  // 修改
  // 修改表单的id
  const editId = ref(0)
  const editNotice = (item: addNotice_Data) => {
    isAddOrEdit.value = 1
    addNoticeForm.content = item.content
    addNoticeForm.title = item.title

    editId.value = item.id
    addNotice_DrawerRef.value?.open()
    console.log(item)
  }

  // 判断添加还是修改 添加是0 修改是1
  let isAddOrEdit = ref(0)

  // 添加/删除弹框的 确认按钮
  const addNoticeFn = () => {
    addNotice_FormRef.value?.validate((valid) => {
      if (!valid) return
      //console.log('表单校验通过')
      loading.value = true
      const editOrAddFn = isAddOrEdit.value
        ? noticeStore.fetch_editNoticeAPI({ id: editId.value, ...addNoticeForm })
        : noticeStore.fetch_addNoticeAPI({ ...addNoticeForm })

      editOrAddFn
        .then(() => {
          addNotice_DrawerRef.value?.close()
          if (!isAddOrEdit.value) currentPage.value = 1
          listFnAPI()
        })
        .finally(() => (loading.value = false))
    })
  }

  return {
    listFnAPI,

    currentPage,
    calcPage,
    handleCurrentChange,

    addNoticeShow,
    addNoticeRules,
    addNoticeForm,

    addNotice_DrawerRef,
    addNotice_FormRef,
    addNotice_animationRef,

    addNotice_DrawerOpened,
    addNotice_DrawerClosed,

    loading,
    editId,
    editNotice,
    isAddOrEdit,
    addNoticeFn
  }
}
