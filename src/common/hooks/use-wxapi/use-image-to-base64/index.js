export const useImageToBase64 = async (path) => {
  if (wx.canIUse('getFileSystemManager')) {
    return new Promise((resolve, reject) => {
      wx.getFileSystemManager().readFile({
        filePath: path,
        encoding: 'base64',
        success(res) {
          resolve(`data:image/png;base64,${res.data}`)
        },
        fail(error) {
          reject(error)
        }
      })
    })
  } else {
    console.warn('🚀 ™ [system] getFileSystemManager: 您的微信基础库版本过低，请升级至1.9.9及以上版本')
    return -999
  }
}
