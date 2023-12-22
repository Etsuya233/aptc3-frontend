<template>
    <div class="main">
        <h1>Login</h1>
    </div>
    <div class="input">
        <el-form :model="form" >
            <el-form-item label="">
                <el-input placeholder="Username" v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-input placeholder="Password" v-model="form.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onLoginSubmit">Login</el-button>
                <el-button type="info" @click="router.push('register')">Register</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import {ref, reactive} from 'vue'
import {login} from '@/api/user.js'
import { useUserStore } from '@/stores/store';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();

const form = reactive({
    username: '',
    password: ''
});

async function onLoginSubmit(){
    try {
        let response = await login(form);

        //将用户信息保存至pinia
        userStore.isLoggedInSto = true;
        userStore.uid = response.data.data.uid;
        userStore.arcId = response.data.data.arcId; 
        userStore.username = response.data.data.username;
        userStore.status = response.data.data.status;
        userStore.tokenSto = response.data.data.token;
        userStore.ptt = response.data.data.ptt;
        userStore.pttB30 = response.data.data.pttB30;
        userStore.pttR10 = response.data.data.pttR10;

        //持久化保存
        let token = response.data.data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('isLoggedIn', true);

        ElNotification({
            title: `登陆成功`,
            message: `欢迎回来，${form.username}.`,
            type: 'success'
        })
        router.push({name: 'userinfo'});
    } catch (error) {
        ElNotification({
            title: '错误',
            type: 'error',
            message: `${error.name}: ${error.message}`
        })
    }
}
</script>

<style scoped>
@import '../assets/css/login.css'
</style>