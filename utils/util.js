/**
 * 深拷贝
 * @param {*} obj
 */
function clone(obj, hash = new WeakMap()) {
  if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== 'object') return obj;
  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) return hash.get(obj);
  let cloneObj = new obj.constructor();
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = clone(obj[key], hash);
    }
  }
  return cloneObj;
}

/**
 * 检测数据类型
 * @param {*} target
 */
const checkType = target => {
  return Object.prototype.toString.call(target).slice(8, -1);
};

// 浅复制对象
function cloneObject(target, from) {
  for (let key in from) {
    if (from.hasOwnProperty(key)) {
      target[key] = from[key];
    }
  }
  return target;
}

// 深复制对象
function deepCloneObject(target, from) {
  for (let key in from) {
    if (from.hasOwnProperty(key)) {
      target[key] = clone(from[key]);
    }
  }
  return target;
}

function checkImgExists(imgurl) {
  return imgurl.match(/\.(jpeg|jpg|gif|png)$/) != null;
}

/**
 * @param {date}  Date实例
 * @param {format}  格式
 */
function formatDate(str, format) {
  //兼容ios 格式化
  if (typeof str == 'string') {
    str = str.split('.')[0].replace(/-/g, '/').replace(/T/g, ' ');
  }
  const date = new Date(str);
  const year = date.getFullYear();
  const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
  const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
  const h = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
  const m = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
  const s = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
  if (format == 'YYYY-MM-DD') {
    return year + '-' + month + '-' + day;
  } else if (format == 'YYYY-MM') {
    return year + '-' + month;
  } else if (format == 'YYYY-MM-DD hh:mm:ss') {
    return `${ year }-${ month }-${ day } ${ h }:${ m }:${ s }`;
  } else if (format == 'MM-DD hh:mm') {
    return `${ month }-${ day } ${ h }:${ m }`;
  } else if (format == 'MM-DD') {
    return `${ month }-${ day }`;
  }
}

//兼容ios 时间格式化
function formatDateIos(str) {
  return str.split('.')[0].replace(/-/g, '/').replace(/T/g, ' ');
}


// 获取时间差
/**
 * @param {str1}  开始日期
 * @param {str2}  截止日期
 * @param {type} 1 秒差 2 分差  3时差 4 天数差
 */
function timeLess(str1, str2, type) {
  //兼容ios 格式化
  let v1 = str1.split('.')[0].replace(/-/g, '/').replace(/T/g, ' ');
  let v2 = str2.split('.')[0].replace(/-/g, '/').replace(/T/g, ' ');
  const date1 = Date.parse(new Date(v1));
  const date2 = Date.parse(new Date(v2));
  const min = (date2 - date1) / 1000;
  if (type == 4) {
    return Math.floor(min / 60 / 60 / 24);
  }
}

/**
 * 获取路径的文件名
 * @param {Object} path
 */
function getPathFileName(path) {
  if (!path) {
    return path;
  }
  var obj = path.lastIndexOf('/');
  return path.substr(obj + 1);
}

const getUrlPathParam = (locationsearch) => {
  let url = locationsearch;
  let theRequest = new Object();
  if (url.indexOf('?') != -1) {
    let str = url.substr(url.indexOf('?') + 1);
    let strs = str.split('&');
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = (strs[i].split('=')[1]);
    }
  }
  return theRequest;
}

function appendUrlParams(url, params = {}) {
  let paramsArray = [];
  Object.keys(params).forEach((key) => {
    let value = params[key];
    // 如果值为undefined置空
    if (typeof value === 'undefined') {
      value = '';
    }
    //使用encodeURIComponent进行编码
    if (Array.isArray(params[key])) { //类型为数组的时候
      value.forEach(item => {
        paramsArray.push([ key, item ].join('='));
      });
    }
    if (Object.prototype.toString.call(params[key]) === '[object Object]') { //类型为对象的时候
      Object.keys(params[key]).forEach(item => {
        paramsArray.push([ key, params[key][item] ].join('='));
      });
    } else {
      paramsArray.push([ key, value ].join('='));
    }
  });
  let paramsStr = paramsArray.join('&');
  if (url.indexOf('?') == -1) {
    return url + '?' + paramsStr;
  } else {
    return url + '&' + paramsStr;
  }
}


/**
 * 高效率的forEach遍历方法
 */
const forEach = (array, iterator) => {
  let index = -1;
  const length = array.length;
  while (++index < length) {
    iterator(array[index], index);
  }
  return array;
};

/**
 * 数组合集
 * union([1,2,3], [4,3,2]) -> [1,2,3,4]
 * @param arr1
 * @param arr2
 * @returns {*[]}
 */
