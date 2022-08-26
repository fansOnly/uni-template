/**
 * 跨层级获取定义函数的父组件实例
 * @param {*} fn
 */
export function getParentInstance(context, fn) {
  let parent = context.$parent
  while (parent) {
    if (parent[fn]) return parent
    parent = parent.$parent
  }
  return parent
}

/**
 * 跨层级获取定义函数的子组件实例
 * tip：$children 并不保证顺序，也不是响应式的，可能会有多个
 * @param {*} fn
 */
export function getChildInstance(context, fn) {
  let child = null
  let children = [...context.$children]
  while (children.length) {
    child = children.shift()
    if (child[fn]) return child
    children = [...children, ...child.$children]
  }
  return child && child[fn] ? child : null
}

/**
 * 获取父节点
 * 处理 微信 / H5 平台差异性
 */
//  export const getParent = (context) => {
//   /* #ifdef MP-WEIXIN */
//   return context.$parent
//   /* #endif */
//   /* #ifdef H5 */
//   return context.$parent.$parent
//   /* #endif */
// }

/**
 * 获取子节点
 * 兼容 微信 / H5 平台差异性
 */
// export const getChildren = (context) => {
//   /* #ifdef MP-WEIXIN */
//   return context.$children
//   /* #endif */
//   /* #ifdef H5 */
//   return context.$children[0].$children
//   /* #endif */
// }

/**
 * 获取子节点
 * 兼容 微信 / H5 平台差异性
 * 自定义组件根节点由 view 改为 div
 * @param {string} context 当前实例
 * @param {boolean} [hasCustomComponentChildren = false] 是否包含自定义子组件
 */
export const getChildrenCompatibleH5 = (context, hasCustomComponentChildren = false) => {
  let children = context.$children
  /* #ifdef H5 */
  if (hasCustomComponentChildren) {
    children = children.map(child => child.$children[0])
  }
  /* #endif */
  return children
}
