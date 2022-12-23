import { useVersion } from '../use-version'
const { gte } = useVersion()

const updateWeixin = () => {
  // 更新客户端版本
  if (gte('6.0.0')) {
    uni.showModal({
      title: '更新提示',
      content: '您的微信客户端版本过低，是否前往更新？',
      success(res) {
        if (res.confirm) {
          wx.updateWeChatApp({
            success(res) {
              console.log('[debug] 更新客户端版本', res)
            }
          })
        }
      }
    })
  }
}

const updateMini = () => {
  const updateManager = uni.getUpdateManager()

  updateManager.onCheckForUpdate((res) => {
    // 请求完新版本信息的回调
    console.log('请求完新版本信息的回调', res.hasUpdate)
  })

  updateManager.onUpdateReady(() => {
    uni.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success(res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate()
        }
      },
    })
  })

  updateManager.onUpdateFailed(() => {
    // 新版本下载失败
    uni.showModal({
      title: '已经有新版本了',
      content: '新版本已经上线，请您删除当前小程序，重新搜索打开',
    })
  })
}

export const useUpdater = () => {
  return {
    updateWeixin,
    updateMini
  }
}
