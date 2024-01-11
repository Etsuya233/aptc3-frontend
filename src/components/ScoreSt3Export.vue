<template>
    <el-dialog
        v-model="realVisible"
        title="导入ST3"
        width="30%"
        :before-close="beforeClose"
        >
        <span>是否导出ST3？一天内只能导出一次，而且导出的文件只能用于导入APTC！</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="emits('handleClose')">取消</el-button>
                <el-button type="primary" @click="confirmExport">导出</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { toRefs, ref, watch } from 'vue';
//TODO: 这到底是啥意思？？？？
const props = defineProps(['visible']);
const emits = defineEmits(['handleClose', 'handleExport']);

let { visible } = toRefs(props);
let realVisible = ref(false);

function confirmExport(){
    emits('handleExport');
    emits('handleClose');
}

//监视visible
watch(visible, () => {
    realVisible.value = visible.value;
})

function beforeClose(){
    emits('handleClose');
}
</script>

<style scoped>

</style>