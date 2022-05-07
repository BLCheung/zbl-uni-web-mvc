<script>
import util  from '@/utils/util';
import store from '@/store';

export default {
  onLaunch: function () {
    console.log('App Launch');
    this.init();
  },

  methods: {
    init() {
      this._initParams();
    },

    _initParams() {
      console.log('location:', window.location);
      const params = util.getUrlPathParam(window.location.href);
      console.log('params:', params);
      let { token, ad_id = null } = params;
      token && store.commit('user/setToken', decodeURIComponent(token));
      store.state.user.ad_id      = ad_id;
      store.state.user.session_id = parseInt(new Date().getTime() / 1000);
    },
  },
}
</script>

<style lang="scss">
/*每个页面公共css */
@import "uview-ui/index.scss";
@import "static/theme/init.css";
</style>
