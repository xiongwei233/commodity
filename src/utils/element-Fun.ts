//MessageBox 消息弹框-输入框
export const showPrompt = (text: string, value = '', title = '') =>
  ElMessageBox.prompt(text, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputValue: value
  })
