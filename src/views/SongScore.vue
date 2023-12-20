<template>
    <div class="container">
        
        <ScoreChange 
        :visible="scoreChangeInfo.visible" 
        :type="scoreChangeInfo.type"
        :scoreData="scoreChangeInfo.scoreData"
        :songs="songs"
        :packs="packs"
        @handle-close="handleScoreChangeClose" />

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
                <el-col :span="6">
                    <el-button @click="handleNew">新增</el-button>
                </el-col>
            </el-row>
        </div>

        <div class="scoretable">
            <el-table :data="records" style="width: 100%" v-loading="loading">
                <el-table-column fixed prop="sname" min-width="140px" label="歌曲名" />
                <el-table-column label="Present">
                    <el-table-column prop="pst" min-width="60px" label="难度"  />
                    <el-table-column prop="pstScore" min-width="100px" label="成绩"  />
                    <el-table-column prop="pstPtt" min-width="60px" label="定数"  />
                </el-table-column>
                <el-table-column label="Past">
                    <el-table-column prop="prs" min-width="60px" label="难度"  />
                    <el-table-column prop="prsScore" min-width="100px" label="成绩"  />
                    <el-table-column prop="prsPtt" min-width="60px" label="定数"  />
                </el-table-column>
                <el-table-column label="Future">
                    <el-table-column prop="ftr"  min-width="60px" label="难度"  />
                    <el-table-column prop="ftrScore" min-width="100px" label="成绩"  />
                    <el-table-column prop="ftrPtt" min-width="60px" label="定数"  />
                </el-table-column>
                <el-table-column label="Beyond">
                    <el-table-column prop="byd" min-width="60px" label="难度"  />
                    <el-table-column prop="bydScore" min-width="100px" label="成绩"  />
                    <el-table-column prop="bydPtt" min-width="60px" label="定数"  />
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
import { getAllScore } from '@/api/score.js';
import { getAllPack } from '@/api/pack.js';
import { getAllSongs } from '@/api/song.js';
import ScoreChange from '@/components/ScoreChange.vue';

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
        setTimeout(() => {
            router.push('login');
        }, 3000);
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

</script>

<style scoped>
@import '../assets/css/userscore.css'
</style>