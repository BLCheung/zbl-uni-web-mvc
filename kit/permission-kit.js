import Api       from '@/common/api';
import ResultKit from '@/kit/result-kit';

/**
 * 权限申请kit
 */
export default class PermissionKit {
  constructor() {}
  
  /**
   * 检查小程序权限
   * @param scope 具体的权限scope
   * @param rejectTips 拒绝权限时提示信息
   * @returns {Promise<ResultKit>}
   */
  static checkMinPermission(scope = '', rejectTips = '') {
    return new Promise((resolve) => {
      uni.getSetting({
        success: res => {
          if (!res.authSetting[scope]) {
            uni.authorize({
              scope,
              success: res1 => resolve(ResultKit.OK(res1)),
              fail:    err => {
                // 拒绝授权
                Api.createDialog('提示', rejectTips, () => {
                  uni.openSetting({
                    success: res2 => {
                      if (res2.authSetting[scope]) {
                        resolve(ResultKit.OK('授权成功!'));
                      } else {
                        resolve(ResultKit.Failed('授权失败!'));
                      }
                    },
                  });
                }, () => {
                  resolve(ResultKit.Failed('取消授权!'));
                })
              },
            });
          } else {
            resolve(ResultKit.OK('授权成功!'));
          }
        },
      });
    });
  }
}
