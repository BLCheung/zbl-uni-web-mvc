import Common    from '@/api/common';
import ResultKit from '@/kit/result-kit';
import util      from '@/utils/util';

export default class UploadKit {
  constructor() {}
  
  static uploadOneImage(src) {
    return new Promise((resolve) => {
      let fileName = 'default.jpg';
      uni.getImageInfo({
        src,
        success: (res) => {
          console.log('res', res);
          let name = util.getPathFileName(res.path);
          if (name && name != '') {
            fileName = name;
          }
          // 上传图片
          uni.uploadFile({
            url:        Common.UPLOAD,
            fileType:   'image',
            'formData': {
              path:     'image',
              filename: fileName,
            },
            name:       'file',
            filePath:   res.path,
            success:    (res) => {
              // zbl 6.16 修复返回的data是字符串问题
              resolve(ResultKit.OK(JSON.parse(res.data)));
            },
            fail:       (res) => {
              resolve(ResultKit.Failed('上传错误'));
            },
          });
        },
        fail:    (res) => {
          resolve(ResultKit.Failed('网络开小差了~'));
        },
      });
    });
  }
  
  static uploadMoreImage(files) {
    return new Promise((resolve, reject) => {
      let i      = 0;
      let max    = files.length;
      let result = [];
      console.log(files);
      const _upload = () => {
        if (i < max) {
          uni.uploadFile({
            url:      Common.UPLOAD,
            fileType: 'image',
            name:     'file',
            // file: files[i],
            filePath: files[i].path,
            success:  (res) => {
              console.log('success res:', res);
              if (res.statusCode !== 200) {
                return resolve(ResultKit.Failed('上传错误'));
              }
              // zbl 6.16 修复返回的data是字符串问题
              i++;
              const data = JSON.parse(res.data);
              // resolve(ResultKit.OK(JSON.parse(res.data)));
              result.push(data.data);
              _upload();
            },
            fail:     (res) => {
              resolve(ResultKit.Failed(result));
            },
          });
        } else {
          resolve(ResultKit.OK(result));
        }
      };
      _upload();
    });
  }
  
  /**
   * 上传视频
   * @param {Object} src
   */
  static uploadOneVideo(src) {
    return new Promise((resolve) => {
      
      // 上传图片
      uni.uploadFile({
        url:        Common.UPLOAD,
        fileType:   'video',
        'formData': {
          path: 'video',
        },
        name:       'file',
        filePath:   src.tempFilePath,
        success:    (res) => {
          if (res.statusCode !== 200) {
            return resolve(ResultKit.Failed('上传错误'));
          }
          let result      = res;
          // zbl 11.20 修复返回的data是字符串问题
          result.data     = JSON.parse(result.data);
          const resultKit = ResultKit.setResult(result);
          console.log('resultKit:', resultKit);
          if (!resultKit.isOK()) {
            return resolve(ResultKit.Failed('上传错误'));
          }
          return resolve(resultKit);
        },
        fail:       (res) => {
          return resolve(ResultKit.Failed('上传错误'));
        },
      });
    });
  }
}