const union = (arr1 = [], arr2 = []) => Array.from(new Set([ ...arr1, arr2 ]));

/**
 * 是否为数组
 * @param list
 * @returns {boolean}
 */
const isList = (list) => {
  return list instanceof Array && list.length !== 0;
};

/**
 * 把数组装成对象
 * @param arr
 * @returns {{}}
 */
const parseArr2Obj = (arr) => {
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    let split = arr[i].split(':');
    obj[split[0]] = split[1];
  }
  return obj;
}

/**
 * 把数组拆分成多维数组
 * @param {Array} array 需要拆分的数组
 * @param {Number} subArrayLength 拆分后每一维数组的长度
 */
const sliceArray = (array, subArrayLength) => {
  let i = 0;
  let newArray = [];
  while (i < array.length) {
    newArray.push(array.slice(i, i += subArrayLength));
  }
  return newArray;
};

/**
 * 组合算法函数
 */
const combination = (arr, size) => {
  var r = [];

  function _(t, a, n) {
    if (n === 0) {
      r[r.length] = t;
      return;
    }
    for (var i = 0, l = a.length - n; i <= l; i++) {
      var b = t.slice();
      b.push(a[i]);
      _(b, a.slice(i + 1), n - 1);
    }
  }

  _([], arr, size);
  return r;
};

/**
 * 初始化特定长度的实体类数组
 * @param length 长度
 * @param bean 指定的实体，默认为null
 */
const initBeanArray = (length, bean = null) => Array(length).fill(bean);

/* 计算两点的距离 返回的单位是米 */
const calcDistance = (lat1, lng1, lat2, lng2) => {
  // console.log([lat1, lng1, lat2, lng2])
  lat1 = lat1 || 0;
  lng1 = lng1 || 0;
  lat2 = lat2 || 0;
  lng2 = lng2 || 0;
  var rad1 = (lat1 * Math.PI) / 180.0;
  var rad2 = (lat2 * Math.PI) / 180.0;
  var a = rad1 - rad2;
  var b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
  var r = 6378137;
  return (
    r *
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
        Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2),
      ),
    )
  ).toFixed(0);
};

/**
 * 转换评级为对应评价字符串
 */
const rateNumber2Str = (value) => {
  let str = '';
  value === 1 && (str = '非常差');
  value === 2 && (str = '差');
  value === 3 && (str = '一般');
  value === 4 && (str = '好');
  value === 5 && (str = '非常好');
  return str;
};

/**
 * 加密手机号中间四位为*
 */
const encryptMobile = (mobile) => {
  let phone = '' + mobile;
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
};

/*
 * 版本号比较方法
 * 传入两个字符串，当前版本号：curV；比较版本号：reqV
 * 调用方法举例：versionCompare("1.1","1.2")，将返回false
 */
const versionCompare = function (curV, reqV) {
  if (curV && reqV) {
    //将两个版本号拆成数字
    var arr1 = curV.split('.'),
        arr2 = reqV.split('.');
    var minLength = Math.min(arr1.length, arr2.length),
        position  = 0,
        diff      = 0;
    //依次比较版本号每一位大小，当对比得出结果后跳出循环（后文有简单介绍）
    while (position < minLength && ((diff = parseInt(arr1[position]) - parseInt(arr2[position])) == 0)) {
      position++;
    }
    diff = (diff != 0) ? diff : (arr1.length - arr2.length);
    //若curV大于reqV，则返回true
    return diff > 0;
  } else {
    //输入为空
    console.log('版本号不能为空');
    return false;
  }
};

/**
 * 验证手机号格式
 * @param {String} mobile
 */
const verifyMobile = (mobile) => {

  if (!mobile) {
    uni.showToast({
      title: '手机号码不可为空!',
      icon:  'none',
    });

    return false;
  }

  if (!/^1[3-9]\d{9}$/.test(mobile)) {
    uni.showToast({
      title: '手机号码格式不正确!',
      icon:  'none',
    });

    return false;
  }

  return true;

};

/**
 * 是否为车牌号
 * @param value
 * @returns {boolean}
 */
const isVehicleNumber = (value) => {
  let bool = false;
  if (value.length === 7) {
    const express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
    bool = express.test(value);
  }
  return bool;
}

export default {
  cloneObject,
  deepCloneObject,
  getPathFileName,
  getUrlPathParam,
  calcDistance,
  forEach,
  sliceArray,
  combination,
  initBeanArray,
  checkImgExists,
  rateNumber2Str,
  formatDate,
  encryptMobile,
  appendUrlParams,
  timeLess,
  versionCompare,
  formatDateIos,
  verifyMobile,
  isList,
  parseArr2Obj,
  checkType,
  clone,
  union,
  isVehicleNumber,
};
