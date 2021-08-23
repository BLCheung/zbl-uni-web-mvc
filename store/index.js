import Vuex         from 'vuex';
import Vue          from 'vue';
import moduleSystem from './modules/system';
import moduleTheme  from './modules/theme';
import moduleUser   from './modules/user';

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    system: moduleSystem,
    theme:  moduleTheme,
    user:   moduleUser,
  },
  // 全局变量
  state:   {},
});
export default store;
