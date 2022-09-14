/**
 * 用户行为管理
 */
const state = {
  // 路由行为
  routeBehavior: {
    title: '', // 备注
    // 1 - navigateTo
    // 2 - navigateBack
    // 3 - redirectTo
    // 4 - switchTab
    // 5 - reLaunch
    // 6 - other
    routeType: '', // 操作 / 跳转 / 切换
    // 跳转参数
    routeParams: {
      delta: 1
    },
    sourceUrl: '', // 源页面
    sourceQuery: {}, // 源页面参数
    targetUrl: '', // 目标页面
    targetQuery: {}, // 目标页面参数
  },
  // 用户操作行为
  actionBehavior: {
    title: '', // 标题
    actionName: '', // 操作函数
    actionParams: {}, // 操作函数参数
    sourceUrl: '', // 源页面
    sourceQuery: {}, // 源页面参数
  }
}

const mutations = {
  SET_ROUTE_BEHAVIOR(state, payload = {}) {
    state.routeBehavior = {
      ...state.routeBehavior,
      ...payload
    }
  },
  CLEAR_ROUTE_BEHAVIOR(state) {
    state.routeBehavior = {
      title: '',
      routeType: '',
      routeParams: {
        delta: 1
      },
      sourceUrl: '',
      sourceQuery: {},
      targetUrl: '',
      targetQuery: {},
    }
  },
  SET_ACTION_BEHAVIOR(state, payload = {}) {
    state.actionBehavior = {
      ...state.actionBehavior,
      ...payload
    }
  },
  CLEAR_ACTION_BEHAVIOR(state) {
    state.routeBehavior = {
      title: '',
      actionName: '',
      actionParams: {},
      sourceUrl: '',
      sourceQuery: {}
    }
  },
}

const actions = {
  setRouteBehavior({ commit }, payload) {
    commit('SET_ROUTE_BEHAVIOR', payload)
  },
  clearRouteBehavior({ commit }) {
    commit('CLEAR_ROUTE_BEHAVIOR')
  },
  setActionBehavior({ commit }, payload) {
    commit('SET_ACTION_BEHAVIOR', payload)
  },
  clearActionBehavior({ commit }) {
    commit('CLEAR_ACTION_BEHAVIOR')
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
