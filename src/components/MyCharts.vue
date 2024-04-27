<template>
    <div ref="chart" id="chart"></div>
</template>

<script setup>
import * as echarts from "echarts";
import {ref, reactive, onMounted, toRefs, watch} from 'vue';

const props = defineProps(['pttData', 'b30Data', 'r10Data', 'xAxisData']);
let { pttData, b30Data, r10Data, xAxisData } = toRefs(props);

//图表dom
let chart = ref();
let chartObj;

//监视pttData
watch([pttData, b30Data, r10Data, xAxisData], ([ptt, b30, r10, x]) => {
    setOption(ptt, b30, r10, x);
})


//设置图标内容
function setOption(ptt, b30, r10, x){
    let options = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        title: {
            left: 'center',
            text: 'PTT Variation'
        },
        toolbox: {
            feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: x
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
        },
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 10000
            },
            {
                start: 0,
                end: 10000
            }
        ],
        series: [
            {
                name: 'PTT',
                type: 'line',
                smooth: true,
                symbol: 'none',
                data: ptt
            },
            {
                name: 'B30',
                type: 'line',
                smooth: true,
                symbol: 'none',
                data: b30
            },
            {
                name: 'R10',
                type: 'line',
                smooth: true,
                symbol: 'none',
                data: r10
            }
        ]
    };
    chartObj.setOption(options);
}

//图表初始化
onMounted(() => {
    init();
});

function init() {
    chartObj = echarts.init(chart.value);
    setOption();
}

</script>

<style scoped>
#chart {
    width: 1500px;
    height: 500px;
}
</style>