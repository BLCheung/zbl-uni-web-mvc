import Config from '@/consts/config';

const { API_URL } = Config;
const prefix = `${ API_URL }/api/user`;

export default {
  WX_LOGIN:    `${ prefix }/login/wx`,
  OTHER_LOGIN: `${ prefix }/login/mobile`,
  AUTO_LOGIN:  `${ prefix }/login/token`,
  LOGOUT:      `${ prefix }/logout`,
  BIND_MOBILE: `${ prefix }/bind/mobile`,
  USER_RULE:   `${ prefix }/rule`,
}
