<template>
    <el-dialog v-model="visible" title="修改成绩" @close="$emit('handleClose')">
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
            <el-form-item label="Past" v-show="type === 0 || type === 1 || type === 5">
                <el-row :gutter="5">
                    <el-row :span="18"><el-input v-model="scoreNew.pstScore" /></el-row>
                    <el-row :span="4">定数：{{ pstPttGetter }}</el-row>
                </el-row>                
            </el-form-item>
            <el-form-item label="Present" v-show="type === 0 || type === 2 || type === 5">
                <el-input v-model="scoreNew.prsScore" />
            </el-form-item>
            <el-form-item label="Future" v-show="type === 0 || type === 3 || type === 5">
                <el-input v-model="scoreNew.ftrScore" />
            </el-form-item>
            <el-form-item label="Beyond" v-show="type === 0 || type === 4 || type === 5">
                <el-input v-model="scoreNew.bydScore" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary">更新</el-button>
                <el-button type="warning" @click="$emit('handleClose')">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup>
import { ref, reactive, watch, toRefs, toRef, shallowRef, toRaw, computed } from 'vue';
import { empty } from '@/hooks/object.js';

//type 0:4个难度都有 1234:对应每个难度 5:新增歌曲！
const props = defineProps(['type', 'visible', 'scoreData', 'songs', 'packs']);
const emits = defineEmits(['handleClose']);

let { scoreData, type, visible, songs, packs } = toRefs(props);//注意，这里的props更新了的话，scoreData也会更新！！！

let scoreNew = reactive({scoreData});

//监视更新，props更行后执行
watch(scoreData, (newScoreData) => {
    empty(scoreNew);
    Object.assign(scoreNew, newScoreData);
})

//歌曲搜索
function querySearch(queryString, cb){
    let result;
    result = songs.value.filter(element => {
        return element.sname.toLowerCase().indexOf(queryString.toLowerCase()) !== -1 && ((scoreNew.pid === undefined || scoreNew.pid === null || scoreNew.pid === '')? true: element.pid === scoreNew.pid);
    })
    cb(result);
}

//选择歌曲后复制属性
function handleSelect(selected){
    Object.assign(scoreNew, selected);
}

//定数计算
function getPotential(score, difficulty){
    if(score >= 10000000) return difficulty + 2;
    else if(score >= 9800000 && score < 10000000) return difficulty + 1 + (score - 9800000) / 200000;
    let ptt = difficulty + (score - 9500000) / 300000;
    return (ptt >= 0)? ptt: 0;
}

//更新定数
let pstPttGetter = computed(() => {
    return (scoreNew.pstScore === undefined || scoreNew.pstScore === null || scoreNew.pstScore === '')? 0: getPotential(scoreNew.pstScore, scoreNew.pst);
})
let prsPttGetter = computed(() => {
    return (scoreNew.prsScore === undefined || scoreNew.prsScore === null || scoreNew.prsScore === '')? 
        0:
        getPotential(scoreNew.prsScore, scoreNew.prs);
})
let ftrPttGetter = computed(() => {
    return (scoreNew.ftrScore === undefined || scoreNew.ftrScore === null || scoreNew.ftrScore === '')? 
        0:
        getPotential(scoreNew.ftrScore, scoreNew.ftr);
})
let bydPttGetter = computed(() => {
    return (scoreNew.bydScore === undefined || scoreNew.bydScore === null || scoreNew.bydScore === '')? 
        0:
        getPotential(scoreNew.bydScore, scoreNew.byd);
})
//更新/添加成绩


</script>

<style scoped>

</style>