import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import APIURL from '@/utils/BaseUrl'
import { useRouter } from 'vue-router'
import router from '@/router'

export const useLoginStore = defineStore('uselogin', () => {

    const router = useRouter()

    const loginfrom = ref({
        name: '',
        password: ''
    })

    const setLoginFrom = (name, password) => {
        loginfrom.value.name = name
        loginfrom.value.password = password
    }
    const clearLoginFrom = () => {
        loginfrom.value.name = ''
        loginfrom.value.password = ''
    }

    const loginAction = async (name, password) => {
        setLoginFrom(name, password)
        const response = await axios.post(`${APIURL}/api/users/login`, {
            name: loginfrom.value.name,
            password: loginfrom.value.password
        })

        return response
    }

    const login = async (name, password) => {
        try {
            const resp = await loginAction(name, password)
            console.log("登录响应：", resp)


            if (resp.data.message === "登录成功") {
                ElMessage.success("登录成功")
                // 登录成功后跳转到首页
                router.push({ name: "home" })
            }


        } catch (error) {
            console.error(error)
            ElMessage.error("登录请求失败，请检查用户名或密码是否正确")
        }
    }

    const logOutAction = async () => {
        clearLoginFrom()
        router.push({ name: "login" })
        ElMessage.success("已退出登录")
    }

    return {
        loginfrom,
        setLoginFrom,
        clearLoginFrom,
        loginAction,
        login,
        logOutAction
    }



})
