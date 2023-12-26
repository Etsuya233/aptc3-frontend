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

export const updateScore = async (userScoreVO) => {
    return axioss({
        url: `/user/score/${userScoreVO.sid}`,
        method: 'post',
        data: userScoreVO
    });
}

export const getB30 = async (val) => {
    return axioss({
        url: '/user/score/b30',
        method: 'get',
        params: {
            pageSize: val,
        }
    });
}

export const updatePTT = async () => {
    return axioss({
        url: '/user/score/ptt',
        method: 'put',
    })
}

export const importScore = async (formData) => {
    return axioss({
        url: '/user/score/import',
        method: 'post',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}