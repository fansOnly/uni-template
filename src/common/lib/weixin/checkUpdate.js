import { shouldUpdateWx } from '@/common/lib/version';

function updateWeixin() {
  if (shouldUpdateWx()) {
    uni.showModal({
      title: '更新提示',
      content: '您的微信客户端版本过低，是否前往更新？',
      success: function (res) {
        if (res.confirm) {
          wx.updateWeChatApp({
            success(res) {
              console.log('[info] 更新客户端版本', res);
            }
          });
        }
      }
    });
  }
}

function updateMini() {
  const updateManager = uni.getUpdateManager();
  updateManager.onCheckForUpdate(function (res) {
    console.log('[info] 请求完新版本信息的回调', res.hasUpdate);
  });
  updateManager.onUpdateReady(function () {
    uni.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success: function (res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        }
      },
    });
  });
  updateManager.onUpdateFailed(function () {
    // 新版本下载失败
    uni.showModal({
      title: '已经有新版本了',
      content: '新版本已经上线，请您删除当前小程序，重新搜索打开',
    });
  });
}

export default function checkUpdate() {
  updateWeixin();
  updateMini();
}
