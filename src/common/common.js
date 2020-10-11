import qs from 'qs';
import md5 from 'js-md5';
import { sha256 } from 'js-sha256';
// import Fingerprint2 from 'fingerprintjs2';

// interface Star {
//   [key: string]: any;
// }

const hostname = window.location.hostname;
const dotPos = hostname.indexOf('.');
const cookieDomain = dotPos > 0 ? hostname.substr(dotPos) : '';
const docCookies = {
  getItem: function (sKey) {
    return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || '';
  },
  setItem: function (sKey, sValue, vEnd) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
      return false;
    }
    let sExpires = '';
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd;
          break;
        case String:
          sExpires = '; expires=' + vEnd;
          break;
        case Date:
          sExpires = '; expires=' + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + '=' + encodeURIComponent(sValue) + sExpires + (cookieDomain ? '; domain=' + cookieDomain : '') + '; path=/';
    return true;
  },
  removeItem: function (sKey) {
    if (!sKey || !this.hasItem(sKey)) {
      return false;
    }
    document.cookie = encodeURIComponent(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (cookieDomain ? '; domain=' + cookieDomain : '') + '; path=/';
    return true;
  },
  hasItem: function (sKey) {
    return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
  },
  keys: /* optional method: you can safely remove it! */ function () {
    const aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/);
    for (let nIdx = 0; nIdx < aKeys.length; nIdx++) {
      aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
    }
    return aKeys;
  }
};

export default {
  getSign: (data) => {
    let empty = '';
    Object.keys(data).sort().forEach((key) => {
      empty += `${key}${data[key]}`;
    });
    return md5(`${empty}zhang@2020`);
  },
  getPass: (data) => {
    const salt = '6jBafRANsu89avX4eGvnR9m7y9XNJZx28gCG9v6k9Dea4xyryQ';
    return sha256(data + salt);
  },
  setCookie: (name, value, hour) => {
    if (hour) {
      const oDate = hour ? (Number(hour) * 60 * 60 * 1000) : (24 * 60 * 60 * 1000);
      const date = new Date();
      date.setTime(date.getTime() + oDate);
      docCookies.setItem(name, value, date);
    } else {
      docCookies.setItem(name, value, false);
    }
  },
  getCookie: (name) => {
    return docCookies.getItem(name);
  },
  removeCookie: function (name) {
    docCookies.removeItem(name);
  },
  getPostParams: (obj) => {
    return qs.stringify(obj);
  },
};
