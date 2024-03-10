<template>
    <el-dialog v-model="visible" title="修改成绩" @close="$emit('handleClose', false)">
        <el-form ref="form" label-width="80px">
            <el-form-item label="Song">
                <el-autocomplete
                    v-model="scoreNew.sname"
                    :fetch-suggestions="querySearch"
                    clearable
                    placeholder="请输入歌曲名"
                    value-key="sname"
                    @select="handleSelect"
                    :disabled="type !== 5"
                />
            </el-form-item>
            <el-form-item label="Pack">
                <el-select v-model="scoreNew.pid" placeholder="选择曲包" :disabled="type !== 5" clearable>
                    <el-option
                        v-for="item in packs"
                        :key="item.pid"
                        :label="item.pname"
                        :value="item.pid"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="Past">
                <el-col :span="18"><el-input v-model="scoreNew.pstScore" :disabled="scoreNew.pst === null || scoreNew.pst === undefined || scoreNew.pst === 0"/></el-col>
                <el-col :span="1"></el-col>
                <el-col :span="4">定数：{{ pstPttGetter }}</el-col>
            </el-form-item>
            <el-form-item label="Present">
                <el-col :span="18"><el-input v-model="scoreNew.prsScore" :disabled="scoreNew.prs === null || scoreNew.prs === undefined || scoreNew.prs === 0"/></el-col>
                <el-col :span="1"></el-col>
                <el-col :span="4">定数：{{ prsPttGetter }}</el-col>
            </el-form-item>
            <el-form-item label="Future">
                <el-col :span="18"><el-input v-model="scoreNew.ftrScore" :disabled="scoreNew.ftr === null || scoreNew.ftr === undefined || scoreNew.ftr === 0"/></el-col>
                <el-col :span="1"></el-col>
                <el-col :span="4">定数：{{ ftrPttGetter }}</el-col>
            </el-form-item>
            <el-form-item label="Beyond">
                <el-col :span="18"><el-input v-model="scoreNew.bydScore" :disabled="scoreNew.byd === null || scoreNew.byd === undefined || scoreNew.byd === 0"/></el-col>
                <el-col :span="1"></el-col>
                <el-col :span="4">定数：{{ bydPttGetter }}</el-col>
            </el-form-item>
            <el-form-item label="Eternal">
                <el-col :span="18"><el-input v-model="scoreNew.etrScore" :disabled="scoreNew.etr === null || scoreNew.etr === undefined || scoreNew.etr === 0"/></el-col>
                <el-col :span="1"></el-col>
                <el-col :span="4">定数：{{ etrPttGetter }}</el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSubmit">更新</el-button>
                <el-button type="warning" @click="$emit('handleClose')">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup>
import { ref, reactive, watch, toRefs, toRef, shallowRef, toRaw, computed } from 'vue';
import { empty } from '@/hooks/object.js';
import { updateScore } from '@/api/score.js';
import { updatePTT, getScoreBySgid } from '../api/score';


//type 0:通过表格修改成绩 5:新增歌曲！后端要用到！看是插入还是修改！
//scoreData：用于记录当前修改的信息
//songs：SongScore传入的歌曲列表，刷新网页才更新！
//packs：曲包信息
const props = defineProps(['type', 'visible', 'scoreData', 'songs', 'packs']);
const emits = defineEmits(['handleClose']);

let { scoreData, type, visible, songs, packs } = toRefs(props);//注意，这里的props更新了的话，scoreData也会更新！！！

//TODO 理解一下这个？
/*
{
    "sid": null,
    "scid": null,
    "pid": null,
    "sname": null,
    "pst": null,
    "pstScore": null,
    "pstPtt": null,
    "prs": null,
    "prsScore": 10000839,
    "prsPtt": null,
    "ftr": null,
    "ftrScore": 9910149,
    "ftrPtt": null,
    "byd": null,
    "bydScore": null,
    "bydPtt": null,
    "etr": null,
    "etrScore": null,
    "etrPtt": null
}
*/
let scoreNew = reactive({scoreData});

//监视更新，当scoreData更新时（表格点击修改成绩，添加成绩时）
watch(scoreData, (newScoreData) => {
    empty(scoreNew);
    Object.assign(scoreNew, newScoreData);
})

//歌曲搜索（用于autocomplete）
function querySearch(queryString, cb){
    let result;
    result = songs.value.filter(element => {
        return element.sname.toLowerCase().indexOf(queryString.toLowerCase()) !== -1 && ((scoreNew.pid === undefined || scoreNew.pid === null || scoreNew.pid === '')? true: element.pid === scoreNew.pid);
    })
    cb(result);
}

//选择歌曲后复制属性
async function handleSelect(selected){
    //复制属性
    Object.assign(scoreNew, selected);
    //查看是否已经存在成绩
    let response = await getScoreBySgid(selected.sgid);
    if(response != null){
        scoreNew.pstScore = response.data.data.pstScore;
        scoreNew.prsScore = response.data.data.prsScore;
        scoreNew.ftrScore = response.data.data.ftrScore;
        scoreNew.bydScore = response.data.data.bydScore;
        scoreNew.etrScore = response.data.data.etrScore;
    }
}

//定数计算
function getPotential(score, difficulty){
    if(score >= 10000000) return difficulty + 2;
    else if(score >= 9800000 && score < 10000000) return difficulty + 1 + 1.0 * (score - 9800000) / 200000;
    let ptt = difficulty + 1.0 * (score - 9500000) / 300000;
    return (ptt >= 0)? ptt: 0;
}

//更新定数
let pstPttGetter = computed(() => {
    return (scoreNew.pstScore === undefined || scoreNew.pstScore === null || scoreNew.pstScore === '')? 
        0: getPotential(scoreNew.pstScore, scoreNew.pst).toFixed(2);
})
let prsPttGetter = computed(() => {
    return (scoreNew.prsScore === undefined || scoreNew.prsScore === null || scoreNew.prsScore === '')? 
        0: getPotential(scoreNew.prsScore, scoreNew.prs).toFixed(2);
})
let ftrPttGetter = computed(() => {
    return (scoreNew.ftrScore === undefined || scoreNew.ftrScore === null || scoreNew.ftrScore === '')? 
        0: getPotential(scoreNew.ftrScore, scoreNew.ftr).toFixed(2);
})
let bydPttGetter = computed(() => {
    return (scoreNew.bydScore === undefined || scoreNew.bydScore === null || scoreNew.bydScore === '')? 
        0: getPotential(scoreNew.bydScore, scoreNew.byd).toFixed(2);
})
let etrPttGetter = computed(() => {
    return (scoreNew.etrScore === undefined || scoreNew.etrScore === null || scoreNew.etrScore === '')? 
        0: getPotential(scoreNew.etrScore, scoreNew.etr).toFixed(2);
})


//更新/添加成绩
async function handleSubmit(){
    scoreNew.pstPtt = pstPttGetter.value;
    scoreNew.prsPtt = prsPttGetter.value;
    scoreNew.ftrPtt = ftrPttGetter.value;
    scoreNew.bydPtt = bydPttGetter.value;
    scoreNew.etrPtt = etrPttGetter.value;
    scoreNew.type = type.value;
    await updateScore(toRaw(scoreNew));
    updatePTT();
    emits('handleClose', true, scoreNew.sname);
}


</script>

<style scoped>

</style>