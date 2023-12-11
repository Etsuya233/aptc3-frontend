<template>
    <div class="container">
        <div class="scoretable">
            <el-table :data="records" style="width: 100%" border :row-class-name="rowClassName">
                <el-table-column fixed type="index" label="排名" min-width="30px" />
                <el-table-column fixed prop="sname" min-width="140px" label="歌曲名" />
                <el-table-column prop="difficulty" label="难度" min-width="50px" />
                <el-table-column prop="score" label="成绩" min-width="100px" />
                <el-table-column prop="ptt" label="PTT" min-width="70px" />
                <el-table-column prop="time" label="时间" min-width="120px" />
            </el-table>
        </div>
        <div class="footer">
            <el-row :gutter="5">
                <el-col :span="19"></el-col>
                <el-col :span="5">
                    <el-pagination
                    layout="total, sizes"
                    :total="total"
                    :page-sizes="[30, 50, 100, 200, 500]"
                    :default-page-size="30"
                    @size-change="updateB30(val)"
                    v-model:page-size="pageSize"
                    />
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { getB30 } from '@/api/score.js';
import { ElNotification } from 'element-plus';

let total = ref(0);
let records = ref([]);
let pageSize = ref(30);

async function updateB30(){
    let response = await getB30(pageSize.value);
    records.value = response.data.data;
    total.value = response.data.data.length;
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

onMounted(() => {
    updateB30();
});
</script>

<style>
@import '@/assets/css/b30.css'
</style>