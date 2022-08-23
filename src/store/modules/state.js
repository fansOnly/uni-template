/**
 * 全局状态管理
 */
const state = {
  /**
   * ios 15 系统下 input 点击穿透遮罩层
   * 有弹窗拉起时，如果页面有 input 表单项，将其 disabled
   */
  activeInputName: '',
  /**
   * input 聚焦时，键盘拉起，在部分低版本安卓机型下，输入框会错位
   * 禁止页面滚动
   */
  shouldPageScroll: true,
  /**
   * 记录表单校验状态
   * key => value
   */
  inputValid: {},
  // 页面传递参数
  pageQuery: {},
  // 自定义导航高度
  navHeight: 0,
  // 自定义导航标题高度
  titleHeight: 0,
  // 自定义导航标题顶部留白
  navOffsetTop: 0
}

const getters = {
  // 可用窗口高度
  windowHeight: state => {
    return wx.getSystemInfoSync().windowHeight - state.navHeight
  }
}

const mutations = {
  SET_ACTIVE_INPUT(state, payload = '') {
    state.activeInputName = payload
  },
  CLEAR_ACTIVE_INPUT(state) {
    state.activeInputName = ''
  },
  SET_PAGE_SCROLL(state, payload = true) {
    state.shouldPageScroll = !!payload
  },
  SET_INPUT_VALID(state, payload) {
    const res = {}
    for (const key in payload) {
      if (key) res[key] = payload[key]
    }
    state.inputValid = {
      ...state.inputValid,
      ...res
    }
  },
  CLEAR_INPUT_VALID(state) {
    state.inputValid = {}
  },
  RESET_INPUT_VALID(state, data = []) {
    const validObj = {}
    if (data.length) {
      data.map(({key, value}) => {
        validObj[key] = !!value
      })
    }
    state.inputValid = validObj
  },
  SET_PAGE_QUERY(state, payload = {}) {
    state.pageQuery = payload
  },
  CLEAR_PAGE_QUERY(state) {
    state.pageQuery = {}
  },
  SET_NAV_HEIGHT(state, payload) {
    state.navHeight = payload
  },
  SET_TITLE_HEIGHT(state, payload) {
    state.titleHeight = payload
  },
  SET_NAV_OFFSET_TOP(state, payload) {
    state.navOffsetTop = payload
  }
}

const actions = {
  setActiveInput({ commit }, payload) {
    commit('SET_ACTIVE_INPUT', payload)
    commit('SET_PAGE_SCROLL', !payload)
  },
  clearActiveInput({ commit }) {
    commit('CLEAR_ACTIVE_INPUT')
    commit('SET_PAGE_SCROLL', true)
  },
  setPageScroll({ commit }, payload) {
    commit('SET_PAGE_SCROLL', payload)
  },
  setInputValid({ commit }, obj) {
    commit('SET_INPUT_VALID', obj)
  },
  clearInputValid({ commit }) {
    commit('CLEAR_INPUT_VALID')
  },
  resetInputValid({ commit }, arr) {
    commit('RESET_INPUT_VALID', arr)
  },
  setPageQuery({ commit }, payload) {
    commit('SET_PAGE_QUERY', payload)
  },
  clearPageQuery({ commit }) {
    commit('CLEAR_PAGE_QUERY')
  },
  setNavHeight({ commit }, payload) {
    commit('SET_NAV_HEIGHT', payload)
  },
  setTitleHeight({ commit }, payload) {
    commit('SET_TITLE_HEIGHT', payload)
  },
  setNavOffsetTop({ commit }, payload) {
    commit('SET_NAV_OFFSET_TOP', payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
