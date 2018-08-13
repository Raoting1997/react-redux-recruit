import axios from 'axios';
import { Toast } from 'antd-mobile';

// 需要在 index.js 中引入这个配置文件
axios.interceptors.request.use(config => {
    Toast.loading('加载中',0);
    return config;
});

axios.interceptors.response.use(config => {
    Toast.hide();  
    return config;
})