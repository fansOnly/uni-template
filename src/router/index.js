import { RouterMount, createRouter } from 'uni-simple-router'
import store from '@/store'
import { formatDate } from '@/shared'

const router = createRouter({
  platform: process.env.VUE_APP_PLATFORM,
  debugger: true,
  applet: {
    animationDuration: 300, // 默认 300ms  v2.0.6+
  },
  routerErrorEach: (error, router) => {
    if (error.type === 3 || error.type === 0) {
      router.$lockStatus = false
    }
  },
  // 拦截生命周期
  beforeProxyHooks: {
    // onLaunch: async ([options], next)=>{
    //   await getToken();
    //   next([{
    //     ...options,
    //     // ...result
    //   }]);
    // },
  },
  routes: [
    // eslint-disable-next-line no-undef
    ...ROUTES
  ],
})

//全局路由前置守卫
router.beforeEach((to, from, next) => {
  // console.log('to, from: ', to, from)
  const buryData = {
    type: 'page',
    openId: store.state.user.openId,
    time: formatDate(),
    from: from.fullPath,
    to: to.fullPath,
    device: JSON.stringify(uni.$sysInfo)
  }
  console.log('🚀 ™ 页面埋点 ', buryData)
  // eslint-disable-next-line no-undef
  const appInstance = getApp()
  appInstance.globalData.isCustomNavigation = !!to?.meta?.navigationStyle === 'custom'
  if (to.meta && to.meta.auth) {
    // 模拟登录拦截
    uni.showToast({
      title: '需要登录',
      mask: true
    })
    next(false)
  } else {
    next()
  }
})

// 全局路由后置守卫
router.afterEach((to) => {
  // 设置窗口高度
  store.dispatch('app/setWindowHeight', !!to?.meta?.navigationStyle === 'custom')
  // #ifdef MP-WEIXIN
  uni.setNavigationBarTitle({ title: to?.meta?.title || 'UI 组件演示库' })
  // #endif
  // H5 需要在 onReady 设置
})

export {
  router,
  RouterMount
}
