<script>
import store from '@/store'
import { useUpdater } from '@/common/hooks/use-updater'
import { useLogin } from '@/common/hooks/use-login'

export default {
  globalData: {
    restart: true
  },
  onLaunch(options) {
    console.log('🚀 ™ App Launch')
    console.log('🚀 ™ 环境变量', process.env)
    console.log('🚀 ™ 系统信息', uni.$sysInfo)
    console.log('🚀 ™ 启动参数', options)

    // 带 shareTicket 分享场景 1044
    if (options.shareTicket) {
      store.dispatch('share/setShareTicket', options.shareTicket)
    }

    // 页面跳转需要写在微任务或者宏任务中
    // setTimeout(() => {
    //   uni.switchTab({
    //     url: '/pages/other/index'
    //   })
    // }, 0)

    // onShareAppMessage 拦截
    // const pages = getCurrentPages()
    // const current = pages[pages.length - 1]
    // const onShareAppMessage = current.onShareAppMessage
    // current.onShareAppMessage = function (args) {
    //   console.log('拦截 onShareAppMessage')
    //   onShareAppMessage.apply(this, args)
    // }

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
    if (this.globalData.restart) {
      this.globalData.restart = false
      console.log('🚀 ™ App Show - 冷启动')
    } else {
      console.log('🚀 ™ App Show - 热启动')
    }

    const hideScene = store.state.app.hideScene
    if (['run-backstage', 'app-share', 'open-document', 'choose-media'].includes(hideScene)) {
      return store.dispatch('app/setHideScene')
    }

    // 置灰模式
    // store.dispatch('app/setGray', true)

    await useLogin()

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
  }
}
</script>

<style lang="scss">
@import '@/common/style/index.scss';
</style>
