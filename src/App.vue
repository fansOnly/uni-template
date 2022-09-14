<script>
import store from '@/store'
import checkUpdate from '@/shared/platform/weixin/update'

export default {
  onLaunch: function (options) {
    console.log('[debug] App Launch')
    console.log('[info] 环境变量', process.env)
    console.log('[info] 系统信息', wx.getSystemInfoSync())
    console.log('[info] 启动参数', options)

    // 带 shareTicket 分享场景 1044
    if (options.shareTicket) {
      store.dispatch('share/setShareTicket', options.shareTicket)
    }

    /* #ifdef MP-WEIXIN */
    // 开启调试模式 - 上线后需要关闭
    wx.setEnableDebug({enableDebug: true})
    /* #endif */

    // 加载网络字体
    // uni.loadFontFace({
    //   family: 'Bitstream Vera Serif Bold',
    //   source: 'url("https://sungd.github.io/Pacifico.ttf")',
    //   complete(res) {
    //     console.log('[debug] loadFontFace: ', res)
    //   }
    // })

    /* #ifdef MP-WEIXIN */
    checkUpdate()
    /* #endif */
  },
  onShow: async function (options) {
    console.log('[debug] App Show')

    store.dispatch('app/setAppShow')

    if (store.state.app.hideScene === 'app-share') {
      return console.log('[info] 小程序分享返回')
    }

    // 获取用户信息
    // await getToken()

    // 分享场景  1037 / 1038
    store.dispatch('share/setScene', options.scene)
    store.dispatch('share/setChatType', options.chatType)
    if (options.referrerInfo) {
      const { appId, extraData = {} } = options.referrerInfo
      store.dispatch('share/setSourceAppId', appId)
      store.dispatch('share/setExtraData', extraData)
    }

    // 释放页面逻辑
    this.$isResolve()
  },
  onHide: function () {
    console.log('[debug] App Hide')
    store.dispatch('app/setAppShow')
  }
}
</script>

<style>
@import url('@/common/styles/index.scss');
</style>
