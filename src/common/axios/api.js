import axios from 'axios';

export default {
    Register: (data) => axios.post('http://192.168.50.118:4000/api/register', data),
    getGlobalConfig: (data) => axios.get('/api/public/get_global_config', { params: data }), /*获取全局配置*/

    navList: (data) => axios.post('http://127.0.0.1:3334/nav/list', data), /*获取导航列表*/
    addNavList: (data) => axios.post('http://127.0.0.1:3334/nav/add', data), /*添加导航列表*/
    updateNavList: (data) => axios.post('http://127.0.0.1:3334/nav/update', data), /*添加导航列表*/
    removeNavList: (data) => axios.post('http://127.0.0.1:3334/nav/remove', data), /*删除导航列表*/

    blockList: (data) => axios.post('http://127.0.0.1:3334/block/list', data), /*获取资讯模块列表*/
    addBlockList: (data) => axios.post('http://127.0.0.1:3334/block/add', data), /*添加资讯模块列表*/
    updateBlockList: (data) => axios.post('http://127.0.0.1:3334/block/update', data), /*添加资讯模块列表*/
    removeBlockList: (data) => axios.post('http://127.0.0.1:3334/block/remove', data), /*删除资讯模块列表*/

    listApi: (data) => axios.post('http://127.0.0.1:3334/list', data), /*获取资讯模块列表*/
    addList: (data) => axios.post('http://127.0.0.1:3334/list/add', data), /*添加资讯模块列表*/
    updateList: (data) => axios.post('http://127.0.0.1:3334/list/update', data), /*添加资讯模块列表*/
    removeList: (data) => axios.post('http://127.0.0.1:3334/list/remove', data), /*删除资讯模块列表*/
}