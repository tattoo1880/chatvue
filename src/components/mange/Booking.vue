<template>

    <div>
        <el-row class='row-bg' justify='center'>
            <el-text class='mx-1' type='primary' size='large'>
                <h2 style="color: #adff2f">预约管理</h2>
            </el-text>
        </el-row>
    </div>

    <div>
        <el-row class='row-bg' justify='end'>
            <el-col :span='2'>
                <el-button type='success' plain @click='addbooking'>添加预约</el-button>
            </el-col>
        </el-row>
    </div>

    <!-- tabe -->
    <div>
        <el-row class="row-bg" justify="center" style="margin-top: 30px;">
            <el-col :span="24">
                <el-table :data="tabledata" style="width: 100%" align="center">
                    <el-table-column prop="id" label="ID" width="300" align="center">
                        <template v-slot="{ row }">
                            <el-tag type="success">{{ row.uuid }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="username" label="用户名" width="200" align="center">
                        <template v-slot="{ row }">
                            <el-tag type="success">{{ row.user_detail.name }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="username" label="技师名" width="200" align="center">
                        <template v-slot="{ row }">
                            <el-tag type="success">{{ row.tony_detail.name }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="username" label="服务名" width="200" align="center">
                        <template v-slot="{ row }">
                            <el-tag type="success">{{ row.service_detail.name_display }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="username" label="预约时间" width="200" align="center">
                        <template v-slot="{ row }">
                            <el-tag type="success">{{ row.appointment_time }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="100" align="center">
                        <template v-slot="{ row }">
                            <el-button type="danger" plain @click="handerdelete(row.uuid)">
                                删除预约
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

    </div>




    <!-- 添加服务的dialog -->
    <div>
        <el-dialog v-model="showme1" title="添加预约" width="500" :before-close="handleClose">
            <div>
                <el-text class='mx-1' type='success' size='large'>
                    添加预约
                </el-text>
            </div>
            <el-form :label-position="labelPosition" label-width="auto" :model="booking"
                style="max-width: 600px; margin-top: 23px;">
                <el-form-item label="用户" prop="name" class="itemxxx">
                    <!-- <el-input v-model="customerdetail.name"></el-input> -->
                    <el-select v-model="booking.user" placeholder="Select" size="large" style="width: 240px">
                        <el-option v-for="item in userlist" :key="item.uuid" :label="item.name" :value="item.uuid" />
                    </el-select>
                </el-form-item>
                <el-form-item label="技师" prop="name" class="itemxxx">
                    <!-- <el-input v-model="customerdetail.name"></el-input> -->
                    <el-select v-model="booking.tony" placeholder="Select" size="large" style="width: 240px">
                        <el-option v-for="item in tonylist" :key="item.uuid" :label="item.name" :value="item.uuid" />
                    </el-select>
                </el-form-item>
                <el-form-item label="服务" prop="name" class="itemxxx">
                    <!-- <el-input v-model="customerdetail.name"></el-input> -->
                    <el-select v-model="booking.service" placeholder="Select" size="large" style="width: 240px">
                        <el-option v-for="item in servicelist" :key="item.uuid" :label="item.name_display"
                            :value="item.uuid" />
                    </el-select>
                </el-form-item>
                <!-- 选择预约时间 -->
                <el-form-item label="预约时间" prop="appointment_time" class="itemxxx">
                    <el-date-picker v-model="booking.appointment_time" type="datetime" placeholder="Pick a Date"
                        format="YYYY/MM/DD hh:mm:ss" value-format="YYYY-MM-DDTHH:mm:ss" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="handleCancel">Cancel</el-button>
                    <el-button type="primary" @click="handleConfirm">
                        Confirm
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>

</template>

<script setup>
import myfetch from '@/utils/myfetch';
import { ElMention, ElMessage } from 'element-plus';
import { ref, reactive, onMounted } from 'vue'
const labelPosition = ref('left')
const showme1 = ref(false)

const userlist = ref([])
const tonylist = ref([])
const servicelist = ref([])
const booking = ref({})
const tabledata = ref([])
const getalluser = async () => {
    try {
        const res = await myfetch.get('user/')
        console.log(res.data)
        userlist.value = res.data
    } catch (e) {
        console.log(e)
    }
}

const getallservice = async () => {
    try {
        const res = await myfetch.get('service/')
        console.log(res.data)
        servicelist.value = res.data
    } catch (e) {
        console.log(e)
    }
}

const getalltony = async () => {
    try {
        const res = await myfetch.get('tony/')
        console.log(res.data)
        tonylist.value = res.data
    } catch (e) {
        console.log(e)
    }
}
const getallbooking = async () => {
    try {
        const res = await myfetch.get("appointment/")
        console.log(res.data)
        tabledata.value = res.data

    } catch (error) {
        console.log(error)
    }
}

onMounted(async () => {
    const tasklist = []
    tasklist.push(getalluser())
    tasklist.push(getallservice())
    tasklist.push(getalltony())
    tasklist.push(getallbooking())
    await Promise.all(tasklist)
}

)


const addbooking = () => {
    showme1.value = true
}

const handleClose = () => {
    showme1.value = false
}

const handleCancel = () => {
    showme1.value = false
}

const handleConfirm = async () => {
    console.log(booking.value)
    try {
        const res = await myfetch.post("appointment/", booking.value)
        console.log(res.data)
        showme1.value = false
        ElMessage.success("预约成功")
    } catch (error) {
        console.log(error)
        ElMessage.error("预约失败")
        showme1.value = false
    }
}

const handerdelete = async (uuid) => {
    try {
        const res = await myfetch.delete(`appointment/${uuid}/`)
        console.log(res.data)
        ElMessage.success("删除成功")
        getallbooking()
    } catch (error) {
        console.log(error)
        ElMessage.error("删除失败")
    }
}

</script>

<style scoped>
::v-deep(.el-form-item__label) {
    color: #adff2f;
    /* 标签颜色 */
}
</style>