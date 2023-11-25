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
        userStore.isLoggedIn = true;
        userStore.uid = response.data.data.uid;
        userStore.arcId = response.data.data.arcId;
        userStore.username = response.data.data.username;
        userStore.status = response.data.data.status;
        userStore.token = response.data.data.token;
        userStore.ptt = response.data.data.ptt;
        userStore.pttB30 = response.data.data.pttB30;
        userStore.pttR10 = response.data.data.pttB30;
        router.push({name: 'user'})
    })
}