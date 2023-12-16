<template>
    <div class="main">
        <h1>注册</h1>
    </div>
    <div class="input">
        <el-row>
            <el-col :span="8"></el-col>
            <el-col :span="8">
                <el-form :model="form" label-position="top" :rules="rules">
                    <el-form-item label="用户名">
                        <el-input  v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="form.password" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="Arcaea ID（选填）">
                        <el-input v-model="form.arcId"></el-input>
                    </el-form-item>
                    <el-form-item label="E-mail（必填，用于找回密码）">
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onRegisterSubmit">注册</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="8"></el-col>
        </el-row>
    </div>
</template>

<script setup>
import {ref, reactive} from 'vue'
import regexet from '@/util/regexet.js'
import { register } from '@/api/user.js'
import { useUserStore } from '@/stores/store';

const form = reactive({
    username: '',
    password: '',
    arcId: '',
    email: '',
});

const rules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur'},
        { min: 3, max: 15, message: '字数须在3-15之间', trigger: 'blur'},
        
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur'},
        { min: 3, max: 15, message: '字数须在3-15之间', trigger: 'blur'},
    ]
})

function onLoginSubmit(){
    register();
}  
</script>

<style scoped>
@import '../assets/css/register.css'
</style>