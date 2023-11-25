<template>
    <div class="common">
        <el-container style="height: 100%;">  
            <el-header class="header">
                <h1 class="item">APTC</h1>
            </el-header>

            <el-main>
                <RouterView />
            </el-main>
            
            <el-footer>Footer</el-footer>
        </el-container>
    </div>  
</template>

<script setup>

</script>

<style scoped>
@import './assets/css/main.css'
</style>