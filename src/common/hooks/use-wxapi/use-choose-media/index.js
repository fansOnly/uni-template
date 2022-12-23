import { wxChooseMedia } from '../api'

export const useChooseMedia = async (options) => {
  const params = {
    count: options?.count || 1,
    mediaType: options?.mediaType || ['mix'],
    sizeType: options?.sizeType ?? ['original', 'compressed'],
    sourceType: options?.sourceType ?? ['album', 'camera'],
    maxDuration: options?.maxDuration ?? 10,
    camera: options?.camera || 'back',
  }
  const app = getApp()
  app.globalData.hideScene = 'choose-media'
  const { tempFiles = [] } = await wxChooseMedia(params)

  return {
    tempFile: tempFiles[0],
    tempFiles
  }
}
