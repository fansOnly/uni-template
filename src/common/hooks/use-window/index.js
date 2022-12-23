let systemInfo

export const useWindow = (useCache = true) => {
  let res
  if (useCache) {
    res = systemInfo || uni.getSystemInfoSync()
  } else {
    res = uni.getSystemInfoSync()
  }

  return {
    screenHeight: res.screenHeight,
    screenWidth: res.screenWidth,
    windowWidth: res.windowWidth,
    windowHeight: res.windowHeight,
  }
}
