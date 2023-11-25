import { createRouter, createWebHashHistory } from 'vue-router'
import pinia from '@/stores/index.js';
import { useUserStore } from "@/stores/store.js";

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
            component: () => import('@/views/UserIndex.vue'),
            meta: {
                requiresAuth: true,
            }
        }
    ]
})

const userStore = useUserStore(pinia);

router.beforeEach((to, from) => {
    if(to.meta.requiresAuth && !userStore.isLoggedIn){
        console.log("用户未登录，尝试请求：" + to.fullPath);
        return { name: 'login' }
    }
})

export default router
