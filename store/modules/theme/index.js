/**
 * 主题
 */
import Theme     from '@/consts/theme'
import mutations from './mutations';
import getters   from './getters';
import actions   from './actions';

export default {
  namespaced: true,
  state:      {
    ...Theme,
  },
  mutations:  mutations,
  actions:    actions,
  getters:    getters,
}