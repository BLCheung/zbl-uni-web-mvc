import ASY            from '@/base/asy';
import ResultKit      from './result-kit';
import UserKit        from '@/kit/user-kit';
import Config         from '@/consts/config';
import HTTPMethodEnum from '@/enum/http-method-enum';

export default class HTTPKit {
  
  static async GET(url, data) {
    return await this._request({
      url,
      method: HTTPMethodEnum.GET,
      data,
    });
  }
  
  static async POST(url, data) {
    return await this._request({
      url,
      method: HTTPMethodEnum.POST,
      data,
    });
  }
  
  static async PUT(url, data) {
    return await this._request({
      url,
      method: HTTPMethodEnum.PUT,
      data,
    });
  }
  
  static async DELETE(url, data) {
    return await this._request({
      url,
      method: HTTPMethodEnum.DELETE,
      data,
    });
  }
  
  // static async REQUEST(method, url, data) {
  //   return await this._request({
  //     method: method,
  //     url,
  //     data,
  //   });
  // }
  
  static _request = ({
    url,
    method,
    data,
  }) => {
    
    return new Promise((resolve) => {
      
      ASY.request(url, method, data, {
        'ag-app':   Config.AG_TYPE,
        'ag-token': UserKit.getToken(),
      })
        .then(res => {
          resolve(ResultKit.setResult(res));
        })
        .catch(err => {
          console.error('HTTP error:', err);
          ASY.createToast('网络开小差了~')
          resolve(ResultKit.Failed('网络开小差了~', null));
        });
    });
  }
}
