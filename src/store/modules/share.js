/**
 * 分享数据管理
 */
const state = {
  // 有效 referrerInfo 的场景
  scene: '',
  /**
   * 从微信群聊/单聊打开小程序时，chatType 表示具体微信群聊/单聊类型
   * @property
   *  @value 1 微信联系人单聊
   *  @value 2 企业微信联系人单聊
   *  @value 3 普通微信群聊
   *  @value 4 企业微信互通群聊
   */
  chatType: '',
  // 来源小程序、公众号或 App 的 appId
  sourceAppId: '',
  // 来源小程序传过来的数据，scene=1037或1038时支持
  extraData: {},
  // 获取更多转发信息
  // https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/share.html
  shareTicket: '',
  originalShareId: '',
  originalShareIdKey: '',
}

const mutations = {
  SET_SCENE(state, payload = '') {
    state.scene = payload
  },
  SET_CHAT_TYPE(state, payload = '') {
    state.chatType = payload
  },
  SET_SOURCE_APP_ID(state, payload = '') {
    state.sourceAppId = payload
  },
  SET_EXTRA_DATA(state, payload = {}) {
    state.extraData = payload
  },
  SET_SHARE_TICKET(state, payload = '') {
    state.shareTicket = payload
  },
  SET_OLD_SHARE_ID(state, { originalShareId = '', originalShareIdKey = '' }) {
    state.originalShareId = originalShareId
    state.originalShareIdKey = originalShareIdKey
  },
  CLEAR(state) {
    state.scene = ''
    state.sourceAppId = ''
    state.extraData = {}
  }
}

const actions = {
  setScene({ commit }, payload) {
    commit('SET_SCENE', payload)
  },
  setChatType({ commit }, payload) {
    commit('SET_CHAT_TYPE', payload)
  },
  setSourceAppId({ commit }, payload) {
    commit('SET_SOURCE_APP_ID', payload)
  },
  setExtraData({ commit }, payload) {
    commit('SET_EXTRA_DATA', payload)
  },
  setShareTicket({ commit }, payload) {
    commit('SET_SHARE_TICKET', payload)
  },
  setOldShareId({ commit }, payload) {
    commit('SET_OLD_SHARE_ID', payload)
  },
  clearShareInfo({ commit }) {
    commit('CLEAR')
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
