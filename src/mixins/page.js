export default {
  data() {
    return {
      pageReady: false,
    };
  },
  onLoad() {
    console.time('[page-load-time]');
  },
  onReady() {
    console.timeEnd('[page-load-time]');
    // #ifdef H5
    uni.setNavigationBarTitle({ title: 'UI 组件演示库' });
    // #endif
  },
};
