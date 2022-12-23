export const useAnimationFrame = () => {
  return new Promise((resolve) => {
    const systemInfo = uni.getSystemInfoSync()
    if (systemInfo.platform === 'devtools') {
      return setTimeout(() => {
        resolve()
      }, 1000 / 30)
    }
    return wx
      .createSelectorQuery()
      .selectViewport()
      .boundingClientRect()
      .exec(() => {
        resolve()
      })
  })
}
