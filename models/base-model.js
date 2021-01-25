import ASY            from '@/base/asy';
import HTTPKit        from '@/kit/http-kit';
import PagingKit      from '@/kit/paging-kit';
import HTTPMethodEnum from '@/enum/http-method-enum';

export default class BaseModel {
  /**
   * 子类需要重写
   * model名字
   */
  static name() {
    return undefined;
  }

  /**
   * 子类需要重写
   * 工厂方法
   */
  static newModel() {
    return new BaseModel();
  }

  /**
   * 任务名字
   * model.task [user.login]
   */
  static T(task) {
    console.log(task)
    return this.name() + '.' + task;
  }

  /**
   * 返回一个分页
   * @param url
   * @param params
   * @param method
   * @param pageSize
   * @param pageNumber
   * @returns {PagingKit}
   */
  static paging(url, params = {}, method = HTTPMethodEnum.GET, pageSize = 10, pageNumber = 1) {
    return new PagingKit(url, params, method, pageSize, pageNumber);
  }


  /**
   * 定义一个网络请求
   * @param url 请求链接
   * @param method 请求方法
   * @param data 请求内容
   * @param query query参数
   */
  static TaskItem(url, method = 'GET', data = {}, query = {}) {
    return {
      url,
      method,
      initData:  data,
      initQuery: query,
    }
  }

  _taskList = {};

  constructor(taskList = {}) {
    this._taskList = taskList;
  }

  /**
   * 发起一个网络请求任务
   * @param name 任务名称
   * @param data 请求内容
   * @param query
   */
  doTask(name, data = {}, query = {}) {
    let taskItem = this._taskList[name]
    ASY.assert(taskItem, '未定义网络任务:' + name)
    let { url, method, initData, initQuery } = taskItem;
    let newData = { ...initData, ...data }
    let newQuery = { ...initQuery, ...query }

    let newUrl = this._appendQueryParams(url, newQuery)
    switch (method.toUpperCase()) {
      case HTTPMethodEnum.GET:
        return HTTPKit.GET(newUrl, newData);
      case HTTPMethodEnum.POST:
        return HTTPKit.POST(newUrl, newData);
      case HTTPMethodEnum.DELETE:
        return HTTPKit.DELETE(newUrl, newData);
      case HTTPMethodEnum.PUT:
        return HTTPKit.PUT(newUrl, newData);
      default:
        console.error(`未定义网络请求方式：${ method }`);
        break;
    }
  }

  _appendQueryParams(url, query = {}) {
    let and = '?'
    if (url.indexOf('?') != -1) {
      and = '&'
    }
    return url + and + this._encodeQueryParams(query)
  }

  _encodeQueryParams(obj) {
    let params = []
    Object.keys(obj).forEach((key) => {
      let value = obj[key]
      if (typeof value === 'undefined') {
        value = ''
      }
      params.push([ key, encodeURIComponent(value) ].join('='))
    })
    return params.join('&')
  }
}
