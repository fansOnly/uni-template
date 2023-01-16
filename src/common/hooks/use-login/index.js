// 小程序登录逻辑
import { useSession } from '@/common/hooks/use-wxapi'
import store from '@/store'

export const useLogin = async () => {
  const { code } = await useSession(!store.state.user.openId)
  if (code) {
    // 重新执行 wx.login 缓存用户信息
  }
}
