import axioss from "@/api/axioss";
import pinia from '@/stores/index.js';
import { useUserStore } from "@/stores/store.js";

const userStore = useUserStore(pinia);

export const getPttHistory = async (beginTime, endTime) => {
    return axioss({
        url: '/user/ptt/charts',
        method: 'get',
        params: {
            'beginTime': beginTime,
            'endTime': endTime
        }
    });
}