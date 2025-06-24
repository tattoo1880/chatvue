<template>
    <el-row class="row-bg" justify="center">
        <el-col :span="24">
            <el-text class="mx-1" type="primary">
                <h3>历史消息</h3>
            </el-text>
        </el-col>
    </el-row>
    <el-divider> </el-divider>

    <el-row class="row-bg" justify="center">
        <el-col :span="24">
            <el-table :data="tableData" style="width: 80vw; height: 60vh">
                <el-table-column
                    prop="id"
                    label="ID"
                    width="450"
                ></el-table-column>
                <el-table-column
                    prop="from_userid"
                    label="发送者"
                    width="80"
                ></el-table-column>
                <el-table-column
                    prop="to_userid"
                    label="接收者"
                    width="80"
                ></el-table-column>
                <el-table-column prop="msg" label="内容"></el-table-column>
                <el-table-column
                    prop="timestamp"
                    label="时间戳"
                    width="380"
                ></el-table-column>
            </el-table>
        </el-col>
    </el-row>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useChatStore } from "@/stores/usechatstore";

const tableData = ref([]);
const usechat = useChatStore();
const { getmsgbytouser } = usechat;

onMounted(async () => {
    // 获取历史消息
    tableData.value = await getmsgbytouser();
});
</script>

<style scoped>
/* box-card */
.box {
    /* 居中 */
    width: 100%;
    height: 100%;
    border-radius: 10px;
}
el-row {
    width: 100%;
    height: 100%;
}
</style>
