<template>
    <el-container class="common">
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