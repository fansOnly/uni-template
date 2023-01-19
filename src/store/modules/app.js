import pageCfg from '@/pages.json'

const state = {
  /**
   * 小程序隐藏场景
   * @property
   *  @value run-backstage 切后台运行
   *  @value app-share  小程序分享
   *  @value open-document 打开文件
   *  @value choose-file 拍照 / 选择文件
   */
  hideScene: '',
  // 实际窗口高度
  windowHeight: 0,
  // 默认窗口高度
  defaultWindowHeight: 0,
  // 自定义导航时窗口高度
  customWindowHeight: 0,
  // 自定义导航高度
  navHeight: 0,
  // 路由映射
  pageNavList: [],
  // 自定义导航是否加载完成
  isCustomNavMounted: false,
  // 置灰模式
  isGray: false,
  currentPage: ''
}

const getters = {
  isCustomTabBar: () => {
    return pageCfg?.tabBar?.custom === true
  },
  tabBarList: () => {
    return pageCfg?.tabBar?.list || []
  },
  isCustomNavPage: (state, getters) => {
    const tabBarPages = getters.tabBarList.map(v => v.pagePath)
    const isTabBarPage = tabBarPages.includes(state.currentPage.substring(1))
    return state.pageNavList.find(v => v.path === state.currentPage)?.isCustomNav && !isTabBarPage
  },
  navHeightValue: (state, getters) => {
    return getters.isCustomNavPage ? state.navHeight : 0
  }
}

const mutations = {
  SET_HIDE_SCENE(state, payload = '') {
    state.hideScene = payload
  },
  SET_WINDOW_HEIGHT(state) {
    let height = 0
    if (getters.isCustomNavPage) {
      if (state.defaultWindowHeight) {
        height = state.defaultWindowHeight
      } else {
        height = state.customWindowHeight || (state.customWindowHeight = uni.getSystemInfoSync().windowHeight)
        // #ifdef MP-WEIXIN
        if (!state.navHeight) {
          const rect = wx.getMenuButtonBoundingClientRect()
          state.navHeight = rect.bottom + 7 /** 胶囊距离内容区域底部临界值 */
        }
        height -= state.navHeight
        // #endif
      }
    } else {
      height = state.defaultWindowHeight || (state.defaultWindowHeight = uni.getSystemInfoSync().windowHeight)
      // #ifdef H5
      height -= 44
      // #endif
    }
    state.windowHeight = height
  },
  SET_PAGE_NAV(state, payload) {
    const paths = state.pageNavList.map(v => v.path)
    if (!paths.includes(payload?.path)) {
      state.pageNavList.push(payload)
    }
  },
  SET_CUSTOM_NAV_MOUNT(state, payload = false) {
    state.isCustomNavMounted = payload
  },
  SET_NAV_HEIGHT(state, payload = 0) {
    state.navHeight = payload
  },
  SET_GRAY(state, payload = false) {
    state.isGray = payload
  },
  SET_CURRENT_PAGE(state, payload = false) {
    state.currentPage = payload
  }
}

const actions = {
  setHideScene({ commit }, payload) {
    commit('SET_HIDE_SCENE', payload)
  },
  setWindowHeight({ commit }, payload) {
    commit('SET_WINDOW_HEIGHT', payload)
  },
  setPageNav({ commit }, payload) {
    commit('SET_PAGE_NAV', payload)
  },
  setCustomNavMounted({ commit }, payload) {
    commit('SET_CUSTOM_NAV_MOUNT', payload)
  },
  setNavHeight({ commit }, payload) {
    commit('SET_NAV_HEIGHT', payload)
  },
  setGray({ commit }, payload) {
    commit('SET_GRAY', payload)
  },
  setCurrentPage({ commit }, payload) {
    commit('SET_CURRENT_PAGE', payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
