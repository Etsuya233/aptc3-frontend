<template>
    {{ userStore.token }}
    {{ userStore.isLoggedIn }}
    <h1 style="text-align: center;">User Page</h1>
    <h3 style="text-align: center;">{{ userStore.username }}</h3>
</template>

<script setup>
import {ref, reactive} from 'vue';
import {useUserStore} from '@/stores/store'

const userStore = useUserStore();


</script>

<style scoped>

</style>