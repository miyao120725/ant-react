import axios, { AxiosResponse } from 'axios';
console.log(11111,process.env.REACT_APP_BASE_URL);
const apiUrl = process.env.REACT_APP_BASE_URL || '';

axios.defaults.withCredentials = true;
if (process.env.NODE_ENV !== 'development') {
  // 正式打包用配置里的API，开发环境用代理vue.config.js里的配置，方便联调，解决跨域问题
  axios.defaults.baseURL = apiUrl;
}
axios.defaults.timeout = 60000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.withCredentials = false; // 携带cookie
// axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use((config) => {
  // Do something before request is sent
  if (config.headers['Content-Type'] === 'multipart/form-data') {
    return config;
  }
  return config;
}, (error)=> {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use((response) => {
  // code数字放到配置里，用一个可读的常量来表示
      // return Promise.reject(response.data.msg);
  return response;
}, (errors) => {
  return Promise.reject(errors);
});
