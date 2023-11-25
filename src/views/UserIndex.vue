<template>
    <h1 style="text-align: center;">User Page</h1>
    <h3 style="text-align: center;">{{ store.username }}</h3>
    
</template>

<script setup>
import useUserStore from '@/stores/store.js'
const store = useUserStore();

</script>

<style scoped>

</style>