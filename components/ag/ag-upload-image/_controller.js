import ResultKit     from '@/kit/result-kit';
import UploadKit     from '@/kit/upload-kit';
import ASY           from '@/base/asy';
import PermissionKit from '@/kit/permission-kit';

export default class _UploadController {
	constructor(context, maxCount) {
		this._context = context;
		this._maxCount = parseInt(maxCount);
		this._canChooseCount = 0;
	}

	async upload() {

		// #ifdef MP
		const permission = await this._checkCameraPermission();
		if (!permission.isOK()) {
			return;
		}
		// #endif

		ASY.createLoading('加载中', false);
		// 拿到临时图片文件
		const imgTempFile = await this._getImage();
		console.log('imgTempFile:', imgTempFile);
		if (!imgTempFile) {
			ASY.closeLoading();
			return;
		}

		// 上传
		ASY.createLoading('上传中...', false);
		const uploadRes = await UploadKit.uploadMoreImage(imgTempFile);
		console.log('uploadRes:', uploadRes);
		if (!uploadRes.isOK()) {
			ASY.closeLoading();
			return;
		}

		let imgList = [];
		uploadRes.data.forEach(item => imgList.push(item.url));
		// 触发上传成功事件
		this._context.emitUploadSuccess(imgList);
		ASY.closeLoading();
	}

	/**
	 * 获取相片
	 * @private
	 */
	async _getImage() {
		const [ error, res ] = await uni.chooseImage({ count: this._canChooseCount });
		console.log(error, res);
		if (!res) {
			return null;
		}
		return res.tempFiles;
	}

	/**
	 * 更新可最大可选图片数量
	 * @param length
	 */
	updateMaxCount(length) {
		this._canChooseCount = this._maxCount - length;
	}

	/**
	 * 检查摄像头权限
	 * @returns {Promise<void>}
	 * @private
	 */
	_checkCameraPermission() {
		return PermissionKit.checkPermission('scope.camera', '华中助手需要您的摄像头权限，是否去授权？');
	}
}