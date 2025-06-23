<template>
    <div class="common-layout">
        <el-row class="row-bg" justify="center">
            <el-col :span="12">
                <div class="aside">
                    <el-image
                        style="width: 100%; height: 100%; object-fit: cover"
                        :src="srcImage"
                        :fit="fit"
                    ></el-image>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="aside-right">
                    <el-row class="row-bg" justify="center">
                        <el-col :span="24">
                            <el-form
                                :label-position="Top"
                                label-width="auto"
                                :model="formLabelAlign"
                                style="max-width: 600px"
                                class="withborder"
                            >
                                <el-form-item style="width: 100%">
                                    <el-row
                                        class="row-bg"
                                        justify="center"
                                        style="width: 100%"
                                    >
                                        <el-text>
                                            <h2
                                                class="glow-title"
                                                style="color: #409eff"
                                            >
                                                TRUST YOURSELF AGAIN
                                            </h2>
                                        </el-text>
                                    </el-row>
                                </el-form-item>
                                <!-- 用户名 -->
                                <el-form-item
                                    label="用户名"
                                    class="itemxxxx"
                                    label-position="left"
                                >
                                    <el-input
                                        v-model="formLabelAlign.name"
                                        input-style="color: #409EFF;"
                                    />
                                </el-form-item>

                                <!-- 密码 -->
                                <el-form-item
                                    label="密码"
                                    class="itemxxxx"
                                    label-position="left"
                                >
                                    <el-input
                                        v-model="formLabelAlign.password"
                                        type="password"
                                        input-style="color: #409EFF;"
                                    />
                                </el-form-item>

                                <!-- 两个按钮 -->
                                <el-form-item class="itembutton">
                                    <el-row
                                        class="row-bg"
                                        justify="center"
                                        style="width: 100%"
                                    >
                                        <el-button
                                            type="primary"
                                            plain
                                            @click="handleLogin"
                                            >LOGIN</el-button
                                        >
                                        <el-button
                                            type="primary"
                                            plain
                                            @click="
                                                router.push({ name: 'reg' })
                                            "
                                            >REGSITER</el-button
                                        >
                                    </el-row>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import srcImage from "@/assets/loginimage.jpg";
import { useLoginStore } from "@/stores/useloginstore";
const loginStore = useLoginStore();

const fit = ref("fill");
const formLabelAlign = ref({
    name: "",
    password: "",
});
const router = useRouter();
const Top = ref("top");

// 处理登录逻辑
const handleLogin = async () => {
    if (
        formLabelAlign.value.name === "" ||
        formLabelAlign.value.password === ""
    ) {
        ElMessage.error("用户名或密码不能为空");
        return;
    }
    await loginStore.login(
        formLabelAlign.value.name,
        formLabelAlign.value.password
    );
};
</script>

<style scoped>
/* 修改表单标签颜色 */
::v-deep(.el-form-item__label) {
    color: #409eff;
    /* 标签颜色 */
}

/* 修改输入框样式 */
::v-deep(.el-input__inner) {
    color: #409eff;
    /* 输入框文字颜色 */
}

.common-layout {
    height: 100vh;
    overflow: hidden;
    background-color: black;
    /* background: linear-gradient(to right, #dec444, #bbdefb); */
    /* 渐变背景 */

    /* 隐藏溢出内容 */
}

.aside {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.aside-right {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    height: 60%;
}

@keyframes blue-glow {
    0% {
        box-shadow: 0 0 10px rgba(64, 162, 227, 0.8);
    }
    50% {
        box-shadow: 0 0 20px rgba(64, 162, 227, 1);
    }
    100% {
        box-shadow: 0 0 10px rgba(64, 162, 227, 0.8);
    }
}
.withborder {
    width: 500px;
    border-radius: 5px;
    padding: 40px;
    box-shadow: 0 0 10px rgba(64, 162, 227, 0.927);
    animation: blue-glow 2s infinite alternate;
}
@keyframes text-flicker {
    0% {
        text-shadow: 0 0 5px rgba(64, 162, 227, 0.7),
            0 0 10px rgba(64, 162, 227, 0.5);
        opacity: 1;
    }
    50% {
        text-shadow: 0 0 20px rgba(64, 162, 227, 1),
            0 0 30px rgba(64, 162, 227, 0.8);
        opacity: 0.9;
    }
    100% {
        text-shadow: 0 0 5px rgba(64, 162, 227, 0.7),
            0 0 10px rgba(64, 162, 227, 0.5);
        opacity: 1;
    }
}

.glow-title {
    color: #409eff;
    animation: text-flicker 2s infinite alternate;
}
.itemxxxx {
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
}

.el-input {
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(64, 162, 227, 0.927);
    animation: blue-glow 2s infinite alternate;
}

.itembutton {
    /* 让按钮容器居中对齐 */
    width: 100%;
    display: flex;
    /* 使用 Flex 布局 */
    justify-content: center;
    /* 水平居中 */
    gap: 10px;
    /* 按钮之间的间距 */
    /* 可选，增加按钮与其他表单项的间距 */
    border-radius: 5px;
}
.el-button {
    margin: 30px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(64, 162, 227, 0.927);
    animation: blue-glow 2s infinite alternate;
}
</style>
