import ResultKit     from '@/kit/result-kit';
import UploadKit     from '@/kit/upload-kit';
import ASY           from '@/base/asy';
import PermissionKit from '@/kit/permission-kit';

export default class _UploadController {
	constructor(context, maxSize) {
		this._context = context;
		this._maxSize = parseInt(maxSize);
	}

	async upload() {

		// #ifdef MP
		const permission = await this._checkCameraPermission();
		if (!permission.isOK()) {
			ASY.toastResult(permission);
			return;
		}
		// #endif
		ASY.createLoading('加载中', false);
		// 拿到临时图片文件
		const videoTempFile = await this._getVideo();

		console.log('videoTempFile:', videoTempFile);
		if (!videoTempFile) {
			ASY.closeLoading();
			return;
		}

		// 上传
		ASY.createLoading('上传中...', false);
		const uploadRes = await UploadKit.uploadOneVideo(videoTempFile);
		console.log('uploadRes:', uploadRes);
		if (!uploadRes.isOK()) {
			ASY.closeLoading();
			return;
		}

		let videoList = [ uploadRes.data.url ];
		console.log('videoList:', videoList);
		// uploadRes.data.forEach(item => videoList.push(item.url));
		// 触发上传成功事件
		this._context.emitUploadSuccess(videoList);
		ASY.closeLoading();
	}

	/**
	 * 获取视频
	 * @private
	 */
	async _getVideo() {
		const [ error, res ] = await uni.chooseVideo({});
		console.log('_getVideo:', res);
		if (!res) {
			return null;
		}
		console.log('size:', res.size, 'maxSize:', this._maxSize);
		if (res.size > this._maxSize) {

			ASY.createToast(`视频大小不能超过${this._maxSize / (1024 * 1024)}M`)
			return null;
		}
		return res;
	}

	/**
	 * 检查摄像头权限
	 * @returns {Promise<void>}
	 * @private
	 */
	_checkCameraPermission() {
		return PermissionKit.checkMinPermission('scope.camera', '上传视频需要您的摄像头权限，是否去授权？');
		// return new Promise((resolve) => {
		// 	uni.getSetting({
		// 		success: res => {
		// 			if (!res.authSetting['scope.camera']) {
		// 				uni.authorize({
		// 					scope:   'scope.camera',
		// 					success: res1 => resolve(ResultKit.OK(res1)),
		// 					fail:    err => {
		// 						// 拒绝授权
		// 						ASY.createDialog('提示', '上传视频需要您的摄像头权限，是否去授权？', () => {
		// 							uni.openSetting({
		// 								success: res2 => {
		// 									if (res2.authSetting['scope.camera']) {
		// 										resolve(ResultKit.OK('授权成功!'));
		// 									} else {
		// 										resolve(ResultKit.Failed('授权失败!'));
		// 									}
		// 								},
		// 							});
		// 						}, () => {
		// 							resolve(ResultKit.Failed('取消授权!'));
		// 						})
		// 					},
		// 				});
		// 			} else {
		// 				resolve(ResultKit.OK('授权成功!'));
		// 			}
		// 		},
		// 	});
		// });
	}
}
