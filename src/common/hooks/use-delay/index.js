/**
 * 延时执行
 * @param {number} [delay = 500] 阻塞时间
 */
export const useDelay = (delay = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
}
