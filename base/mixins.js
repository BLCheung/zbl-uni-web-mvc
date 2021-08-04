import { mapGetters, mapMutations, mapState } from 'vuex';
import PageLifecycle                          from '@/enum/page-lifecycle-enum';
import LoadMoreEnum                           from '@/enum/load-more-enum';

/**
 * 页面混入
 * @type {{controller: null, onUnload(): void, onShow(): (undefined), data(): {isTopPage: boolean, loadMore: string, pageLifecycle: null, isPageLoading: boolean}, computed: {system: Computed, pages: Computed, color: Computed, windowHeightStyle(): {height: string}}, methods: {_judgePage(): void, showListLoading(): void, backToTop(): void, publishPage(*=, *=): (undefined), getAllPageData(): {}, setNavTitle(*=): void, closeListLoading(): void, releaseCommit(): void, setSystemInfo: MutationMethod, removePageData(*=): (undefined), synchronizePageLoading(): void, showPageLoading(): void, synchronizeCommit(): void, publish: MutationMethod, lockCommit(): void, getPageData(*): *, closePageLoading(): void}, onLoad(): void, onHide(): void, onReady(): void}}
 */
export const pageMixin = {
  data() {
    return {
      // 页面生命周期
      pageLifecycle: null,
      // 当前页面栈是否只有该页面
      isTopPage:     false,
      // 页面加载态标识
      isPageLoading: false,
      // 触底加载标识
      loadMore:      LoadMoreEnum.NO_MORE,
    };
  },
  controller: null,
  
  computed: {
    ...mapGetters('system', [ 'system' ]),
    
    ...mapGetters('observer', [ 'pages' ]),
    
    ...mapState('theme', [ 'color' ]),
    
    
    /**
     * 可用窗口高度
     * @returns {{height: string}}
     */
    windowHeightStyle() { return { height: this.system.windowHeight * 2 + 'rpx' }; },
    
  },
  
  onLoad() { this.pageLifecycle = PageLifecycle.ON_LOAD; },
  
  onShow() {
    this.pageLifecycle = PageLifecycle.ON_SHOW;
    this.setSystemInfo(uni.getSystemInfoSync());
    this._judgePage();
    if (!this.controller) return;
    this.controller.onAllPageObserved(this.controller.getCurrentPageData());
  },
  
  onReady() { this.pageLifecycle = PageLifecycle.ON_READY; },
  
  onHide() { this.pageLifecycle = PageLifecycle.ON_HIDE; },
  
  onUnload() {
    this.pageLifecycle = PageLifecycle.ON_UNLOAD;
    !!this.controller && this.controller.removePageTimer();
  },
  
  methods: {
    ...mapMutations('system', [ 'setSystemInfo' ]),
    ...mapMutations('observer', [ 'publish' ]),
    
    /**
     * 设置导航栏标题
     * @param title
     */
    setNavTitle(title = '') {
      const navTitle = 'uni-app';
      uni.setNavigationBarTitle({ title: title ? title : navTitle });
    },
    
    /**
     * 页面回到顶部
     */
    backToTop() { uni.pageScrollTo({ scrollTop: 0, duration: 100 }); },
    
    
    /**
     * 同步加载态标识（需要有加载组件的情况下）
     */
    synchronizePageLoading() { this.isPageLoading = !this.isPageLoading; },
  
    /**
     * 同步加载态标识（需要有加载组件的情况下）
     */
    synchronizeListLoading() { this.isListLoading = !this.isListLoading; },
    
    /**
     * 开启加载态
     */
    showPageLoading() { this.isPageLoading = true; },
    
    /**
     * 关闭加载态
     */
    closePageLoading() { this.isPageLoading = false; },
    
    /**
     * 打开列表加载态
     */
    showListLoading() { this.isListLoading = true; },
    
    /**
     * 关闭列表加载态
     */
    closeListLoading() { this.isListLoading = false; },
    
    /**
     * 同步锁提交按钮
     */
    synchronizeCommit() { this.canCommit = !this.canCommit; },
    
    /**
     * 锁住提交状态
     */
    lockCommit() { this.canCommit = false; },
    
    /**
     * 释放提交状态
     */
    releaseCommit() { this.canCommit = true; },
    
    
    /**
     * 获取传递给特定更新页面的数据
     * @param pageName 页面Name
     * @returns {*}
     */
    getPageData(pageName) {
      if (!this.pages[pageName]) return null;
      return this.pages[pageName];
    },
    
    /**
     * 获取所有被传递数据的页面对象
     * @returns {{}}
     */
    getAllPageData() { return this.pages; },
    
    /**
     * 像特定页面传递
     * @param pageName 页面
     * @param data 传递的数据
     */
    publishPage(pageName, data = null) {
      if (!pageName) return;
      this.publish({
        pageName,
        data,
      });
    },
    
    /**
     * 清除特定页面传递的数据
     * @param pageName 页面
     */
    removePageData(pageName) {
      if (!pageName) return;
      this.publish({
        pageName,
        data: null,
      });
    },
    
    
    /**
     * 判断页面栈
     * @private
     */
    _judgePage() {
      const pages = getCurrentPages();
      // 页面栈没有或只有当前页面
      pages.length <= 1 && (this.isTopPage = true);
    },
  },
};


/**
 * 组件混入
 * @type {{data(): {}, computed: {color: Computed}, methods: {getRect(*=, *=): Promise<unknown>}, props: {lifecycle: StringConstructor, item: {default(): {}, type: ObjectConstructor}, itemIndex: NumberConstructor}}}
 */
export const componentMixin = {
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    
    itemIndex: Number,
    lifecycle: String,
  },
  data() {
    return {};
  },
  
  computed: {
    
    ...mapState('theme', [ 'color' ]),
    
  },
  
  methods: {
    /**
     * 获取组件布局信息
     * @param selector
     * @param all
     * @returns {Promise<unknown>}
     */
    getRect(selector, all) {
      return new Promise(resolve => {
        uni.createSelectorQuery().in(this)[all ? 'selectAll' : 'select'](selector)
          .boundingClientRect(rect => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect);
            }
            if (!all && rect) {
              resolve(rect);
            }
          })
          .exec();
      });
    },
  },
};
