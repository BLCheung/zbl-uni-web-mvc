import LoadMoreEnum from '@/enum/load-more-enum';
import Api          from '@/common/api';

export default {
  data() {
    return {
      // 列表
      list:          [],
      // 是否还有更多
      hasMore:       true,
      // 触底加载标识
      loadMore:      LoadMoreEnum.NO_MORE,
      // 分页加载态
      isListLoading: false,
    };
  },
  // 分页器
  _paging: null,
  
  methods: {
    /**
     * 注册paging分页器
     * @param paging
     */
    registerPaging(paging) { this._paging = paging; },
    
    /**
     * 注册分页器实体
     * @param entityClass 实体类名
     * @example this.registerEntity(TestBean);
     */
    registerEntity(entityClass) {
      if (!this._paging) {
        Api.assert(this._paging, '分页器未注册!');
        return;
      }
      this._paging.setEntityClass(entityClass);
    },
  
    /**
     * 分页同步加载态标识（需要有加载组件的情况下）
     */
    synchronizeListLoading() { this.isListLoading = !this.isListLoading; },
    
    /**
     * 刷新分页
     * @return {Promise<void>}
     */
    async refresh() {
      if (!this._paging) {
        Api.assert(this._paging, '分页器未注册!');
        return;
      }
      const data = await this._paging.getMoreData(true);
      this._handlePaging(data);
    },
    
    /**
     * 加载更多
     * @return {Promise<void>}
     */
    async onLoadMore() {
      if (!this._paging) {
        Api.assert(this._paging, '分页器未注册!');
        return;
      }
      const lastLoadMore = this.loadMore;
      this.loadMore      = LoadMoreEnum.LOADING;
      const data         = await this._paging.getMoreData(false);
      if (!data) {
        this.loadMore = lastLoadMore;
      } else {
        this._handlePaging(data);
      }
    },
  
    /**
     * 追加分页器请求参数
     * @param params
     */
    setPagingParam(params) {
      if (!this._paging) {
        Api.assert(this._paging, '分页器未注册!');
        return;
      }
      this._paging.addNewParams(params);
    },
    
    
    /**
     * 处理分页数据
     * @param data
     * @private
     */
    _handlePaging(data) {
      const { hasMore, list } = data;
      this.list               = list;
      this.hasMore            = hasMore ? LoadMoreEnum.MORE : LoadMoreEnum.NO_MORE;
    },
  },
}
