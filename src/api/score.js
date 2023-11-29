import axioss from "@/api/axioss";
import pinia from '@/stores/index.js';
import { useUserStore } from "@/stores/store.js";

const userStore = useUserStore(pinia)

export const getAllScore = (pageNum, pageSize) => {
    return axioss({
        url: '/user/score',
        methods: 'get',
        params: {
            pageNum: pageNum,
            pageSize: pageSize,
        }
    });
}