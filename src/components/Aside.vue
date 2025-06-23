<template>
    <el-aside width="200px" style="height: 100vh; padding-top: 0">
        <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            text-color="#FFF5EE"
        >
            <el-menu-item
                index="1"
                style="
                    width: 200px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                "
            >
                <RouterLink :to="{}" class="router-link">
                    <el-text type="primary">
                        <h4 style="color: chartreuse">通讯管理</h4>
                    </el-text>
                </RouterLink>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style scoped>
/* .el-aside {
    height: 100vh;
} */

.el-menu-vertical-demo {
    /* height: 100%; */
    max-height: calc(100vh-70px);

    /* 禁用flow */
}

.router-link {
    color: inherit;
    /* 继承父元素的文字颜色 */
    text-decoration: none;
    /* 移除下划线 */
    cursor: pointer;
    /* 鼠标样式为指针 */
}

.router-link:hover {
    color: #ffd04b;
    /* 鼠标悬停时改变文字颜色 */
}
</style>
