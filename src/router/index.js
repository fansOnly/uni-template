import store from '@/store';

let wxRouter = {};

const methods = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab'];

methods.forEach(method => {
  wxRouter[method] = function ({url, query = {}}) {
    store.dispatch('router/setNextRoute', { path: url, query });
    uni[method]({url});
    console.log('[debug] 页面传参: ', query);
  };
});

/**
 * 刷新页面
 */
wxRouter.reload = function () {
  const pages = getCurrentPages();
  if (!pages.length) return;
  const _this = pages[pages.length - 1];
  _this.onLoad();
};

export default wxRouter;
