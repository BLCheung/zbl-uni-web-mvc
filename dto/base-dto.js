import util from '@/utils/util';

export default class BaseDto {
  $vo = {};
  
  constructor() {}
  
  /**
   * 转成后端所需数据传输对象
   * @return {*|{}}
   */
  toDto() {
    let dto = {};
    dto     = util.deepCloneObject(dto, this);
    delete dto.$vo;
    return dto;
  }
}
