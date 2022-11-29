const state = {
  /**
   * 小程序运行状态
   * true: 前台
   * false: 后台
   */
  visibility: false,
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
}

const mutations = {
  SET_APP_VISIBILITY(state, payload) {
    state.visibility = payload
  },
  SET_HIDE_SCENE(state, payload = '') {
    state.hideScene = payload
  },
  SET_WINDOW_HEIGHT(state, isCustom = false) {
    let height = 0
    if (isCustom) {
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
  }
}

const actions = {
  setAppShow({ commit }) {
    commit('SET_APP_VISIBILITY', true)
  },
  setAppHide({ commit }) {
    commit('SET_APP_VISIBILITY', false)
  },
  setHideScene({ commit }, payload) {
    commit('SET_HIDE_SCENE', payload)
  },
  setWindowHeight({ commit }, payload) {
    commit('SET_WINDOW_HEIGHT', payload)
  }
}

export const APP_HIDE_SCENES = {
  'run-backstage': '切后台运行',
  'app-share': '小程序分享',
  'open-document': '打开文件',
  'choose-media': '拍照/选择相册',
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
