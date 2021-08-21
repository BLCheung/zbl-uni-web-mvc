import Api  from '@/common/api';
import util from '@/utils/util';

export default class BaseController {
  
  _modelMap = {};
  _context  = null;
  
  // 是否可执行搜索标识
  _searchFlag          = false;
  // 下次可执行搜索的延时
  _searchDelay         = 1000;
  // 实时搜索定时器
  _continueSearchTimer = null;
  // 实时搜索延时
  _continueSearchDelay = 800;
  
  // 页面用定时器
  pageTimer = null;
  
  /**
   * 控制器的上下文 context
   */
  constructor(context, modelClassList = [], proxy = null) {
    this._context        = context;
    this._proxy          = proxy ? proxy : this; // 默认为自己
    this._modelClassList = modelClassList;
    this._initModel();
  }
  
  // 默认网络请求回调函数
  onTaskCompleted({ code, data }, taskName) { console.error('请业务Controller重写onTaskCompleted方法'); }
  
  
  /**
   * 获取视图层上下文
   * @returns {null}
   */
  getContext() {
    Api.assert(this._context, '构造函数未传入context参数');
    return this._context;
  }
  
  /**
   * 同步执行 任务
   * modelClass model的类
   * taskName model的action
   * params 请求的参数 [POST/GET]
   * query 请求url的上参数 [POST/GET]
   */
  async doTaskSync(taskName, params = {}, query = {}) {
    let taskType  = taskName.split('.');
    let modelName = taskType[0];
    let task      = taskType[1];
    Api.assert(this._modelMap[modelName], `${ modelName }未设置`);
    let model = this._modelMap[modelName];
    
    return await model.doTask(task, params, query);
  }
  
  /**
   * 异步 任务
   * taskName model的action user.login
   * params 请求的参数 [POST/GET]
   * callback 回调函数
   * query 请求url的上参数 [POST/GET]
   */
  async doTaskAsync(taskName, params = {}, callback = 'onTaskCompleted', query = {}) {
    let taskType  = taskName.split('.');
    let modelName = taskType[0];
    let task      = taskType[1];
    Api.assert(this._modelMap[modelName], `${ modelName }未设置`);
    let model  = this._modelMap[modelName];
    let result = await model.doTask(task, params, query);
    let proxy  = this._proxy;
    Api.assert(proxy[callback], `${ callback }未实现方法`);
    proxy[callback](result, taskName);
  }
  
  /**
   * 防抖执行搜索
   * @param callback
   * @example this.searchDebounce(async () => { await this.fetchData() });
   */
  searchDebounce(callback) {
    if (!this._searchFlag) {
      this._searchFlag = true;
      callback && callback();
      setTimeout(() => {
        this._searchFlag = false;
      }, this._searchDelay);
    }
  }
  
  /**
   * 实时搜索节流
   * @param callback
   * @example this.searchThrottle(async () => { await this.fetchData() });
   */
  searchThrottle(callback) {
    this._continueSearchTimer !== null && clearTimeout(this._continueSearchTimer);
    this._continueSearchTimer = setTimeout(async () => {
      callback && callback();
    }, this._continueSearchDelay);
  }
  
  /**
   * 移除页面定时器（如果有用到）
   */
  removePageTimer() { !!this.pageTimer && (this.pageTimer = null); }
  
  
  /**
   * 初始化model
   */
  _initModel() {
    this._modelMap = {};
    for (let i = 0; i < this._modelClassList.length; i++) {
      const modelClass                  = this._modelClassList[i];
      this._modelMap[modelClass.name()] = modelClass.newModel();
    }
  }
}
