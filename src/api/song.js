import axioss from "@/api/axioss";
import pinia from '@/stores/index.js';
import { useUserStore } from "@/stores/store.js";

const userStore = useUserStore(pinia)

export const getAllSongs = async () => {
    return axioss({
        url: '/user/song',
        method: 'get',
    });
}