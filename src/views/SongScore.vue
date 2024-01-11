<template>
    <div class="container">
        
        <ScoreChange 
        :visible="scoreChangeInfo.visible" 
        :type="scoreChangeInfo.type"
        :scoreData="scoreChangeInfo.scoreData"
        :songs="songs"
        :packs="packs"
        @handle-close="handleScoreChangeClose" />

        <UploadST3 
        :visible="uploadST3Info.visible"
        @handle-close="handleUploadST3Close"
        @handle-refresh="updateScoreList" /> 

        <ScoreSt3Export
        :visible="exportSt3Info.visible"
        @handle-close="handleExportSt3Close"
        @handle-export="startExportSt3"
        />        

        
        <div class="operation">
            <el-row :gutter="5">
                <el-col :span="8">
                    <el-input  v-model="sname" placeholder="歌曲名" @keyup.enter="handleSearch" clearable></el-input>
                </el-col>
                <el-col :span="6">
                    <el-select v-model="pid" clearable placeholder="请选择曲包" value-key="pid" @change="handlePackChange">
                        <el-option
                        v-for="item in packs"
                        :key="item.pid"
                        :label="item.pname"
                        :value="item.pid"
                        />
                    </el-select>
                </el-col>
                <el-col :span="4"></el-col>
                <el-col :span="2">
                    <el-button @click="handleNew">新增</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button @click="handleExport">导出st3</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button @click="handleImport">导入st3</el-button>
                </el-col>
            </el-row>
        </div>

        <div class="scoretable">
            <el-table :data="records" style="width: 100%" v-loading="loading" :cell-style="changeCellStyle" >
                <el-table-column fixed prop="sname" min-width="140px" label="歌曲名" />
                <el-table-column label="Present">
                    <el-table-column prop="pst" min-width="60px" label="难度"  />
                    <el-table-column prop="pstScore" min-width="100px" label="成绩"  />
                    <el-table-column prop="pstPtt" min-width="60px" label="定数" :formatter="formatter" />
                </el-table-column>
                <el-table-column label="Past">
                    <el-table-column prop="prs" min-width="60px" label="难度"  />
                    <el-table-column prop="prsScore" min-width="100px" label="成绩"  />
                    <el-table-column prop="prsPtt" min-width="60px" label="定数" :formatter="formatter" />
                </el-table-column>
                <el-table-column label="Future">
                    <el-table-column prop="ftr"  min-width="60px" label="难度"  />
                    <el-table-column prop="ftrScore" min-width="100px" label="成绩"  />
                    <el-table-column prop="ftrPtt" min-width="60px" label="定数" :formatter="formatter" />
                </el-table-column>
                <el-table-column label="Beyond">
                    <el-table-column prop="byd" min-width="60px" label="难度"  />
                    <el-table-column prop="bydScore" min-width="100px" label="成绩"  />
                    <el-table-column prop="bydPtt" min-width="60px" label="定数" :formatter="formatter" />
                </el-table-column>
                <el-table-column fixed="right" min-width="60px" label="操作">
                    <template v-slot="scope">
                        <el-button link type="primary" @click="handleTableChangeScore(scope.$index)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="pagination">
            <el-pagination
                v-model:current-page="pageNum"
                v-model:page-size="pageSize"
                :page-sizes="[5, 30, 50, 100, 200, 500, 1000]"
                :small="false"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                />
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { getAllScore, importScore, exportSt3 } from '@/api/score.js';
import { getAllPack } from '@/api/pack.js';
import { getAllSongs } from '@/api/song.js';
import UploadST3 from '@/components/UploadST3.vue';
import ScoreChange from '@/components/ScoreChange.vue';
import ScoreSt3Export from '@/components/ScoreSt3Export.vue';

let records = ref([]);
let total = ref(0);

let pageNum = ref(1);
let pageSize = ref(30);

let sname = ref('');
let pid = ref(null);

let packs = ref([]);

let songs = ref([]);

let loading = ref(false);

