/**
 * 公共方法文件扩展
 */

export const Util = {
  /**
   * 时间戳转时间
   * @param  {timeArr} 转换的所有字符转对象类型
   */
  timeStamp(val) {
    const newtime = new Date(val);
    const Y = newtime.getFullYear();
    const M = dataSua(newtime.getMonth() + 1);
    const D = dataSua(newtime.getDate());
    const H = dataSua(newtime.getHours());
    const Mi = dataSua(newtime.getMinutes());
    const S = dataSua(newtime.getSeconds());
    const Ms = newtime.getTime();
    const s = Date.parse(newtime) / 1000;

    function dataSua(dTime) {
      return dTime < 10 ? '0' + dTime : dTime;
    }

    const timeArr = {
      timeOne: M + '月' + D + '日',
      timeTwo: H + ':' + Mi + ':' + S,
      timeThree: Y + '-' + M + '-' + D + ' ' + H + ':' + Mi + ':' + S,
      timefour: Y + '-' + M + '-' + D,
      timeFive: Y + '.' + M + '.' + D,
      timeEleven: Y + '/' + M + '/' + D,
      timeSix: H + ':' + Mi + ':' + S,
      timeSeven: Y + '年' + M + '月' + D + '日',
      timeEight: Y + '.' + M + '.' + D + ' ' + H + ':' + Mi + ':' + S,
      timeNine: Ms,  // 时间戳（毫秒）
      timeTen: s,  // 时间戳（秒）
      timeTwelve: Y + '/' + M + '/' + D,
      timeThirteen: Y + '/' + M + '/' + D + ' ' + H + ':' + Mi + ':' + S,
      timeFourteen: Y + '/' + M + '/' + D + ' ' + H + ':' + Mi,
      timeTeen: H + ':' + Mi,
      timeFifteen: M + '/' + D + ' ' + H + ':' + Mi
    };
    return timeArr;
  },
  /**
   * 数字或字符串精确到小数点后几位
   * @param  val 参数指传过来的数值
   * @param  num 参数指精确到几位
   */
  numberDecimal(val, num) {
    const numIs = Math.abs(num);
    let nums = 1;
    for (let i = 1; i <= numIs; i++) {
      nums = nums * 10;
    }
    if (typeof val === 'string') {
      const index = val.indexOf('.');
      if (index >= 0) {
        const floatingRight = val.substring(index + 1, index + 1 + numIs);
        const floatLeft = val.substring(0, index);
        if (floatingRight) {
          return floatLeft + '.' + floatingRight;
        } else {
          return val;
        }
      } else {
        // return Number(val).toFixed(numIs);
        return val;
      }
    } else if (typeof val === 'number') {
      const downValue = Math.floor(val * nums) / nums;
      return downValue.toFixed(numIs);
    }
  },
  /**
   * RGB颜色转换为16进制
   * @param  val rgb值
   */
  colorHex(val) {
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(val)) {
      const aColor = val.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',');
      let strHex = '#';
      for (let i = 0; i < aColor.length; i++) {
        let hex = Number(aColor[i]).toString(16);
        if (hex === '0') {
          hex += hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = val;
      }
      return strHex;
    } else if (reg.test(val)) {
      const aNum = val.replace(/#/, '').split('');
      if (aNum.length === 6) {
        return val;
      } else if (aNum.length === 3) {
        let numHex = '#';
        for (let i = 0; i < aNum.length; i += 1) {
          numHex += (aNum[i] + aNum[i]);
        }
        return numHex;
      }
    } else {
      return val;
    }
  },
  /**
   * 16进制转换为RGB颜色
   * @param  val rgb值
   */
  hexToRgba(hex, opacity) {
    const RGBA = 'rgba(' + parseInt('0x' + hex.slice(1, 3), 10) + ',' + parseInt('0x' + hex.slice(3, 5), 10) + ',' + parseInt('0x' + hex.slice(5, 7), 10) + ',' + opacity + ')';
    return {
      red: parseInt('0x' + hex.slice(1, 3), 10),
      green: parseInt('0x' + hex.slice(3, 5), 10),
      blue: parseInt('0x' + hex.slice(5, 7), 10),
      rgba: RGBA
    };
  },
  /**
   * 获取随机6位颜色值
   * @param  val 参数指传过来的数值
   * @param  num 参数指精确到几位
   */
  randomColor() {
    const randomNumOne = Math.floor(Math.random() * 255);
    const randomNumTwo = Math.floor(Math.random() * 255);
    const randomNumThree = Math.floor(Math.random() * 255);
    return this.colorHex(`RGB(${randomNumOne}, ${randomNumTwo}, ${randomNumThree})`);
  },
  /**
   * 浏览器的判断
   * @return {[type]} [description]
   */
  getBrowserType() {
    const agent = navigator.userAgent.toLowerCase();
    let browser_type = '';
    if (agent.indexOf('msie') > 0) {
      browser_type = 'IE';
    }
    if (agent.indexOf('firefox') > 0) {
      browser_type = 'firefox';
    }
    if (agent.indexOf('chrome') > 0 && agent.indexOf('mb2345browser') < 0 && agent.indexOf('360 aphone browser') < 0) {
      browser_type = 'chrome';
    }
    if (agent.indexOf('360 aphone browser') > 0 || agent.indexOf('qhbrowser') > 0) {
      browser_type = '360';
    }
    if (agent.indexOf('ucbrowser') > 0) {
      browser_type = 'UC';
    }
    if (agent.indexOf('micromessenger') > 0) {
      browser_type = 'WeChat';
    }
    if ((agent.indexOf('mqqbrowser') > 0 || agent.indexOf('qq') > 0) && agent.indexOf('micromessenger') < 0) {
      browser_type = 'QQ';
    }
    if (agent.indexOf('miuibrowser') > 0) {
      browser_type = 'MIUI';
    }
    if (agent.indexOf('mb2345browser') > 0) {
      browser_type = '2345';
    }
    if (agent.indexOf('sogoumobilebrowser') > 0) {
      browser_type = 'sogou';
    }
    if (agent.indexOf('liebaofast') > 0) {
      browser_type = 'liebao';
    }
    if (agent.indexOf('weibo') > 0) {
      browser_type = 'weibo';
    }
    if (agent.indexOf('safari') > 0 && agent.indexOf('chrome') < 0 && agent.indexOf('ucbrowser') < 0 && agent.indexOf('micromessenger') < 0 && agent.indexOf('mqqbrowser') < 0 && agent.indexOf('miuibrowser') < 0 && agent.indexOf('mb2345browser') < 0 && agent.indexOf('sogoumobilebrowser') < 0 && agent.indexOf('liebaofast') < 0 && agent.indexOf('qhbrowser') < 0 && agent.indexOf('weibo') < 0) {
      browser_type = 'safari';
    }
    return browser_type;
  },

  /**
   * IE浏览器的版本判断
   * @return {[type]} [版本号]
   */
  IEVersion() {
    // 取得浏览器的userAgent字符串
    const userAgent = navigator.userAgent;
    // 判断是否为小于IE11的浏览器
    const isLessIE11 = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1;
    // 判断是否为IE的Edge浏览器
    const isEdge = userAgent.indexOf('Edge') > -1 && !isLessIE11;
    // 判断是否为IE11浏览器
    const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
    if (isLessIE11) {
      const IEReg = new RegExp('MSIE (\\d+\\.\\d+);');
      // 正则表达式匹配浏览器的userAgent字符串中MSIE后的数字部分，，这一步不可省略！！！
      IEReg.test(userAgent);
      // 取正则表达式中第一个小括号里匹配到的值
      const IEVersionNum = parseFloat(RegExp['$1']);
      if (IEVersionNum === 7) {
        // IE7
        return 7;
      } else if (IEVersionNum === 8) {
        // IE8
        return 8;
      } else if (IEVersionNum === 9) {
        // IE9
        return 9;
      } else if (IEVersionNum === 10) {
        // IE10
        return 10;
      } else {
        // IE版本<7
        return 6;
      }
    } else if (isEdge) {
      // edge
      return 'edge';
    } else if (isIE11) {
      // IE11
      return 11;
    } else {
      // 不是ie浏览器
      return -1;
    }
  },
  /**
   * 对象深复制
   * @return {[obj]} 新对象不会发生引用问题
   */
  copy(obj1, obj2) {
    const obj = obj2 || {}; // 最初的时候给它一个初始值=它自己或者是一个json
    for (const name in obj1) {
      if (typeof obj1[name] === 'object') { // 先判断一下obj[name]是不是一个对象
        obj[name] = (obj1[name].constructor === Array) ? [] : {}; // 我们让要复制的对象的name项=数组或者是json
        this.copy(obj1[name], obj[name]); // 然后来无限调用函数自己 递归思想
      } else {
        obj[name] = obj1[name];  // 如果不是对象，直接等于即可，不会发生引用。
      }
    }
    return obj; // 然后在把复制好的对象给return出去
  },

  /**
   * 科学计数法转换为正常数值
   * @param  num 科学计数法值
   */
  toNonExponential(num) {
    if (num.indexOf('e') !== -1 && num && num.indexOf('.') !== -1) {
      const m = Number(num).toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
      return Number(num).toFixed(Math.max(0, (m[1] || '').length - m[2]));
    } else {
      return num;
    }
  },

  /**
   * 手机号判断规则
   * @param  val 手机号
   * @param  country 布尔值true为中国
   */
  phoneRule(val, country) {
    const phoneRegOne = /^\d{5,}$/;
    const phoneRegTwo = /^((0\d{2,3}-\d{7,8})|(1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}))$/;
    if (country) {
      if (!phoneRegTwo.test(val)) {
        return false;
      } else {
        return true;
      }
    } else {
      if (!phoneRegOne.test(val)) {
        return false;
      } else {
        return true;
      }
    }
  },

  /**
   * 邮箱规则
   * @param  val 邮箱
   */
  emailRule(val) {
    const emailRule = /^[a-z_0-9.-]{1,64}@([a-z0-9-]{1,200}.){1,5}[a-z]{1,6}$/i;
    if (!emailRule.test(val)) {
      return false;
    } else {
      return true;
    }
  },

  /**
   * 密码规则
   * @param  val 密码
   */
  passwordRule(val) {
    const passwordRegular = /^(?![^A-Za-z]+$)(?![^0-9]+$)[\x00-\x7F]{8,64}$/;
    // const passwordRegular = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-z]|[A-Z]|[0-9]){8,}$/;
    if (!passwordRegular.test(val)) {
      return false;
    } else {
      return true;
    }
  },
  /**
   * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
   * @param floatNum {number} 小数
   * @return {object}
   *   {times:100, num: 314}
   */
  toInteger(floatNum, digits) {
    const ret = { times: 1, num: 0 };
    const isNegative = floatNum < 0;
    let times = 0;
    if (Number.isInteger(Number(floatNum))) {
      ret.num = Number(floatNum);
      return ret;
    }
    if (digits) {
      times = Math.pow(10, digits);
    } else {
      const strfi = floatNum.toString();
      const dotPos = strfi.indexOf('.');
      const len = strfi.substr(dotPos + 1).length;
      times = Math.pow(10, len);
    }

    let intNum = parseInt((Math.abs(Number(floatNum) * times + 0.5)).toString(), 10);
    ret.times = times;
    if (isNegative) {
      intNum = -intNum;
    }
    ret.num = intNum;
    return ret;
  },

  /**
   * 核心方法，实现加减乘除运算，确保不丢失精度
   * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
   *
   * @param floatNum1 {number} 运算数1
   * @param floatNum2 {number} 运算数2
   * @param digits {number} 精度，保留的小数点数，比如 2, 即保留为两位小数
   * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
   *
   */
  operationInteger(floatNum1, floatNum2, op, digits) {
    const o1 = this.toInteger(floatNum1, digits);
    const o2 = this.toInteger(floatNum2, digits);
    const n1 = o1.num;
    const n2 = o2.num;
    const t1 = o1.times;
    const t2 = o2.times;
    const max = t1 > t2 ? t1 : t2;
    let result = 0;
    switch (op) {
      case 'add':
        if (t1 === t2) { // 两个小数位数相同
          result = n1 + n2;
        } else if (t1 > t2) { // o1 小数位 大于 o2
          result = n1 + n2 * (t1 / t2);
        } else { // o1 小数位 小于 o2
          result = n1 * (t2 / t1) + n2;
        }
        return result / max;
      case 'subtract':
        if (t1 === t2) {
          result = n1 - n2;
        } else if (t1 > t2) {
          result = n1 - n2 * (t1 / t2);
        } else {
          result = n1 * (t2 / t1) - n2;
        }
        return result / max;
      case 'multiply':
        result = (n1 * n2) / (t1 * t2);
        return result;
      case 'divide':
        result = (n1 / n2) * (t2 / t1);
        return result;
    }
  },
  /**
   * 获取url中参数的值
   * @param  {[type]} name 参数名
   * @return {[type]}      参数值
   */
  getQueryString(name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    const r = window.location.search.substr(1).match(reg);
    if (r !== null) {
      return decodeURI(r[2]);
    }
    return null;
  },
  /**
   * 滚动加载节流处理
   * @func  {[Function]}  参数值
   * @wait {[number]}      参数值
   * @mustRun {[number]}   参数值
   */
  throttle(func, wait, mustRun) {
    var timeout,
    startTime = new Date();

    return function(this) {
      var context = this,
          args = arguments,
          curTime = new Date();
          clearTimeout(timeout);
      // 如果达到了规定的触发时间间隔，触发 handler
      if (curTime - startTime >= mustRun) {
          func.apply(context, args);
          startTime = curTime;
          // 没达到触发间隔，重新设定定时器
      } else {
          timeout = setTimeout(func, wait);
      }
    }
  }
};

