/**
 * 获取菜单的2个节点的id
 */
export function menuMapLeafKeys(menuList: any[]) {
  const leftKeys: number[] = []
  const _recurseGetLeaf = (menuList: any[]) => {
    menuList.forEach((item) => {
      leftKeys.push(item.id)

      if (item.pivot) {
        leftKeys.push(item.pivot.id)
      }
    })
  }
  console.log(leftKeys)
  _recurseGetLeaf(menuList)
  return leftKeys
}
