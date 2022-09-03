/**
 * lottie 动画  参考: https://blog.csdn.net/qq_39409541/article/details/126079790
 */

import lottie from 'lottie-web'

// 开启动画
export const jsonAnimation = (DOM: HTMLElement, jsonFile: any, Name: string) => {
  console.log('开启动画的名称', Name)
  lottie.loadAnimation({
    container: DOM,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: jsonFile,
    // 动画的名称，让调用这传过来，不然所有名称都一样
    name: Name
  })
}

// 销毁动画
export const destroys = (Name: string) => {
  console.log('结束动画的名称', Name)
  lottie.destroy(Name)
}
