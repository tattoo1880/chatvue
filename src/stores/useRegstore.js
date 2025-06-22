import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import APIURL from '@/utils/BaseUrl'

export const useRegStore = defineStore('usereg', () => {

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

    return {
        cofirmReg
    }

})
