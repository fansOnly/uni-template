<script>
import store from '@/store'
import { useUpdater } from '@/common/hooks/use-updater'
import { getToken } from '@/utils'

export default {
  onLaunch(options) {
    console.log('🚀 ™ App Launch')
    console.log('🚀 ™ 环境变量', process.env)
    console.log('🚀 ™ 系统信息', uni.$sysInfo)
    console.log('🚀 ™ 启动参数', options)

    // 带 shareTicket 分享场景 1044
    if (options.shareTicket) {
      store.dispatch('share/setShareTicket', options.shareTicket)
    }

    /* #ifdef MP-WEIXIN */
    // 开启调试模式 - 上线后需要关闭
    wx.setEnableDebug({ enableDebug: true })

    // 微信版本低于 6.0.0 的提示更新
    const { updateWeixin, updateMini } = useUpdater()
    updateWeixin()
    updateMini()
    /* #endif */
  },
  async onShow(options) {
    console.log('🚀 ™ App Show')

    store.dispatch('app/setAppShow')

    const hideScene = store.state.app.hideScene
    if (['run-backstage', 'app-share', 'open-document', 'choose-media'].includes(hideScene)) {
      return store.dispatch('app/setHideScene')
    }

    // 获取用户信息
    await getToken()

    // 分享场景 [1037, 1038]
    store.dispatch('share/setScene', options.scene)
    store.dispatch('share/setChatType', options.chatType)
    if (options.referrerInfo) {
      const { appId, extraData = {} } = options.referrerInfo
      store.dispatch('share/setSourceAppId', appId)
      store.dispatch('share/setExtraData', extraData)
    }
  },
  onHide() {
    console.log('🚀 ™ App Hide')
    store.dispatch('app/setAppHide')
  }
}
</script>

<style lang="scss">
@import '@/common/styles/index.scss';
</style>
