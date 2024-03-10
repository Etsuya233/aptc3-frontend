<template>
    <div class="main">
        <h1>注册</h1>
    </div>
    <div class="input">
        <el-row>
            <el-col :span="8"></el-col>
            <el-col :span="8">
                <el-form :model="form" label-position="top" :rules="rules" >
                    <el-form-item label="用户名" prop="username">
                        <el-input  v-model="form.username" ></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="form.password" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="Arcaea ID（选填，用于导出时展示）" prop="arcId">
                        <el-input v-model="form.arcId"></el-input>
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
import {ref, reactive, toRaw} from 'vue'
import regexet from '@/util/regexet.js'
import { register, count, login } from '@/api/user.js'
import { useUserStore } from '@/stores/store';
import { useRouter } from 'vue-router';

const router = useRouter();

//TODO 实现统一推送！ -> 没必要？反正都是全局
//TODO 实现请求错误的处理！推送！
//TODO 利用Snippet配置validator！
//TODO 统一字体
//TODO 导入新的json！
//TODO 边框全部改为border-box！！！还有margin放在container咯！！

const form = reactive({
    username: '',
    password: '',
    arcId: '',
});

const rules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur'},
        { min: 3, max: 15, message: '字数须在3-15之间', trigger: 'blur'},
        //该用户名已被使用
        {
            async validator(rule, value, callback, source, options) {
                let response = await count({username: value});
                if(response.data.data == 0){
                    callback();
                } else callback(new Error());
            },
            message: '用户名已被使用',
            trigger: 'blur'
        }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur'},
        { min: 3, max: 15, message: '字数须在3-15之间', trigger: 'blur'},
    ],
    arcId: [
        {
            async validator(rule, value, callback, source, options) {
                if(typeof(value) == 'string'){
                    if(value.length != 9) callback(new Error());
                    for(var i = 0; i < value.length; i++){
                        if(value[i] < '0' || value[i] > '9') callback(new Error());
                    }
                }
                callback();
            }, 
            message: 'ArcID要求9位数字。请检查', trigger: 'blur'
        },
    ]
})

async function onRegisterSubmit(){
    await register(toRaw(form));
    ElNotification({
        title: '注册成功',
        message: '3秒将跳转登陆页面...',
        type: 'success',
    });
    setTimeout(() => {
        router.push('login');
    }, 3000);
}  

</script>

<style scoped>
@import '../assets/css/register.css'
</style>