import axioss from "@/api/axioss";
import pinia from '@/stores/index.js';
import { useUserStore } from "@/stores/store.js";
import router from "@/router/routes";

const userStore = useUserStore(pinia)

export const login = async (userLoginDTO) => {
    return axioss({
        url: '/user/user/login',
        method: 'post',
        data: userLoginDTO,
    });
}

export const getCurrentUserDetail = async () => {
    axioss({
        url: '/user/user/current',
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

export const register = async (registerDTO) => {
    return axioss({
        url: '/user/user/register',
        method: 'post',
        data: registerDTO
    });
}

export const count = async (userCountDTO) => {
    return axioss({
        url: '/user/user/count',
        method: 'post',
        data: userCountDTO
    });
}

export const update = async (userUpdateInfoDTO) => {
    return axioss({
        url: '/user/user/update',
        method: 'put',
        data: userUpdateInfoDTO,
    })
}

export const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    userStore.$reset();
}