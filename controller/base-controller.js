import ASY  from '@/base/asy.js';
import util from '@/utils/util';

export default class BaseController {

  static TYPE_REFRESH = 'refresh';

  static TYPE_UPDATE = 'update';

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
  }


  _modelMap = {};
  _context = null;


  /**
   * 控制器的上下文 context
   */
  constructor(context, modelClassList = [], proxy = null) {
    this._context = context;
    this._proxy = proxy ? proxy : this; // 默认为自己
    this._modelClassList = modelClassList;
    this.initModel();
  }

  /**
   * 获取任意class的类名
   * @param clazz
   * @returns {*}
   */
  static getClassName(clazz) {
    return clazz.name;
  }

  /**
   * 获取当前类名
   * @returns {string|undefined|*|null}
   */
  getCurrentClassName() {
    if (!this._proxy) return null;
    return util.getObjectClassName(this._proxy);
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
   * 初始化model
   */
  initModel() {
    this._modelMap = {};
    for (let i = 0; i < this._modelClassList.length; i++) {
      const modelClass = this._modelClassList[i];
      this._modelMap[modelClass.name()] = modelClass.newModel();
    }
  }

  /**
   * 同步执行 任务
   * modelClass model的类
   * taskName model的action
   * params 请求的参数 [POST/GET]
   * query 请求url的上参数 [POST/GET]
   */
  async doTaskSync(taskName, params = {}, toast = true, query = {}) {
    let taskType = taskName.split('.');
    let modelName = taskType[0];
    let task = taskType[1];
    ASY.assert(this._modelMap[modelName], `${ modelName }未设置`)
    let model = this._modelMap[modelName];
    // if (toast){
    // 	ASY.createLoading();
    // }
    const result = await model.doTask(task, params, query);
    // toast && ASY.closeLoading();
    if (!result.isOK() && toast) {
      ASY.toastResult(result);
    }

    return result;
  }

  /**
   * 异步 任务
   * taskName model的action user.login
   * params 请求的参数 [POST/GET]
   * callback 回调函数
   * toast 是否弹错误Toast
   * query 请求url的上参数 [POST/GET]
   */
  async doTaskAsync(taskName, params = {}, callback = 'onTaskCompleted', toast = true, query = {}) {
    let taskType = taskName.split('.');
    let modelName = taskType[0];
    let task = taskType[1];
    ASY.assert(this._modelMap[modelName], `${ modelName }未设置`)
    let model = this._modelMap[modelName];
    let result = await model.doTask(task, params, query);
    if (!result.isOK() && toast) {
      ASY.toastResult(result);
      return;
    }
    let proxy = this._proxy;
    ASY.assert(proxy[callback], `${ callback }未实现方法`);
    proxy[callback](result, taskName)
  }


  /**
   * 向特定页面订阅事件
   * @param pageName
   * @param data
   */
  publishPageData(pageName, data) {
    if (!this._context || !pageName) return;
    this._context.publishPage(pageName, data);
  }

  /**
   * 关闭对应页面的监听事件
   * @param pageName
   */
  disablePageData(pageName) {
    if (!this._context || !pageName) return;
    this._context.disableObservePage(pageName);
  }

  /**
   * 获取当前页面对应的监听事件数据
   * @returns {null|*}
   */
  getCurrentPageData() {
    if (!this._context) return null;
    return this._context.getPageObserver(this.getCurrentClassName());
  }
}
