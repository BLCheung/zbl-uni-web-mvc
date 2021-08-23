import util from '@/utils/util';

export default class TestBean {
  constructor(data) {
    util.cloneObject(this, data);
  }
}
