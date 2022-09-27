<script>
import store from '@/store';
import checkUpdate from '@/common/lib/weixin/checkUpdate';
import { getToken } from '@/shared/token';
import { APP_HIDE_SCENES } from '@/store/modules/app';

export default {
  onLaunch: function (options) {
    console.log('[debug] App Launch');
    console.log('[info] 环境变量', process.env);
    console.log('[info] 系统信息', wx.getSystemInfoSync());
    console.log('[info] 启动参数', options);

    // 带 shareTicket 分享场景 1044
    if (options.shareTicket) {
      store.dispatch('share/setShareTicket', options.shareTicket);
    }

    /* #ifdef MP-WEIXIN */
    // 开启调试模式 - 上线后需要关闭
    wx.setEnableDebug({enableDebug: true});
    /* #endif */

    /* #ifdef MP-WEIXIN */
    checkUpdate();
    /* #endif */
  },
  onShow: async function (options) {
    console.log('[debug] App Show');

    store.dispatch('app/setAppShow');

    // 小程序切后台返回场景处理
    const hideScene = store.state.app.hideScene;
    if (Object.keys(APP_HIDE_SCENES).includes(hideScene)) {
      console.log(`[info] ${APP_HIDE_SCENES[hideScene]}返回`);
      return store.dispatch('app/setHideScene');
    }

    // 获取用户信息
    await getToken();

    // 分享场景  1037 / 1038
    store.dispatch('share/setScene', options.scene);
    store.dispatch('share/setChatType', options.chatType);
    if (options.referrerInfo) {
      const { appId, extraData = {} } = options.referrerInfo;
      store.dispatch('share/setSourceAppId', appId);
      store.dispatch('share/setExtraData', extraData);
    }
  },
  onHide: function () {
    console.log('[debug] App Hide');
    store.dispatch('app/setAppHide');
  }
};
</script>

<style>
@import url('@/common/styles/index.scss');
</style>
