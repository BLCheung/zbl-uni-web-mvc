import Api from '@/common/api';

const prefix = '/pages';

export default {
  
  nav2Index() {
    Api.navigateTo(`${ prefix }/index/index`);
  },
}
