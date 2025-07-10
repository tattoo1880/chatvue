// linkws.js

import { ElMessage } from "element-plus"

let socket = null

const connectWS = (userid, onMessageCallback) => {
    if (socket) {
        socket.close()
    }

    // const wsUrl = `ws://127.0.0.1:8080/api/rabbitmq/ws?user_id=${userid}`
    const wsUrl = `ws://103.201.130.217/ws/send/?user_id=${userid}`
    socket = new WebSocket(wsUrl)

    socket.onopen = () => {
        ElMessage.success('✅ WebSocket 连接成功')

    }

    socket.onmessage = (event) => {
        console.log('📩 收到: ', event.data)
        if (onMessageCallback) {
            onMessageCallback(event.data)
        }
    }

    socket.onclose = () => {
        ElMessage.warning('❌ WebSocket 连接关闭')
    }

    socket.onerror = (error) => {
        ElMessage.error('⚠️ WebSocket 错误')
        console.error('WebSocket 错误:', error)
    }
}

const sendMessage = (data) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(data)
    } else {
        ElMessage.error('❌ WebSocket 还没有连接')
    }
}

const closeWS = () => {
    if (socket) {
        socket.close()
        socket = null
    }
}

export { socket, connectWS, sendMessage, closeWS }
