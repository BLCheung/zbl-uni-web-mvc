/**
 * Observer
 */
export default {
  namespaced: true,
  state:      {
    // 需要观察的页面
    pages: {},
  },

  mutations:  {
    /**
     * 发布
     * @param state
     * @param obj
     */
    publish(state, obj) {
      const { pageName, data } = obj;
      state.pages[pageName] = data;
    },
  },

  getters:    {
    /**
     * 获取pages状态
     */
    pages: state => {
      return state.pages;
    },
  },

  actions:    {},
}
