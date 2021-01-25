import Config from '@/consts/config'

const { API_URL } = Config;
const prefix = `${ API_URL }/api/comm`;

/**
 * 通用接口
 */
export default {
  // 配置文件接口
  CONFIG:  `${ prefix }/config`,
  // 下发短信验证码
  SMS:     `${ prefix }/send_sms_code`,
  // 单文件上传
  UPLOAD:  `${ prefix }/upload/file`,
  // 无限制小程序码
  WX_CODE: `${ prefix }/wxa/unlimit`,
}