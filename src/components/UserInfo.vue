<template>
    <el-dialog title="修改信息" v-model="updateUserInfoDialog.visible">
        <el-form label-position="left" label-width="60px">
            <el-form-item label="用户名">
                <el-input v-model="updateUserInfoDialog.username"></el-input>
            </el-form-item>
            <el-form-item label="旧密码">
                <el-input v-model="updateUserInfoDialog.oldpw"></el-input>
            </el-form-item>
            <el-form-item label="新密码">
                <el-input v-model="updateUserInfoDialog.newpw"></el-input>
            </el-form-item>
            <el-form-item> //TODO handleUpdateInfoInfo
                <el-button @click="handleUpdateInfoInfo">提交</el-button>
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
    <el-button @click="updateInfo">修改信息</el-button>
    <el-button @click="updateUserPTT">手动刷新PTT</el-button>
    <el-button @click="logout">退出登录</el-button>
</template>

<script setup>
import {ref, reactive} from 'vue';
import {useUserStore} from '@/stores/store'
import { updatePTT } from '../api/score';

const userStore = useUserStore();

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

async function updateUserPTT(){
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


function updateInfo(){
    updateUserInfoDialog.visible = true;
    updateUserInfoDialog.username = userStore.username;
}

function handleUpdateInfo(){
}

function updateNewPTT(){
    updatePTTDialog.visible = true;
    updatePTTDialog.newPtt = userStore.ptt;
}

function logout(){

}
</script>

<style scoped>
@import "../assets/css/userinfo.css"
</style>