import ASY  from '@/base/asy.js';
import util from '@/utils/util';

export default class BaseController {
  // 刷新操作
  static TYPE_REFRESH = 'refresh';
  // 更新操作（多用于分页）
  static TYPE_UPDATE  = 'update';
  // 删除操作（多用于分页）
  static TYPE_DELETE  = 'delete';
  
  // 默认网络请求回调函数
  onTaskCompleted({ code, data }, taskName) {
    console.error('请业务Controller重写onTaskCompleted方法');
  }
  
  /**
   * 用于接收页面数据监听事件
   * @param allPageParams 所有页面接收的页面数据
   */
  onAllPageObserved(allPageParams = null) {};
  
  /**
   * 用于接收页面数据监听事件
   * @param currentPageParams 当前页面接收的页面数据
   */
  onCurrentPageObserved(currentPageParams = null) {
    console.log('currentPageParams:', currentPageParams);
    if (!currentPageParams) return;
    const { type = '', params = null } = currentPageParams;
    
    BaseController.TYPE_REFRESH === type && this.onRefreshPage(params);
    BaseController.TYPE_UPDATE === type && this.onUpdatePaging(params);
    BaseController.TYPE_DELETE === type && this.onDeletePaging(params);
    
    this.removeCurrentPageData();
  }
  
  /**
   * 刷新页面回调
   * @param params 当前页面接收到的回调数据
   */
  onRefreshPage(params = null) {};
  
  /**
   * 更新分页回调（非全部刷新）
   * @param params 当前页面接收到的回调数据
   */
  onUpdatePaging(params = null) {};
  
  /**
   * 删除分页回调（非全部刷新）
   * @param params 当前页面接收到的回调数据
   */
  onDeletePaging(params = null) {};
  
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
  
  /**
   * 获取类名
   * @param clazz
   * @returns {*}
   */
  static getClassName(clazz) {
    if (!clazz) return null;
    return util.getObjectClassName(clazz);
  }
  
  /**
   * 获取目标Controller类名
   * @example BaseController.getTargetControllerName(TargetController);
   * @param controller 指定的目标Controller类
   * @returns {*}
   */
  static getTargetControllerName(controller) {
    if (!controller) return '';
    return controller.name;
  }
  
  /**
   * 获取视图层上下文
   * @returns {null}
   */
  getContext() {
    ASY.assert(this._context, '构造函数未传入context参数');
    return this._context;
  }
  
  /**
   * 设置上下文代理对象
   * @param proxy
   */
  setProxy(proxy = null) {
    if (!proxy) {
      ASY.assert(proxy, 'proxy上下文代理对象不能为空!');
      return;
    }
    this._proxy = proxy;
    return this;
  }
  
  /**
   * 与Vue视图显式声明的函数做绑定
   * @param vueMethods
   * @returns {BaseController}
   */
  bindMethod2Vue(vueMethods = []) {
    for (const method of vueMethods) {
      if (this._context[method] && this[method]) {
        this._context[method] = this[method].bind(this);
      }
    }
    return this;
  }
  
  /**
   * 设置请求数据模型类
   * @param modelClassList
   * @returns {BaseController}
   */
  bindModelClassList(modelClassList = []) {
    this._modelClassList = modelClassList;
    return this;
  }
  
  /**
   * 获取当前代理对象名
   * @returns {string}
   */
  getCurrentProxyName() {
    if (!this._proxy) return '';
    return util.getObjectClassName(this._proxy);
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
    ASY.assert(this._modelMap[modelName], `${ modelName }未设置`);
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
    ASY.assert(this._modelMap[modelName], `${ modelName }未设置`);
    let model  = this._modelMap[modelName];
    let result = await model.doTask(task, params, query);
    let proxy  = this._proxy;
    ASY.assert(proxy[callback], `${ callback }未实现方法`);
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
   * 初始化传递给页面数据的模板
   * @param type 该页面数据的类型
   * @param params 数据
   * @returns {{type: string, params: null}}
   */
  initPageDataTemplate(type = '', params = null) {
    return { type, params };
  }
  
  /**
   * 向特定页面传递数据
   * @param pageName
   * @param data
   */
  publishPageData(pageName, data) {
    if (!this._context || !pageName) return;
    this._context.publishPage(pageName, data);
  }
  
  /**
   * 移除对应页面的页面数据
   */
  removeCurrentPageData() {
    this._context.removePageData(this.getCurrentProxyName());
  }
  
  /**
   * 获取当前页面对应的页面数据
   * @returns {null|*}
   */
  getCurrentPageData() {
    if (!this._context) return null;
    return this._context.getPageData(this.getCurrentProxyName());
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
