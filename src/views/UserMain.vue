<template>
    <el-container class="common">
        <el-main class="main">
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component" :key="$route.path" v-if="$route.meta.keepAlive"/>
                </keep-alive>
                <component :is="Component" :key="$route.path" v-if="!$route.meta.keepAlive"/>
            </router-view>  
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