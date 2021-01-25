/**
 * Observer
 */
import mutations from './mutations';
import actions   from './actions';
import getters   from './getters';

export default {
  namespaced: true,
  state:      {
    // 需要观察的页面
    pages: {},
  },
  mutations:  mutations,
  getters:    getters,
  actions:    actions,
}
