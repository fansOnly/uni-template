import store from '@/store';

/**
 * 统一拦截未登录触发流程
 * 1. 未授权微信/手机号，跳转授权页
 * 2. 未注册，跳转注册页
 * 3. 未登录，跳转登录页
 */
export const userBehaviorInterception = data => {
  // 记录用户行为
  store.dispatch('behavior/setActionBehavior', data);
  const isAuthUserInfo = store.getters['user/isAuthUserInfo'];
  const isAuthPhone = store.getters['user/isAuthPhone'];
  const isRegistered = store.getters['user/isRegistered'];
  const isLogin = store.getters['user/isLogin'];
  if (!isAuthUserInfo || !isAuthPhone) {
    // 未授权
    uni.navigateTo({ url: '/pages/login/auth/index' });
  } else if (!isRegistered) {
    // 未注册
    uni.navigateTo({ url: '/pages/login/register/index' });
  } else if (!isLogin) {
    // 未登录
    uni.navigateTo({ url: '/pages/login/login/index' });
  }
};
