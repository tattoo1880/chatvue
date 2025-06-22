import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import APIURL from '@/utils/BaseUrl'
import { useRouter } from 'vue-router'

export const useRegStore = defineStore('usereg', () => {
    const router = useRouter()

    const cofirmReg = async (name, password, confirmpassword) => {

        if (password !== confirmpassword) {
            ElMessage.error('两次输入的密码不一致，请重新输入！')
            return
        }

        const response = await axios.post(`${APIURL}/api/users`, {
            name: name,
            password: password
        })

        return response
    }

    const regAction = async (name, password, confirmpassword) => {

        try {
            const resp = await cofirmReg(
                name,
                password,
                confirmpassword
            );
            console.log("注册响应：", resp);
            if (resp.status != 200) {
                ElMessage.error("注册失败，请检查用户名或密码");
            }

            if (resp.status === 200) {
                if (resp.data.message == "用户名已存在") {
                    ElMessage.error("用户名已存在，请更换用户名");
                } else if (resp.data.message == "用户创建成功") {
                    ElMessage.success("注册成功");
                    // 注册成功后跳转到登录页面
                    router.push({ name: "login" });
                } else {
                    ElMessage.error("注册失败，请稍后再试");
                }
            }
        } catch (error) {
            console.error(error);
        }

    }

    return {
        cofirmReg, regAction
    }

})
