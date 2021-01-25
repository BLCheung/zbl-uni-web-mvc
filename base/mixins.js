import { mapGetters, mapMutations, mapState } from 'vuex';

export const pageMixin = {
  data() {
    return {
      isTopPage: false,
    };
  },
  controller: null,

  computed: {

    ...mapGetters('observer', [ 'pages' ]),

    ...mapState('theme', [ 'color' ]),

  },

  onShow() {
    this._judgePage();
  },

  methods: {

    ...mapMutations('observer', [ 'publish' ]),

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
    observePage(pageName, data) {
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