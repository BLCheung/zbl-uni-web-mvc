import ASY from '@/base/asy';

// 用户token
const KEY_TOKEN = 'loginToken';
// 游客token
const KEY_GUEST_ID = 'guestId';

/**
 * 获取Token
 */
let _token = ''
const getToken = () => {
  if (!!_token) {
    return _token;
  }
  _token = ASY.getStorageSync(KEY_TOKEN);
  return _token ? _token : '';
}

/**
 * 设置token
 * @param {*} token 获取到的token
 */
const setToken = (token) => {
  if (token) {
    _token = token;
    ASY.setStorageSync(KEY_TOKEN, token);
  }
}

/**
 * 移除token
 */
const removeToken = () => {
  _token = '';
  ASY.removeStorageSync(KEY_TOKEN);
}

/**
 * 设置游客id
 * @param guestId
 */
const setGuestId = (guestId) => {
  ASY.setStorageSync(KEY_GUEST_ID, guestId);
}

/**
 * 获取游客id
 * @returns {any|string}
 */
const getGuestId = () => {
  return ASY.getStorageSync(KEY_GUEST_ID) || '';
}

/**
 * 移除游客id
 */
const removeGuestId = () => {
  ASY.removeStorageSync(KEY_GUEST_ID);
}

module.exports = {
  getToken,
  setToken,
  removeToken,
  setGuestId,
  getGuestId,
  removeGuestId,
};
