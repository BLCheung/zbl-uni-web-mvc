import Api         from '@/common/api';
import ResultKit   from './result-kit';
import UserKit     from '@/kit/user-kit';
import HttpRequest from '@/enum/http-request-enum';

export default class HTTPKit {
  
  static async GET(url, data) {
    return await this._request({
      url,
      method: HttpRequest.GET,
      data,
    });
  }
  
  static async POST(url, data) {
    return await this._request({
      url,
      method: HttpRequest.POST,
      data,
    });
  }
  
  static async PUT(url, data) {
    return await this._request({
      url,
      method: HttpRequest.PUT,
      data,
    });
  }
  
  static async DELETE(url, data) {
    return await this._request({
      url,
      method: HttpRequest.DELETE,
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
      
      Api.request(url, method, data, {
        'token': UserKit.getToken(),
      })
        .then(res => {
          resolve(ResultKit.setResult(res));
        })
        .catch(err => {
          console.error('HTTP error:', err);
          Api.createToast('网络开小差了~')
          resolve(ResultKit.Failed('网络开小差了~', null));
        });
    });
  }
}
