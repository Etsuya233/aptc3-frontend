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

const form = reactive({
    username: '',
    password: ''
});

function onLoginSubmit(){
    login(form)
}
</script>

<style scoped>
@import '../assets/css/login.css'
</style>