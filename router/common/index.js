import Api from '@/common/api';

const prefix = '/module-common';

export default {
  
  nav2Index() {
    Api.navigateTo(`${ prefix }/index/index`);
  },
}
