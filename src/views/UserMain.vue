<template>
    <el-container class="common">

        <el-aside class="aside">

        </el-aside>

        <el-main class="main">
            <RouterView />
        </el-main>

    </el-container>    
</template>

<script setup>
import {ref} from 'vue';
import useUserStore from '@/stores/store.js'
const store = useUserStore();



</script>

<style scoped>
@import '../assets/css/usermain.css'
</style>