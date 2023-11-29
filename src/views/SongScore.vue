<template>
    Song Score List

    <el-table :data="records" style="width: 100%" height="250">
        <el-table-column fixed prop="sname" label="歌曲名" />
        <el-table-column prop="pst" label="Pst"  />
        <el-table-column prop="pstScore" label="Pst成绩"  />
        <el-table-column prop="pstPtt" label="Pst定数"  />
        <el-table-column prop="prs" label="Prs"  />
        <el-table-column prop="prsScore" label="Prs成绩"  />
        <el-table-column prop="prsPtt" label="Prs定数"  />
        <el-table-column prop="ftr" label="Ftr"  />
        <el-table-column prop="ftrScore" label="Ftr成绩"  />
        <el-table-column prop="ftrPtt" label="Ftr定数"  />
        <el-table-column prop="byd" label="Byd"  />
        <el-table-column prop="bydScore" label="Byd成绩"  />
        <el-table-column prop="bydPtt" label="Byd定数"  />
    </el-table>

</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { getAllScore } from '@/api/score.js';

let records = ref([]);
let total = ref(0);

function updateScoreList(){
    getAllScore(1, 20).then((response) => {
        records.value = response.data.data.records;
        total.value = response.data.data.total;  
    })
}

onMounted(() => {
    updateScoreList();
})


</script>

<style scoped>

</style>