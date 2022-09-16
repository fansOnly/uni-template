const state = {
  msg: 'hello'
};

const mutations = {
  SET_MSG(state, payload) {
    state.msg = payload;
  }
};

const actions = {
  setMsg({ commit }, payload) {
    commit('SET_MSG', payload);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
