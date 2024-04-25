<template>
    <div class="common">
        <el-container style="height: 100%;">  
            <el-header class="header">
                <el-menu
                    mode="horizontal"
                    router
                    :default-active="router.currentRoute.value.path"
                >
                    <el-menu-item index="/">
                        <h1 class="item">APTC</h1>
                    </el-menu-item>
                    <el-menu-item index="/user/info">个人中心</el-menu-item>
                    <el-menu-item index="/user/score">成绩列表</el-menu-item>
                    <el-menu-item index="/user/b30">B30</el-menu-item>
                </el-menu>
            </el-header>

            <el-main class="main">
                <RouterView />
            </el-main>
        </el-container>
    </div>  
</template>

<script setup>
import {ref} from 'vue';
import { useRouter } from 'vue-router';
import useUserStore from '@/stores/store.js'
const store = useUserStore();
const router = useRouter();


</script>

<style scoped>
@import './assets/css/main.css'
</style>