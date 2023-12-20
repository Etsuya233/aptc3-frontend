<template>
    {{ userStore.token }}
    {{ userStore.isLoggedIn }}
    <h1 style="text-align: center;">User Page</h1>
    <h3 style="text-align: center;">{{ userStore.username }}</h3>
    <h3 style="text-align: center;">PTT: {{ userStore.ptt.toFixed(2) }}</h3>
    <h3 style="text-align: center;">R10: {{ userStore.pttR10.toFixed(2) }}</h3>
    <h3 style="text-align: center;">B30: {{ userStore.pttB30.toFixed(2) }}</h3>
    <el-button @click="updateMyPTT">Update PTT</el-button>
    
</template>

<script setup>
import {ref, reactive} from 'vue';
import {useUserStore} from '@/stores/store'
import { updatePTT } from '../api/score';

const userStore = useUserStore();

async function updateMyPTT(){
    try {
        let response = await updatePTT();
        userStore.ptt = response.data.data.ptt;
        userStore.pttR10 = response.data.data.pttR10;
        userStore.pttB30 = response.data.data.pttB30;
        ElNotification({
            title: 'PTT更新成功',
            type: 'success'
        })
    } catch (error) {
        console.log(error);
        ElNotification({
            title: '错误',
            type: 'error',
            message: `${error.name}: ${error.message}`
        })
    }

}



</script>

<style scoped>

</style>