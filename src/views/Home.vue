<template>
    <el-container class="bodybody">
        <el-header
            style="
                height: 100px;
                width: 100vw;
                padding-left: 0%;
                padding-right: 0%;
            "
            ><Myheader
        /></el-header>

        <el-container class="mybody">
            <el-aside width="200px">
                <Aside />
            </el-aside>

            <el-main class="my-main">
                <el-row style="flex: 1 1 auto; overflow: hidden">
                    <RouterView />
                </el-row>

                <el-row>
                    <el-divider>
                        <el-icon><star-filled color="#ADFF2F" /></el-icon>
                    </el-divider>
                </el-row>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import Myheader from "@/components/Myheader.vue";
import Aside from "@/components/Aside.vue";
</script>

<style scoped>
.bodybody {
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.mybody {
    flex: 1 1 auto; /* 占满 header 下面剩余空间 */
    display: flex;
    flex-direction: row; /* aside + main 横向 */
    overflow: hidden;
}

.my-main {
    flex: 1 1 auto; /* main 占满 aside 旁边剩余空间 */
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
</style>
