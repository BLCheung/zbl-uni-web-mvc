import Base             from './base';
import { mapMutations } from 'vuex';
import PageLifecycle    from '@/enum/page-lifecycle-enum';

export default {
  mixins:    [ Base ],
  data() {
    return {
      // 当前页面栈是否只有该页面
      isTopPage:     false,
      // 页面加载态标识
      isPageLoading: false,
      // 是否可以提交
      canCommit:     false,
    };
  },
  pageTimer: null,
  
  computed: {},
  
  onLoad() { this.lifecycle = PageLifecycle.ON_LOAD; },
  
  onShow() {
    this.lifecycle = PageLifecycle.ON_SHOW;
    this.setSystemInfo(uni.getSystemInfoSync());
    this._judgePage();
  },
  
  onReady() { this.lifecycle = PageLifecycle.ON_READY; },
  
  onHide() { this.lifecycle = PageLifecycle.ON_HIDE; },
  
  onUnload() {
    this.lifecycle = PageLifecycle.ON_UNLOAD;
    this.pageTimer     = null;
  },
  
  methods: {
    ...mapMutations('system', [ 'setSystemInfo' ]),
    
    /**
     * 页面回到顶部
     */
    backToTop() { uni.pageScrollTo({ scrollTop: 0, duration: 100 }); },
    
    /**
     * 同步加载态标识（需要有加载组件的情况下）
     */
    synchronizePageLoading() { this.isPageLoading = !this.isPageLoading; },
    
    /**
     * 同步锁提交按钮
     */
    synchronizeCommit() { this.canCommit = !this.canCommit; },
    
    /**
     * 判断页面栈
     * @private
     */
    _judgePage() {
      const pages    = getCurrentPages();
      // 页面栈没有或只有当前页面
      this.isTopPage = pages.length <= 1;
    },
  },
}
