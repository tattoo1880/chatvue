<template>
    <div>
        <div>当前用户: {{ loginfrom.name }}</div>

        <div style="margin: 20px;">
            <h3>📩 收到消息:</h3>
            <div style="border:1px solid #ccc; padding:10px; width:400px; height:200px; overflow:auto;">
                <div v-for="(item, index) in msgList" :key="index">{{ item }}</div>
            </div>

            <!-- select -->
            <el-select v-model="selectedUser" placeholder="选择用户" style="width: 200px; margin: 10px 0;">
                <el-option v-for="user in userlist" :key="user.id" :label="user.name" :value="user.id" />
            </el-select>

            <el-input v-model="sendMsg" placeholder="输入消息..." style="width: 300px; margin: 10px 0;" />
            <el-button type="primary" @click="handleSend">发送</el-button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useLoginStore } from '@/stores/useloginstore'
import { connectWS, sendMessage } from '@/utils/linkws'
import { useChatStore } from '@/stores/usechatstore'

const chatStore = useChatStore()
const { userlist, getalluserinfo, sendnewmessage } = chatStore

const loginStore = useLoginStore()
const { loginfrom } = loginStore

const msgList = ref([])
const sendMsg = ref('')
const selectedUser = ref(null)

onMounted(async () => {
    console.log('组件加载完成')
    console.log('用户ID:', loginfrom.userid)

    await getalluserinfo()

    console.log('用户列表:', userlist)


    connectWS(loginfrom.userid, (msg) => {
        msgList.value.push(msg)
    })


})

const handleSend = async () => {




    console.log(selectedUser.value)
    console.log(sendMsg.value)

    const content = {
        from_userid: String(loginfrom.userid),
        msg: sendMsg.value
    }
    const data = {
        "to_user_id": String(selectedUser.value),
        "msg": content
    }

    console.log('发送消息:', data)

    await sendnewmessage(data)


    // const message = JSON.stringify({
    //     from_userid: loginfrom.userid,
    //     msg: sendMsg.value
    // })
    // console.log('发送消息:', message)
    // sendMessage(message)
}


</script>

<style lang='less' scoped></style>
