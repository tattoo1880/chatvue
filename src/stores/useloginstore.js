import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import APIURL from '@/utils/BaseUrl'
import { useRouter } from 'vue-router'

export const useLoginStore = defineStore('uselogin', () => {

    const router = useRouter()

    const loginfrom = ref({
        userid: null,
        name: '',
        password: ''
    })

    const setLoginFrom = (name, password) => {
        console.log("设置登录表单：", name, password)
        loginfrom.value.name = name
        loginfrom.value.password = password
    }
    const clearLoginFrom = () => {
        loginfrom.value.name = ''
        loginfrom.value.password = ''
    }

    const loginAction = async (name, password) => {
        setLoginFrom(name, password)
        console.log(loginfrom.value)
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
                loginfrom.value.userid = resp.data.user.id
                ElMessage.success("登录成功")
                // 登录成功后跳转到首页
                router.push({ name: "chat" })
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



}, {
    persist: true
})
