import ASY            from '@/base/asy.js';
import BaseController from '@/controller/base-controller';
import utils          from '@/utils/util.js';

/**
 proxy = {
	// list改变
	 onListChange({longList,hasMore,...data})
	 // 没有更多了
	 onNoMore()
 }
 */

export default class PagingController extends BaseController {
  /**
   * 控制器的上下文 context
   */
  constructor(context, modelClassList = [], proxy = null) {
    super(context, modelClassList, proxy);
    // 子类要设置 this.setPaging()
    this._init = false; // 初始化数据
    // 实体类
    this._entity = null;
  }

  /**
   * 设置分页器
   * @param paging
   */
  setPaging(paging) {
    this._paging = paging;
  }

  /**
   * 设置分页器的请求参数
   * @param {Object} params
   */
  setPagingParam(params) {
    this._paging.addNewParams(params);
  }

  /**
   * 获取长列表
   * @returns {*}
   */
  getLongList() {
    let list = this._paging.getLongList();
    let entity = this.getEntity();
    if (!entity) {
      return list;
    }
    let newList = [];
    utils.forEach(list, (item, index) => {
      newList.push(new entity(item));
    });
    return newList;
  }

  /**
   * 获取实体
   */
  getEntity() {
    return this._entity;
  }

  /**
   * 设置实体
   * @param entity
   */
  setEntity(entity) {
    if (!this._paging) {
      ASY.assert(this._paging, '设置实体前先设置paging');
      return;
    }
    this._entity = entity;
    this._paging.setEntityClass(this._entity);
  }

}
