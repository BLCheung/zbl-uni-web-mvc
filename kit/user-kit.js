import Api from '@/common/api';

export default class UserKit {
  static KEY_TOKEN     = 'token';
  static KEY_USER_INFO = 'user_info';
  
  static getToken() { return Api.getStorageSync(this.KEY_TOKEN) || ''; }
  
  static setToken(token = '') {
    if (!token) return;
    Api.setStorageSync(this.KEY_TOKEN, token);
  }
  
  static removeToken() { Api.removeStorageSync(this.KEY_TOKEN); }
  
  static setUserInfo(userInfo = {}) { Api.setStorageSync(this.KEY_USER_INFO, userInfo); }
  
  static getUserInfo() { return Api.getStorageSync(this.KEY_USER_INFO) || {}; }
  
  static removeUserInfo() { Api.setStorageSync(this.KEY_USER_INFO, {}); }
}
