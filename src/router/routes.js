import { createRouter, createWebHashHistory } from 'vue-router'
import pinia from '@/stores/index.js';
import { useUserStore } from "@/stores/store.js";
import { getCurrentUserDetail } from "@/api/user";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/LoginMain.vue'),
            meta: {
                requiresAuth: false,
            }
        },
        {
            path: '/user',
            name: 'user',
            component: () => import('@/views/UserMain.vue'),
            meta: {
                requiresAuth: true,
            },
            children: [
                {
                    path: 'score',
                    name: 'score',
                    component: () => import('@/components/SongScore.vue'),
                }
            ]
        }
    ]
})

const userStore = useUserStore(pinia);

router.beforeEach((to, from) => {
    //验证是否需要登录
    if(to.meta.requiresAuth && !localStorage.getItem('isLoggedIn')){
        return { name: 'login' }
    }

    //查看用户信息是否存在
    if(localStorage.getItem('isLoggedIn') && (userStore.username == null || userStore.username == '')){
        getCurrentUserDetail();
    }
})

export default router
