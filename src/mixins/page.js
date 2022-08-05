import { getPrevPage, getCurrentPage, reloadPage, setPageOptions, clearPageOptions, getPageQuery } from '@/shared/platform/weixin/route'

export default {
  data() {
    return {
      progressBarPercent: 0,
      pageReady: false,
    }
  },
  onLoad() {
    console.time('page-load-time')
    // await this.$onLaunched

    const options = uni.getStorageSync('page-options-temp')
    setPageOptions(options)
    uni.removeStorageSync('page-options-temp')

    this.$setPageQuery()
  },
  onReady() {
    this.progressBarPercent = 100
    setTimeout(() => {
      this.pageReady = true
    }, 300)
    console.timeEnd('page-load-time')
  },
  methods: {
    $setPageQuery() {
      const { options, query } = getPageQuery()
      this.$pageOptions = Object.freeze(options)
      this.$pageQuery = Object.freeze({ ...options, ...query })
      // console.log('[debug] 页面参数: ', this.$pageQuery);
    },
    $setPageOptions(options) {
      uni.setStorageSync('page-options-temp', options)
    },
    $clearPageOptions() {
      clearPageOptions()
    },
    $setPrevPage() {
      this.$prevPage = getPrevPage()
    },
    $setCurrentPage() {
      this.$currentPage = getCurrentPage()
    },
    $reload() {
      reloadPage()
    }
  }
}
