/**
 * 用户
 */
import UserKit from '@/kit/user-kit';

export default {
  namespaced: true,
  state:      {
    token:    '',
    userInfo: {},
  },
  
  mutations: {
    setToken(state, token) {
      if (!token) return;
      UserKit.setToken(token);
    },
    
    setUserInfo(state, userInfo) {
      state.userInfo = { ...userInfo };
      UserKit.setUserInfo({ ...userInfo });
    },
    
    logout(state) {
      state.token    = '';
      state.userInfo = {};
      UserKit.removeToken();
      UserKit.removeUserInfo();
    },
  },
  
  getters: {
    // 是否已登录
    isLogin: (state, getters, rootState) => {
      state.token = UserKit.getToken();
      return !!state.token;
    },
    
    // 用户信息
    userInfo: (state, getters, rootState) => {
      state.userInfo = UserKit.getUserInfo();
      return state.userInfo;
    },
  },
  
  action: {},
}
