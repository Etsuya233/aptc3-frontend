<template>
    <el-container class="common">

        <el-aside class="aside">

        </el-aside>

        <el-main class="main">
            <h1 style="text-align: center;">User Page</h1>
            <h3 style="text-align: center;">{{ store.username }}</h3>

            <RouterView />

        </el-main>

    </el-container>    
</template>

<script setup>
import useUserStore from '@/stores/store.js'
const store = useUserStore();

</script>

<style scoped>
@import '../assets/css/usermain.css'
</style>