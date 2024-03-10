<template>
    <el-dialog
        v-model="realVisible"
        title="导出CSV文件"
        width="30%"
        :before-close="beforeClose"
        >
        <span>是否导出CSV？一天内只能导出一次！</span>
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