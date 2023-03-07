const state = {
  arr2: [
    { name: 'lily', age: 30 },
    { name: 'john', age: 15 },
  ]
}

const mutations = {
  SET_ARR2(state, payload) {
    state.arr2 = payload
  }
}

const actions = {
  setArr2({ commit }, payload) {
    commit('SET_ARR2', payload)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
