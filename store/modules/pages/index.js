/**
 * Observer
 */
export default {
  namespaced: true,
  state:      {
    // 通信的页面
    pages: {},
  },
  
  mutations: {
    /**
     * 传递页面数据
     * @param state
     * @param obj
     */
    publish(state, obj) {
      const { pageName, data } = obj;
      state.pages[pageName]    = data;
    },
  },
  
  getters: {
    /**
     * 获取pages
     */
    pages: state => {
      return state.pages;
    },
  },
  
  actions: {},
}
