import ASY from '@/base/asy';

export default class UserKit {
  static KEY_TOKEN     = 'token';
  static KEY_USER_INFO = 'user_info';
  
  static getToken() { return ASY.getStorageSync(this.KEY_TOKEN) || ''; }
  
  static setToken(token = '') {
    if (!token) return;
    ASY.setStorageSync(this.KEY_TOKEN, token);
  }
  
  static removeToken() { ASY.removeStorageSync(this.KEY_TOKEN); }
  
  static setUserInfo(userInfo = {}) { ASY.setStorageSync(this.KEY_USER_INFO, userInfo); }
  
  static getUserInfo() { return ASY.getStorageSync(this.KEY_USER_INFO) || {}; }
  
  static removeUserInfo() { ASY.setStorageSync(this.KEY_USER_INFO, {}); }
}
