/**
 * Observer
 */
export default {
  namespaced: true,
  state:      {
    // 需要观察的页面
    pages: {},
  },

  mutations: {
    /**
     * 保存系统信息
     * @param state
     * @param systemInfo
     */
    setSystemInfo(state, systemInfo) {
      state.system = { ...systemInfo };
    },
  },

  getters: {
    /**
     * 获取系统信息
     */
    system: state => {
      return state.system;
    },
  },

  actions: {},
}
