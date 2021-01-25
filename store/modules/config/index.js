/**
 * 配置文件
 */
import Config    from '@/consts/config';
import mutations from './mutations';
import actions   from './actions';
import getters   from './getters';

export default {
  namespaced: true,
  state:      {
    ...Config,
  },
  mutations:  mutations,
  actions:    actions,
  getters:    getters,
}