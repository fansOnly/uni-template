let options

/**
 * 获取上一级路由信息
 */
export const getPrevPage = () => {
  const pages = getCurrentPages()
  if (pages.length < 2) return
  const prev = pages[pages.length - 2]
  // console.log('[debug] 上一级路由: ', prev);
  return prev
}

/**
 * 获取当前路由信息
 */
export const getCurrentPage = () => {
  const pages = getCurrentPages()
  if (!pages.length) return
  const current = pages[pages.length - 1]
  // console.log('[debug] 当前路由: ', current);
  return current
}

/**
 * 刷新页面
 */
export const reloadPage = (options) => {
  const current = getCurrentPage()
  setPageOptions(options)
  /* #ifdef MP-WEIXIN */
  current.onLoad()
  /* #endif */
  /* #ifdef H5 */
  location.reload()
  /* #endif */
}

/**
 * 设置页面 options 传参
 * __wxExparserNodeId__ 唯一标识
 */
export const setPageOptions = (options) => {
  const current = getCurrentPage()
  uni.setStorageSync('page-options', {
    key: current.__wxExparserNodeId__,
    value: options
  })
}

/**
 * 清除页面 options 传参
 */
export const clearPageOptions = () => {
  uni.removeStorageSync('page-options')
}

/**
 * 获取页面入参
 * 1. options 参数
 * 2. 路由拼接的 query 参数 - 默认权重大
 */
export const getPageQuery = () => {
  const current = getCurrentPage()// 页面路径带参
  const pathQuery = current.__displayReporter.query
  // 存储参数
  const pageOptions = uni.getStorageSync('page-options')
  // 缓存参数和页面不一致时删除
  if (pageOptions.key !== current.__wxExparserNodeId__) {
    options = {}
    clearPageOptions()
  } else {
    options = pageOptions
  }

  return {
    options: options,
    query: pathQuery
  }
}
