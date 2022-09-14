import store from '@/store'
import { wxCheckSession, wxLogin } from '@/shared/platform/weixin/api'
import { wxLogin as wxReqLogin } from '@p/api/cust'
import { qryUserInfo } from '@p/api/common'

/**
 * 1. wx.checkSession 判断微信会话是否过期
 * 2. 过期 - 微信端wx调用wx.login() 获取code
 * 3. 获取code后通过调用服务端code2Session获取用户基本信息
 * tips: H5和MP-WEIXIN的做法不同
 */
export default function () {
  // #ifdef MP-WEIXIN
  return new Promise(async (resolve, reject) => {
    const valid = await wxCheckSession()
    if (!valid || !store.state.user.openId) {
      const loginData = await wxApiLogin()
      store.dispatch('user/setOpenId', loginData.openId)
    }
    // 获取用户信息，即使获取失败，也可以进入页面
    await setUserInfo()
    resolve()
  })
  // #endif
  // #ifdef H5
  // eslint-disable-next-line no-unreachable
  return new Promise(resolve => {
    // TODO: H5环境获取登录 token
    console.log('todo H5环境获取登录 token')
    resolve()
  })
  // #endif
}

/**
 * 微信登录 wx.login
 */
const wxApiLogin = async () => {
  const { code = '' } = await wxLogin()
  const data = await wxReqLogin({ JSCODE: code })
  return data
}

/**
 * 设置用户信息
 */
export const setUserInfo = async () => {
  // 获取用户信息，即使获取失败，也可以进入页面
  const userInfo = await qryUserInfo({ openId: store.state.user.openId })
  // 如果未登录或者登录失效，清除缓存的token
  if (userInfo.isLogin === 'N') {
    uni.removeStorageSync('sessLoginKey')
  }
  store.dispatch('user/setUserInfo', userInfo)
}

/**
 * 统一拦截未登录触发流程
 * 1. 未授权微信/手机号，跳转授权页
 * 2. 未注册，跳转注册页
 * 3. 未登录，跳转登录页
 */
export const unLoginInterception = data => {
  // 记录用户行为
  store.dispatch('behavior/setPreLoginBehavior', data)
  const isAuthUserInfo = store.getters['user/isAuthUserInfo']
  const isAuthPhone = store.getters['user/isAuthPhone']
  const isRegistered = store.getters['user/isRegistered']
  const isLogin = store.getters['user/isLogin']
  if (!isAuthUserInfo || !isAuthPhone) {
    // 未授权
    uni.navigateTo({ url: '/pages/login/auth/index' })
  } else if (!isRegistered) {
    // 未注册
    uni.navigateTo({ url: '/pages/login/register/index' })
  } else if (!isLogin) {
    // 未登录
    uni.navigateTo({ url: '/pages/login/login/index' })
  }
}
