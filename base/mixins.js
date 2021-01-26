import { mapGetters, mapMutations, mapState } from 'vuex';
import PageLifecycle                          from '@/enum/page-lifecycle-enum';
import LoadMoreEnum                           from '@/enum/load-more-enum';

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

    ...mapGetters('observer', [ 'pages' ]),

    ...mapState('theme', [ 'color' ]),

  },

  onLoad() {
    this.pageLifecycle = PageLifecycle.ON_LOAD;
    // this.setNavTitle();
  },

  onShow() {
    this.pageLifecycle = PageLifecycle.ON_SHOW
    this._judgePage();
  },

  onReady() {
    this.pageLifecycle = PageLifecycle.ON_READY;
  },

  onHide() {
    this.pageLifecycle = PageLifecycle.ON_HIDE;
  },

  onUnload() {
    this.pageLifecycle = PageLifecycle.ON_UNLOAD;
  },

  methods: {

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
     * 加载态标识（需要有加载组件的情况下）
     */
    showOrClosePageLoading() {
      this.isPageLoading = !this.isPageLoading;
    },

    /**
     * 获取传递给特定更新页面的数据
     * @param pageName 页面Name
     * @returns {*}
     */
    getPageObserver(pageName) {
      return this.pages[pageName];
    },

    /**
     * 获取所有被传递数据的页面对象
     * @returns {{}}
     */
    getAllPageObserver() {
      return this.pages;
    },

    /**
     * 像特定页面传递
     * @param pageName 页面
     * @param data 传递的数据
     */
    publishPage(pageName, data) {
      this.publish({
        pageName,
        data,
      });
    },

    /**
     * 清除特定页面传递的数据
     * @param pageName 页面
     */
    disableObservePage(pageName) {
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