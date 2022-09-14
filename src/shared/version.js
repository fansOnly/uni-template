/**
 * 版本号比较
 * @param {string} v1
 * @param {string} v2
 */
export function compareVersion(v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i])
    const num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}

/**
 * 判断版本号
 */
export const gte = (version) => {
  const system = uni.getSystemInfoSync()
  return compareVersion(system.SDKVersion, version) >= 0
}

/**
 * 是否需要更新微信客户端
 * @version 6.0.0
 */
export const shouldUpdateWx = () => {
  return gte('7.0.0')
}
