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
  },
};
