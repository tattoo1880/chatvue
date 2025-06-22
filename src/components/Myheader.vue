<template>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
    >
        <el-menu-item index="0">
            <!-- <img
                style="width: 100px"
                src="/images/element-plus-logo.svg"
                alt="Element logo"
            /> -->
            <el-icon style="color: #adff2f" size="200">
                <ElementPlus />
            </el-icon>
            <el-text style="color: #adff2f">
                <strong>Trust Myself Again</strong>
            </el-text>
        </el-menu-item>
        <!-- <el-menu-item index="1" @click="handermenuitemone">
            <el-text style="color: #adff2f">
                <strong>预留1</strong>
            </el-text>
        </el-menu-item> -->
        <el-sub-menu index="2">
            <template #title>
                <el-text style="color: #adff2f">
                    <strong>功能</strong>
                </el-text>
            </template>
            <el-menu-item index="2-1" @click="tocustomer">
                <el-text style="color: #adff2f">
                    <strong>用户管理</strong>
                </el-text>
            </el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const activeIndex = ref("1");
const handleSelect = (key, keyPath) => {
    console.log(key, keyPath);
};

const router = useRouter();
const tocustomer = () => {
    console.log("跳转到用户管理");
};
</script>

<style>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
    margin-right: auto;
}
.el-menu-demo {
    height: 80px;
}
</style>
