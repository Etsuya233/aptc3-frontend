import axioss from "@/api/axioss";
import pinia from '@/stores/index.js';
import { useUserStore } from "@/stores/store.js";
import router from "@/router/routes";

const userStore = useUserStore(pinia)

export const login = (userLoginDTO) => {
    axioss({
        url: '/user/login',
        method: 'post',
        data: userLoginDTO,
    }).then((response) => {
        //将用户信息保存至pinia
        userStore.isLoggedInSto = true;
        userStore.uid = response.data.data.uid;
        userStore.arcId = response.data.data.arcId; 
        userStore.username = response.data.data.username;
        userStore.status = response.data.data.status;
        userStore.tokenSto = response.data.data.token;
        userStore.ptt = response.data.data.ptt;
        userStore.pttB30 = response.data.data.pttB30;
        userStore.pttR10 = response.data.data.pttR10;

        //持久化保存
        let token = response.data.data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('isLoggedIn', true);

        router.push({name: 'user'});
    })
}

export const getCurrentUserDetail = () => {
    axioss({
        url: '/user/current',
        method: 'GET',
    }).then((response) => {
        //将用户信息保存至pinia
        userStore.isLoggedInSto = localStorage.getItem('isLoggedIn');
        userStore.uid = response.data.data.uid;
        userStore.arcId = response.data.data.arcId;
        userStore.username = response.data.data.username;
        userStore.status = response.data.data.status;
        userStore.tokenSto = localStorage.getItem('token');
        userStore.ptt = response.data.data.ptt;
        userStore.pttB30 = response.data.data.pttB30;
        userStore.pttR10 = response.data.data.pttR10;
    })
}