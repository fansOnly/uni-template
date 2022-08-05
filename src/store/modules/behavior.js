/**
 * 用户行为管理
 */
const state = {
  // 记录用户登录前的行为
  preLoginBehavior: {
    message: '', // 备注
    // 1 - navigateTo
    // 2 - navigateBack
    // 3 - redirectTo
    // 4 - switchTab
    // 5 - reLaunch
    // 6 - other
    type: '2', // 操作 / 跳转 / 切换
    // 跳转参数
    params: {
      delta: 1
    },
    sourceUrl: '', // 源页面
    sourceQuery: {}, // 源页面参数
    targetUrl: '', // 目标页面
    targetQuery: {}, // 目标页面参数
  },
}

const mutations = {
  SET_PRE_LOGIN_BEHAVIOR(state, payload = {}) {
    state.preLoginBehavior = {
      ...state.preLoginBehavior,
      ...payload
    }
  },
  CLEAR_PRE_LOGIN_BEHAVIOR(state) {
    state.preLoginBehavior = {
      message: '',
      params: {
        delta: 1
      },
      sourceUrl: '',
      targetUrl: ''
    }
  },
}

const actions = {
  setPreLoginBehavior({ commit }, payload) {
    commit('SET_PRE_LOGIN_BEHAVIOR', payload)
  },
  clearPreLoginBehavior({ commit }) {
    commit('CLEAR_PRE_LOGIN_BEHAVIOR')
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
