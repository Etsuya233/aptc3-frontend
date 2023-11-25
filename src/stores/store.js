import {defineStore} from 'pinia'
import {reactive, ref} from 'vue'


export const useUserStore = defineStore('user', () => {
    let isLoggedIn = ref(false);
    let uid = ref('');
    let arcId = ref('');
    let username = ref('');
    let status = ref('');
    let token = ref('');
    let ptt = ref('');
    let pttB30 = ref('');
    let pptR10 = ref('')

    function $reset(){
        isLoggedIn.value = false;
        uid.value = '';
        arcId.value = '';
        username.value = '';
        status.value = '';
        token.value = '';
        ptt.value = '';
        pttB30.value = '';
        pptR10.value = '';
    }
})

export default useUserStore;