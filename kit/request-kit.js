/**
 * 网络请求辅助kit
 */
export default class RequestKit {
  // 是否可执行请求标识
  _canRequest          = false;
  // 下次可执行请求的延时
  _nextCanRequestDelay = 1000;
  
  // 实时请求定时器
  _requestTimer = null;
  // 实时请求延时
  _requestDelay = 800;
  
  /**
   * 防抖执行请求
   * @param callback
   * @example this.requestDebounce(async () => { await this.fetchData() });
   */
  requestDebounce(callback) {
    if (!this._canRequest) {
      this._canRequest = true;
      callback && callback();
      setTimeout(() => {
        this._canRequest = false;
      }, this._nextCanRequestDelay);
    }
  }
  
  /**
   * 实时请求节流
   * @param callback
   * @example this.requestThrottle(async () => { await this.fetchData() });
   */
  requestThrottle(callback) {
    this._requestTimer !== null && clearTimeout(this._requestTimer);
    this._requestTimer = setTimeout(async () => {
      callback && callback();
    }, this._requestDelay);
  }
  
  /**
   * 设置防抖请求的延时间隔
   * @param value 毫秒
   */
  set nextCanRequestDelay(value) {
    this._nextCanRequestDelay = value;
  }
  
  /**
   * 设置节流时每次实时请求的延时
   * @param value 毫秒
   */
  set requestDelay(value) {
    this._requestDelay = value;
  }
}
