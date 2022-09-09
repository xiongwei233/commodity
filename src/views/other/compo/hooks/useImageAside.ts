import { ref, computed, reactive } from 'vue'
import type { FormInstance } from 'element-plus'

import type { image_List } from '@/services/module/types/image.type'
import { useImageStore } from '@/stores/modules/image'

import send from '@/assets/animation/send.json'

import type AnimationLottie from '@/components/animation-lottie.vue'
import type GlobalDrawer from '@/components/global-drawer.vue'

/**
 * 分页和分类
 * @params emit defineEmits的事件
 */
export const cateAndpages = (emit: (event: 'change', ...args: any[]) => void) => {
  const imageStore = useImageStore()
  // 默认选中列表的第1个
  const activeIndex = ref<number | null>(null)

  const loading = ref<boolean>(false)

  // 当前在第几页
  const currentPage = ref<number>(1)

  // 当前共几页
  const calcPage = computed(() => Math.ceil(imageStore?.list?.totalCount / 10))

  // 点击 分页
  const handleCurrentChange = async (val?: number) => {
    if (typeof val === 'number') {
      currentPage.value = val
      imageStore.catePage = val
    }
    loading.value = true
    imageStore.cateListLoading = true
    imageStore
      .fetch_getImageAPI({ page: currentPage.value })
      .then(async () => {
        const cateId = imageStore.list?.list[0]?.id
        if (cateId) {
          activeIndex.value = cateId
          imageStore.categroyId = cateId
          await imageStore.fetch_getImageCategoryAPI({ id: cateId })
        }
      })
      .finally(() => {
        loading.value = false
        imageStore.cateListLoading = false
      })

    if (val) {
      currentPage.value = val
    }
  }
  handleCurrentChange()

  // 切换分类
  const clickCategory = async (item: image_List) => {
    activeIndex.value = item.id
    imageStore.categroyId = item.id

    imageStore.cateListLoading = true
    await imageStore.fetch_getImageCategoryAPI({ id: item.id })
    imageStore.cateListLoading = false
  }

  return {
    activeIndex,
    clickCategory,
    loading,
    currentPage,
    handleCurrentChange,
    calcPage
  }
}

/**
 * 新增/修改分类
 */
export const operateCategory = () => {
  const imageStore = useImageStore()
  // 当前第几页

  const addCategory_ref = ref<InstanceType<typeof GlobalDrawer>>()
  const categoryId = ref<number>(0)
  const addCategory_form = reactive({
    name: '',
    order: 99
  })

  const isopen = () => {
    addCategory_form.name = ''
    categoryId.value = 0
    addCategory_form.order = 99
    addCategory_ref.value?.open()
  }

  const drawerTitle = computed(() => (categoryId.value ? '编辑' : '新增'))

  // 规则
  const addCategory_rules = reactive({
    name: [
      { required: true, message: '图片分类名称不能为空！', trigger: 'blur' },
      { min: 2, max: 30, message: '图片分类名称需要 2个以上字符', trigger: 'blur' }
    ],
    order: [{ required: true, message: '排序为必填' }]
  })
  // 表单的ref
  const addCategory_formRef = ref<FormInstance | null>(null)

  // 动画的ref
  let addCategory_animationRef = ref<InstanceType<typeof AnimationLottie>>()

  // 抽屉组件-打开
  const addCategory_open = () => {
    //console.log('组件加载')
    addCategory_animationRef.value?.openTottie(send, 'send')
  }
  // 抽屉组件-关闭
  const addCategory_close = () => {
    //console.log('组件关闭')
    // 动画销毁
    addCategory_animationRef.value?.destroysTottie()
    // 表单重置
    addCategory_formRef.value?.resetFields()
  }

  // 提交表单
  const addCategory_submitFn = () => {
    addCategory_formRef.value?.validate(async (valid) => {
      if (!valid) return
      //console.log('提交表单')

      addCategory_ref.value?.openLoading()
      // 区分是 编辑还是修改,区别: 编辑是有id的
      if (categoryId.value) {
        // 修改
        await imageStore.fetch_editImageCategoryAPI({ id: categoryId.value, ...addCategory_form })
        await imageStore.fetch_getImageAPI({ page: imageStore.catePage })
      } else {
        // 新增
        await imageStore.fetch_addImageCategoryAPI({ ...addCategory_form })
        await imageStore.fetch_getImageAPI({})
      }

      addCategory_ref.value?.closeLoading()

      ElNotification({ title: `${drawerTitle.value}图片分类成功!`, type: 'success', duration: 2000 })
      addCategory_ref.value?.close()
    })
  }

  /**
   * 修改分类名
   */
  const editCategory = (item: image_List) => {
    console.log(item)
    addCategory_ref.value?.open()
    categoryId.value = item.id
    addCategory_form.name = item.name
    addCategory_form.order = item.images_count
  }

  return {
    isopen,
    drawerTitle,
    //
    addCategory_ref,
    addCategory_form,
    addCategory_formRef,
    addCategory_rules,
    addCategory_animationRef,
    addCategory_close,
    addCategory_open,
    addCategory_submitFn,
    //
    editCategory
  }
}
