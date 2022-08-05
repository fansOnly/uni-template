/**
 * 用户状态管理
 */
const state = {
  // 当前用户的openId
  openId: uni.getStorageSync('openId') || '',
  userInfo: {
    userId: '', // 当前用户的id
    loginName:'', // 用户名
    nickName: '', // 微信昵称
    userName: '', // 姓名
    headImg: '', // 微信头像
    workCode: '', // 工号
    sex: '' ,//性别
    phone: '',//手机
    mobile: '', // 座机
    email: '', // 邮箱
    address: '', // 地址
    orgNo:'',//所属机构号
    orgName: '',//所属机构
    position: '',//职位
    isManageAuth: '',//是否有管户权限
    isAuthUserInfo: 'N', // 是否已授权用户信息 / Y：已授权;N:未授权
    isAuthPhone: 'N', // 是否已授权手机号 / Y：已授权;N:未授权
    isFirstLogin: 'Y' , //是否首次登录，Y-是，N-否
    isNeedFace: 'Y' , // 是否需要人脸核身，Y-是，N-否
    isQryOrgPerf:'N',//是否有机构业绩查看权限  Y：是  N：否
    isLogin: 'N', // 用户登录状态 / Y-已登录  N-未登录
  },
  poster:false,//海报,//选择展示信息
  // 会话 token
  sessLoginKey: uni.getStorageSync('sessLoginKey') || '',
  // 生物识别支持方式 / fingerPrint facial
  soterSupportMode: uni.getStorageSync('soterSupportMode') || [],
  // 是否开启人脸识别登录
  facial: false,
  // 是否开启指纹登录
  fingerPrint: false,
  // 生物认证设置引导标识
  soterGuideFlag: uni.getStorageSync('soterGuideFlag') || true,
}

const getters = {
  //是否有机构业绩查看权限
  isQryOrgPerf:(state)=>{
    return state.userInfo.isQryOrgPerf === 'Y'
  },
  // 是否已实名
  isRealNamed: (state) => {
    return state.userInfo.isRealNamed === 'Y'
  },
  // 是否已登录
  isLogin: (state) => {
    return state.userInfo.isLogin === 'Y'
  },
  // 是否首次登录
  isFirstLogin: state => {
    return state.userInfo.isFirstLogin === 'Y'
  },
  // 是否需要人脸核身
  isNeedFace: state => {
    return state.userInfo.isNeedFace === 'Y'
  },
  // 是否授权微信用户信息
  isAuthUserInfo: (state) => {
    return state.userInfo.isAuthUserInfo === 'Y'
  },
  // 是否授权微信手机号
  isAuthPhone: (state) => {
    return state.userInfo.isAuthPhone === 'Y'
  },
  // 是否支持指纹登录 - 根据微信提供给的 api 判断，非系统
  isSupportFingerPrint: state => {
    return state.soterSupportMode.includes('fingerPrint')
  },
  // 是否支持人脸登录 - 根据微信提供给的 api 判断，非系统
  isSupportFacial: state => {
    return state.soterSupportMode.includes('facial')
  },
}

const mutations = {
  SET_OPEN_ID(state, payload = '') {
    state.openId = payload
    uni.setStorageSync('openId', payload)
  },
  CLEAR_OPEN_ID(state) {
    state.openId = ''
    uni.removeStorageSync('openId')
  },
  SET_USER_INFO(state, payload = {}) {
    for (let key in payload) {
      state.userInfo[key] = payload[key]
    }
  },
  SET_POSTER(state,payload = {}){
	state.poster = payload
  },
  CLEAR_USER_INFO(state) {
    state.userInfo = {
      isLogin: 'N',
      isAuthUserInfo: 'N',
      isAuthPhone: 'N',
    }
  },
  SET_SESSION_TOKEN(state, payload = '') {
    state.sessLoginKey = payload
    uni.setStorageSync('sessLoginKey', payload)
  },
  CLEAR_SESSION_TOKEN(state) {
    state.sessLoginKey = ''
    state.userInfo.isLogin = 'N'
    uni.removeStorageSync('sessLoginKey')
  },
  SET_SORTER_SUPPORT_MODE(state, payload = []) {
    state.soterSupportMode = payload
    uni.setStorageSync('soterSupportMode', payload)
  },
  SET_SORTER(state, { authMode, value }) {
    state[authMode] = !!value
  },
  SET_SORTER_GUIDE_FLAG(state, payload) {
    state.soterGuideFlag = !!payload
    uni.setStorageSync('soterGuideFlag', !!payload)
  },
  SET_AUTH_LOCATION_FLAG(state, payload) {
    state.isAuthLocation = payload
    uni.setStorageSync('isAuthLocation', payload)
  },
}

const actions = {
  setOpenId({ commit }, payload) {
    commit("SET_OPEN_ID", payload)
  },
  clearOpenId({ commit }) {
    commit("CLEAR_OPEN_ID")
  },
  setUserInfo({ commit }, payload) {
    commit("SET_USER_INFO", payload)
  },
  setPoster({ commit }, payload) {
    commit("SET_POSTER", payload)
  },
  clearUserInfo({ commit }) {
    commit("CLEAR_USER_INFO")
  },
  setSessionToken({ commit }, payload) {
    commit("SET_SESSION_TOKEN", payload)
  },
  clearSessionToken({ commit }) {
    commit("CLEAR_SESSION_TOKEN")
  },
  setSorterSupportMode({ commit }, payload) {
    commit('SET_SORTER_SUPPORT_MODE', payload)
  },
  setSorter({ commit }, payload) {
    commit('SET_SORTER', payload)
  },
  setSorterGuideFlag({ commit }, payload) {
    commit('SET_SORTER_GUIDE_FLAG', payload)
  },
  setAuthLocationFlag({ commit }, payload) {
    commit('SET_AUTH_LOCATION_FLAG', payload)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
