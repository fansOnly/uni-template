/**
 * 微信小程序特有的工具类封装
 */
import store from '@/store';
import { genUrlFromObj } from '@/shared';

/**
 * 获取当前路径，包含参数
 */
export const getCurrentPath = () => {
  // eslint-disable-next-line no-undef
  const pages = getCurrentPages();
  console.log('[debug] 获取页面栈信息 ', pages);
  if (!pages.length) return;
  const { route = '', options = {}, __displayReporter } = pages[pages.length - 1];
  const pageQuery = store.state.state.pageQuery;
  return genUrlFromObj(route, { ...options, ...pageQuery });
};

/**
 * 刷新页面
 */
export const reload = () => {
  // eslint-disable-next-line no-undef
  const pages = getCurrentPages();
  console.log('[debug] 刷新页面数据 ', pages);
  if (!pages.length) return;
  const currentPage = pages[pages.length - 1];
  const pageQuery = store.state.state.pageQuery;
  /* #ifdef MP-WEIXIN */
  currentPage.onLoad({ ...currentPage.options, ...pageQuery });
  /* #endif */
  /* #ifdef H5 */
  location.reload();
  /* #endif */
};
