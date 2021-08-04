import Vuex         from 'vuex';
import Vue          from 'vue';
import moduleConfig from './modules/config/index';
import moduleSystem from './modules/system/index';
import moduleTheme  from './modules/theme/index';
import moduleUser   from './modules/user/index';
import modulePages  from './modules/pages/index';

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    system: moduleSystem,
    config: moduleConfig,
    theme:  moduleTheme,
    user:   moduleUser,
    pages:  modulePages,
  },
  // 全局变量
  state:   {},
});
export default store;
