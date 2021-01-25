import Vuex           from 'vuex';
import Vue            from 'vue';
import moduleConfig   from './modules/config/index';
import moduleTheme    from './modules/theme/index';
import moduleUser     from './modules/user/index';
import moduleObserver from './modules/observer/index';

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    config:   moduleConfig,
    theme:    moduleTheme,
    user:     moduleUser,
    observer: moduleObserver,
  },
  // 全局变量
  state:   {},
});
export default store;
