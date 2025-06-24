import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import APIURL from '@/utils/BaseUrl'
import { useRouter } from 'vue-router'



export const useChatStore = defineStore('usechat', () => {

    const userlist = ref([])

    const getalluserinfo = async () => {
        try {
            const response = await axios.get(`${APIURL}/api/users`)
            userlist.value = response.data
            console.log("获取用户信息成功:", userlist.value)
            return userlist.value
        } catch (error) {
            console.error("获取用户信息失败:", error)
            ElMessage.error("获取用户信息失败")
        }
    }

    const sendnewmessage = async (data) => {
        try {
            const resp = await axios.post(`${APIURL}/api/rabbitmq`, data)
            console.log("发送消息响应:", resp.data)
            if (resp.data.msg == "发送消息成功") {
                ElMessage.success("发送消息成功")
            } else {
                ElMessage.error("发送消息失败")
            }
        } catch (error) {

            console.error("发送消息失败:", error)
            ElMessage.error("发送消息失败")

        }
    }


    return { userlist, getalluserinfo, sendnewmessage }


}, { persist: true })
