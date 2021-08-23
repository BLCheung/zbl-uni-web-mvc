import Base from './Base';

export default {
  mixins: [ Base ],
  props:  {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    
    itemIndex:     Number,
    pageLifecycle: String,
  },
  
  watch: {
    pageLifecycle(newVal) {
      if (!newVal) return;
      this.lifecycle = newVal;
    },
  },
  
  created() {
    this._initModels();
    this._initEvents();
    this.onComponentCreated();
  },
  
  mounted() { this.onComponentMounted(); },
  
  methods: {
    /**
     * 组件创建
     */
    onComponentCreated() {},
    
    /**
     * 组件挂载
     */
    onComponentMounted() {},
    
    /**
     * 获取组件布局信息
     * @param selector
     * @param all
     * @returns {Promise<T extends NodesRefRect | NodesRefRect[]>}
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
}
