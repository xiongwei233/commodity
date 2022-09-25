// 把除了字母的大写转变小写并在前面加个-
export const strsplit = (str: string) => {
  return str
    .split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase()
}
