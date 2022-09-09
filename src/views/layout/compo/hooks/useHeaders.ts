import { removeToken } from '@/utils/cookie'
import { useUserStore } from '@/stores/modules/user'
import { router } from '@/router'
import { NotificationBox } from '@/utils/element-Fun'
const userStore = useUserStore()

/**
 *退出登录
 */
export const logoutHook = async () => {
  // 退出登录
  const confirm = await ElMessageBox.confirm('是否要退出登录?', '退出登录', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).catch((err: string) => err)
  // 点击取消阻止退出登录
  if (confirm === 'cancel') return

  // 点击确定 执行下面
  //console.log('退出登录')
  const result: any = await userStore.fetchLogoutAPI()
  removeToken()
  router.push({ path: '/login' })
  userStore.token = ''
  NotificationBox({ title: result.data || '退出登录成功' })
}

/**
 * 修改密码
 */
type submitHookType<T> = ({
  editFormRef,
  drawerRef,
  editPsswordForm
}: {
  editFormRef: T
  drawerRef: T
  editPsswordForm: T
}) => any

export const submitHook: submitHookType<any> = ({ editFormRef, drawerRef, editPsswordForm }) => {
  editFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      try {
        drawerRef.value.openLoading()
        const result: any = await userStore.fetchEditPassAPI(editPsswordForm)
        removeToken()
        router.push({ path: '/login' })
        userStore.token = ''

        NotificationBox({ title: `修改密码成功!` })

        drawerRef.value.closeLoading()
      } catch {
        drawerRef.value.closeLoading()
      }
    }
  })
}
