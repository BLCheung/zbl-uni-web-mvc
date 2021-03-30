/**
 * 配置文件
 */
export default {
  namespaced: true,
  state:      {
    token:      null,
    userInfo:   {},
    ad_id:      null,
    session_id: null,
  },

  mutations: {
    setToken(state, token) {
      state.token = token;
    },

    setUserInfo(state, userInfo) {
      state.userInfo = { ...userInfo };
    },

    logout(state) {
      state.token = null;
      state.userInfo = {};
    },
  },

  getters: {
    // 是否已登录
    isLogin: (state, getters, rootState) => {
      return state.token != null;
    },

    // 用户信息
    userInfo: (state, getters, rootState) => {
      return state.userInfo;
    },
  },

  action: {},
}