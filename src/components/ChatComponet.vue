<template>
    <el-card shadow="hover" style="width: 800px; margin: 3px auto;">
        <template #header>
            <div class="card-header">
                <el-text class="mx-1" type="primary">
                    <h3>
                        当前用户: {{ loginfrom.name }}
                    </h3>
                </el-text>


            </div>
        </template>
        <el-text class="mx-1" type="primary">
            <h4>
                📩 收到消息
            </h4>
        </el-text>


        <!-- <div class="message-box">
            <div v-for="(item, index) in tablelist" :key="index" class="message-item">
                {{ item }}
            </div>
        </div> -->

        <div class="message-box">
            <div v-for="(item, index) in tablelist" :key="index"
                :class="['message-item', item.isSelf ? 'self' : 'other']">
                {{ item.text }}
            </div>
        </div>




        <el-form :inline="true" label-width="80px">
            <el-row class='row-bg' justify='start'>
                <el-text class="mx-1" type="primary">
                    <h4>
                        📨 发送消息
                    </h4>
                </el-text>
            </el-row>
            <el-form-item label="接收用户">
                <el-select v-model="selectedUser" placeholder="选择用户" style="width: 140px;">
                    <el-option v-for="user in userlist" :key="user.id" :label="user.name" :value="user.id" />
                </el-select>
            </el-form-item>

            <el-form-item label="消息内容">
                <el-input v-model="sendMsg" type="text" :rows="3" placeholder="请输入消息内容" style="width: 340px;" />
            </el-form-item>


        </el-form>
        <el-row class='row-bg' justify='center' style="margin-top: 3px;">
            <el-button type="primary" @click="handleSend" :disabled="!selectedUser || !sendMsg" plain>发送</el-button>
        </el-row>
    </el-card>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount, onBeforeMount } from 'vue'
import { useLoginStore } from '@/stores/useloginstore'
import { connectWS, sendMessage, closeWS } from '@/utils/linkws'
import { useChatStore } from '@/stores/usechatstore'

const chatStore = useChatStore()
const { userlist, getalluserinfo, sendnewmessage } = chatStore

const loginStore = useLoginStore()
const { loginfrom } = loginStore

const msgList = ref([])
const sendMsg = ref('')
const selectedUser = ref(null)

const tablelist = computed(() => {
    return msgList.value.map(msg => {
        console.log(msg)
        const data = JSON.parse(msg)
        const username = userlist.find(user => user.id === Number(data.from_userid))?.name || '未知用户'
        console.log(username)
        console.log(data)
        return {
            text: `用户 ${username} 说: ${data.msg}`,
            isSelf: data.from_userid === String(loginfrom.userid)
        }
    })
})






onBeforeMount(async () => {
    console.log('组件加载完成')
    console.log('用户ID:', loginfrom.userid)

    await getalluserinfo()

    console.log('用户列表:', userlist)




    connectWS(loginfrom.userid, (msg) => {
        msgList.value.push(msg)
    })
    console.log('WebSocket连接已建立', msgList.value)


})

onBeforeUnmount(() => {

    console.log('组件卸载，关闭WebSocket连接')
    closeWS()
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

<style scoped>
::v-deep(.el-form-item__label) {
    color: #409eff;
    /* 标签颜色 */
}

::v-deep(.el-input__inner) {
    color: #409eff;
    /* 输入框文字颜色 */
}

.card-header {
    font-weight: bold;
    font-size: 18px;
}

/* .message-box {
    border: 1px solid #4978e3;
    border-radius: 4px;
    padding: 10px;
    height: 200px;
    overflow-y: auto;
    background-color: #262424;
    margin-bottom: 20px;
}

.message-item {
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 1.4;
    color: #309de5;

} */
.message-item {
    display: inline-block;
    max-width: 70%;
    padding: 10px 14px;
    margin: 8px;
    border-radius: 16px;
    line-height: 1.4;
    font-size: 14px;
    word-break: break-word;
    background-color: #2a2a2a;
    color: #fff;
}

.message-item.self {
    background-color: #409eff;
    color: #fff;
    align-self: flex-end;
    margin-left: auto;
}

.message-item.other {
    background-color: #5a5a5a;
    color: #fff;
    align-self: flex-start;
    margin-right: auto;
}

.message-box {
    display: flex;
    flex-direction: column;
    border: 1px solid #4978e3;
    border-radius: 4px;
    padding: 10px;
    height: 150px;
    overflow-y: auto;
    background-color: #1e1e1e;
    margin-bottom: 20px;
}
</style>