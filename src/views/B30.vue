<template>
    <div class="container">
        <div class="scoretable" v-loading="loading" >
            <el-table :data="records" style="width: 100%" border :row-class-name="rowClassName" ::highlight-current-row="false">
                <el-table-column fixed type="index" label="排名" min-width="30px" />
                <el-table-column fixed prop="sname" min-width="140px" label="歌曲名" />
                <el-table-column prop="difficulty" label="难度" min-width="50px" />
                <el-table-column prop="score" label="成绩" min-width="100px" />
                <el-table-column prop="ptt" label="PTT" min-width="70px" :formatter="formatter"/>
                <el-table-column prop="time" label="时间" min-width="120px" />
            </el-table>
        </div>
        <div class="b30footer">
            <div class="item">
                <el-button>导出</el-button>
            </div>
            <div class="item">
                <el-pagination
                layout="total, sizes"
                :total="total"
                :page-sizes="[30, 50, 100, 200, 500]"
                :default-page-size="30"
                @size-change="updateB30(val)"
                v-model:page-size="pageSize"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { getB30 } from '@/api/score.js';

let total = ref(0);
let records = ref([]);
let pageSize = ref(30);

let loading = ref(false);

async function updateB30(){
    try{
        loading.value = true;
        let response = await getB30(pageSize.value);
        records.value = response.data.data;
        total.value = response.data.data.length;
    } catch (error) {
        
    } finally {
        loading.value = false;
    }
}

function rowClassName({row, rowIndex}){
    switch(row.difficultyType){
        case 1: return 'pst-row';
        case 2: return 'prs-row';
        case 3: return 'ftr-row';
        case 4: return 'byd-row';
        default: return '';
    }
}

function formatter(row, column, cellValue, index){
    return cellValue.toFixed(2);
}

onMounted(() => {
    updateB30();
});
</script>

<style>
@import '@/assets/css/b30.css'
</style>