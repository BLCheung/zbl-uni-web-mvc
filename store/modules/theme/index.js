/**
 * 主题
 */
import Theme from '@/consts/theme'

export default {
  namespaced: true,
  state:      {
    ...Theme,
  },

  mutations:  {
    update(state, theme) {
      Object.assign(state, theme);
    },
  },

  getters:    {
    /**
     * 获取主题所有颜色
     */
    getColor: state => {
      return state.color;
    },
  },

  actions:    {},
}