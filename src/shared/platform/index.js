/* #ifdef MP-WEIXIN */
export * from './weixin'
/* #endif */

/* #ifdef H5 */
export * from './browser'
/* #endif */

/**
 * 获取元素节点信息
 * @param {string} 实例 this
 * @param {string} 选择器
 */
export function getRect(context, selector) {
  return new Promise(
    (resolve) => {
      wx.createSelectorQuery()
        .in(context)
        .select(selector)
        .boundingClientRect()
        .exec((rect = []) => resolve(rect[0]))
    }
  )
}

/**
 * 缓动动画
 */
export function requestAnimationFrame() {
  return new Promise((resolve) => {
    var systemInfo = uni.getSystemInfoSync()
    if (systemInfo.platform === 'devtools') {
      return setTimeout(function () {
        resolve()
      }, 1000 / 30)
    }
    return wx
      .createSelectorQuery()
      .selectViewport()
      .boundingClientRect()
      .exec(function () {
        resolve()
      })
  })
}

/**
 * 同步获取设备信息
 */
let systemInfo
export function getSystemInfoSync() {
  return systemInfo || (systemInfo = uni.getSystemInfoSync())
}
