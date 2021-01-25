export default {
  // 是否已登录
  isLogin: (state, getters, rootState) => {
    return state.token != null;
  },

  // 用户信息
  userInfo: (state, getters, rootState) => {
    return state.userInfo;
  },
}
