import { mapGetters, mapState } from 'vuex';
import RequestKit               from '@/kit/request-kit';
import UserKit                  from '@/kit/user-kit';
import Api                      from '@/common/api';

export default {
  data() {
    return {
      // 页面生命周期
      lifecycle: null,
    };
  },
  // 存放请求model
  _modelMap:       {},
  // 请求辅助kit
  requestKit:      new RequestKit(),
  // 默认的请求回调名称
  defaultCallback: 'onTaskCompleted',
  
  computed: {
    ...mapGetters('system', [ 'system' ]),
    
    ...mapState('theme', [ 'color' ]),
  },
  
  methods: {
    /**
     * 注册接口model
     * @return {*[]}
     */
    onRegisterModel() { return []; },
    
    /**
     * 注册页面/组件事件
     * @return {{}}
     */
    onRegisterEvent() { return {}; },
    
    /**
     * 默认的网络请求回调函数
     * @param res
     * @param taskName
     */
    onTaskCompleted(res, taskName) { console.error('未重写onTaskCompleted方法'); },
    
    /**
     * 用户是否已登录
     * @return {boolean}
     */
    isLogin() { return !!UserKit.getToken(); },
    
    /**
     * 同步执行 任务
     * taskName model的action名称 (例: user.login)
     * params 请求的data参数
     * pathValues 请求url上的参数值
     */
    async doTaskSync(taskName, params = {}, pathValues = []) {
      let taskType  = taskName.split('.');
      let modelName = taskType[0];
      let task      = taskType[1];
      Api.assert(this._modelMap[modelName], `${ modelName }未设置`);
      let model = this._modelMap[modelName];
      
      return await model.doTask(task, params, pathValues);
    },
    
    /**
     * 异步 任务
     * taskName model的action名称 (例: user.login)
     * params 请求的data参数
     * pathValues 请求url上的参数值
     * callback 回调函数
     */
    async doTaskAsync(taskName, params = {}, pathValues = [], callback = this.defaultCallback) {
      let taskType  = taskName.split('.');
      let modelName = taskType[0];
      let task      = taskType[1];
      Api.assert(this._modelMap[modelName], `${ modelName }未设置`);
      let model  = this._modelMap[modelName];
      let result = await model.doTask(task, params, pathValues);
      Api.assert(this[callback], `${ callback }未实现方法`);
      this[callback] && this[callback](result, taskName);
    },
    
    /**
     * 注销当前页面/组件所有注册的事件
     */
    unregisterEvent() {
      const events = this.onRegisterEvent();
      for (const eventKey in events) {
        if (!!events[eventKey] && !!this[events[eventKey]]) {
          Api.$off(events[eventKey]);
        }
      }
    },
    
    /**
     * 手动注销相关事件
     * @param events 事件名称数组
     * @example this.unregisterEventManuel([ 'onLogin', 'onSelect' ]);
     */
    unregisterEventManuel(events = []) {
      if (events.length === 0) return;
      for (let i = 0, size = events.length; i < size; i++) {
        Api.$off(events[i]);
      }
    },
    
    /**
     * 初始化model
     * @private
     */
    _initModels() {
      this._modelMap = {};
      const models   = this.onRegisterModel();
      if (models.length === 0) return;
      for (let i = 0, modelsSize = models.length; i < modelsSize; i++) {
        const modelItem                  = models[i];
        this._modelMap[modelItem.name()] = modelItem.newModel();
      }
    },
    
    /**
     * 初始化事件
     * @private
     */
    _initEvents() {
      const events = this.onRegisterEvent();
      for (const eventKey in events) {
        if (!!events[eventKey] && !!this[events[eventKey]]) {
          Api.$on(events[eventKey], this[events[eventKey]].bind(this));
        }
      }
    },
  },
}
