<template>
    <div class="container">
        <el-dialog title="修改信息" v-model="updateUserInfoDialog.visible">
            <el-form label-position="top" :rules="rules" :model="updateUserInfoDialog">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="updateUserInfoDialog.username"></el-input>
                </el-form-item>
                <el-form-item label="旧密码（如不修改密码则留空）" prop="oldpw">
                    <el-input v-model="updateUserInfoDialog.oldpw"></el-input>
                </el-form-item>
                <el-form-item label="新密码（如不修改密码则留空）" prop="newpw">
                    <el-input v-model="updateUserInfoDialog.newpw"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="handleUpdateUserInfo">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog title="修改PTT" v-model="updatePTTDialog.visible">
            <el-form-item label="PTT">
                <el-input-number v-model="updatePTTDialog.newPtt" :min="0" :max="14" :step="0.01" :precision="2"/>
            </el-form-item>
            <el-button @click="handleUpdatePTT">更新</el-button>
            <el-button @click="updatePTTDialog.visible = false">取消</el-button>
        </el-dialog>

        <div class="userinfo">
            <div class="username">
                {{ userStore.username }}
            </div>
            <div class="ptt">
                PTT: {{ userStore.ptt.toFixed(2) }}
                <br>
                R10: {{ userStore.pttR10.toFixed(2) }}
                <br>
                B30: {{ userStore.pttB30.toFixed(2) }}
            </div>
        </div>
        <el-button @click="updateNewPTT">修改PPT</el-button>
        <el-button @click="updateUserInfo">修改信息</el-button>
        <el-button @click="updateUserPTT">手动刷新PTT</el-button>
        <el-button @click="userLogout">退出登录</el-button>
        
        <br>
    </div>
</template>

<script setup>
import {ref, reactive, toRaw} from 'vue';
import { useRouter} from 'vue-router';
import {useUserStore} from '@/stores/store'
import { updatePTT, newPTT } from '@/api/score';
import { update, count, logout } from '@/api/user.js';

const userStore = useUserStore();
const router = useRouter();

const rules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur'},
        { min: 3, max: 15, message: '字数须在3-15之间', trigger: 'blur'},
        {
            async validator(rule, value, callback, source, options) {
                let response = await count({username: value});         
                if(response.data.data == 0 || value == userStore.username){
                    callback();
                } else callback(new Error());
            },
            message: '用户名已被使用',
            trigger: 'blur'
        }
    ],
    newpw: [
        { required: true, message: '请输入密码', trigger: 'blur'},
        { min: 3, max: 15, message: '字数须在3-15之间', trigger: 'blur'},
    ]
})


let updateUserInfoDialog = reactive({
    visible: false,
    username: '',
    oldpw: '',
    newpw: '',
})

let updatePTTDialog = reactive({
    visible: false,
    newPtt: '',
});

//PTT
async function updateUserPTT(){
    let response = await updatePTT();
    userStore.ptt = response.data.data.ptt;
    userStore.pttR10 = response.data.data.pttR10;
    userStore.pttB30 = response.data.data.pttB30;
    ElNotification({
        title: 'PTT更新成功',
        type: 'success'
    })
}

//User Info
function updateUserInfo(){
    updateUserInfoDialog.visible = true;
    updateUserInfoDialog.username = userStore.username;
}

async function handleUpdateUserInfo(){
    let response = await update(toRaw(updateUserInfoDialog));
    ElNotification({
        title: '成功修改用户信息',
        type: 'success'
    });
    updateUserInfoDialog.visible = false;
}

//PTT Change
function updateNewPTT(){
    updatePTTDialog.visible = true;
    updatePTTDialog.newPtt = userStore.ptt;
}

async function handleUpdatePTT(){
    let response = await newPTT(updatePTTDialog.newPtt);
    userStore.ptt = response.data.data.ptt;
    userStore.pttB30 = response.data.data.pttB30;
    userStore.pttR10 = response.data.data.pttR10;
    updatePTTDialog.visible = false;
    ElNotification({
        title: 'PTT修改成功！',
        type: 'success'
    });
}


//Logout
function userLogout(){
    logout();
    router.push({name: 'login'});
}
</script>

<style scoped>
@import "../assets/css/userinfo.css"
</style>