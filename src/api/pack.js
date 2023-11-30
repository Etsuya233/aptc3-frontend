import axioss from "@/api/axioss";
import pinia from '@/stores/index.js';
import { useUserStore } from "@/stores/store.js";

const userStore = useUserStore(pinia)

export const getAllPack = async () => {
    return axioss({
        url: '/user/pack',
        method: 'get',
    });
}