let userScoreQueryDTO = reactive({
    sname: sname.value,
    pid: pid.value,
    pageNum: pageNum.value,
    pageSize: pageSize.value,
});

function handleSizeChange(){
    userScoreQueryDTO.pageSize = pageSize.value;
    updateScoreList();
}

function handleCurrentChange(){
    userScoreQueryDTO.pageNum = pageNum.value;
    updateScoreList();
}

function handlePackChange(){
    userScoreQueryDTO.pid = pid;
    updateScoreList();
}

async function updateScoreList(){
    loading.value = true;
    try{
        let response = await getAllScore(userScoreQueryDTO);
        records.value = response.data.data.records;
        total.value = response.data.data.total;  
    } catch (error) {
        ElNotification({
            title: '错误',
            type: 'error',
            message: `${error.name}: ${error.message}`
        })
    } finally {
        loading.value = false;
    }
}

async function updatePack(){
    try {
        let response = await getAllPack();
        packs.value = response.data.data;
    } catch (error) {
        ElNotification({
            title: '错误',
            type: 'error',
            message: `${error.name}: ${error.message}`
        })
    }
}

async function updateSongs(){
    try {
        let response = await getAllSongs();
        songs.value = response.data.data;
    } catch (error) {
        ElNotification({
            title: '错误',
            type: 'error',
            message: `${error.name}: ${error.message}`
        })
    }
}

onMounted(() => {
    updateScoreList();
    updatePack();
    updateSongs();
})

function handleSearch(){
    userScoreQueryDTO.pid = pid.value;
    userScoreQueryDTO.sname = sname.value;
    userScoreQueryDTO.pageNum = pageNum.value;
    userScoreQueryDTO.pageSize = pageSize.value;
    updateScoreList(userScoreQueryDTO);
}

//表格展示
function formatter(row, column, cellValue, index){
    return (cellValue != null)? cellValue.toFixed(2): null;
}

function changeCellStyle(cell){
    if(cell.columnIndex >= 1 && cell.columnIndex <= 3){
        return {'background': '#EAF2F8'};
    } else if(cell.columnIndex >= 4 && cell.columnIndex <= 6){
        return {'background': '#E9F7EF'};
    } else if(cell.columnIndex >= 7 && cell.columnIndex <= 9){
        return {'background': '#F5EEF8'};
    } else if(cell.columnIndex >= 10 && cell.columnIndex <= 12){
        return {'background': '#F9EBEA'};
    }
}

//成绩更改界面：
let scoreChangeInfo = reactive({
    visible: false,
    type: 1,
    scoreData: {},
})

function handleNew(){
    scoreChangeInfo.type = 5;
    scoreChangeInfo.scoreData = reactive({});
    scoreChangeInfo.visible = true;
}

function handleScoreChangeClose(refresh, sname){
    scoreChangeInfo.visible = false;
    if(refresh) {
        updateScoreList();
        ElNotification({
            title: '成绩添加/更新成功',
            message: `歌曲名称：${sname}`,
            type: 'success',
        })
    }
}

//表格成绩更改
function handleTableChangeScore(index){
    scoreChangeInfo.type = 0;
    scoreChangeInfo.scoreData = (records.value)[index];
    scoreChangeInfo.visible = true;
}

//导入
let uploadST3Info = reactive({
    visible: false,
})

function handleUploadST3Close(){
    uploadST3Info.visible = false;
}

function handleImport(){
    uploadST3Info.visible = true;
}

//导出
let exportSt3Info = reactive({
    visible: false,
})

function handleExportSt3Close(){
    exportSt3Info.visible = false;
}

function handleExport(){
    exportSt3Info.visible = true;

   
}

async function startExportSt3(){
    try {
        const response = await exportSt3();
        
        //下载文件：模拟点击按钮
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'export.st3');
        document.body.appendChild(link);
        link.click();
    } catch (error){
        ElNotification({
            title: '错误',
            type: 'error',
            message: `${error.name}: ${error.message}`
        })
    }
}

</script>

<style scoped>
@import '../assets/css/userscore.css'
</style>