const hostname = window.location.hostname;
const dotPos = hostname.indexOf('.');
const cookieDomain = dotPos > 0 ? hostname.substr(dotPos) : '';

/* cookie扩展 */
const Cookie = {
  /**
   * 设置cookie
   * @param name 名称
   * @param value 值
   * @param expires 有效时间（单位：小时）（可选） 默认：24h
   */
  set: function(name, value, expires, domain) {
      var expTimes = expires ? (Number(expires) * 60 * 60 * 1000) : (24 * 60 * 60 * 1000); // 毫秒
      var expDate = new Date();
      expDate.setTime(expDate.getTime() + expTimes);
      var expString = expires ? '; expires=' + expDate.toUTCString() : '';
      var pathString = '; path=/';
      var domain = '; domain=' + domain?domain:cookieDomain;
      document.cookie = name + '=' + encodeURI(value) + expString + pathString + domain;
  },
  /**
   * 读cookie
   * @param name
   */
  get: function(name) {
      const cookieStr = '; ' + document.cookie + '; ';
      const index = cookieStr.indexOf('; ' + name + '=');
      if (index !== -1) {
        const s = cookieStr.substring(index + name.length + 3, cookieStr.length);
          return decodeURI(s.substring(0, s.indexOf('; ')));
      } else {
          return null;
      }
  },
  /**
   * 删除cookie
   * @param name
   */
  del: function(name, domain) {
      var exp = new Date(new Date().getTime() - 1);
      var s = this.get(name);
      if (s !== null) {
          document.cookie = name + '=' + s + '; expires=' + exp.toUTCString() + '; path=/; domain=' + domain?domain:cookieDomain;
      }
  }
};

export default { Util ,Cookie};
