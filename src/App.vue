<script>
import { shouldUpdateWx } from '@/shared'
export default {
  onLaunch: function (options) {
    console.log('[info] App Launch')
    console.log('[debug] 环境变量', process.env)
    console.log('[debug] 系统信息', wx.getSystemInfoSync())
    console.log('[info] 启动参数', options)
    const { path, query, scene, referrerInfo } = options

    this.$isResolve()

    /* #ifdef MP-WEIXIN */
    // 开启调试模式 - 上线后需要关闭
    wx.setEnableDebug({enableDebug: true})
    /* #endif */

    /* #ifdef MP-WEIXIN */
    if (shouldUpdateWx()) {
      uni.showModal({
        title: '更新提示',
        content: '您的微信客户端版本过低，是否前往更新？',
        success: function (res) {
          if (res.confirm) {
            wx.updateWeChatApp({
              success(res) {
                console.log('[info] 更新客户端版本', res)
              }
            })
          }
        }
      })
    }

    // 小程序版本更新
    const updateManager = uni.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      console.log('[info] 请求完新版本信息的回调', res.hasUpdate)
    })
    updateManager.onUpdateReady(function () {
      uni.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        },
      })
    })
    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
      uni.showModal({
        title: '已经有新版本了',
        content: '新版本已经上线，请您删除当前小程序，重新搜索打开',
      })
    })
    /* #endif */
  },
  onShow: function () {
    console.log('[info] App Show')
  },
  onHide: function () {
    console.log('[info] App Hide')
  }
}
</script>

<style>
/*每个页面公共css */
@import url('@/common/styles/index.scss');
</style>
