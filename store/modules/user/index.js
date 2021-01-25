/**
 * 配置文件
 */
import mutations from './mutations';
import actions   from './actions';
import getters   from './getters';

export default {
  namespaced: true,
  state:      {
    token:      null,
    userInfo:   {},
    ad_id:      null,
    session_id: null,
  },
  mutations:  mutations,
  action:     actions,
  getters:    getters,
}