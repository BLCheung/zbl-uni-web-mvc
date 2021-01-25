export default {

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
}