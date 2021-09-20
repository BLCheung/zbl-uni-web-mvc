import Api         from '@/common/api';
import HTTPKit     from '@/kit/http-kit';
import PagingKit   from '@/kit/paging-kit';
import HttpRequest from '@/enum/http-request-enum';
import ResultKit   from '@/kit/result-kit';
import util        from '@/utils/util';

export default class BaseModel {
  /**
   * 子类需要重写
   * model名字
   */
  static name() { return undefined; }
  
  /**
   * 子类需要重写
   * 工厂方法
   */
  static newModel() { return new BaseModel(); }
  
  /**
   * 任务名字
   * model.task [user.login]
   */
  static T(task) { return this.name() + '.' + task; }
  
  /**
   * 返回一个分页
   * @param url
   * @param params
   * @param method
   * @param pageSize
   * @param pageNumber
   * @returns {PagingKit}
   */
  static paging(url, params = {}, method = HttpRequest.GET, pageSize = 10, pageNumber = 1) {
    return new PagingKit(url, params, method, pageSize, pageNumber);
  }
  
  
  /**
   * 定义一个网络请求
   * @param url 请求链接
   * @param method 请求方法
   * @param pathKeys 请求链接的参数名称
   */
  static TaskItem(url, method = HttpRequest.GET, pathKeys = []) {
    return {
      url,
      method,
      pathKeys,
    };
  }
  
  _taskList = {};
  
  constructor(taskList = {}) {
    this._taskList = taskList;
  }
  
  /**
   * 发起一个网络请求任务
   * @param name 任务名称
   * @param data 任务数据
   * @param pathValues 接口url路径参数值
   * @returns {ResultKit|*}
   */
  doTask(name, data = {}, pathValues = []) {
    let taskItem = this._taskList[name];
    Api.assert(taskItem, '未定义网络任务:' + name);
    let { url, method, initData, pathKeys } = taskItem;
    let newData                             = { ...initData, ...data };
    if (pathKeys.length !== 0) {
      url = this._appendPathParams(url, pathKeys, pathValues);
    }
    const methodType = method.toUpperCase();
    if (!HTTPKit[methodType]) {
      console.error(`未定义网络请求方式：${ method }`);
      return ResultKit.Failed(`未定义网络请求方式：${ method }`, null);
    }
    
    return HTTPKit[methodType](url, newData);
  }
  
  _appendPathParams(url, pathKeys = [], pathValues = []) {
    let newUrl = '';
    util.forEach(pathKeys, (key, index) => {
      newUrl = url.replace(key, pathValues[index]);
    });
    return newUrl;
  }
}
