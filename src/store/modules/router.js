const state = {
  // 上一个路由状态
  prevRoute: {
    path: '', // 路径
    query: {}, // 参数
  },
  // 下一个路由状态
  nextRoute: {
    path: '', // 路径
    query: {}, // 参数
  }
};

const mutations = {
  SET_PREV_ROUTE(state, payload = {}) {
    Object.assign(state.prevRoute, payload);
  },
  SET_NEXT_ROUTE(state, payload = {}) {
    Object.assign(state.nextRoute, payload);
  }
};

const actions = {
  setPrevRoute({ commit }, payload) {
    commit('SET_PREV_ROUTE', payload);
  },
  setNextRoute({ commit, state }, payload) {
    commit('SET_PREV_ROUTE', state.nextRoute);
    commit('SET_NEXT_ROUTE', payload);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
