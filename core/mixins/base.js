import RequestKit               from '@/kit/request-kit';
import { mapGetters, mapState } from 'vuex';
import UserKit                  from '@/kit/user-kit';

export default {
  data() {
    return {
      // 页面生命周期
      lifecycle: null,
    };
  },
  // 请求辅助kit
  requestKit: new RequestKit(),
  
  computed: {
    ...mapGetters('system', [ 'system' ]),
    
    ...mapState('theme', [ 'color' ]),
  },
  
  methods: {
    /**
     * 用户是否已登录
     * @return {boolean}
     */
    isLogin() { return !!UserKit.getToken(); },
  },
}
