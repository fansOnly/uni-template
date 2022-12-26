import store from '@/store'
import { wxLogin as wxReqLogin } from '@/api/cust'
import { qryUserInfo } from '@/api/common'
import { useSession } from '@/common/hooks/use-wxapi'

/**
 * 1. wx.checkSession 判断微信会话是否过期
 * 2. 过期 - 微信端wx调用wx.login() 获取code
 * 3. 获取code后通过调用服务端code2Session获取用户基本信息
 * tips: H5和MP-WEIXIN的做法不同
 */
export const getToken = () => {
  // #ifdef MP-WEIXIN
  return new Promise(async (resolve) => {
    const { code } = await useSession(!store.state.user.openId)
    if (code) {
      const loginData = await wxReqLogin({ JSCODE: code })
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
 * 更新用户信息
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