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
}

const getters = {}

const mutations = {
  SET_APP_VISIBILITY(state, payload) {
    state.visibility = payload
  },
  SET_HIDE_SCENE(state, payload) {
    state.hideScene = payload
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
