<template>
    <div class="container">
        <div class="picker">
            <el-date-picker
                v-model="timerange"
                type="daterange"
                range-separator="-"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                @change="getChartsData"
            />
        </div>
        <div class="pttCharts">
            <MyCharts 
            :pttData="pttData"
            :b30Data="b30Data"
            :r10Data="r10Data"
            :xAxisData="xAxisData"
            />
        </div>
    </div>
</template>

<script setup>
import {ref, reactive, onMounted, KeepAlive} from 'vue';
import MyCharts from '@/components/MyCharts.vue';
import {getPttHistory} from '@/api/ptt.js';

//图表数据
let pttData = ref([]);
let b30Data = ref([]);
let r10Data = ref([]);
let xAxisData = ref([]);

//图表时间范围
let timerange = ref('');

//查询图表数据
async function getChartsData(){
    let response = await getPttHistory(timerange.value[0], timerange.value[1]);
    let data = response.data.data;
    console.log(data);
    pttData.value = data.pttData;
    b30Data.value = data.b30Data;
    r10Data.value = data.r10Data;
    xAxisData.value = data.xaxisData;
}

</script>

<style scoped>
@import "../assets/css/usercharts.css"
</style>