import ASY       from '@/base/asy';
import ResultKit from '@/kit/result-kit';

/**
 * 小程序权限申请kit
 */
export default class PermissionKit {
  constructor() {
  }
  
  /**
   * 检查权限
   * @param scope 具体的权限scope
   * @param rejectTips 拒绝权限时提示信息
   * @returns {Promise<ResultKit>}
   */
  static checkPermission(scope = '', rejectTips = '') {
    return new Promise((resolve) => {
      uni.getSetting({
        success: res => {
          if (!res.authSetting[scope]) {
            uni.authorize({
              scope,
              success: res1 => resolve(ResultKit.OK(res1)),
              fail:    err => {
                // 拒绝授权
                ASY.createDialog('提示', rejectTips, () => {
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
