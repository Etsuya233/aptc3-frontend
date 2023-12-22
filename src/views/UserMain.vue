<template>
    <el-container class="common">
        <el-aside class="aside">
            <el-menu 
            class="menu" 
            router
            :default-active="router.currentRoute.value.path">
                <el-menu-item index="/user/info">
                    个人中心
                </el-menu-item>
                <el-menu-item index="/user/score">
                    成绩列表
                </el-menu-item>
                <el-menu-item index="/user/b30">
                    B30
                </el-menu-item>
            </el-menu>
        </el-aside>

        <el-main class="main">
            <RouterView />
        </el-main>

    </el-container>    
</template>

<script setup>
import {ref} from 'vue';
import { useRouter } from 'vue-router';
import useUserStore from '@/stores/store.js'
const store = useUserStore();
const router = useRouter();

</script>

<style scoped>
@import '../assets/css/usermain.css'
</style>