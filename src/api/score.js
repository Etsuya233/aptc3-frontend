import axioss from "@/api/axioss";
import pinia from '@/stores/index.js';
import { useUserStore } from "@/stores/store.js";

const userStore = useUserStore(pinia)

export const getAllScore = async (userScoreQueryDTO) => {
    return axioss({
        url: '/user/score',
        method: 'post',
        data: userScoreQueryDTO
    });
}