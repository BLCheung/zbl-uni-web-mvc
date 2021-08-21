import Base         from './base';
import LoadMoreEnum from '@/enum/load-more-enum';

export default {
  mixins:     [ Base ],
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
  
  methods: {
    
    /**
     * 分页同步加载态标识（需要有加载组件的情况下）
     */
    synchronizeListLoading() { this.isListLoading = !this.isListLoading; },
    
    /**
     * 刷新分页
     * @return {Promise<void>}
     */
    async refresh() {
      const data = await this.paging().getMoreData(true);
      this._handlePaging(data);
    },
    
    /**
     * 加载更多
     * @return {Promise<void>}
     */
    async onLoadMore() {
      const lastLoadMore = this.loadMore;
      this.loadMore      = LoadMoreEnum.LOADING;
      const data         = await this.paging().getMoreData(false);
      if (!data) {
        this.loadMore = lastLoadMore;
      } else {
        this._handlePaging(data);
      }
    },
    
    
    /**
     * 设置paging分页器
     * @return {PagingKit}
     */
    paging() { console.error('请设置paging'); },
    
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
