<template>
    {{ obj.age }}
    {{ obj.name }}
    <br>
    <button @click="assignTest">Button</button>
    <button @click="addAge">add Age</button>
</template>

<script setup>
import { ref, reactive, watch, toRefs, toRef, shallowRef, toRaw } from 'vue';
let obj = reactive({
    age: 12,
    name: 'sl'
});

function assignTest(){
    Object.assign(obj, {
        name: 'nm',
        age: 100
    });
}

function addAge(){
    obj.age++;
}
</script>

<style scoped>

</style>