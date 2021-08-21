import ASY            from '@/base/asy';
import HTTPKit        from './http-kit';
import ResultKit      from './result-kit';
import HTTPMethodEnum from '@/enum/http-method-enum';

export default class PagingKit {
  
  constructor(url, params = {}, method = HTTPMethodEnum.GET, pageSize = 10, pageNumber = 1) {
    this.url        = url;
    this.params     = params;
    this.method     = method;
    this.pageSize   = pageSize;
    this.pageNumber = pageNumber;
    this.hasMore    = true;
    this.locker     = false;
    this._total     = [];
    this._isTest    = false;
    this._test_data = null;
  }
  
  /**
   * 获取更多数据
   * @param {*} refresh 是否重新获取
   */
  async getMoreData(refresh = false) {
    // 重置
    refresh && this._reset();
    // 没有更多了
    if (!this.hasMore) {
      return;
    }
    // 获取锁
    if (!this._getLocker()) {
      return;
    }
    const data = await this._actualGetData();
    // 释放锁
    this._releaseLocker();
    return data;
  }
  
  /**
   * 获取总条目数
   */
  getList() {
    return this._total;
  }
  
  /**
   * 增加新传参
   */
  addNewParams(params = {}) {
    this.params = { ...this.params, ...params };
  }
  
  setEntityClass(entity) {
    this._entity = entity;
  }
  
  /**
   * 真正的发起请求方法
   */
  async _actualGetData() {
    const params = this._getParams();
    let request  = {
      url:     `${ this.url }?current_page=${ this.pageNumber }&per_page=${ this.pageSize }`,
      method:  this.method,
      data:    {
        current_page: this.pageNumber,
        per_page:     this.pageSize,
        ...params,
      },
      loading: null,
    };
    let res      = {};
    // 是否开启测试
    if (this._isTest) {
      res = ResultKit.OK(this._test_data);
    } else {
      res = await HTTPKit._request(request);
    }
    
    if (!res.isOK()) {
      ASY.toastResult(res);
      return null;
    }
    
    
    const {
            data,
          } = res;
    
    const { has_next, total, items } = data;
    // 没有数据
    if (total === 0) {
      return {
        hasMore: false,
        list:    [],
      };
    }
    // 是否还有下一页
    this.hasMore = has_next;
    if (this.hasMore) {
      this.pageNumber += 1;
    }
    let newList = this._formatItem(items)
    this._accumulate(newList);
    return {
      hasMore: this.hasMore,
      list:    this._total,
    };
  }
  
  /**
   * 拼接下一页数组
   * @param {*} items 返回的下一页数组
   */
  _accumulate(items) {
    this._total = this._total.concat(items);
  }
  
  _formatItem(list) {
    let newList = [];
    if (this._entity) {
      for (let i = 0; i < list.length; i++) {
        newList.push(new this._entity(list[i]));
      }
    } else {
      newList = list;
    }
    return newList;
  }
  
  _reset() {
    this.hasMore    = true;
    this.pageNumber = 1;
    this._total     = [];
  }
  
  _getParams() {
    return {
      ...this.params,
    };
  }
  
  _getLocker() {
    if (this.locker) {
      return false;
    }
    this.locker = true;
    return true;
  }
  
  _releaseLocker() {
    this.locker = false;
  }
  
  /**
   * 开启测试模式
   */
  _enableTest() {
    this._isTest = true;
  }
  
  /**
   * 设置测试数据
   * @param {*} data 数据源
   */
  _setTestData(data) {
    // 没有开启测试模式，则return
    if (!this._isTest) {
      return;
    }
    this._test_data = data;
  }
}
