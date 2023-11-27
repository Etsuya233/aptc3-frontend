import {defineStore} from 'pinia'
import {computed, reactive, ref} from 'vue'

export const useUserStore = defineStore('user', () => {
    let isLoggedInSto = ref();
    let uid = ref();
    let arcId = ref();
    let username = ref();
    let status = ref();
    let tokenSto = ref();
    let ptt = ref();
    let pttB30 = ref();
    let pttR10 = ref()

    function $reset(){
        isLoggedInSto.value = false;
        uid.value = ref();
        arcId.value = ref();
        username.value = ref();
        status.value = ref();
        tokenSto.value = ref();
        ptt.value = ref();
        pttB30.value = ref();
        pttR10.value = ref();
    }

    const token = computed(() => {
        if(tokenSto.value == undefined){
            tokenSto.value = localStorage.getItem('token') || '';
        }
        return tokenSto.value;
    })

    const isLoggedIn = computed(() => {
        if(isLoggedInSto.value == undefined){
            isLoggedInSto.value = localStorage.getItem('isLoggedIn') === 'true' || false;
        }
        return isLoggedInSto.value;
    })
    
    return {
        isLoggedIn,
        uid,
        arcId,
        username,
        status,
        token,
        ptt,
        pttB30,
        pttR10,
        $reset,
        isLoggedInSto,
        tokenSto
    };
})

export default useUserStore;