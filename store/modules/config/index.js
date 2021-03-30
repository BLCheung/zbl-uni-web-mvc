/**
 * 配置文件
 */
import Config  from '@/consts/config';

export default {
  namespaced: true,
  state:      {
    ...Config,
  },


  mutations: {
    update(state, theme) {
      Object.assign(state, theme);
    },

    getConfig(state) {
      return state;
    },
  },

  getters: {
    /**
     * 获取logo
     * @param state
     * @returns {null}
     */
    getLogo: state => {
      return state.logo;
    },

    /**
     * 获取小号logo
     * @param state
     * @returns {null}
     */
    getMinLogo: state => {
      return state.logo_min;
    },
  },

  actions: {},
}