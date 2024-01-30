<template>
    <el-dialog title="上传st3文件" v-model="realVisible" :before-close="beforeClose">

        <el-upload
            ref="upload"
            drag
            :auto-upload="false"
            :on-change="handleChange"
            :on-exceed="handleExceed"
            :limit="1"
            action=""
        >
            <template #trigger>
                <div class="el-upload__text">
                    拖拽到此处 或 <em>手动选取</em>
                </div>
            </template>
            <template #tip>
                <div class="el-upload__tip">
                    只能上传一个文件，上传多个会被覆盖！
                </div>
            </template>
            <div class="container">
                <el-button class="ml-3" type="success" @click="submitFile">传输并导入</el-button>
            </div>
        </el-upload>

    </el-dialog>
</template>

<script setup>
import { ref, reactive, toRefs, computed, watch } from 'vue';
import { importScore } from '@/api/score.js';

const emits = defineEmits(['handleClose', 'handleRefresh']);
const props = defineProps(['visible']);

let { visible } = toRefs(props);

let realVisible = ref(false);

//上传
let upload = ref(); //指向EL的upload组件
let file = ref(); //我用来获取需要上传的文件，用于下面的submit！

//这个钩子会在文件状态发生改变时调用
//files是状态发生改变的文件（比如用户选择了文件啥的）（类型是EL封装好的，有个raw属性用来获取源文件)
//fileLists是确定上传文件数组
//这个函数放在这里是因为只要有用户选择了文件上传，就把这个文件给记录下来。用于下面的submitFile函数
function handleChange(files, fileList){
    console.log('change');
    file.value = files;
}

//files是上传文件数组(因为一次可能上传多个文件)
//fileList是确定上传文件的列表
//这个函数发生在handleChange之前！
function handleExceed(files, fileList){
    console.log('exceed');
    upload.value.clearFiles();
    upload.value.handleStart(files[0]);
}

async function submitFile(){
    if(file.value.size > 1024 * 1024){
        ElNotification({
            type: 'warning',
            title: '错误！',
            message: '文件大小不应超过1M！',
        })
    } else {
        let formData = new FormData();
        formData.append('file', file.value.raw);
        await importScore(formData);
        ElNotification({
            type: 'success',
            title: '导入st3',
            message: '已成功导入成绩！'
        })
        emits('handleRefresh');
        emits('handleClose');
    }
}

//监视与关闭
watch(visible, () => {
    realVisible.value = visible.value;
})

function beforeClose(){
    emits('handleClose');
}
</script>

<style scoped>
@import '../assets/css/st3.css'
</style>