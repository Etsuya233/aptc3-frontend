import axios from "axios";
import pinia from '@/stores/index.js';
import { useUserStore } from "@/stores/store.js";
import router from "@/router/routes";
import { ElNotification } from "element-plus";

const userStore = useUserStore(pinia);

const axioss = axios.create({
    baseURL: 'http://localhost:8080/',
})

//请求拦截器
axioss.interceptors.request.use((config) => {
    //为每一次请求都带上token
    const token = userStore.token;
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

//响应拦截器
axioss.interceptors.response.use(
    (response) => {
        //TODO 应该使用更加好的方式来判断拦截下载！
        //如果是下载请求的话就不拦截！（即url中包括download）
        const isDownloadRequest = response.config.url.includes('download');
        if(!isDownloadRequest && response.data.code != 200){ //处理下载请求不被拦截
            ElNotification({
                title: response.data.msg,
                type: 'error',
                duration: 5000,
                message: `错误代码：${response.data.code}。`
            })
            return Promise.reject();
        }
        return response;
    },
    (error) => {
        //处理401
        if (error.response && error.response.status === 401) {
            localStorage.setItem('isLoggedIn', false);
            localStorage.removeItem('token');
            userStore.isLoggedInSto = false;
            userStore.tokenSto = undefined;
            router.push({ name: 'login' });
        } else if(error.response) { //处理其他异常
            ElNotification({
                title: error.response.data.msg,
                type: 'error',
                duration: 5000,
                message: `错误代码：${error.response.data.code}。`,
            });
        }
        return Promise.reject(error);
    }
);

export default axioss;