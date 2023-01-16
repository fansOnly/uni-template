const appInstance = getApp()

export const useGlobalData = () => {
  return {
    getGlobalData,
    setGlobalData,
  }
}

/**
 * 获取全局变量
 * @param {string|array} keys
 */
const getGlobalData = keys => {
  if (Array.isArray(keys)) {
    return keys.reduce((acc, cur) => [...acc, appInstance.globalData[cur]], [])
  } else {
    return appInstance.globalData[keys]
  }
}

/**
 * 设置全局变量
 * @param {*} key
 * @param {*} value
 */
const setGlobalData = (key, value) => {
  appInstance.globalData[key] = value
}
