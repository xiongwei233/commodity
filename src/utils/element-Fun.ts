//MessageBox 消息弹框-输入框
export const showPrompt = (text: string, value = '', title = '') =>
  ElMessageBox.prompt(text, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputValue: value
  })

// Notification 通知

type NotificationBoxType = {
  title?: string
  type?: 'success' | 'warning' | 'info' | 'error'
  message?: string
  duration?: number
}

export const NotificationBox = ({
  title,
  type = 'success',
  message,
  duration = 2000
}: NotificationBoxType): void => {
  ElNotification({
    title,
    type,
    dangerouslyUseHTMLString: true,
    message,
    duration
  })
}
