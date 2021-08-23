export default class Api {
  static $on(eventName, callback) { uni.$on(eventName, callback); }
  
  static $emit(eventName, param) { uni.$emit(eventName, param); }
  
  static $off(eventName, callback) { uni.$off(eventName, callback); }
  
  /**
   * 断言函数，用于在开发阶段发现错误
   * @param {Object} expression
   * @param {Object} message
   */
  static assert(expression, message) {
    !expression && console.error(message);
  }
  
  static toastResult(res) {
    if (res.isOK()) {
      Api.createToast(res.msg ? res.msg : '操作成功', true);
    } else {
      Api.createToast(res.msg ? res.msg : '操作失败');
    }
  }
  
  static createToast(title = '', success = false, successCallback) {
    uni.showToast({
      icon:     success ? 'success' : 'none',
      title,
      duration: 3000,
      success:  successCallback,
    });
  }
  
  static createLoading(title = '加载中...', close = 5000) {
    uni.showLoading({
      title,
      mask: true,
    });
    if (close && close !== 0) {
      setTimeout(() => {
        uni.hideLoading();
      }, close);
    }
  }
  
  static closeLoading() { uni.hideLoading(); }
  
  static createDialog(title, content, confirm, cancel, confirmColor, cancelColor) {
    uni.showModal({
      title,
      content,
      confirmColor: confirmColor ? confirmColor : '',
      cancelColor:  cancelColor ? cancelColor : '',
      success(res) {
        if (res.confirm) {
          confirm && confirm();
        } else if (res.cancel) {
          cancel && cancel();
        }
      },
    });
  }
  
  static navigateTo(url) { uni.navigateTo({ url }); }
  
  static navigateBack(delta = 1) { uni.navigateBack({ delta }); }
  
  static redirectTo(url) { uni.redirectTo({ url }); }
  
  static switchTab(url) { uni.switchTab({ url }); }
  
  static request(url, method, data = {}, header = {}) {
    return new Promise((resolve, reject) => {
      uni.request({
        url,
        method,
        data,
        header,
        success: (res) => {
          resolve(res);
        },
        fail:    (err) => {
          reject(err);
        },
      });
    });
  }
  
  static getStorageSync(key) { return uni.getStorageSync(key); }
  
  static setStorageSync(key, value) { uni.setStorageSync(key, value); }
  
  static removeStorageSync(key) { uni.removeStorageSync(key); }
  
  static getSystemInfoSync() { return uni.getSystemInfoSync(); }
  
  static getMenuButtonBoundingClientRect() { return uni.getMenuButtonBoundingClientRect(); }
  
  static createSelectorQuery() { return uni.createSelectorQuery(); }
  
  static previewImage(current, urls) {
    uni.previewImage({
      current,
      urls,
    });
  }
  
  static setClipboardData(data = '') { uni.setClipboardData({ data }); }
  
  static stopPullDownRefresh() { uni.stopPullDownRefresh(); }
  
  /**
   * 拨打电话
   * phoneNumber: 需要拨打的电话号码
   * @param phoneNumber
   */
  static makePhoneCall(phoneNumber = '') { uni.makePhoneCall({ phoneNumber }); }
  
  /**
   * 跳转小程序
   * @param appId appId
   * @param extraData 附加数据
   */
  static navigateToMiniProgram(appId, extraData) {
    // #ifdef MP-WEIXIN
    uni.navigateToMiniProgram({ appId, extraData });
    // #endif
  }
}