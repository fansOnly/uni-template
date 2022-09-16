/**
 * 业务状态管理
 */
const state = {
  appName: '贵州银行微助手', // 小程序名称
  bankName: '贵州银行', // 银行名称
  // 记录结果数据
  bsResult: {
    status: '', // 交易结果状态 success / fail
    message: '', // 交易结果描述
    tips: [], // 交易结果次要描述，支持多条
    confirmText: '', // 主要操作按钮文本
    cancelText: '', // 次要操作按钮文本
    confirmFn: () => {}, // 主要操作按钮事件
    cancelFn: () => {}, // 次要操作按钮事件
  },
};

const mutations = {
  SET_BUSINESS_RESULT(state, payload = {}) {
    state.bsResult = payload;
  },
  CLEAR_BUSINESS_RESULT(state) {
    state.bsResult = {};
  }
};

const actions = {
  setBusinessResult({ commit }, payload) {
    commit('SET_BUSINESS_RESULT', payload);
  },
  clearBusinessResult({ commit }) {
    commit('CLEAR_BUSINESS_RESULT');
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
