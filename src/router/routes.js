import { createRouter, createWebHashHistory } from 'vue-router'
import pinia from '@/stores/index.js';
import { useUserStore } from "@/stores/store.js";
import { getCurrentUserDetail } from "@/api/user";
import { KeepAlive } from 'vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('@/views/Index.vue'),
            meta: {
                requiresAuth: false,
                keepAlive: false
            }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/LoginMain.vue'),
            meta: {
                requiresAuth: false,
                keepAlive: false
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
                    component: () => import('@/views/SongScore.vue'),
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: 'info',
                    name: 'userinfo',
                    component: () => import('@/views/UserInfo.vue'),
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: 'b30',
                    name: 'b30',
                    component: () => import('@/views/B30.vue'),
                    meta: {
                        keepAlive: false
                    }
                },
                {
                    path: 'charts',
                    name: 'charts',
                    component: () => import('@/views/UserCharts.vue'),
                    meta: {
                        keepAlive: true
                    }
                }
            ]
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/RegisterMain.vue'),
            meta: {
                requiresAuth: false,
            }
        }
    ]
})


const userStore = useUserStore(pinia);

router.beforeEach((to, from) => {
    //验证是否需要登录
    if(to.meta.requiresAuth && !userStore.isLoggedIn){
        return { name: 'login' };
    }

    //查看用户信息是否存在
    if(userStore.isLoggedIn && userStore.username == undefined){
        getCurrentUserDetail();
    }
})

export default router
